async function checkLoginUser() {
  try {
    const res = await axios.get("http://localhost:8000/auth/checkLogin", {
      withCredentials: true,
    });

    const data = res.data.user;

    if (data.role !== "admin") {
      window.location.href = "../../login.html";
      return;
    }

    if (res.status === 200) {
      const namaPengguna = document.getElementById("user-name");

      namaPengguna.innerHTML = `${data.first_name} ${data.last_name}`;

      return true;
    } else {
      alert(data.message || "Terjadi kesalahan");
      return false;
    }
  } catch (err) {
    console.error("Fetch gagal:", err);
    if (err.status === 401 || err.status === 403) {
      window.location.href = "../../login.html";
    }
    return false;
  }
}

document.addEventListener("DOMContentLoaded", checkLoginUser);

function formatTanggal(tanggal) {
  if (!tanggal) return "-";
  const date = new Date(tanggal);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await axios.get(
      "http://localhost:8000/peminjaman/peminjaman"
    );
    const tableBody = document.getElementById("data");
    const data = response.data.peminjaman;

    const filteredData = data.filter(
      (pinjam) =>
        pinjam.status_peminjaman === "dipinjam" ||
        pinjam.status_peminjaman === "selesai"
    );

    if (filteredData.length === 0) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td colspan="8" style="text-align: center; font-style: italic;">
          Belum ada Peminjaman
        </td>
      `;
      tableBody.appendChild(row);
      return;
    }

    tableBody.innerHTML = "";

    filteredData.forEach((pinjam, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${pinjam.judul_buku}</td>
        <td>${pinjam.first_name + " " + pinjam.last_name}</td>
        <td>${formatTanggal(pinjam.tanggal_pinjam)}</td>
        <td>${formatTanggal(pinjam.tanggal_kembali)}</td>
        <td>${formatTanggal(pinjam.tanggal_pengembalian) || "-"}</td>
        <td>${pinjam.status_peminjaman}</td>
        <td>${pinjam.status_pengembalian || "-"}</td>
        <td>
          ${
            pinjam.status_peminjaman === "selesai"
              ? `<i>Buku dikembalikan</i>`
              : pinjam.status_peminjaman === "dipinjam"
              ? `<button class="btn btn-warning btn-sm kembalikan" data-id="${pinjam.id_peminjaman}">
           Done
        </button>`
              : `-`
          }
        </td>
      `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Gagal mengambil data peminjaman:", error);
  }
});

const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      if (res.data.statusCode === 200) {
        window.location.href = "../../login.html";
      } else {
        alert(res.data.message || "Gagal logout");
      }
    } catch (err) {
      console.error("Logout gagal:", err.response?.data || err);
      window.location.href = "../../login.html";
    }
  });
}


document.addEventListener("click", async (e) => {
  const btn = e.target.closest(".kembalikan");
  if (!btn) return;

  const idPeminjaman = btn.dataset.id;

  try {
    await axios.patch(`http://localhost:8000/peminjaman/kembalikan/${idPeminjaman}`);
    window.location.reload();
  } catch (err) {
    console.error(err);
    alert("Gagal mengembalikan buku!");
  }
});



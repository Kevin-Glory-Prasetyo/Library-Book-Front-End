document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".nav-links");
  const profileBtn = document.getElementById("profileBtn");
  const dropdownMenu = document.getElementById("dropdownMenu");

  // Klik profil untuk buka dropdown
  profileBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    dropdownMenu.classList.toggle("show");
    profileBtn.classList.toggle("active");
  });

  // 1. Logika untuk membuka/menutup menu saat tombol di-klik
  navToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    navToggle.classList.toggle("is-open");
    mainNav.classList.toggle("is-open");
  });

  // 2. Logika untuk menutup menu saat salah satu link menu di-klik
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.classList.remove("is-open");
      mainNav.classList.remove("is-open");
    });
  });

  // 3. Logika untuk menutup menu saat meng-klik di luar area menu
  document.addEventListener("click", (event) => {
    if (
      !profileBtn.contains(event.target) &&
      dropdownMenu.classList.contains("show")
    ) {
      dropdownMenu.classList.remove("show");
      profileBtn.classList.remove("active");
    }
    if (
      mainNav.classList.contains("is-open") &&
      !mainNav.contains(event.target) &&
      !navToggle.contains(event.target)
    ) {
      navToggle.classList.remove("is-open");
      mainNav.classList.remove("is-open");
    }
  });
});

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await axios.get("http://localhost:8000/auth/checkLogin", {
      withCredentials: true,
    });

    const data = res.data;

    if (data.user.role !== "user") {
      window.location.href = "../../login.html";
      return;
    }

    if (res.status === 200) {
      const namaPengguna = document.getElementById("nama-pengguna");
      const emailPengguna = document.getElementById("email-pengguna");

      namaPengguna.textContent = `${data.user.first_name} ${data.user.last_name}`;
    } else {
      alert(data.message || "Terjadi kesalahan");
    }
  } catch (err) {
    console.error("Fetch gagal:", err);
    if (err.status === 401 || err.status === 403) {
      window.location.href = "../../login.html";
      return;
    }
  }
  loadUserProfileHeader();
});

function formatTanggal(dateStr) {
  if (!dateStr) return "-";
  const date = new Date(dateStr);
  return date.toLocaleDateString("id-ID");
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const userRes = await axios.get("http://localhost:8000/auth/checkLogin", {
      withCredentials: true,
    });
    const idUser = userRes.data.user.id;

    const res = await axios.get(
      `http://localhost:8000/peminjaman/peminjaman/${idUser}`
    );
    const data = res.data.peminjaman;

    let tableBody = document.getElementById("history-body");
    tableBody.innerHTML = "";

    if (data.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="8" class="text-center"><i>Belum ada buku yang dipinjam</i></td>
        </tr>
      `;
      return;
    }

    data.forEach((pinjam, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
            <td>${index + 1}</td>
            <td>${pinjam.judul_buku}</td>
            <td>${formatTanggal(pinjam.tanggal_pinjam)}</td>
            <td>${formatTanggal(pinjam.tanggal_kembali)}</td>
            <td>${formatTanggal(pinjam.tanggal_pengembalian)}</td>
            <td>${pinjam.status_peminjaman}</td>
            <td>${pinjam.status_pengembalian || "-"}</td>
            <td>
             ${
               pinjam.status_peminjaman === "menunggu"
                 ? `<i>Menunggu konfirmasi admin</i>`
                 : pinjam.status_peminjaman === "dipinjam"
                 ? `<i>Silahkan ambil buku di kantor</i>`
                 : pinjam.status_peminjaman === "selesai"
                 ? `<i>Buku telah dikembalikan</i>`
                 : "-"
             }
            </td>
          `;
      tableBody.appendChild(row);
    });
 
  } catch (err) {
    console.error(err);
    alert("Gagal mengambil data peminjaman!");
  }
});

// ================== LOAD DATA PROFILE UNTUK HEADER ==================
async function loadUserProfileHeader() {
  const navbarProfileName = document.getElementById("navbarProfileName");
  const navbarProfileEmail = document.getElementById("navbarProfileEmail");
  const navbarProfileImg = document.getElementById("navbarProfileImg");

  try {
    const res = await axios.get("http://localhost:8000/users/profile", {
      withCredentials: true,
    });

    const { data } = res.data; // data = user dari backend
    if (!data) return;

    if (navbarProfileName) {
      navbarProfileName.textContent =
        (data.first_name || "") + " " + (data.last_name || "");
    }
    if (navbarProfileEmail) {
      navbarProfileEmail.textContent = data.email || "";
    }

    if (data.photo && navbarProfileImg) {
      const photoUrl = `http://localhost:8000/uploads/${
        data.photo
      }?t=${Date.now()}`;
      navbarProfileImg.src = photoUrl;
    }
  } catch (err) {
    console.error("Gagal load profile header:", err);
    if (
      err.response &&
      (err.response.status === 401 || err.response.status === 403)
    ) {
      // kalau belum login, bisa redirect ke login
      window.location.href = "login.html";
    }
  }
}

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

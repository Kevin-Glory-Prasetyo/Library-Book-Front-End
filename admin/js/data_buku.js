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

async function loadDataBuku() {
  try {
    const response = await axios.get("http://localhost:8000/buku/buku", {
      withCredentials: true,
    });

    const buku = response.data.dataBuku;
    const tableBody = document.getElementById("data");
    tableBody.innerHTML = "";

    buku.forEach((bku, index) => {
      const row = document.createElement("tr");
      const total = parseInt(bku.total_stock);
      const tersedia = parseInt(bku.available_stock);
      const sisa = total - tersedia;
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${bku.judul_buku}</td>
        <td>${bku.penulis_buku}</td>
        <td>${bku.name}</td>
        <td>${bku.penerbit_buku}</td>
        <td>${bku.tahun_terbit}</td>
        <td>${bku.total_stock}</td>
        <td>${bku.available_stock}</td>
        <td>${sisa}</td>
        <td>
            <div class="d-flex justify-content-center gap-1">
                <button type="button" class="btn btn-info btn-sm detailBuku" data-id="${
                  bku.id_buku
                }">
                    <i class="bi bi-eye"></i>
                </button>
                <button type="button" class="btn btn-warning btn-sm edit editBuku" data-id="${
                  bku.id_buku
                }">
                    <i class="bi bi-pencil-square"></i>
                </button>
                <button type="button" class="btn btn-danger btn-sm delete deleteBuku" data-id="${
                  bku.id_buku
                }">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        </td>
      `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Gagal memuat data buku:", error);
  }
}

document.addEventListener("DOMContentLoaded", checkLoginUser);
document.addEventListener("DOMContentLoaded", loadDataBuku);

document.addEventListener("click", (e) => {
  const btn = e.target.closest(".detailBuku");

  if (btn) {
    const id_buku = btn.dataset.id;
    window.location.href = `detail_buku.html?id=${id_buku}`;
  }
});

document.addEventListener("click", (e) => {
  const btn = e.target.closest(".editBuku");

  if (btn) {
    const id_buku = btn.dataset.id;
    window.location.href = `form_update_buku.html?id=${id_buku}`;
  }
});

document.addEventListener("click", (e) => {
  const btn = e.target.closest(".deleteBuku");

  if (btn) {
    const id_buku = btn.dataset.id;
    const confirmDelete = confirm(
      "Apakah Anda yakin ingin menghapus buku ini?"
    );
    if (confirmDelete) {
      axios
        .delete(`http://localhost:8000/buku/delete/${id_buku}`)
        .then((res) => {

          localStorage.setItem("deleteSuccess", "true");
          location.reload();
        })
        .catch((err) => {
          console.error(err);
          alert("Gagal menghapus buku.");
        });
    }
  }
});

window.addEventListener("load", () => {
  const status = localStorage.getItem("deleteSuccess");

  if (status) {
    const alertDelete = document.getElementById("alert-delete");

    alertDelete.classList.add(
      "alert",
      "alert-danger",
      "alert-dismissible",
      "fade",
      "show"
    );
    alertDelete.setAttribute("role", "alert");

    alertDelete.innerHTML = `
      <i class="fa fa-exclamation-circle me-2"></i>
      Data Buku Berhasil Dihapus
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close">
      </button>
    `;
    
    localStorage.removeItem("deleteSuccess");
  }
});

window.addEventListener("load", () => {
  const status = localStorage.getItem("tambahSuccess");

  if (status) {
    const tambahAlert = document.getElementById("alert-tambah");

    tambahAlert.classList.add(
      "alert",
      "alert-info",
      "alert-dismissible",
      "fade",
      "show"
    );
    tambahAlert.setAttribute("role", "alert");

    tambahAlert.innerHTML = `
      <i class="fa fa-exclamation-circle me-2"></i>
      Data Buku Berhasil Ditambahkan
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close">
      </button>
    `;
    
    localStorage.removeItem("tambahSuccess");
  }
});

window.addEventListener("load", () => {
  const status = localStorage.getItem("editSuccess");

  if (status) {
    const editAlert = document.getElementById("alert-edit");

    editAlert.classList.add(
      "alert",
      "alert-warning",
      "alert-dismissible",
      "fade",
      "show"
    );
    editAlert.setAttribute("role", "alert");

    editAlert.innerHTML = `
      <i class="fa fa-exclamation-circle me-2"></i>
      Data Buku Berhasil Diupdate
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close">
      </button>
    `;
    
    localStorage.removeItem("editSuccess");
  }
});
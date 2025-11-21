// document.addEventListener("DOMContentLoaded", async () => {
//   try {
//     const res = await axios.get("http://localhost:8000/auth/checkLogin", {
//       withCredentials: true,
//     });

//     const data = res.data;

//     if (res.status === 401 || res.status === 403) {
//       window.location.href = "login.html";
//       return;
//     }

//     if (data.user.role !== "admin") {
//       window.location.href = "home.html";
//       return;
//     }

//     // Jika berhasil
//     if (res.status === 200) {
//       const namaPengguna = document.getElementById("nama-pengguna");
//       const emailPengguna = document.getElementById("email-pengguna");

//       namaPengguna.textContent = `${data.user.first_name} ${data.user.last_name}`;
//       emailPengguna.textContent = data.user.email;

//     } else {
//       alert(data.message || "Terjadi kesalahan");
//     }
//   } catch (err) {
//     console.error("Fetch gagal:", err);
//     window.location.href = "login.html";
//   }
// });

// const logoutBtn = document.getElementById("logoutBtn");

// if (logoutBtn) {
//   logoutBtn.addEventListener("click", async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post("http://localhost:8000/auth/logout", {}, {
//         withCredentials: true,
//       });

//       const data = res.data;

//       if (data.statusCode === 200) {
//         window.location.href = "login.html";
//       } else {
//         alert(data.message || "Gagal logout");
//       }
//     } catch (err) {
//       console.error("Logout gagal:", err.response?.data || err);
//       window.location.href = "login.html";
//     }
//   });
// }

document.addEventListener("DOMContentLoaded", function () {
  // ===============================
  // 1. Logika untuk Navigasi Sidebar
  // ===============================
  const navLinks = document.querySelectorAll(".sidebar nav a");
  const currentPage = window.location.pathname.split("/").pop(); // Ambil nama file halaman saat ini

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href");

    // Tambahkan class active berdasarkan halaman yang sedang dibuka
    if (linkPage === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }

    // Event klik (optional, jika kamu ingin efek langsung di SPA)
  });

  // ===============================
  // 2. Logika untuk Tombol "Tambah User"
  // ===============================
});

document.addEventListener("DOMContentLoaded", async () => {
  const tableBody = document.querySelector("tbody");

  try {
    const response = await axios.get("http://localhost:8000/buku/buku");

    const data = response.data.dataBuku;

    tableBody.innerHTML = "";

    data.forEach((buku, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
              <td>${index + 1}</td>
              <td>${buku.judul_buku}</</td>
              <td>${buku.penulis_buku}</</td>
              <td>${buku.name}</</td>
              <td>${buku.tahun_terbit}</</td>
              <td>${buku.penerbit_buku}</</td>
              <td>${buku.total_stock}</</td>
              <td>${buku.available_stock}</</td>
              <td>${buku.total_stock - buku.available_stock}</</td>
              <td class="action-btn">
                <button data-id="${buku.id_buku}" class="btn btn-info btn-sm detail"><i class="bi bi-eye"></i></button>
                <button data-id="${buku.id_buku}" class="btn btn-warning btn-sm edit"><i class="bi bi-pencil-square"></i></button>
                <button data-id="${buku.id_buku}" class="btn btn-danger btn-sm delete"><i class="bi bi-trash3-fill"></i></button>
              </td>
              
      `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Gagal mengambil data buku:", error);
  }
});

// document.addEventListener("click", async (e) => {
//   if (e.target.closest(".detail")) {
//     const id = e.target.closest(".detail").dataset.id;
//     console.log("ID buku yang diklik:", id);

//     // Lakukan fetch detail
//     try {
//       const response = await axios.get(`http://localhost:8000/buku/detailbuku/${id}`);
//       const detail = response.data;

//       console.log(detail.data);

//       // Tampilkan ke modal atau halaman baru
//     } catch (error) {
//       console.error("Gagal mengambil detail:", error);
//     }
//   }
// });

document.addEventListener("click", (e) => {
  if (e.target.closest(".detail")) {
    const id = e.target.closest(".detail").dataset.id;
    window.location.href = `detail_buku_admin.html?id=${id}`;
  }
});

document.addEventListener("click", (e) => {
  if (e.target.closest(".edit")) {
    const id = e.target.closest(".edit").dataset.id;
    window.location.href = `update_buku_admin.html?id=${id}`;
  }
});

const tableBody = document.querySelector("tbody");

tableBody.addEventListener("click", (e) => {
  const btnDelete = e.target.closest(".delete");
  if (!btnDelete) return;

  const id = btnDelete.dataset.id;
  if (!id) return;

  const confirmDelete = confirm("Apakah Anda yakin ingin menghapus buku ini?");
  if (!confirmDelete) return;

  axios.delete(`http://localhost:8000/buku/delete/${id}`)
    .then(res => {
      window.location.reload();
    })
    .catch(err => {
      console.error(err);
      alert("Gagal menghapus buku.");
    });
});

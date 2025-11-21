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
  // Ambil semua link di sidebar
  const navLinks = document.querySelectorAll(".sidebar .nav-item");

  // Dapatkan nama file dari URL saat ini (misal: dashboard_admin.html)
  const currentPage = window.location.pathname.split("/").pop();

  // Loop setiap link di sidebar
  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href").split("/").pop();

    // Jika halaman saat ini sama dengan href link → beri class 'active'
    if (linkPage === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }

    // Tambahkan event klik agar langsung aktif tanpa reload (opsional)
  });

  // Logika untuk tombol "Tambah Admin" (jika ada)
  const tambahAdminButton = document.getElementById("tambahAdminBtn");
});

async function loadAdmins() {
  try {
    const response = await axios.get("http://localhost:8000/users/admin", {
      withCredentials: true,
    });

    const admins = response.data.dataAdmin;
    tableBody.innerHTML = "";

    admins.forEach((admin, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td> <!-- nomor urut -->
        <td>${admin.first_name}</td>
        <td>${admin.last_name}</td>
        <td>${admin.email}</td>
        <td>******</td>
        <td>${admin.role}</td>
      `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Gagal memuat data admin:", error);
  }
}

const tableBody = document.querySelector("tbody");

tableBody.addEventListener("click", async (e) => {
  const btn = e.target.closest(".delete");

  if (btn) {
    const id = btn.dataset.id;

    if (!confirm("Yakin ingin menghapus admin ini?")) return;

    axios
      .delete(`http://localhost:8000/users/deleteAdmin/${id}`)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.error(err);
        alert("Gagal menghapus admin.");
      });
  }
});

tableBody.addEventListener("click", (e) => {
  if (e.target.closest(".edit")) {
    const btn = e.target.closest(".edit");
    if (btn) {
      const id = btn.dataset.id;
      window.location.href = `update_data_admin.html?id=${id}`;
    }
  }
});

document.addEventListener("DOMContentLoaded", loadAdmins);


// <td class="action-cell">
//           <button data-id="${
//             admin.id_user
//           }" class="btn btn-warning edit"><i class="bi bi-pencil-square"></i></button>
//           <button data-id="${
//             admin.id_user
//           }" class="btn btn-danger delete"><i class="bi bi-trash"></i></button>
// </td>

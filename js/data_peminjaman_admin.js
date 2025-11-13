document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await axios.get("http://localhost:8000/auth/checkLogin", {
      withCredentials: true, 
    });

    const data = res.data;


    if (res.status === 401 || res.status === 403) {
      window.location.href = "login.html";
      return;
    }

    if (data.user.role !== "admin") {
      window.location.href = "home.html";
      return;
    }

    // Jika berhasil
    if (res.status === 200) {
      const namaPengguna = document.getElementById("nama-pengguna");
      const emailPengguna = document.getElementById("email-pengguna");

      namaPengguna.textContent = `${data.user.first_name} ${data.user.last_name}`;
      emailPengguna.textContent = data.user.email;

    } else {
      alert(data.message || "Terjadi kesalahan");
    }
  } catch (err) {
    console.error("Fetch gagal:", err);
    window.location.href = "login.html";
  }
});


const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/auth/logout", {}, {
        withCredentials: true,
      });

      const data = res.data;

      if (data.statusCode === 200) {
        window.location.href = "login.html";
      } else {
        alert(data.message || "Gagal logout");
      }
    } catch (err) {
      console.error("Logout gagal:", err.response?.data || err);
      window.location.href = "login.html";
    }
  });
}

document.addEventListener("DOMContentLoaded", function() {

    // Ambil semua link di sidebar
    const navLinks = document.querySelectorAll('.sidebar .nav-item');

    // Dapatkan nama file dari URL saat ini (misal: dashboard_admin.html)
    const currentPage = window.location.pathname.split("/").pop();

    // Loop setiap link di sidebar
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split("/").pop();

        // Jika halaman saat ini sama dengan href link → beri class 'active'
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }

        // Tambahkan event klik agar langsung aktif tanpa reload (opsional)

    });

    // Logika untuk tombol "Tambah Admin" (jika ada)
    const tambahAdminButton = document.getElementById('tambahAdminBtn');

    if (tambahAdminButton) {
        tambahAdminButton.addEventListener('click', function() {
            alert('Fungsi untuk "Tambah Admin" akan dijalankan di sini!');
            // Di aplikasi nyata, ini akan membuka modal atau halaman baru
        });
    }

});

function formatTanggal(tanggal) {
  if (!tanggal) return "-";
  const date = new Date(tanggal);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}


document.addEventListener("DOMContentLoaded", async () => {
  const tableBody = document.querySelector("tbody");

  try {
    const response = await axios.get("http://localhost:8000/peminjaman/peminjaman");

    const data = response.data.peminjaman;
    
    tableBody.innerHTML = "";

    data.forEach((pinjam, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${pinjam.judul_buku}</td>
        <td>${pinjam.nama_depan + " " + pinjam.nama_belakang}</td>
        <td>${formatTanggal(pinjam.tanggal_pinjam)}</td>
        <td>${formatTanggal(pinjam.tanggal_kembali)}</td>
        <td>${formatTanggal(pinjam.tanggal_pengembalian)}</td>
        <td>${pinjam.status_peminjaman}</td>
        <td class="action-cell" style="display: flex; gap: 5px;">
          <button class="btn-edit"><i class="bi bi-pencil-square"></i></button>
          <button class="btn-hapus"><i class="bi bi-trash"></i></button>
        </td>
      `;
      tableBody.appendChild(row);
    });

  } catch (error) {
    console.error("Gagal mengambil data peminjaman:", error);
  }
});


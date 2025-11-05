
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

    // ===============================
    // 1. Logika untuk Navigasi Sidebar
    // ===============================
    const navLinks = document.querySelectorAll('.sidebar nav a');
    const currentPage = window.location.pathname.split('/').pop(); // Ambil nama file halaman saat ini

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');

        // Tambahkan class active berdasarkan halaman yang sedang dibuka
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }

        // Event klik (optional, jika kamu ingin efek langsung di SPA)

    });

    // ===============================
    // 2. Logika untuk Tombol "Tambah User"
    // ===============================
    const tambahUserButton = document.getElementById('tambahUserBtn');

    if (tambahUserButton) {
        tambahUserButton.addEventListener('click', function() {
            alert('Fungsi untuk "Tambah User" akan dijalankan di sini!');
            // Di aplikasi nyata, ini bisa membuka modal atau redirect ke form input
        });
    }

});

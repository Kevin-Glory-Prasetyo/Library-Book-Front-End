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
            alert('Fungsi untuk "Tambah Buku" akan dijalankan di sini!');
            // Di aplikasi nyata, ini bisa membuka modal atau redirect ke form input
        });
    }

});

document.addEventListener("DOMContentLoaded", function() {

    // 1. Logika untuk Navigasi Sidebar
    const navLinks = document.querySelectorAll('.sidebar nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // e.preventDefault(); // Hentikan aksi default jika ini adalah SPA

            // Hapus kelas 'active' dari semua link
            navLinks.forEach(nav => nav.classList.remove('active'));

            // Tambahkan kelas 'active' ke link yang diklik
            this.classList.add('active');
        });
    });

    // 2. Logika untuk Tombol "Tambah User"
    const tambahUserButton = document.getElementById('tambahUserBtn');

    if (tambahUserButton) {
        tambahUserButton.addEventListener('click', function() {
            alert('Fungsi untuk "Tambah User" akan dijalankan di sini!');
            // Di aplikasi nyata, ini akan membuka modal atau halaman baru
        });
    }

});
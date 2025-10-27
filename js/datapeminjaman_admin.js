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
        link.addEventListener('click', function() {
            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
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

// DOM Elements (diperbarui)
const addAdminForm = document.getElementById('addAdminForm');
const namaAwalInput = document.getElementById('namaAwal');
const namaAkhirInput = document.getElementById('namaAkhir');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
// 'tanggalBergabungInput' dihapus


// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Logika Sidebar Navigasi (Sama)
    initializeSidebarNav();
});

// Form Submit
addAdminForm.addEventListener('submit', function(e) {
    // Mencegah form submit default
    e.preventDefault(); 
    
    //
    // Validasi 'required', 'type="email"', dan 'minlength="6"'
    // sudah ditangani oleh HTML5 secara otomatis.
    // Kode ini HANYA akan berjalan jika SEMUA form SUDAH VALID.
    //

    // 1. Ambil data (diperbarui)
    const adminData = {
        namaAwal: namaAwalInput.value.trim(),
        namaAkhir: namaAkhirInput.value.trim(),
        email: emailInput.value.trim(),
        password: passwordInput.value
        // 'tanggal' dihapus
    };

    // Log data (untuk testing Anda)
    console.log('Data Admin (Sudah Valid) Ditambah:', adminData);
    
    // 2. Tampilkan pesan sukses
    alert('Data admin berhasil ditambahkan!');
    
    // 3. Redirect ke halaman dataadmin.html
    window.location.href = 'dataadmin.html';
});

// Inisialisasi Sidebar
function initializeSidebarNav() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(event) {
            
            const currentActive = document.querySelector(".nav-item.active");
            if (currentActive) {
                currentActive.classList.remove("active");
            }
            
            this.classList.add("active");

            const targetUrl = this.getAttribute('href');
            if (!targetUrl || targetUrl === '#') {
                event.preventDefault(); 
            }
        });
    });
}

// Reset Form (tidak terpakai tapi tidak masalah)
function resetForm() {
    addAdminForm.reset();
}
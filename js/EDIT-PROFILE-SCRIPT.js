// --- AWAL KODE NAVBAR ---
document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.nav-links');
    const profileBtn = document.getElementById('profileBtn');
    const dropdownMenu = document.getElementById('dropdownMenu');

    // ---- INI UNTUK DROPDOWN PROFIL (YANG HILANG) ----
    if (profileBtn) {
        profileBtn.addEventListener('click', (event) => {
            event.stopPropagation(); // Hentikan event agar tidak langsung ditutup
            dropdownMenu.classList.toggle('show');
            profileBtn.classList.toggle('active');
        });
    }

    // ---- INI UNTUK MOBILE MENU (HAMBURGER) ----
    if (navToggle) {
        navToggle.addEventListener('click', (event) => {
            event.stopPropagation();
            navToggle.classList.toggle('is-open');
            mainNav.classList.toggle('is-open');
        });
    }

    // ---- LOGIKA UNTUK MENUTUP MENU SAAT KLIK DI LUAR ----
    document.addEventListener('click', (event) => {
        
        // Tutup dropdown profil jika klik di luar
        if (dropdownMenu && profileBtn && !profileBtn.contains(event.target) && dropdownMenu.classList.contains('show'))  {
            dropdownMenu.classList.remove('show');
            profileBtn.classList.remove('active');
        }

        // Tutup mobile nav jika klik di luar
        if (mainNav && navToggle && mainNav.classList.contains('is-open') &&
            !mainNav.contains(event.target) &&
            !navToggle.contains(event.target)) {
            navToggle.classList.remove('is-open');
            mainNav.classList.remove('is-open');
        }
    });
});
// --- AKHIR KODE NAVBAR ---


// Change Profile Picture
document.getElementById('profileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    
    if (file) {
        // Validasi tipe file
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        if (!validTypes.includes(file.type)) {
            alert('Hanya file JPG, JPEG, atau PNG yang diperbolehkan!');
            return;
        }
        
        // Validasi ukuran file (maksimal 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            alert('Ukuran file terlalu besar! Maksimal 5MB.');
            return;
        }
        
        // Preview gambar
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('profilePicture').src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Update Profile Form Handler
document.querySelector('.btn-update').addEventListener('click', function(e) {
    e.preventDefault();
    
    const namaAwal = document.getElementById('namaAwal').value;
    const email = document.getElementById('email').value;
    const noHp = document.getElementById('noHp').value;
    const jenisKelamin = document.getElementById('jenisKelamin').value;
    
    // Validasi form
    if (!namaAwal || !email || !noHp || !jenisKelamin) {
        alert('Semua field harus diisi!');
        return;
    }
    
    // Validasi email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Format email tidak valid!');
        return;
    }
    
    // Validasi nomor HP
    const phoneRegex = /^[0-9]{10,13}$/; // Asumsi 10-13 digit angka
    if (!phoneRegex.test(noHp)) {
        alert('Nomor HP harus berisi 10-13 digit angka!');
        return;
    }
    
    // Jika semua validasi berhasil
    alert('Profile berhasil diupdate!');
    console.log({
        namaAwal,
        email,
        noHp,
        jenisKelamin
    });
    
    // Di sini bisa ditambahkan kode untuk mengirim data ke server
    // Contoh: fetch('/api/update-profile', { method: 'POST', body: JSON.stringify(data) })
});
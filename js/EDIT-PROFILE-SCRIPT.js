// Mobile menu toggle
function toggleMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const hamburger = document.querySelector('.hamburger');
    
    mobileMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Close mobile menu when clicking on a menu item
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', function() {
        const mobileMenu = document.getElementById('mobileMenu');
        const hamburger = document.querySelector('.hamburger');
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const mobileMenu = document.getElementById('mobileMenu');
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');
    
    // Check if the click is outside the navbar and mobile menu is active
    if (mobileMenu.classList.contains('active') && 
        !navbar.contains(event.target) && 
        !hamburger.contains(event.target)) { // Tambahkan pengecekan hamburger juga
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});


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
// Slider functionality
const slider = document.getElementById('slider');
const slideLeft = document.getElementById('slideLeft');
const slideRight = document.getElementById('slideRight');

if (slideLeft && slideRight) {
    slideLeft.addEventListener('click', () => {
        slider.scrollBy({ left: -200, behavior: 'smooth' });
    });

    slideRight.addEventListener('click', () => {
        slider.scrollBy({ left: 200, behavior: 'smooth' });
    });
}

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


// === BAGIAN BARU UNTUK PROFILE DROPDOWN ===
const profileToggle = document.getElementById('profileToggle');
const profileDropdown = document.getElementById('profileDropdown');

if (profileToggle && profileDropdown) {
    profileToggle.addEventListener('click', function(event) {
        // Menghentikan event agar tidak langsung ditangkap oleh 'document'
        event.stopPropagation(); 
        
        profileDropdown.classList.toggle('active');
        profileToggle.classList.toggle('active'); // Untuk memutar panah via CSS
    });
}
// === AKHIR BAGIAN BARU ===


// === EVENT LISTENER 'CLICK OUTSIDE' DIPERBARUI ===
// Menutup mobile menu DAN profile dropdown saat klik di luar
document.addEventListener('click', function(event) {
    const mobileMenu = document.getElementById('mobileMenu');
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');
    
    // Logika untuk menutup Mobile Menu (sudah ada)
    if (mobileMenu && mobileMenu.classList.contains('active') && 
        !navbar.contains(event.target)) {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }

    // Logika baru untuk menutup Profile Dropdown
    if (profileDropdown && profileDropdown.classList.contains('active')) {
        const profileContainer = document.querySelector('.navbar-profile-container');
        // Cek apakah klik terjadi di luar container profile
        if (!profileContainer.contains(event.target)) {
            profileDropdown.classList.remove('active');
            profileToggle.classList.remove('active');
        }
    }
});
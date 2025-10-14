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

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const mobileMenu = document.getElementById('mobileMenu');
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');
    
    if (mobileMenu.classList.contains('active') && 
        !navbar.contains(event.target)) {
        mobileMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});
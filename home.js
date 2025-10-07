document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.nav-links');

  // 1. Logika untuk membuka/menutup menu saat tombol di-klik
  navToggle.addEventListener('click', (event) => {
    event.stopPropagation();
    navToggle.classList.toggle('is-open');
    mainNav.classList.toggle('is-open');
  });

  // 2. Logika untuk menutup menu saat salah satu link menu di-klik
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('is-open');
      mainNav.classList.remove('is-open');
    });
  });

  // 3. Logika untuk menutup menu saat meng-klik di luar area menu
  document.addEventListener('click', (event) => {
    if (mainNav.classList.contains('is-open') &&
        !mainNav.contains(event.target) &&
        !navToggle.contains(event.target)) {
      navToggle.classList.remove('is-open');
      mainNav.classList.remove('is-open');
    }
  });
});


// Scroll Coming Soon books
const bookSlider = document.getElementById("bookSlider");
const leftBtn = document.querySelector(".nav-btn.left");
const rightBtn = document.querySelector(".nav-btn.right");

leftBtn.addEventListener("click", () => {
  bookSlider.scrollBy({ left: -300, behavior: 'smooth' });
});

rightBtn.addEventListener("click", () => {
  bookSlider.scrollBy({ left: 300, behavior: 'smooth' });
});

document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.nav-links');

  // 1. Logika untuk membuka/menutup menu saat tombol di-klik
  navToggle.addEventListener('click', (event) => {
    event.stopPropagation();
    navToggle.classList.toggle('is-open');
    mainNav.classList.toggle('is-open');
  });

  // 2. Logika untuk menutup menu saat salah satu link menu di-klik
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('is-open');
      mainNav.classList.remove('is-open');
    });
  });

  // 3. Logika untuk menutup menu saat meng-klik di luar area menu
  document.addEventListener('click', (event) => {
    if (mainNav.classList.contains('is-open') &&
        !mainNav.contains(event.target) &&
        !navToggle.contains(event.target)) {
      navToggle.classList.remove('is-open');
      mainNav.classList.remove('is-open');
    }
  });
});
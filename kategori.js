
// Ambil semua slider kategori
document.querySelectorAll(".book-slider").forEach(slider => {
  const container = slider.querySelector(".book-container");
  const btnLeft = slider.querySelector(".scroll-btn.left");
  const btnRight = slider.querySelector(".scroll-btn.right");

  btnLeft.addEventListener("click", () => {
    container.scrollBy({
      left: -300,
      behavior: "smooth"
    });
  });

  btnRight.addEventListener("click", () => {
    container.scrollBy({
      left: 300,
      behavior: "smooth"
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.nav-links');
  const profileBtn = document.getElementById('profileBtn');
  const dropdownMenu = document.getElementById('dropdownMenu');


  // Klik profil untuk buka dropdown
  profileBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    dropdownMenu.classList.toggle('show');
    profileBtn.classList.toggle('active');
  });

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
    if (!profileBtn.contains(event.target) && dropdownMenu.classList.contains('show'))  {
      dropdownMenu.classList.remove('show');
      profileBtn.classList.remove('active');
    }
    if (mainNav.classList.contains('is-open') &&
        !mainNav.contains(event.target) &&
        !navToggle.contains(event.target)) {
      navToggle.classList.remove('is-open');
      mainNav.classList.remove('is-open');
    }
  });
});
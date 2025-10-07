// // Fungsi scroll horizontal untuk container buku
// function scrollBooks(direction) {
//   const container = document.getElementById("bookContainer");
//   const scrollAmount = container.clientWidth * 0.9; // geser 90% lebar container
//   container.scrollBy({
//     left: direction * scrollAmount,
//     behavior: "smooth"
//   });
// }

// // Event tombol panah kiri dan kanan
// document.getElementById("scrollLeft").addEventListener("click", () => scrollBooks(-1));
// document.getElementById("scrollRight").addEventListener("click", () => scrollBooks(1));

// // Klik profil menuju halaman profil
// document.getElementById("profileBtn").addEventListener("click", () => {
//   window.location.href = "profile.html";
// });


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
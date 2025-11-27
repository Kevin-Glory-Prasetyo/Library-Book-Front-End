document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:8000/buku/buku")
    .then((res) => {
      const books = res.data.dataBuku;

      // render tiap kategori
      renderBooksByCategory(1, books); // Teknologi
      renderBooksByCategory(2, books); // Novel
      renderBooksByCategory(3, books); // Pendidikan
      renderBooksByCategory(4, books); // Bisnis
      renderBooksByCategory(5, books); // Sejarah
    })
    .catch((err) => console.error("Error ambil data:", err));
});

function renderBooksByCategory(categoryId, books) {
  const container = document.getElementById(`kategori-${categoryId}`);
  const filtered = books.filter(book => book.id_kategori === categoryId);

  if (!filtered.length) {
    container.innerHTML = `
  <div class="no-books">
      <div class="no-books-icon">📚</div>
      <h2 class="no-books-text">Belum ada buku pada kategori ini.</h2>
  </div>
`;
    return;
  }

  container.innerHTML = "";

  filtered.forEach(book => {
    const imgURL = `http://localhost:8000${book.gambar_buku}`;

    container.innerHTML += `
      <div class="book-card">
        <img src="${imgURL}" alt="${book.judul_buku}">
        <h4>${book.judul_buku}</h4>
        <a class="pinjam-btn" href="detail_buku.html?id=${book.id_buku}">
          Pinjam
        </a>
      </div>
    `;
  });
}




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
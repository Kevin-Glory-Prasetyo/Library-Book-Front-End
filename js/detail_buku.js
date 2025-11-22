// Slider functionality
const slider = document.getElementById("slider");
const slideLeft = document.getElementById("slideLeft");
const slideRight = document.getElementById("slideRight");

if (slideLeft && slideRight) {
  slideLeft.addEventListener("click", () => {
    slider.scrollBy({ left: -200, behavior: "smooth" });
  });

  slideRight.addEventListener("click", () => {
    slider.scrollBy({ left: 200, behavior: "smooth" });
  });
}

// Mobile menu toggle
function toggleMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  const hamburger = document.querySelector(".hamburger");

  mobileMenu.classList.toggle("active");
  hamburger.classList.toggle("active");
}

// Close mobile menu when clicking on a menu item
document.querySelectorAll(".mobile-menu a").forEach((link) => {
  link.addEventListener("click", function () {
    const mobileMenu = document.getElementById("mobileMenu");
    const hamburger = document.querySelector(".hamburger");
    mobileMenu.classList.remove("active");
    hamburger.classList.remove("active");
  });
});

// === BAGIAN BARU UNTUK PROFILE DROPDOWN ===
const profileToggle = document.getElementById("profileToggle");
const profileDropdown = document.getElementById("profileDropdown");

if (profileToggle && profileDropdown) {
  profileToggle.addEventListener("click", function (event) {
    // Menghentikan event agar tidak langsung ditangkap oleh 'document'
    event.stopPropagation();

    profileDropdown.classList.toggle("active");
    profileToggle.classList.toggle("active"); // Untuk memutar panah via CSS
  });
}
// === AKHIR BAGIAN BARU ===

// === EVENT LISTENER 'CLICK OUTSIDE' DIPERBARUI ===
// Menutup mobile menu DAN profile dropdown saat klik di luar
document.addEventListener("click", function (event) {
  const mobileMenu = document.getElementById("mobileMenu");
  const hamburger = document.querySelector(".hamburger");
  const navbar = document.querySelector(".navbar");

  // Logika untuk menutup Mobile Menu (sudah ada)
  if (
    mobileMenu &&
    mobileMenu.classList.contains("active") &&
    !navbar.contains(event.target)
  ) {
    mobileMenu.classList.remove("active");
    hamburger.classList.remove("active");
  }

  // Logika baru untuk menutup Profile Dropdown
  if (profileDropdown && profileDropdown.classList.contains("active")) {
    const profileContainer = document.querySelector(
      ".navbar-profile-container"
    );
    // Cek apakah klik terjadi di luar container profile
    if (!profileContainer.contains(event.target)) {
      profileDropdown.classList.remove("active");
      profileToggle.classList.remove("active");
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  axios
    .get(`http://localhost:8000/buku/detailbuku/${id}`)
    .then((res) => {
      const book = res.data.data;
      const detail = document.getElementById("detail");
      const judul = document.getElementById("judul_buku");
      const penulis = document.getElementById("penulis_buku");
      const kategori = document.getElementById("kategori_buku");
      const deskripsi = document.getElementById("deskripsi_buku");
      const stok = document.getElementById("stok");
      const dipinjam = document.getElementById("dipinjam");
      const ajukan = document.getElementById("ajukan");

      let pinjam = parseInt(book.total_stock) - parseInt(book.available_stock);

      detail.src = `http://localhost:8000${book.gambar_buku}`;
      detail.alt = `${book.judul_buku}`;

      judul.innerHTML = `${book.judul_buku}`;
      penulis.innerHTML = `By ${book.penulis_buku}`;
      kategori.innerHTML = `${book.name}`;
      deskripsi.innerHTML = `${book.deskripsi_buku}`;
      stok.innerHTML = `Stok Tersedia: ${book.available_stock}`;
      dipinjam.innerHTML = `Dipinjam: ${pinjam}`;

      if (book.available_stock === 0) {
        ajukan.disabled = true;
        ajukan.style.cursor = "not-allowed";
        ajukan.innerHTML = "Stok Kosong";
      } else {
        ajukan.addEventListener("click", () => {
          window.location.href = `detail_peminjaman_user.html?id=${book.id_buku}`;
        });
      }
    })
    .catch((err) => {
      console.error(err);
    });
});

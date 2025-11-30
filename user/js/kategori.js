// ================== SLIDER SCROLL (untuk element yang dibuat dinamis) ==================
function initSliders() {
  document.querySelectorAll(".book-slider").forEach((slider) => {
    const container = slider.querySelector(".book-container");
    const btnLeft = slider.querySelector(".scroll-btn.left");
    const btnRight = slider.querySelector(".scroll-btn.right");

    if (!container || !btnLeft || !btnRight) return;

    btnLeft.addEventListener("click", () => {
      container.scrollBy({ left: -300, behavior: "smooth" });
    });

    btnRight.addEventListener("click", () => {
      container.scrollBy({ left: 300, behavior: "smooth" });
    });
  });
}

// ================== NAVBAR & DROPDOWN ==================
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".nav-links");
  const profileBtn = document.getElementById("profileBtn");
  const dropdownMenu = document.getElementById("dropdownMenu");
  const logoutBtn = document.getElementById("logoutBtn");

  // Dropdown profil
  if (profileBtn && dropdownMenu) {
    profileBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      dropdownMenu.classList.toggle("show");
      profileBtn.classList.toggle("active");
    });
  }

  // Hamburger menu
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", (event) => {
      event.stopPropagation();
      navToggle.classList.toggle("is-open");
      mainNav.classList.toggle("is-open");
    });
  }

  // Tutup menu saat link diklik
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      if (navToggle && mainNav) {
        navToggle.classList.remove("is-open");
        mainNav.classList.remove("is-open");
      }
    });
  });

  // Tutup dropdown & menu saat klik di luar
  document.addEventListener("click", (event) => {
    if (
      profileBtn &&
      dropdownMenu &&
      !profileBtn.contains(event.target) &&
      dropdownMenu.classList.contains("show")
    ) {
      dropdownMenu.classList.remove("show");
      profileBtn.classList.remove("active");
    }

    if (
      mainNav &&
      navToggle &&
      mainNav.classList.contains("is-open") &&
      !mainNav.contains(event.target) &&
      !navToggle.contains(event.target)
    ) {
      navToggle.classList.remove("is-open");
      mainNav.classList.remove("is-open");
    }
  });

  // Logout
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      try {
        await axios.post(
          "http://localhost:8000/auth/logout",
          {},
          { withCredentials: true }
        );
        window.location.href = "../../login.html";
      } catch (err) {
        console.error(err);
        alert("Gagal logout");
      }
    });
  }

  // Load profile untuk header
  loadUserProfileHeader();

  // Load kategori + buku
  loadKategoriDanBuku();
});

// ================== LOAD DATA PROFILE UNTUK HEADER ==================
async function loadUserProfileHeader() {
  const navbarProfileName = document.getElementById("navbarProfileName");
  const navbarProfileEmail = document.getElementById("navbarProfileEmail");
  const navbarProfileImg = document.getElementById("navbarProfileImg");

  try {
    const res = await axios.get("http://localhost:8000/users/profile", {
      withCredentials: true,
    });

    const { data } = res.data; // data = user dari backend
    if (!data) return;

    if (navbarProfileName) {
      navbarProfileName.textContent =
        (data.first_name || "") + " " + (data.last_name || "");
    }
    if (navbarProfileEmail) {
      navbarProfileEmail.textContent = data.email || "";
    }

    if (data.photo && navbarProfileImg) {
      const photoUrl = `http://localhost:8000/uploads/${
        data.photo
      }?t=${Date.now()}`;
      navbarProfileImg.src = photoUrl;
    }
  } catch (err) {
    console.error("Gagal load profile header:", err);
    if (
      err.response &&
      (err.response.status === 401 || err.response.status === 403)
    ) {
      window.location.href = "../../login.html";
    }
  }
}

// ================== LOAD KATEGORI & BUKU DARI BACKEND ==================
async function loadKategoriDanBuku() {
  const container = document.getElementById("categoriesContainer");
  if (!container) return;

  container.innerHTML = "<p>Loading kategori...</p>";

  try {
    // 1. Ambil semua kategori
    const kategoriRes = await axios.get("http://localhost:8000/buku/kategori", {
      withCredentials: true,
    });

    const { kategori } = kategoriRes.data; // dari controller kategoriBuku
    if (!kategori || kategori.length === 0) {
      container.innerHTML = "<p>Tidak ada kategori.</p>";
      return;
    }

    // Kosongkan container dulu
    container.innerHTML = "";

    // 2. Untuk setiap kategori, ambil buku2-nya
    for (const k of kategori) {
      // Buat section kategori
      const section = document.createElement("section");
      section.classList.add("category");

      section.innerHTML = `
        <h2>${k.name}</h2>
        <div class="book-slider">
          <button class="scroll-btn left">&#10094;</button>
          <div class="book-container"></div>
          <button class="scroll-btn right">&#10095;</button>
        </div>
      `;

      container.appendChild(section);

      const bookContainer = section.querySelector(".book-container");

      // Ambil buku per kategori
      const bukuRes = await axios.get(
        `http://localhost:8000/buku/kategori/${k.id_kategori}`,
        { withCredentials: true }
      );

      const { data } = bukuRes.data; // array buku
      if (!data || data.length === 0) {
        bookContainer.innerHTML ="<p style='padding: 1rem; text-align:center;'>Belum ada buku di kategori ini.</p>";
        bookContainer.style.display = "flex";
        bookContainer.style.justifyContent = "center";
        bookContainer.style.alignItems = "center";

        continue;
      }

      // 3. Buat card untuk setiap buku
      data.forEach((buku) => {
        const card = document.createElement("div");
        card.classList.add("book-card");

        const imgSrc = `http://localhost:8000${buku.gambar_buku}`;

        card.innerHTML = `
          <img src="${imgSrc}" alt="${buku.judul_buku}">
          <h4>${buku.judul_buku}</h4>
          <p>${k.name}</p>
          <button class="pinjam-btn pinjam" data-id="${buku.id_buku}">Pinjam</button>
        `;

        bookContainer.appendChild(card);
      });
    }

    // Setelah semua section dibuat, aktifkan slider
    initSliders();
  } catch (err) {
    console.error("Gagal load kategori & buku:", err);
    container.innerHTML = "<p>Terjadi kesalahan saat memuat data kategori.</p>";
  }
}

document.addEventListener("click", function (e) {
  const btn = e.target.closest(".pinjam");
  if (!btn) return;

  const idBuku = btn.dataset.id;

  window.location.href = `detail_buku.html?id=${idBuku}`;
});

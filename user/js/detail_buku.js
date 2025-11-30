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

document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".nav-links");
  const profileBtn = document.getElementById("profileBtn");
  const dropdownMenu = document.getElementById("dropdownMenu");

  // Klik profil untuk buka dropdown
  profileBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    dropdownMenu.classList.toggle("show");
    profileBtn.classList.toggle("active");
  });

  // 1. Logika untuk membuka/menutup menu saat tombol di-klik
  navToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    navToggle.classList.toggle("is-open");
    mainNav.classList.toggle("is-open");
  });

  // 2. Logika untuk menutup menu saat salah satu link menu di-klik
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.classList.remove("is-open");
      mainNav.classList.remove("is-open");
    });
  });

  // 3. Logika untuk menutup menu saat meng-klik di luar area menu
  document.addEventListener("click", (event) => {
    if (
      !profileBtn.contains(event.target) &&
      dropdownMenu.classList.contains("show")
    ) {
      dropdownMenu.classList.remove("show");
      profileBtn.classList.remove("active");
    }
    if (
      mainNav.classList.contains("is-open") &&
      !mainNav.contains(event.target) &&
      !navToggle.contains(event.target)
    ) {
      navToggle.classList.remove("is-open");
      mainNav.classList.remove("is-open");
    }
  });
});

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await axios.get("http://localhost:8000/auth/checkLogin", {
      withCredentials: true,
    });

    const data = res.data;

    if (data.user.role !== "user") {
      window.location.href = "../../login.html";
      return;
    }

    if (res.status === 200) {
      const namaPengguna = document.getElementById("nama-pengguna");

      namaPengguna.textContent = `${data.user.first_name} ${data.user.last_name}`;
      
    } else {
      alert(data.message || "Terjadi kesalahan");
    }
  } catch (err) {
    console.error("Fetch gagal:", err);
    if (err.status === 401 || err.status === 403) {
      window.location.href = "../../login.html";
      return;
    }
  }
});

// });

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const idBuku = params.get("id");

  axios
    .get("http://localhost:8000/auth/checkLogin", { withCredentials: true })
    .then((resUser) => {
      const userId = resUser.data.user.id;

      return axios
        .get(`http://localhost:8000/buku/detailbuku/${idBuku}`)
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

          // BOOSTRAP ICON PINJAM
          const starIcon = document.querySelector(".bi-star-fill");

          const pinjam =
            parseInt(book.total_stock) - parseInt(book.available_stock);

          detail.src = `http://localhost:8000${book.gambar_buku}`;
          detail.alt = book.judul_buku;

          judul.innerHTML = book.judul_buku;
          penulis.innerHTML = `By ${book.penulis_buku}`;
          kategori.innerHTML = book.name;
          deskripsi.innerHTML = book.deskripsi_buku;
          stok.innerHTML = `Stok Tersedia: ${book.available_stock}`;
          dipinjam.innerHTML = `Dipinjam: ${pinjam}`;

          // --- LOGIKA BARU: CEK STATUS FAVORIT ---
          checkFavoriteStatus(userId, idBuku, starIcon);

          // --- LOGIKA BARU: KLIK BINTANG ---
          starIcon.addEventListener("click", () => {
            toggleFavorite(userId, idBuku, starIcon);
          });

          if (book.available_stock === 0) {
            ajukan.disabled = true;
            ajukan.style.cursor = "not-allowed";
            ajukan.innerHTML = "Stok Kosong";
          } else {
            // Cek apakah user sudah pinjam buku ini
            axios
              .get(`http://localhost:8000/peminjaman/peminjaman`)
              .then((res) => {
                const peminjaman = res.data.peminjaman;
                const id_user = userId;
                const id_buku = book.id_buku;

                const sudahPinjam = peminjaman.some(
                  (item) =>
                    item.id_user === id_user &&
                    item.id_buku === id_buku &&
                    (item.status_peminjaman === "menunggu" ||
                      item.status_peminjaman === "dipinjam")
                );
                if (sudahPinjam) {
                  ajukan.disabled = true;
                  ajukan.style.cursor = "not-allowed";
                  ajukan.innerHTML = "Anda Sudah Pinjam ";
                } else {
                  ajukan.addEventListener("click", () => {
                    window.location.href = `detail_peminjaman_user.html?id=${book.id_buku}`;
                  });
                }
              });
          }
        });
    })
    .catch((err) => console.error(err));
  loadUserProfileHeader();
});

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

    // === DI SINI NAMA DEPAN, BELAKANG, EMAIL DIUBAH ===
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

document.addEventListener("DOMContentLoaded", async function () {
  try {
    const params = new URLSearchParams(window.location.search);
    const idBuku = params.get("id");

    const slider = document.getElementById("slider");

    const resDetail = await axios.get(`http://localhost:8000/buku/detailbuku/${idBuku}`);
    const detail = resDetail.data.data;

    const idKategori = detail.id_kategori;

    const resKategori = await axios.get(`http://localhost:8000/buku/kategori/${idKategori}`);
    const books = resKategori.data.data;

    const filteredBooks = books.filter(book => 
    Number(book.id_buku) !== Number(idBuku) &&
    Number(book.total_stock) > 0
);

    filteredBooks.forEach(book => {
      const card = document.createElement("div");
      card.classList.add("book-card");

      const img = document.createElement("img");
      img.src = `http://localhost:8000${book.gambar_buku}`;
      img.alt = book.judul_buku;

      const p = document.createElement("p");
      p.textContent = book.judul_buku;

      card.appendChild(img);
      card.appendChild(p);


      slider.appendChild(card);
    });

  } catch (err) {
    console.error("Gagal mengambil data:", err);
  }
});

// === FUNGSI TAMBAHAN UNTUK FAVORIT ===

// Cek warna bintang saat loading
async function checkFavoriteStatus(userId, bookId, iconElement) {
  try {
    const res = await axios.get(`http://localhost:8000/favorit/check/${userId}/${bookId}`);
    if (res.data.isFavorite) {
      iconElement.style.color = "yellow"; // Jika favorit, kuning
    } else {
      iconElement.style.color = "grey"; // Jika tidak, abu-abu
    }
  } catch (error) {
    console.error("Gagal cek favorit", error);
  }
}

// Klik Bintang (Tambah/Hapus)
async function toggleFavorite(userId, bookId, iconElement) {
  const currentColor = iconElement.style.color;
  
  try {
    if (currentColor === "yellow") {
      // Hapus dari favorit
      await axios.delete("http://localhost:8000/favorit/remove", {
        data: { id_user: userId, id_buku: bookId } // Kirim data di body delete
      });
      iconElement.style.color = "grey";
      alert("Dihapus dari favorit");
    } else {
      // Tambah ke favorit
      await axios.post("http://localhost:8000/favorit/add", {
        id_user: userId,
        id_buku: bookId
      });
      iconElement.style.color = "yellow";
      alert("Ditambahkan ke favorit");
    }
  } catch (error) {
    console.error("Gagal toggle favorit", error);
    alert("Terjadi kesalahan sistem");
  }
}

const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      if (res.data.statusCode === 200) {
        window.location.href = "../../login.html";
      } else {
        alert(res.data.message || "Gagal logout");
      }
    } catch (err) {
      console.error("Logout gagal:", err.response?.data || err);
      window.location.href = "../../login.html";
    }
  });
}


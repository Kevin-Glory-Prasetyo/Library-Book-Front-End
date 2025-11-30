document.addEventListener("DOMContentLoaded", async () => {

  try {
    const res = await axios.get("http://localhost:8000/auth/checkLogin", {
      withCredentials: true
    });

    const data = res.data;

    if (data.user.role !== "user") {
      window.location.href = "../../login.html";
      return;
    }

    if (res.status === 200) {

      const namaPengguna = document.getElementById("nama-pengguna");

      namaPengguna.textContent = `${data.user.first_name} ${data.user.last_name}`;

    } else{
      alert(data.message || "Terjadi kesalahan");
    }

  } catch (err) {
    console.error("Fetch gagal:", err);
    if (err.status === 401 || err.status === 403) {
      window.location.href = "../../login.html";
      return;
    }
  }
   loadUserProfileHeader();
});

// Logout
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

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("bookDisplay");

  axios
    .get("http://localhost:8000/buku/buku")
    .then((res) => {
      const books = res.data.dataBuku; 

      const gtbook = books.filter(book => book.total_stock > 1);

      container.innerHTML = ""; 

      gtbook.slice(0, 4).forEach((book) => {
        const img = document.createElement("img");

        img.src = `http://localhost:8000${book.gambar_buku}`;
        img.alt = book.judul_buku;
        img.style.cursor = "pointer";

        img.addEventListener("click", () => {
          window.location.href = `detail_buku.html?id=${ book.id_buku}`
        });

        container.appendChild(img);
      });
    })
    .catch((err) => {
      console.error("Gagal mengambil data buku:", err);
    });
});

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("topBooks");

  try {
    const res = await axios.get("http://localhost:8000/peminjaman/peminjaman");
    const peminjaman = res.data.peminjaman;

    const countMap = {};
    peminjaman.forEach(p => {
      countMap[p.id_buku] = (countMap[p.id_buku] || 0) + 1;
    });

    const sorted = Object.entries(countMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    for (const [id_buku] of sorted) {
      const detailRes = await axios.get(`http://localhost:8000/buku/detailbuku/${id_buku}`);
      const book = detailRes.data.data;

      const bookDiv = document.createElement("div");
      bookDiv.classList.add("book");

      const img = document.createElement("img");
      img.src = `http://localhost:8000${book.gambar_buku}`;
      img.alt = book.judul_buku;
      img.style.cursor = "pointer";

      img.addEventListener("click", () => {
        window.location.href = `detail_buku.html?id=${book.id_buku}`;
      });

      const title = document.createElement("p");
      title.textContent = book.judul_buku;

      bookDiv.appendChild(img);
      bookDiv.appendChild(title);
      container.appendChild(bookDiv);
    }
  } catch (err) {
    console.error("Gagal mengambil data:", err);
  }
});


document.addEventListener("DOMContentLoaded", () => {

  axios
    .get("http://localhost:8000/buku/commingsoon")
    .then((res) => {
      const books = res.data.comming;
      console.log(books)
      const container = document.getElementById("bookSlider");

      container.innerHTML = "";

      books.forEach((book) => {

        const card = document.createElement("div");
        card.classList.add("book-card");

        const img = document.createElement("img");
        img.src = `http://localhost:8000${book.gambar_buku}`;
        img.alt = book.judul_buku;

        const title = document.createElement("h3");
        title.textContent = book.judul_buku;

        card.appendChild(img);
        card.appendChild(title);

        container.appendChild(card);
      });

    })
    .catch((err) => {
      console.error("Error:", err);
    });

});


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

// Scroll Coming Soon books
const bookSlider = document.getElementById("bookSlider");
const leftBtn = document.querySelector(".nav-btn.left");
const rightBtn = document.querySelector(".nav-btn.right");

leftBtn.addEventListener("click", () => {
  bookSlider.scrollBy({ left: -300, behavior: "smooth" });
});

rightBtn.addEventListener("click", () => {
  bookSlider.scrollBy({ left: 300, behavior: "smooth" });
});

document.addEventListener("DOMContentLoaded", () => {
  // Tombol lihat sekarang
  const seeNowBtn = document.getElementById("seeNowBtn");

  if (seeNowBtn) {
    seeNowBtn.addEventListener("click", () => {
      console.log("Tombol Lihat Sekarang diklik!"); // Debug
      window.location.href = "/Library-Book-Front-End/html/kategori.html";
    });
  } else {
    console.warn("Tombol #seeNowBtn tidak ditemukan di halaman ini.");
  }
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
      const photoUrl = `http://localhost:8000/uploads/${data.photo}?t=${Date.now()}`;
      navbarProfileImg.src = photoUrl;
    }
  } catch (err) {
    console.error("Gagal load profile header:", err);
    if (err.response && (err.response.status === 401 || err.response.status === 403)) {
      // kalau belum login, bisa redirect ke login
      window.location.href = "login.html";
    }
  }
}

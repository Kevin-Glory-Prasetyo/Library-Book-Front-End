// document.addEventListener("DOMContentLoaded", async () => {

//   try {
//     const res = await axios.get("http://localhost:5000/auth/checkLogin", {
//       withCredentials: true
//     });

//     const data = res.data;

//     if (res.status === 401 || res.status === 403) {
//       window.location.href = "login.html";
//       return;
//     }

//     if (data.user.role !== "user") {
//       window.location.href = "dashboard_admin.html";
//       return;
//     }

//     if (res.status === 200) {
      
//       const namaPengguna = document.getElementById("nama-pengguna");
//       const emailPengguna = document.getElementById("email-pengguna");
  
//       namaPengguna.textContent = `${data.user.first_name} ${data.user.last_name}`;
//       emailPengguna.textContent = data.user.email;
//     } else{
//       alert(data.message || "Terjadi kesalahan");
//     }


//   } catch (err) {
//     console.error("Fetch gagal:", err);
//     window.location.href = "login.html";
//   }
// });

// Logout
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/logout", {}, {
        withCredentials: true,
      });
      if (res.data.statusCode === 200) {
        window.location.href = "login.html";
      } else {
        alert(res.data.message || "Gagal logout");
      }
    } catch (err) {
      console.error("Logout gagal:", err.response?.data || err);
      window.location.href = "login.html";
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("bookDisplay");

  axios.get("http://localhost:8000/buku/buku")
    .then(res => {
      const books = res.data.dataBuku; // sesuaikan dengan struktur API kamu

      console.log(books)

      container.innerHTML = ""; // bersihkan container

      books.slice(0, 4).forEach(book => {
        const img = document.createElement("img");

        // lokasi gambar sesuai backend
        img.src = `http://localhost:8000${book.gambar_buku}`;
        img.alt = book.judul_buku;

        container.appendChild(img);
      });
    })
    .catch(err => {
      console.error("Gagal mengambil data buku:", err);
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("topBooks");

  axios.get("http://localhost:8000/buku/topPeminjam") // ganti endpoint sesuai API-mu
    .then(res => {
      const books = res.data.data; 
      console.log(books)
  

      books.forEach(book => {
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");

        
        const img = document.createElement("img");
        img.src = `http://localhost:8000${book.gambar_buku}`;
        img.alt = book.judul_buku;

        const title = document.createElement("p");
        title.textContent = book.judul_buku;

        bookDiv.appendChild(img);
        bookDiv.appendChild(title);


        container.appendChild(bookDiv);
      });
    })
    .catch(err => {
      console.error("Gagal mengambil data buku:", err);
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








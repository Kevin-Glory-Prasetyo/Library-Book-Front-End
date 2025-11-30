document.addEventListener("DOMContentLoaded", async () => {
  let userId = null;

  // 1. Cek Login & Ambil Info User
  try {
    const res = await axios.get("http://localhost:8000/auth/checkLogin", {
      withCredentials: true,
    });

    const data = res.data;

    if (data.user.role !== "user") {
      window.location.href = "../../login.html"; // Sesuaikan path jika perlu
      return;
    }

    if (res.status === 200) {
      userId = data.user.id; // Simpan ID User
      
      // Load Header Profile
      loadUserProfileHeader();
      
      // Load Data Favorit
      loadFavorites(userId);
    }
  } catch (err) {
    console.error("Fetch gagal:", err);
    window.location.href = "../../login.html"; // Redirect jika tidak login
  }
});

// --- FUNGSI LOAD FAVORIT ---
async function loadFavorites(idUser) {
  const favGrid = document.getElementById("favoriteBooks");
  favGrid.innerHTML = '<p style="text-align:center; width:100%;">Loading favorites...</p>';

  try {
    const response = await axios.get(`http://localhost:8000/favorit/list/${idUser}`);
    const books = response.data.data;

    favGrid.innerHTML = ""; // Bersihkan loading

    if (books.length === 0) {
      favGrid.innerHTML = '<p style="text-align:center; width:100%;">Belum ada buku favorit.</p>';
      return;
    }

    // Render setiap buku
    books.forEach((book) => {
      const bookItem = document.createElement("div");
      bookItem.classList.add("fav-item");

      bookItem.innerHTML = `
        <div class="fav-img-wrapper">
          <img src="http://localhost:8000${book.gambar_buku}" alt="${book.judul_buku}">
        </div>
        <div class="fav-info">
          <div class="info-header">
            <h3 class="book-title">${book.judul_buku}</h3>
          </div>
          <p class="book-desc">${truncateText(book.deskripsi_buku, 80)}</p>
          
          <div class="info-footer" style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
            <span class="book-author" style="font-weight: bold; color: #888; text-transform: uppercase; font-size: 0.8rem;">${book.penulis_buku}</span>
            
            <i class="bi bi-trash delete-fav-btn" 
               data-id="${book.id_buku}" 
               style="font-size: 1.2rem; color: red; cursor: pointer;">
            </i>
          </div>
        </div>
      `;
      
      favGrid.appendChild(bookItem);
    });

    // Tambahkan Event Listener untuk semua tombol sampah
    document.querySelectorAll(".delete-fav-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const bookId = this.getAttribute("data-id");
        removeFromFavorite(idUser, bookId);
      });
    });

  } catch (error) {
    console.error("Gagal load favorit:", error);
    favGrid.innerHTML = '<p style="text-align:center; width:100%;">Gagal memuat data.</p>';
  }
}

// --- FUNGSI HAPUS FAVORIT (TOMBOL SAMPAH) ---
async function removeFromFavorite(userId, bookId) {
  const confirmDelete = confirm("Hapus buku ini dari favorit?");
  if (!confirmDelete) return;

  try {
    await axios.delete("http://localhost:8000/favorit/remove", {
      data: { id_user: userId, id_buku: bookId }
    });
    
    // Refresh list setelah menghapus
    loadFavorites(userId); 
    
  } catch (error) {
    console.error("Gagal menghapus:", error);
    alert("Gagal menghapus favorit");
  }
}

// Helper untuk memotong deskripsi panjang
function truncateText(text, length) {
  if (!text) return "";
  if (text.length <= length) return text;
  return text.substring(0, length) + "...";
}

// --- HELPER LOAD PROFILE (Copy dari file lain untuk konsistensi) ---
async function loadUserProfileHeader() {
  const navbarProfileName = document.getElementById("navbarProfileName");
  const navbarProfileImg = document.getElementById("navbarProfileImg");

  try {
    const res = await axios.get("http://localhost:8000/users/profile", {
      withCredentials: true,
    });
    const { data } = res.data; 

    if (navbarProfileName) navbarProfileName.textContent = `${data.first_name} ${data.last_name}`;
    if (data.photo && navbarProfileImg) {
      navbarProfileImg.src = `http://localhost:8000/uploads/${data.photo}?t=${Date.now()}`;
    }
  } catch (err) {
    console.error("Header profile err:", err);
  }
}

// Logout Logic
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/auth/logout", {}, { withCredentials: true });
      window.location.href = "../../login.html";
    } catch (err) {
      window.location.href = "../../login.html";
    }
  });
}

// Navbar Toggles
document.addEventListener("DOMContentLoaded", () => {
    // ... Copy logika toggle navbar dari file js lain jika diperlukan ...
    const navToggle = document.querySelector(".nav-toggle");
    const mainNav = document.querySelector(".nav-links");
    const profileBtn = document.getElementById("profileBtn");
    const dropdownMenu = document.getElementById("dropdownMenu");
  
    if(profileBtn){
        profileBtn.addEventListener("click", (event) => {
            event.stopPropagation();
            dropdownMenu.classList.toggle("show");
            profileBtn.classList.toggle("active");
        });
    }
    
    if(navToggle){
        navToggle.addEventListener("click", (event) => {
            event.stopPropagation();
            navToggle.classList.toggle("is-open");
            mainNav.classList.toggle("is-open");
        });
    }

    document.addEventListener("click", (event) => {
        if (profileBtn && !profileBtn.contains(event.target) && dropdownMenu.classList.contains("show")) {
            dropdownMenu.classList.remove("show");
            profileBtn.classList.remove("active");
        }
    });
});
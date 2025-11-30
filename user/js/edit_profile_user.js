// js/edit_profile_user.js

// ================== NAVBAR & DROPDOWN ==================
document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".nav-links");
  const profileBtn = document.getElementById("profileBtn");
  const dropdownMenu = document.getElementById("dropdownMenu");
  const logoutBtn = document.getElementById("logoutBtn");

  // Dropdown profil
  if (profileBtn) {
    profileBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      dropdownMenu.classList.toggle("show");
      profileBtn.classList.toggle("active");
    });
  }

  // Mobile menu (hamburger)
  if (navToggle) {
    navToggle.addEventListener("click", (event) => {
      event.stopPropagation();
      navToggle.classList.toggle("is-open");
      mainNav.classList.toggle("is-open");
    });
  }

  // Tutup menu saat klik di luar
  document.addEventListener("click", (event) => {
    // dropdown profil
    if (
      dropdownMenu &&
      profileBtn &&
      !profileBtn.contains(event.target) &&
      dropdownMenu.classList.contains("show")
    ) {
      dropdownMenu.classList.remove("show");
      profileBtn.classList.remove("active");
    }

    // mobile nav
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

  // Tombol logout
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

  // Setelah navbar siap → load profile user
  loadUserProfile();
});

// ================== LOAD DATA PROFILE DARI BACKEND ==================
async function loadUserProfile() {
  const namaAwalInput = document.getElementById("namaAwal");
  const namaBelakangInput = document.getElementById("namaBelakang");
  const emailInput = document.getElementById("email");
  const profilePicture = document.getElementById("profilePicture");

  const navbarProfileName = document.querySelector(".profile h4");
  const navbarProfileEmail = document.querySelector(".profile p");
  const navbarProfileImg = document.getElementById("navbarProfileImg");

  try {
    const res = await axios.get("http://localhost:8000/users/profile", {
      withCredentials: true,
    });
    console.log("Profile Data",res.data);

    const { data } = res.data; // data = user dari controller
    if (!data) return;

    // isi form
    namaAwalInput.value = data.first_name || "";
    namaBelakangInput.value = data.last_name || "";
    emailInput.value = data.email || "";

    // update nama & email di navbar
    if (navbarProfileName) {
      navbarProfileName.textContent =
        (data.first_name || "") + " " + (data.last_name || "");
    }
    if (navbarProfileEmail) {
      navbarProfileEmail.textContent = data.email || "";
    }

  //  Menampilkan Foto setelah update 
  if(data.photo){
    const photoUrl = `http://localhost:8000/uploads/${data.photo}?t=${Date.now()}`;
    if(profilePicture) profilePicture.src = photoUrl;
    if(navbarProfileImg) navbarProfileImg.src = photoUrl;
  }

  } catch (err) {
    console.error(err);
    if (err.response && (err.response.status === 401 || err.response.status === 403)) {
      // belum login / token invalid
      window.location.href = "../../login.html";
    } else {
      alert("Gagal memuat data profile");
    }
  }
}

// ================== GANTI FOTO PROFIL (LOCAL PREVIEW) ==================
const profileInput = document.getElementById("profileInput");
if (profileInput) {
  profileInput.addEventListener("change", function (event) {
    const file = event.target.files[0];

    if (file) {
      const validTypes = ["image/jpeg", "image/jpg", "image/png"];
      if (!validTypes.includes(file.type)) {
        alert("Hanya file JPG, JPEG, atau PNG yang diperbolehkan!");
        return;
      }

      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        alert("Ukuran file terlalu besar! Maksimal 5MB.");
        return;
      }

      // Preview gambar
      const reader = new FileReader();
      reader.onload = function (e) {
        document.getElementById("profilePicture").src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  });
}

// ================== SIMPAN PERUBAHAN PROFILE (WITH FOTO) ==================
const btnUpdate = document.querySelector(".btn-update");
if (btnUpdate) {
  btnUpdate.addEventListener("click", async function (e) {
    e.preventDefault();

    const first_name = document.getElementById("namaAwal").value.trim();
    const last_name = document.getElementById("namaBelakang").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("Password").value.trim(); // optional
    const photoInput = document.getElementById("profileInput");

    if (!first_name || !last_name || !email) {
      alert("First name, last name, dan email wajib diisi!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Format email tidak valid!");
      return;
    }

    // siapkan FormData untuk multipart/form-data
    const formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("email", email);

    if (password !== "") {
      formData.append("password", password);
    }

    if (photoInput && photoInput.files[0]) {
      formData.append("photo", photoInput.files[0]); // nama harus sama dengan di router
    }

    try {
      const res = await axios.put(
        "http://localhost:8000/users/profile",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const responseData = res.data;
      if (responseData.statusCode === 200) {
        alert("Profile berhasil diperbarui!");

        const user = responseData.data;

        const navbarProfileName = document.querySelector(".profile h4");
        const navbarProfileEmail = document.querySelector(".profile p");
        const navbarProfileImg = document.getElementById("navbarProfileImg");


        if (navbarProfileName) {
          navbarProfileName.textContent =
            (user.first_name || "") + " " + (user.last_name || "");
        }
        if (navbarProfileEmail) {
          navbarProfileEmail.textContent = user.email || "";
        }

        // kalau backend mengembalikan nama file foto baru, update gambar
        if (user.photo) {
          const photoUrl = `http://localhost:8000/uploads/${user.photo}`;
          const profilePicture = document.getElementById("profilePicture");

          if (profilePicture) profilePicture.src = photoUrl;
          if (navbarProfileImg) navbarProfileImg.src = photoUrl;
        }

        // kosongkan password setelah update
        document.getElementById("Password").value = "";
      } else {
        alert(responseData.message || "Gagal mengupdate profile");
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("Terjadi kesalahan saat menyimpan profile");
      }
    }
  });
}

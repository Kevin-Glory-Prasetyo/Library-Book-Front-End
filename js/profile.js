// Endpoint API yang akan digunakan (ganti dengan endpoint Anda yang sebenarnya)
const API_URL = "http://localhost:5000"; 
const PROFILE_ENDPOINT = `${API_URL}/user/profile`; 
const LOGOUT_ENDPOINT = `${API_URL}/auth/logout`;

document.addEventListener('DOMContentLoaded', () => {
    // --- Elemen Navbar ---
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.nav-links');
    const profileBtn = document.getElementById('profileBtn');
    const dropdownMenu = document.getElementById('dropdownMenu');
    const logoutBtn = document.getElementById("logoutBtn");

    // --- Elemen Profil ---
    const userImageInput = document.getElementById('user_image');
    const profilePreview = document.getElementById('profile-preview');
    const saveProfileBtn = document.getElementById('saveProfileBtn');
    const editProfileForm = document.getElementById('editProfileForm');
    
    // --- Input Form ---
    const firstNameInput = document.getElementById('user_first_name');
    const lastNameInput = document.getElementById('user_last_name');
    const phoneInput = document.getElementById('user_phone');
    const emailInput = document.getElementById('user_email');
    const passwordInput = document.getElementById('user_password');
    
    // --- Display Info ---
    const displayName = document.getElementById('display-name');
    const displayEmail = document.getElementById('display-email');
    const namaPenggunaNav = document.getElementById('nama-pengguna');
    const emailPenggunaNav = document.getElementById('email-pengguna');

    // ==========================================================
    // A. Fungsionalitas Navbar (Dropdown dan Nav Mobile)
    // ==========================================================
    
    // Toggle Dropdown Profile
    profileBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        dropdownMenu.classList.toggle('show');
        profileBtn.classList.toggle('active');
    });

    // Toggle Nav Mobile
    navToggle.addEventListener('click', (event) => {
        event.stopPropagation();
        navToggle.classList.toggle('is-open');
        mainNav.classList.toggle('is-open');
    });

    // Tutup Dropdown/Nav saat klik di luar
    document.addEventListener('click', (event) => {
        if (dropdownMenu.classList.contains('show') && !profileBtn.contains(event.target)) {
            dropdownMenu.classList.remove('show');
            profileBtn.classList.remove('active');
        }
        if (mainNav.classList.contains('is-open') && !mainNav.contains(event.target) && !navToggle.contains(event.target)) {
            navToggle.classList.remove('is-open');
            mainNav.classList.remove('is-open');
        }
    });

    // ==========================================================
    // B. Fungsionalitas Profil
    // ==========================================================
    
    // 1. Logika Logout
    if (logoutBtn) {
        logoutBtn.addEventListener("click", async (e) => {
            e.preventDefault();
            try {
                // Pastikan `withCredentials: true` digunakan untuk mengirim cookie session
                const res = await axios.post(LOGOUT_ENDPOINT, {}, {
                    withCredentials: true,
                });
                if (res.status === 200 || res.data.statusCode === 200) {
                    window.location.href = "login.html";
                } else {
                    alert(res.data.message || "Gagal logout");
                }
            } catch (err) {
                console.error("Logout gagal:", err.response?.data || err);
                // Redirect ke login meskipun gagal, sebagai fallback keamanan
                window.location.href = "login.html"; 
            }
        });
    }

    // 2. Fungsionalitas Preview Foto Profil Baru (Perbaikan Utama)
    if (userImageInput && profilePreview) {
        userImageInput.addEventListener('change', function() {
            if (this.files && this.files[0]) {
                const reader = new FileReader();

                reader.onload = function(e) {
                    // MENGGANTI SUMBER GAMBAR DENGAN FOTO BARU
                    profilePreview.src = e.target.result;
                };

                // Membaca file yang dipilih sebagai Data URL
                reader.readAsDataURL(this.files[0]);
            }
        });
    }

    // 3. Fungsionalitas Simpan Profil (Upload Data dan Gambar)
    if (saveProfileBtn && editProfileForm) {
        saveProfileBtn.addEventListener('click', async (e) => {
            e.preventDefault();

            // Mengumpulkan semua data form, termasuk file
            const formData = new FormData();
            
            // Tambahkan file gambar (jika ada)
            const imageFile = userImageInput.files[0];
            if (imageFile) {
                formData.append('user_image', imageFile); // 'user_image' harus sesuai dengan nama field di backend
            }

            // Tambahkan data teks lainnya
            formData.append('user_first_name', firstNameInput.value);
            formData.append('user_last_name', lastNameInput.value);
            formData.append('user_phone', phoneInput.value);
            formData.append('user_email', emailInput.value);
            
            // Hanya kirim password jika diisi
            if (passwordInput.value) {
                formData.append('user_password', passwordInput.value);
            }

            // Nonaktifkan tombol saat proses loading
            saveProfileBtn.textContent = 'Menyimpan...';
            saveProfileBtn.disabled = true;

            try {
                // Mengirim FormData ke API menggunakan metode PATCH atau PUT
                const res = await axios.patch(PROFILE_ENDPOINT, formData, {
                    headers: {
                        // Tidak perlu menyertakan 'Content-Type': 'multipart/form-data', 
                        // Axios/browser akan menanganinya secara otomatis saat menggunakan FormData
                    },
                    withCredentials: true, // Penting untuk otentikasi
                });

                if (res.status === 200) {
                    alert('Profil berhasil diperbarui!');
                    // OPTIONAL: Perbarui tampilan nama/email di header secara dinamis
                    // const userData = res.data.data;
                    // if (userData) {
                    //     displayName.textContent = `${userData.firstName} ${userData.lastName}`;
                    //     displayEmail.textContent = userData.email;
                    //     namaPenggunaNav.textContent = `${userData.firstName} ${userData.lastName}`;
                    //     emailPenggunaNav.textContent = userData.email;
                    // }
                    // Reset field password setelah berhasil
                    passwordInput.value = '';
                } else {
                    alert(res.data.message || 'Gagal menyimpan profil.');
                }

            } catch (err) {
                console.error("Update profil gagal:", err.response?.data || err);
                alert('Terjadi kesalahan saat menyimpan profil. Cek konsol untuk detail.');
            } finally {
                saveProfileBtn.textContent = 'Simpan';
                saveProfileBtn.disabled = false;
            }
        });
    }

    // ==========================================================
    // C. Fungsionalitas Load Data Profil (Opsional tapi penting)
    // ==========================================================

    // Fungsi untuk mengambil dan mengisi data profil saat halaman dimuat
    async function loadProfileData() {
        try {
            const res = await axios.get(PROFILE_ENDPOINT, {
                withCredentials: true,
            });

            if (res.status === 200 && res.data.data) {
                const userData = res.data.data;

                // Isi form
                firstNameInput.value = userData.first_name || '';
                lastNameInput.value = userData.last_name || '';
                phoneInput.value = userData.phone || '';
                emailInput.value = userData.email || ''; 

                // Isi tampilan (display info)
                const fullName = `${userData.first_name || ''} ${userData.last_name || ''}`.trim();

                displayName.textContent = fullName || userData.email;
                displayEmail.textContent = userData.email;
                namaPenggunaNav.textContent = fullName || 'Pengguna';
                emailPenggunaNav.textContent = userData.email;
                
                // Isi foto profil (Ganti dengan path foto dari backend Anda)
                if (userData.profile_image_url) {
                    profilePreview.src = userData.profile_image_url;
                }
            }
        } catch (err) {
            // Jika gagal load data (mungkin belum login), redirect
            console.error("Gagal memuat data profil:", err.response?.data || err);
            // window.location.href = "login.html"; 
        }
    }
    
    // Panggil fungsi saat DOM sudah siap
    // loadProfileData(); 
});
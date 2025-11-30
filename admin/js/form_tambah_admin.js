// Ambil elemen form dan tombol submit
const form = document.querySelector('form');

form.addEventListener('submit', async (e) => {
  e.preventDefault(); 
  // Ambil nilai dari inputan
  const nama_depan = document.getElementById('nama_depan').value;
  const nama_belakang = document.getElementById('nama_belakang').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Buat data yang akan dikirim ke API
  const data = {
    first_name: nama_depan,
    last_name: nama_belakang,
    email,
    password
  };

  try {
    // Kirim data ke API menggunakan axios
    const response = await axios.post('http://localhost:8000/users/tambahAdmin', data);

    if (response.status === 200 || response.status === 201) {
      localStorage.setItem("tambahSuccess", "true");
      window.location.href = 'data_admin.html';
    }
  } catch (error) {
    console.error(error);
    alert('Gagal menambahkan admin. Cek kembali data atau server API.');
  }
});


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

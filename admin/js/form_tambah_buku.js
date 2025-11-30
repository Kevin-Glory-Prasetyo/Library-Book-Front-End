async function checkLoginUser() {
  try {
    const res = await axios.get("http://localhost:8000/auth/checkLogin", {
      withCredentials: true,
    });

    const data = res.data.user;


    if (data.role !== "admin") {
      window.location.href = "../../login.html";
      return;
    }

    if (res.status === 200) {
      const namaPengguna = document.getElementById("user-name");

      namaPengguna.innerHTML = `${data.first_name} ${data.last_name}`;
      

      return true;
    } else {
      alert(data.message || "Terjadi kesalahan");
      return false;
    }

  } catch (err) {
    console.error("Fetch gagal:", err);
    if (err.status === 401 || err.status === 403) {
      window.location.href = "../../login.html";
    }
    return false;
  }
}

document.addEventListener("DOMContentLoaded", checkLoginUser)

document.addEventListener("DOMContentLoaded", function () {
  const select = document.getElementById("kategori_buku");
  if (!select) return;

  axios
    .get("http://localhost:8000/buku/kategori")
    .then((res) => {
      const kategori = res.data.kategori;
      kategori.forEach((k) => {
        const option = document.createElement("option");
        option.value = k.id_kategori;
        option.text = k.name;
        select.appendChild(option);
      });
    })
    .catch((err) => console.error("Gagal fetch kategori:", err));
});

const form = document.querySelector("form");

form.addEventListener("submit", function(e) {
  e.preventDefault();
    const judul = document.getElementById("judul_buku").value;
    const penulis = document.getElementById("penulis_buku").value;
    const kategori = document.getElementById("kategori_buku").value;
    const penerbit = document.getElementById("penerbit_buku").value;
    const tahun = document.getElementById("tahun_terbit").value;
    const deskripsi = document.getElementById("deskripsi_buku").value;
    const stok = document.getElementById("stok_buku").value;
    const gambar = document.getElementById("foto").files[0];

    const formData = new FormData();
    formData.append("judul_buku", judul);
    formData.append("penulis_buku", penulis);
    formData.append("id_kategori", kategori);
    formData.append("penerbit_buku", penerbit);
    formData.append("tahun_terbit", tahun);
    formData.append("deskripsi_buku", deskripsi);
    formData.append("total_stock", stok);
    formData.append("gambar", gambar);

    axios
      .post("http://localhost:8000/buku/tambahbuku", formData)
      .then((res) => {
        localStorage.setItem("tambahSuccess", "true");
        window.location.href = "data_buku.html";
      })
      .catch((err) => {
        console.error("Gagal tambah buku:", err);
        alert("Gagal menambahkan buku, cek console untuk detail.");
      });
  
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





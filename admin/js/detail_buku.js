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

async function loadDetailBuku() {
  try {
    const params = new URLSearchParams(window.location.search);
    const idBuku = params.get("id");
    const response = await axios.get(`http://localhost:8000/buku/detailbuku/${idBuku}`, {
      withCredentials: true,
    });

    const detail = response.data.data;
    console.log()

    const foto = document.getElementById("preview-foto")
    foto.src = `http://localhost:8000${detail.gambar_buku}`

    document.getElementById("judul_buku").value = detail.judul_buku
    document.getElementById("penulis_buku").value = detail.penulis_buku
    document.getElementById("kategori_buku").value = detail.name
    document.getElementById("penerbit_buku").value = detail.penerbit_buku
    document.getElementById("tahun_terbit").value = detail.tahun_terbit
    document.getElementById("deskripsi_buku").value = detail.deskripsi_buku
    document.getElementById("stok_buku").value = detail.total_stock

    
  } catch (error) {
    console.error("Gagal memuat detail buku:", error);
  }
}

document.addEventListener("DOMContentLoaded", checkLoginUser);
document.addEventListener("DOMContentLoaded", loadDetailBuku);

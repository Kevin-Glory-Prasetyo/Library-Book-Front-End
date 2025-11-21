
// kategori.js
document.addEventListener("DOMContentLoaded", function() {
  const select = document.getElementById("kategori-select");
  if (!select) return;

  axios.get("http://localhost:8000/buku/kategori")
    .then(res => {
      const kategori = res.data.kategori;
      kategori.forEach(k => {
        const option = document.createElement("option");
        option.value = k.id_kategori; // ID kategori
        option.text = k.name;         // Nama kategori
        select.appendChild(option);
      });
    })
    .catch(err => console.error("Gagal fetch kategori:", err));
});


const form = document.querySelector("form");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const judul = document.getElementById("judul_buku").value;
  const penulis = document.getElementById("penulis_buku").value;
  const kategori = document.getElementById("kategori-select").value;
  const penerbit = document.getElementById("penerbit_buku").value;
  const tahun = document.getElementById("tahun_terbit").value;
  const deskripsi = document.getElementById("deskripsi_buku").value;
  const stok = document.getElementById("total_stock").value;
  const gambar = document.getElementById("gambar_buku").files[0];

  const formData = new FormData();
  formData.append("judul_buku", judul);
  formData.append("penulis_buku", penulis);
  formData.append("id_kategori", kategori);
  formData.append("penerbit_buku", penerbit);
  formData.append("tahun_terbit", tahun);
  formData.append("deskripsi_buku", deskripsi);
  formData.append("total_stock", stok);
  formData.append("gambar", gambar);

  axios.post("http://localhost:8000/buku/tambahbuku", formData)
    .then(res => {
      window.location.href = "data_buku.html";
    })
    .catch(err => {
      console.error("Gagal tambah buku:", err);
      alert("Gagal menambahkan buku, cek console untuk detail.");
    });
});

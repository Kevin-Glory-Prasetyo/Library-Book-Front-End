async function loadKategori() {
  try {
    const res = await axios.get("http://localhost:8000/buku/kategori");
    const data = res.data.kategori;

    const select = document.getElementById("kategori");
    select.innerHTML = "";

    data.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.id_kategori;
      option.textContent = item.name;
      select.appendChild(option);
    });
  } catch (err) {
    console.error("Gagal load kategori:", err);
  }
}

// ---- LOAD DETAIL BUKU ----
async function loadDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) return;

  try {
    const res = await axios.get(`http://localhost:8000/buku/detailbuku/${id}`);
    const get = res.data.data;

    document.getElementById("judul").value = get.judul_buku;
    document.getElementById("penulis").value = get.penulis_buku;
    document.getElementById("penerbit").value = get.penerbit_buku;
    document.getElementById("tahun_terbit").value = get.tahun_terbit;
    document.getElementById("total_stok").value = get.total_stock;
    document.getElementById("deskripsi").value = get.deskripsi_buku;

    const select = document.getElementById("kategori");
    for (let opt of select.options) {
      if (opt.value == get.id_kategori) {
        opt.selected = true;
        break;
      }
    }

    document.getElementById(
      "gambar_buku"
    ).src = `http://localhost:8000${get.gambar_buku}`;
  } catch (err) {
    console.error(err);
  }
}

// Jalankan berurutan
document.addEventListener("DOMContentLoaded", async () => {
  await loadKategori();
  await loadDetail();
});

document.getElementById("btnUpdate").addEventListener("click", async () => {
  try {
    const judul = document.getElementById("judul").value;
    const penulis = document.getElementById("penulis").value;
    const kategori = document.getElementById("kategori").value;
    const penerbit = document.getElementById("penerbit").value;
    const tahun_terbit = document.getElementById("tahun_terbit").value;
    const total_stok = document.getElementById("total_stok").value;
    const deskripsi = document.getElementById("deskripsi").value;
    const gambarBaru = document.getElementById("gambar_upload").files[0];

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const formData = new FormData();
    formData.append("judul_buku", judul);
    formData.append("penulis_buku", penulis);
    formData.append("id_kategori", kategori);
    formData.append("penerbit_buku", penerbit);
    formData.append("tahun_terbit", tahun_terbit);
    formData.append("total_stock", total_stok);
    formData.append("deskripsi_buku", deskripsi);

    if (gambarBaru) {
      formData.append("gambar", gambarBaru);
    }

    axios.put(`http://localhost:8000/buku/updatebuku/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
    .then(res => {
      window.location.href = "data_buku.html";
    })
    .catch(err => {
      console.error("Gagal update buku:", err);
      alert("Gagal update buku, cek console untuk detail.");
    });

  } catch (error) {
    console.error("Error saat update:", error);
    alert("Terjadi error saat memproses data!");
  }
});


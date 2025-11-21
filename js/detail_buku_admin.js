

document.addEventListener("DOMContentLoaded", function () {
  // ===============================
  // 1. Logika untuk Navigasi Sidebar
  // ===============================
  const navLinks = document.querySelectorAll(".sidebar nav a");
  const currentPage = window.location.pathname.split("/").pop(); // Ambil nama file halaman saat ini

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href");

    // Tambahkan class active berdasarkan halaman yang sedang dibuka
    if (linkPage === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }

    // Event klik (optional, jika kamu ingin efek langsung di SPA)
  });

  // ===============================
  // 2. Logika untuk Tombol "Tambah User"
  // ===============================
  const tambahUserButton = document.getElementById("tambahUserBtn");

  if (tambahUserButton) {
    tambahUserButton.addEventListener("click", function () {
      alert('Fungsi untuk "Tambah Buku" akan dijalankan di sini!');
      // Di aplikasi nyata, ini bisa membuka modal atau redirect ke form input
    });
  }
});

// Ambil ID dari query parameter
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

console.log(id)

if (id) {
  axios.get(`http://localhost:8000/buku/detailbuku/${id}`)
    .then(res => {
      console.log(res.data.data);
      const get = res.data.data
      document.getElementById("judul").value = get.judul_buku;
      document.getElementById("penulis").value = get.penulis_buku;
      document.getElementById("kategori").value = get.name;
      document.getElementById("penerbit").value = get.penerbit_buku;
      document.getElementById("tahun_terbit").value = get.tahun_terbit;
      document.getElementById("total_stok").value = get.total_stock;
      document.getElementById("stok_tersedia").value = get.available_stock;
      document.getElementById("dipinjam").value = get.total_stock - get.available_stock;
      document.getElementById("deskripsi").value = get.deskripsi_buku;

      const coverImg = document.getElementById("gambar_buku");
      coverImg.src = `http://localhost:8000${get.gambar_buku}`;
    })
    .catch(err => console.error(err));
}

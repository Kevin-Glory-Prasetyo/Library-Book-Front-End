function formatTanggal(tanggal) {
  if (!tanggal) return "-";
  const date = new Date(tanggal);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

document.addEventListener("DOMContentLoaded", async () => {
  const tableBody = document.querySelector("tbody");

  try {
    const response = await axios.get(
      "http://localhost:8000/peminjaman/peminjaman"
    );

    const data = response.data.peminjaman;
    const filteredData = data.filter(
      (pinjam) =>
        pinjam.status_peminjaman === "menunggu"
    );

    tableBody.innerHTML = "";

    filteredData.forEach((pinjam, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${pinjam.judul_buku}</td>
        <td>${pinjam.first_name + " " + pinjam.last_name}</td>
        <td>${formatTanggal(pinjam.tanggal_pinjam)}</td>
        <td>${formatTanggal(pinjam.tanggal_kembali)}</td>
        <td>${pinjam.status_peminjaman}</td>
        <td class="action-cell" style="display: flex; gap: 5px;">
          <button data-id ="${pinjam.id_peminjaman}" class="btn btn-success btn-sm terima">Terima <i class="bi bi-check-lg"></i></button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Gagal mengambil data peminjaman:", error);
  }
});

document.addEventListener("click", async (e) => {
  const btn = e.target.closest(".terima");
  if (!btn) return;

  const idPeminjaman = btn.dataset.id;

  try {

    await axios.put(`http://localhost:8000/peminjaman/terima/${idPeminjaman}`);
    
    window.location.reload();
  } catch (err) {
    console.error("Gagal menerima pengajuan:", err);
    alert("Gagal menerima pengajuan, cek stok buku");
  }
});


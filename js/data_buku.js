// ============================================
// CONFIG & VARIABLES
// ============================================
let allBooks = [];      // Menyimpan semua data buku dari API
let currentPage = 1;    // Halaman aktif saat ini
const rowsPerPage = 5;  // Jumlah baris per halaman (bisa diganti 10, 20, dll)

document.addEventListener("DOMContentLoaded", async () => {
  // 1. Sidebar Active State Logic
  const navLinks = document.querySelectorAll(".sidebar nav a");
  const currentPageFile = window.location.pathname.split("/").pop();
  navLinks.forEach((link) => {
    if (link.getAttribute("href") === currentPageFile) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // 2. Fetch Data & Init Pagination
  await fetchAndRenderBooks();
});

// ============================================
// CORE FUNCTIONS
// ============================================

// Fungsi untuk mengambil data dari server
async function fetchAndRenderBooks() {
  const tableBody = document.getElementById("table-body");
  
  try {
    const response = await axios.get("http://localhost:8000/buku/buku");
    // Pastikan struktur data sesuai dengan respon API kamu
    // Jika response.data.dataBuku undefined, cek console log
    allBooks = response.data.dataBuku || []; 
    
    // Reset ke halaman 1 setiap kali fetch baru (opsional)
    currentPage = 1; 
    
    // Render tampilan
    refreshUI();

  } catch (error) {
    console.error("Gagal mengambil data buku:", error);
    tableBody.innerHTML = `<tr><td colspan="10" class="text-center text-danger">Gagal memuat data dari server.</td></tr>`;
  }
}

// Fungsi Utama: Mengatur ulang tampilan Tabel & Pagination
function refreshUI() {
    const tableBody = document.getElementById("table-body");
    const paginationContainer = document.getElementById("pagination");
    const pageInfo = document.getElementById("page-info");

    // 1. Filter Data Sesuai Halaman (Slicing)
    // Page 1: index 0 - 5
    // Page 2: index 5 - 10
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const paginatedItems = allBooks.slice(start, end);

    // 2. Render Tabel
    tableBody.innerHTML = "";
    if (paginatedItems.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="10" class="text-center">Tidak ada data buku.</td></tr>`;
    } else {
        paginatedItems.forEach((buku, index) => {
            // Hitung nomor urut asli
            let realIndex = start + index + 1;
            
            const row = document.createElement("tr");
            row.innerHTML = `
                  <td>${realIndex}</td>
                  <td>${buku.judul_buku}</td>
                  <td>${buku.penulis_buku}</td>
                  <td>${buku.name || '-'}</td>
                  <td>${buku.tahun_terbit}</td>
                  <td>${buku.penerbit_buku}</td>
                  <td>${buku.total_stock}</td>
                  <td>${buku.available_stock}</td>
                  <td>${buku.total_stock - buku.available_stock}</td>
                  <td class="action-btn" style="justify-content: center;">
                    <button data-id="${buku.id_buku}" class="btn btn-info btn-sm detail"><i class="bi bi-eye"></i></button>
                    <button data-id="${buku.id_buku}" class="btn btn-warning btn-sm edit"><i class="bi bi-pencil-square"></i></button>
                    <button data-id="${buku.id_buku}" class="btn btn-danger btn-sm delete"><i class="bi bi-trash3-fill"></i></button>
                  </td>
            `;
            tableBody.appendChild(row);
        });
    }

    // 3. Render Info Text (Showing X to Y of Z)
    const showingStart = allBooks.length > 0 ? start + 1 : 0;
    const showingEnd = end > allBooks.length ? allBooks.length : end;
    pageInfo.innerText = `Showing ${showingStart} to ${showingEnd} of ${allBooks.length} entries`;

    // 4. Render Tombol Pagination
    setupPagination(allBooks.length, paginationContainer);
}

// Fungsi Membuat Tombol Navigasi
function setupPagination(totalItems, wrapper) {
    wrapper.innerHTML = "";
    const pageCount = Math.ceil(totalItems / rowsPerPage);

    // Jangan tampilkan pagination jika halaman cuma 1 atau data kosong
    if (pageCount <= 1) return;

    // --- Tombol PREV ---
    const prevLi = document.createElement('li');
    prevLi.classList.add('page-item');
    if (currentPage === 1) prevLi.classList.add('disabled');
    
    prevLi.innerHTML = `<a class="page-link" href="#" aria-label="Previous">&laquo;</a>`;
    prevLi.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            refreshUI();
        }
    });
    wrapper.appendChild(prevLi);

    // --- Tombol Angka (1, 2, 3...) ---
    for (let i = 1; i <= pageCount; i++) {
        const li = document.createElement('li');
        li.classList.add('page-item');
        if (i === currentPage) li.classList.add('active');

        const a = document.createElement('a');
        a.classList.add('page-link');
        a.href = "#";
        a.innerText = i;
        
        li.addEventListener('click', (e) => {
            e.preventDefault();
            currentPage = i;
            refreshUI();
        });
        
        li.appendChild(a);
        wrapper.appendChild(li);
    }

    // --- Tombol NEXT ---
    const nextLi = document.createElement('li');
    nextLi.classList.add('page-item');
    if (currentPage === pageCount) nextLi.classList.add('disabled');

    nextLi.innerHTML = `<a class="page-link" href="#" aria-label="Next">&raquo;</a>`;
    nextLi.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage < pageCount) {
            currentPage++;
            refreshUI();
        }
    });
    wrapper.appendChild(nextLi);
}

// ============================================
// EVENT LISTENERS (Action Buttons)
// ============================================

// Menggunakan Event Delegation karena tombol dibuat secara dinamis
document.addEventListener("click", (e) => {
  // 1. DETAIL
  if (e.target.closest(".detail")) {
    const id = e.target.closest(".detail").dataset.id;
    window.location.href = `detail_buku_admin.html?id=${id}`;
  }

  // 2. EDIT
  if (e.target.closest(".edit")) {
    const id = e.target.closest(".edit").dataset.id;
    window.location.href = `update_buku_admin.html?id=${id}`;
  }
});

// 3. DELETE (Terpisah agar logika lebih jelas)
const tableBody = document.getElementById("table-body"); // Pastikan ID ini ada di HTML

if (tableBody) {
    tableBody.addEventListener("click", (e) => {
        const btnDelete = e.target.closest(".delete");
        if (!btnDelete) return;

        const id = btnDelete.dataset.id;
        if (!id) return;

        const confirmDelete = confirm("Apakah Anda yakin ingin menghapus buku ini?");
        if (!confirmDelete) return;

        axios.delete(`http://localhost:8000/buku/delete/${id}`)
            .then(res => {
                alert("Buku berhasil dihapus");
                // Refresh data tanpa reload halaman agar smooth
                fetchAndRenderBooks(); 
            })
            .catch(err => {
                console.error(err);
                alert("Gagal menghapus buku.");
            });
    });
}
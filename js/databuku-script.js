// ============================
// DATA BUKU (SIMULASI DATABASE)
// ============================
let bookData = [
    { id: 1, judul: 'Pemrograman Web Modern', penulis: 'Ahmad Sutisna', kategori: 'Teknologi', penerbit: 'Informatika Press', stok: 'Tersedia' },
    { id: 2, judul: 'Algoritma dan Struktur Data', penulis: 'Budi Raharjo', kategori: 'Teknologi', penerbit: 'Gramedia', stok: 'Tersedia' },
    { id: 3, judul: 'Database Management', penulis: 'Citra Dewi', kategori: 'Teknologi', penerbit: 'Elex Media', stok: 'Dipinjam' },
    { id: 4, judul: 'Machine Learning Dasar', penulis: 'Doni Prasetyo', kategori: 'Teknologi', penerbit: 'Informatika Press', stok: 'Tersedia' },
    { id: 5, judul: 'Jaringan Komputer', penulis: 'Eko Wijaya', kategori: 'Teknologi', penerbit: 'Andi Publisher', stok: 'Tersedia' }
];

// ============================
// FUNGSI RENDER TABEL
// ============================
function renderTable(data) {
    const tableBody = document.getElementById('tableBody');
    if (!tableBody) return;

    tableBody.innerHTML = '';
    data.forEach((book, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${book.id}</td>
            <td>${book.judul}</td>
            <td>${book.penulis}</td>
            <td>${book.kategori}</td>
            <td>${book.penerbit}</td>
            <td>${book.stok}</td>
            <td class="action-btns">
                <button class="btn-edit" onclick="editBook(${index})">Edit</button>
                <button class="btn-hapus" onclick="deleteBook(${index})">Hapus</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// ============================
// SEARCH / FILTER
// ============================
function searchBooks(query) {
    const filteredData = bookData.filter(book =>
        book.judul.toLowerCase().includes(query.toLowerCase()) ||
        book.penulis.toLowerCase().includes(query.toLowerCase()) ||
        book.kategori.toLowerCase().includes(query.toLowerCase()) ||
        book.penerbit.toLowerCase().includes(query.toLowerCase())
    );
    renderTable(filteredData);
}

// ============================
// EDIT & HAPUS
// ============================
function editBook(index) {
    const book = bookData[index];
    alert(`Edit Buku:\n\nJudul: ${book.judul}\nPenulis: ${book.penulis}\nKategori: ${book.kategori}\nPenerbit: ${book.penerbit}\nStok: ${book.stok}`);
}

function deleteBook(index) {
    const book = bookData[index];
    if (confirm(`Apakah Anda yakin ingin menghapus buku "${book.judul}"?`)) {
        bookData.splice(index, 1);
        renderTable(bookData);
        alert('Buku berhasil dihapus!');
    }
}

// ============================
// TAMBAH BUKU
// ============================
function addBook() {
    alert('Fitur tambah buku akan dibuka dalam form modal');
}

// ============================
// AKTIFKAN SIDEBAR BERDASARKAN URL
// ============================
function activateSidebar() {
    const sidebarLinks = document.querySelectorAll('.nav-item');
    const currentPage = window.location.pathname.split('/').pop(); // contoh: dashboard.html

    sidebarLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }

        // Tambahkan event klik agar langsung aktif tanpa reload (opsional)
        link.addEventListener('click', function() {
            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// ============================
// EVENT DOMContentLoaded
// ============================
document.addEventListener('DOMContentLoaded', function() {
    renderTable(bookData);

    // Search event
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', e => searchBooks(e.target.value));
    }

    // Tambah buku
    const btnTambah = document.querySelector('.btn-tambah');
    if (btnTambah) {
        btnTambah.addEventListener('click', addBook);
    }

    // Aktifkan sidebar sesuai halaman
    activateSidebar();
});

// ============================
// RESPONSIVE TABLE
// ============================
window.addEventListener('resize', function() {
    const tableContainer = document.querySelector('.table-container');
    if (tableContainer) {
        tableContainer.style.overflowX = window.innerWidth < 768 ? 'scroll' : 'auto';
    }
});

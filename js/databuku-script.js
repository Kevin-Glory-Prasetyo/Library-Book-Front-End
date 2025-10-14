// Data buku (simulasi data dari database)
let bookData = [
    {
        id: 1,
        judul: 'Pemrograman Web Modern',
        penulis: 'Ahmad Sutisna',
        kategori: 'Teknologi',
        penerbit: 'Informatika Press',
        stok: 'Tersedia'
    },
    {
        id: 2,
        judul: 'Algoritma dan Struktur Data',
        penulis: 'Budi Raharjo',
        kategori: 'Teknologi',
        penerbit: 'Gramedia',
        stok: 'Tersedia'
    },
    {
        id: 3,
        judul: 'Database Management',
        penulis: 'Citra Dewi',
        kategori: 'Teknologi',
        penerbit: 'Elex Media',
        stok: 'Dipinjam'
    },
    {
        id: 4,
        judul: 'Machine Learning Dasar',
        penulis: 'Doni Prasetyo',
        kategori: 'Teknologi',
        penerbit: 'Informatika Press',
        stok: 'Tersedia'
    },
    {
        id: 5,
        judul: 'Jaringan Komputer',
        penulis: 'Eko Wijaya',
        kategori: 'Teknologi',
        penerbit: 'Andi Publisher',
        stok: 'Tersedia'
    }
];

// Fungsi untuk menampilkan data ke tabel
function renderTable(data) {
    const tableBody = document.getElementById('tableBody');
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

// Fungsi untuk search/filter data
function searchBooks(query) {
    const filteredData = bookData.filter(book => {
        return book.judul.toLowerCase().includes(query.toLowerCase()) ||
               book.penulis.toLowerCase().includes(query.toLowerCase()) ||
               book.kategori.toLowerCase().includes(query.toLowerCase()) ||
               book.penerbit.toLowerCase().includes(query.toLowerCase());
    });
    renderTable(filteredData);
}

// Fungsi untuk edit buku
function editBook(index) {
    const book = bookData[index];
    alert(`Edit Buku:\n\nJudul: ${book.judul}\nPenulis: ${book.penulis}\nKategori: ${book.kategori}\nPenerbit: ${book.penerbit}\nStok: ${book.stok}`);
    // Implementasi form edit bisa ditambahkan di sini
}

// Fungsi untuk hapus buku
function deleteBook(index) {
    const book = bookData[index];
    if (confirm(`Apakah Anda yakin ingin menghapus buku "${book.judul}"?`)) {
        bookData.splice(index, 1);
        renderTable(bookData);
        alert('Buku berhasil dihapus!');
    }
}

// Fungsi untuk tambah buku
function addBook() {
    alert('Fitur tambah buku akan dibuka dalam form modal');
    // Implementasi form tambah bisa ditambahkan di sini
}

// Event listener untuk search input
document.addEventListener('DOMContentLoaded', function() {
    // Render tabel pertama kali
    renderTable(bookData);
    
    // Search functionality
    const searchInput = document.querySelector('.search-input');
    searchInput.addEventListener('input', function(e) {
        searchBooks(e.target.value);
    });
    
    // Tambah buku button
    const btnTambah = document.querySelector('.btn-tambah');
    btnTambah.addEventListener('click', addBook);
    
    // Mobile menu toggle (opsional)
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

// Fungsi untuk responsive table scroll
window.addEventListener('resize', function() {
    const tableContainer = document.querySelector('.table-container');
    if (window.innerWidth < 768) {
        tableContainer.style.overflowX = 'scroll';
    } else {
        tableContainer.style.overflowX = 'auto';
    }
});
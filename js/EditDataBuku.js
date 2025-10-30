// State management
let uploadedImageFile = null;

// DOM Elements
const addBookForm = document.getElementById('addBookForm');
const judulBukuInput = document.getElementById('judulBuku');
const kategoriInput = document.getElementById('kategori');
const penulisInput = document.getElementById('penulis');
const penerbitInput = document.getElementById('penerbit');
const stokBukuInput = document.getElementById('stokBuku');

// Elemen upload baru
const fileInput = document.getElementById('fileInput');
const fileInfo = document.getElementById('fileInfo');
const imagePreviewBox = document.getElementById('imagePreviewBox');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    // Logika Sidebar Navigasi
    initializeSidebarNav();

    // Logika File Input Baru
    initializeFileInput();
});

// Form Submit
addBookForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const bookData = {
        title: judulBukuInput.value.trim(),
        category: kategoriInput.value.trim(), // Ambil value dari input text
        author: penulisInput.value.trim(),
        publisher: penerbitInput.value.trim(),
        stock: parseInt(stokBukuInput.value) || 0,
        image: uploadedImageFile // Kirim file object
    };

    // Validasi
    if (!bookData.title) {
        alert('Judul buku harus diisi!');
        return;
    }
    if (!bookData.category) {
        alert('Kategori harus diisi!');
        return;
    }
    if (!bookData.author) {
        alert('Penulis harus diisi!');
        return;
    }
    if (!bookData.publisher) {
        alert('Penerbit harus diisi!');
        return;
    }
    if (bookData.stock < 0) {
        alert('Stok buku tidak boleh negatif!');
        return;
    }
    // Validasi gambar bisa ditambahkan jika wajib
    // if (!bookData.image) {
    //     alert('Gambar harus diupload!');
    //     return;
    // }

    // Log data (untuk testing)
    console.log('Data Buku Ditambah:', bookData);
    
    // Tampilkan pesan sukses
    alert('Data buku berhasil ditambahkan!');
    
    // Reset form
    resetForm();
});

// Inisialisasi Sidebar
function initializeSidebarNav() {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(event) {
            
            // 1. Hapus 'active' dari item lama
            const currentActive = document.querySelector(".nav-item.active");
            if (currentActive) {
                currentActive.classList.remove("active");
            }
            
            // 2. Tambahkan 'active' ke item yang diklik
            this.classList.add("active");

            // 3. (Opsional) Pindah halaman jika href bukan '#'
            const targetUrl = this.getAttribute('href');
            if (!targetUrl || targetUrl === '#') {
                event.preventDefault(); // Cegah pindah halaman jika href='#'
            }
        });
    });
}


// Inisialisasi File Input
function initializeFileInput() {
    fileInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) {
            resetFileInput();
            return;
        }

        // Validasi tipe file
        if (!file.type.match('image/png') && !file.type.match('image/jpeg')) {
            alert('Hanya file PNG dan JPG yang diperbolehkan!');
            resetFileInput();
            return;
        }

        // Validasi ukuran file (10MB)
        if (file.size > 10 * 1024 * 1024) {
            alert('Ukuran file maksimal 10MB!');
            resetFileInput();
            return;
        }

        uploadedImageFile = file;

        // === PERBAIKAN LOGIKA UKURAN FILE DIMULAI DI SINI ===
        let fileSize, fileUnit;

        if (file.size < 1024 * 1024) {
            // Jika kurang dari 1 MB, tampilkan dalam KB
            fileSize = (file.size / 1024).toFixed(2);
            fileUnit = 'KB';
        } else {
            // Jika 1 MB atau lebih, tampilkan dalam MB
            fileSize = (file.size / 1024 / 1024).toFixed(2);
            fileUnit = 'MB';
        }

        // Tampilkan Info File dengan unit yang benar
        fileInfo.innerHTML = `
            <span>Name: ${file.name}</span>
            <span>Size: ${fileSize} ${fileUnit}</span>
        `;
        // === AKHIR PERBAIKAN ===


        // Tampilkan Preview
        const reader = new FileReader();
        reader.onload = function(e) {
            imagePreviewBox.innerHTML = `<img src="${e.target.result}" alt="Preview">`;
        };
        reader.readAsDataURL(file);
    });
}
// Fungsi untuk reset input file
function resetFileInput() {
    fileInput.value = ''; // Hapus file dari input
    uploadedImageFile = null;
    
    // Kembalikan teks info ke default
    fileInfo.innerHTML = `
        <span>Name: -</span>
        <span>Size: -</span>
    `;
    
    // Kosongkan preview box
    imagePreviewBox.innerHTML = '';
}

// Reset Form utama
function resetForm() {
    addBookForm.reset();
    resetFileInput(); // Panggil juga reset untuk file
}
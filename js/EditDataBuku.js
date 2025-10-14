// State management
let uploadedImage = null;

// DOM Elements
const editForm = document.getElementById('editBookForm');
const judulBukuInput = document.getElementById('judulBuku');
const kategoriInput = document.getElementById('kategori');
const penulisInput = document.getElementById('penulis');
const penerbitInput = document.getElementById('penerbit');
const stokBukuInput = document.getElementById('stokBuku');
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const browseBtn = document.getElementById('browseBtn');
const previewContainer = document.getElementById('previewContainer');
const imagePreview = document.getElementById('imagePreview');
const removeImageBtn = document.getElementById('removeImage');

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeUpload();
});

// Form Submit
editForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const bookData = {
        title: judulBukuInput.value.trim(),
        category: kategoriInput.value,
        author: penulisInput.value.trim(),
        publisher: penerbitInput.value.trim(),
        stock: parseInt(stokBukuInput.value) || 0,
        image: uploadedImage
    };

    // Validasi
    if (!bookData.title) {
        alert('Judul buku harus diisi!');
        return;
    }
    
    if (!bookData.category) {
        alert('Kategori harus dipilih!');
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

    // Log data (untuk testing)
    console.log('Data Buku:', bookData);
    
    // Tampilkan pesan sukses
    alert('Data buku berhasil ditambahkan!');
    
    // Reset form
    resetForm();
});

// File Upload Functions
function initializeUpload() {
    // Browse button click
    browseBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        fileInput.click();
    });

    // Upload area click
    uploadArea.addEventListener('click', function() {
        fileInput.click();
    });

    // File input change
    fileInput.addEventListener('change', function(e) {
        handleFile(e.target.files[0]);
    });

    // Drag and drop
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        uploadArea.classList.add('drag-over');
    });

    uploadArea.addEventListener('dragleave', function() {
        uploadArea.classList.remove('drag-over');
    });

    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');
        handleFile(e.dataTransfer.files[0]);
    });

    // Remove image button
    removeImageBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        uploadedImage = null;
        fileInput.value = '';
        previewContainer.style.display = 'none';
        uploadArea.style.display = 'block';
    });
}

function handleFile(file) {
    if (!file) return;

    // Validate file type
    if (!file.type.match('image/png') && !file.type.match('image/jpeg')) {
        alert('Hanya file PNG dan JPG yang diperbolehkan!');
        return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
        alert('Ukuran file maksimal 10MB!');
        return;
    }

    // Read and preview file
    const reader = new FileReader();
    reader.onload = function(e) {
        uploadedImage = e.target.result;
        imagePreview.src = e.target.result;
        uploadArea.style.display = 'none';
        previewContainer.style.display = 'block';
    };
    reader.readAsDataURL(file);
}

// Reset Form
function resetForm() {
    editForm.reset();
    uploadedImage = null;
    fileInput.value = '';
    previewContainer.style.display = 'none';
    uploadArea.style.display = 'block';
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await axios.get("http://localhost:8000/auth/checkLogin", {
      withCredentials: true, 
    });

    const data = res.data;


    if (res.status === 401 || res.status === 403) {
      window.location.href = "login.html";
      return;
    }

    if (data.user.role !== "admin") {
      window.location.href = "home.html";
      return;
    }

    // Jika berhasil
    if (res.status === 200) {
      const namaPengguna = document.getElementById("nama-pengguna");
      const emailPengguna = document.getElementById("email-pengguna");

      namaPengguna.textContent = `${data.user.first_name} ${data.user.last_name}`;
      emailPengguna.textContent = data.user.email;

    } else {
      alert(data.message || "Terjadi kesalahan");
    }
  } catch (err) {
    console.error("Fetch gagal:", err);
    window.location.href = "login.html";
  }
});


const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
  logoutBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/auth/logout", {}, {
        withCredentials: true,
      });

      const data = res.data;

      if (data.statusCode === 200) {
        window.location.href = "login.html";
      } else {
        alert(data.message || "Gagal logout");
      }
    } catch (err) {
      console.error("Logout gagal:", err.response?.data || err);
      window.location.href = "login.html";
    }
  });
}


// === AKTIFKAN SIDEBAR SESUAI HALAMAN ===
document.addEventListener("DOMContentLoaded", function() {
    const sidebarItems = document.querySelectorAll('.nav-item');
    const currentPage = window.location.pathname.split('/').pop(); // ambil nama file dari URL, contoh: "databuku.html"

    sidebarItems.forEach(item => {
        const linkPage = item.getAttribute('href');
        if (linkPage === currentPage) {
            item.classList.add('active');  // tambahkan class active di halaman yang sesuai
        } else {
            item.classList.remove('active');
        }

        // Tambahkan event klik agar langsung aktif tanpa reload (opsional)
        link.addEventListener('click', function() {
            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

// === PIE CHART (Statistik bulan ini) ===
const ctxPie = document.getElementById('peminjamanChart').getContext('2d');
new Chart(ctxPie, {
    type: 'pie',
    data: {
        labels: [
            '       Peminjaman Selesai',
            '       Peminjaman Aktif',
            '       Terlambat (Sudah Kembali)',
            '       Terlambat (Belum Kembali)'
        ],
        datasets: [{
            data: [245, 45, 50, 10],
            backgroundColor: [
                '#4CAF50',
                '#2196F3',
                '#FFC107',
                '#F44336'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                align: 'start',
                labels: {
                    boxWidth: 14,
                    padding: 10,
                    textAlign: 'left',
                    usePointStyle: true,
                    pointStyle: 'circle'
                }
            }
        }
    }
});

// === LINE CHART (Riwayat 6 bulan terakhir) ===
const ctxLine = document.getElementById('lineChart').getContext('2d');
new Chart(ctxLine, {
    type: 'line',
    data: {
        labels: ['April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September'], // contoh bulan
        datasets: [{
            label: 'Total Peminjaman',
            data: [200, 250, 300, 280, 320, 350], // contoh data
            borderColor: '#2196F3',
            backgroundColor: 'rgba(33, 150, 243, 0.2)',
            tension: 0.3,
            fill: true
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks: { stepSize: 50 }
            }
        }
    }
});

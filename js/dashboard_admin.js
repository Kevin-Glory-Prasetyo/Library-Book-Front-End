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

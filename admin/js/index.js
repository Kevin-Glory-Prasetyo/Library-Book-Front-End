async function checkLoginUser() {
  try {
    const res = await axios.get("http://localhost:8000/auth/checkLogin", {
      withCredentials: true,
    });

    const data = res.data.user;
    console.log(data.role)
  


    if (data.role !== "admin") {
      window.location.href = "../../login.html";
      return;
    }

    if (res.status === 200 && data.role === "admin") {
      const namaPengguna = document.getElementById("user-name");

      namaPengguna.innerHTML = `${data.first_name} ${data.last_name}`;
      
      return true;
    } else {
      alert(data.message || "Terjadi kesalahan");
      return false;
    }

  } catch (err) {
    console.error("Fetch gagal:", err);
    if (err.status === 401 || err.status === 403) {
      window.location.href = "../../login.html";
    }
    return false;
  }
}

async function loadDataUser() {
  try {
    const response = await axios.get("http://localhost:8000/users/user", {
      withCredentials: true,
    });

    const user = response.data.dataUser;
    document.getElementById("anggota").innerHTML = user.length;

   
  } catch (error) {
    console.error("Gagal memuat data User:", error);
  }
}

async function loadDataBuku() {
  try {
    const response = await axios.get("http://localhost:8000/buku/buku", {
      withCredentials: true,
    });

    const buku = response.data.dataBuku;
    let total = 0;
    let tersedia = 0;

    buku.forEach((bku, index) => {
      total += parseInt(bku.total_stock);
      tersedia += parseInt(bku.available_stock);
    });
    document.getElementById("total").innerHTML = total;
    document.getElementById("tersedia").innerHTML = tersedia;

   
  } catch (error) {
    console.error("Gagal memuat data buku:", error);
  }
}

async function loadDataPeminjaman() {
  try {
    const response = await axios.get(
      "http://localhost:8000/peminjaman/peminjaman",
      {
        withCredentials: true,
      }
    );

    const peminjaman = response.data.peminjaman;
    const dipinjam = peminjaman.filter(
      (item) => item.status_peminjaman === "dipinjam"
    );

    document.getElementById("peminjaman").innerHTML = peminjaman.length;
    document.getElementById("dipinjam").innerHTML = dipinjam.length;

     
  } catch (error) {
    console.error("Gagal memuat data peminjaman:", error);
  }
}

function loadLineChartBulanan() {
  const ctx = document.getElementById("line-chart").getContext("2d");

  // Data dummy peminjaman per bulan
  const labels = [
    "Jan", "Feb", "Mar", "Apr", "Mei", "Jun",
    "Jul", "Agu", "Sep", "Okt", "Nov", "Des"
  ];

  const values = [4, 1, 2, 14, 3, 5, 5, 9, 11, 12, 8, 3];

  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Kenaikan Peminjaman per Bulan",
          data: values,
          borderColor: "#4CAF50",
          backgroundColor: "rgba(76, 175, 80, 0.2)",
          borderWidth: 2,
          tension: 0.3, // garis agak melengkung
          fill: true,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true },
      },
    },
  });
}


function loadBarChartKategori() {
  const ctx = document.getElementById("bar-chart").getContext("2d");

  // Data dummy 5 kategori
  const labels = ["Novel", "Komik", "Sejarah", "Teknologi", "Bisnis"];
  const values = [40, 25, 15, 30, 10];

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Jumlah Buku  Dipinjam per Kategori",
          data: values,
          backgroundColor: [
            "#4CAF50",
            "#8BC34A",
            "#CDDC39",
            "#FFC107",
            "#FF9800"
          ],
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true },
      },
    },
  });
}


function initDashboard() {
  Promise.all([
    checkLoginUser(),
    loadDataUser(),
    loadDataBuku(),
    loadDataPeminjaman(),
  ]).then(() => {
    loadLineChartBulanan()
    loadBarChartKategori()
  });
}

document.addEventListener("DOMContentLoaded", initDashboard);

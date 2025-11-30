async function laodDataAdmin() {
  try {
    const response = await axios.get("http://localhost:8000/users/admin", {
      withCredentials: true,
    });

    const admins = response.data.dataAdmin;
    const tableBody = document.getElementById("data")
    tableBody.innerHTML = "";

    admins.forEach((admin, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${admin.first_name}</td>
        <td>${admin.last_name}</td>
        <td>${admin.email}</td>
        <td>******</td>
        <td>${admin.role}</td>
      `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Gagal memuat data admin:", error);
  }
}

async function checkLoginUser() {
  try {
    const res = await axios.get("http://localhost:8000/auth/checkLogin", {
      withCredentials: true,
    });

    const data = res.data.user;


    if (data.role !== "admin") {
      window.location.href = "../../login.html";
      return;
    }

    if (res.status === 200) {
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

document.addEventListener("DOMContentLoaded", checkLoginUser);
document.addEventListener("DOMContentLoaded", laodDataAdmin);


window.addEventListener("load", () => {
  const status = localStorage.getItem("tambahSuccess");

  if (status) {
    const tambahAlert = document.getElementById("alert-tambah");

    tambahAlert.classList.add(
      "alert",
      "alert-success",
      "alert-dismissible",
      "fade",
      "show"
    );
    tambahAlert.setAttribute("role", "alert");

    tambahAlert.innerHTML = `
      <i class="fa fa-exclamation-circle me-2"></i>
      Data Admin Berhasil Ditambahkan
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close">
      </button>
    `;
    
    localStorage.removeItem("tambahSuccess");
  }
});

const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      if (res.data.statusCode === 200) {
        window.location.href = "../../login.html";
      } else {
        alert(res.data.message || "Gagal logout");
      }
    } catch (err) {
      console.error("Logout gagal:", err.response?.data || err);
      window.location.href = "../../login.html";
    }
  });
}


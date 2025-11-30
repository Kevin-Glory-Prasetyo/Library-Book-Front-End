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

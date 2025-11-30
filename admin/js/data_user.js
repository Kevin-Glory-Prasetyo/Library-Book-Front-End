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

async function laodDataUser() {
  try {
    const response = await axios.get("http://localhost:8000/users/user", {
      withCredentials: true,
    });

    const user = response.data.dataUser;
    const tableBody = document.getElementById("data")
    tableBody.innerHTML = "";

    user.forEach((usr, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${usr.first_name}</td>
        <td>${usr.last_name}</td>
        <td>${usr.email}</td>
        <td>******</td>
        <td>${usr.role}</td>
      `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Gagal memuat data User:", error);
  }
}

document.addEventListener("DOMContentLoaded", checkLoginUser);
document.addEventListener("DOMContentLoaded", laodDataUser);



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

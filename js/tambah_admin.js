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

const tambahBtn = document.querySelector(".btn-tambah");

tambahBtn.addEventListener("click", async (e) => {
  e.preventDefault(); // mencegah reload form

  const firstName = document.querySelector("#namaAwal").value;
  const lastName = document.querySelector("#namaAkhir").value;
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  try {
    const res = await axios.post(
      "http://localhost:8000/users/tambahAdmin",
      {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password
      },
      { withCredentials: true }
    );

    const data = res.data;

    if (data.statusCode === 200) {
      alert(data.message || "Admin berhasil ditambahkan");
      window.location.href = "data_admin.html";
    }
  } catch (err) {
    if (err.response) {
      alert(err.response.data.message);
    }
  }
});

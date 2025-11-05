const container = document.getElementById("container");
const toSignUp = document.getElementById("toSignUp");
const toLogin = document.getElementById("toLogin");

toSignUp.addEventListener("click", (e) => {
  e.preventDefault();
  container.classList.add("sign-up-mode");
});

toLogin.addEventListener("click", (e) => {
  e.preventDefault();
  container.classList.remove("sign-up-mode");
});

const loginBtn = document.querySelector(".sign-in button");

loginBtn.addEventListener("click", async () => {
  const email = document.querySelector(".sign-in input[type='email']").value;
  const password = document.querySelector(".sign-in input[type='password']").value;

  try {
    const res = await axios.post(
      "http://localhost:8000/auth/userLogin",
      {
        email: email,
        password: password,
      },
      { withCredentials: true } // penting agar cookie terkirim
    );

    const data = res.data;

    if (data.statusCode === 200) {
      alert("Anda Berhasil Login");
      if (data.user_data.role === "admin") {
        window.location.href = "dashboard_admin.html";
      } else {
        window.location.href = "Home.html";
      }
    } else {
      alert(data.message || "Terjadi kesalahan saat login");
    }
  } catch (err) {
    console.error(err);
    alert("Terjadi kesalahan server atau login gagal.");
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await axios.get("http://localhost:8000/auth/checkLogout", {
      withCredentials: true,
    });

    if (res.status === 200 && res.data.user) {
      const { user } = res.data;

      if (user.role === "admin") {
        window.location.href = "dashboard_admin.html";
      } else {
        window.location.href = "home.html";
      }
    }
  } catch (err) {
    console.log("Belum login atau token tidak valid");
  }
});


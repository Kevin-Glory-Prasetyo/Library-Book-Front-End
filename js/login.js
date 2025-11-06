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


// Sign Up
const signUpBtn = document.querySelector(".sign-up button");

signUpBtn.addEventListener("click", async () => {
  const firstName = document.querySelector(".sign-up input[placeholder='First Name']").value;
  const lastName = document.querySelector(".sign-up input[placeholder='Last Name']").value;
  const email = document.querySelector(".sign-up input[type='email']").value;
  const password = document.querySelector(".sign-up input[type='password']").value;

  try {
    const res = await axios.post(
      "http://localhost:5000/auth/userRegister",
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
      alert(data.message);
      window.location.href = "login.html";
    }
  } catch (err) {
    if (err.response) {
      alert(err.response.data.message);
    } else {
      alert("Terjadi kesalahan jaringan atau server");
      console.error(err);
    }
  }
});



const loginBtn = document.querySelector(".sign-in button");

loginBtn.addEventListener("click", async () => {
  const email = document.querySelector(".sign-in input[type='email']").value;
  const password = document.querySelector(".sign-in input[type='password']").value;

  try {
    const res = await axios.post(
      "http://localhost:5000/auth/userLogin",
      {
        email: email,
        password: password,
      },
      { withCredentials: true } 
    );

    const data = res.data;

    if (data.statusCode === 200) {
      alert(data.message);
      if (data.user_data.role === "admin") {
        window.location.href = "dashboard_admin.html";
      } else {
        window.location.href = "Home.html";
      }
    } 

  } catch (err) {
    if (err.response) {
      alert(err.response.data.message)
    }else{
      alert("Terjadi Kesalahan Jaringan atau Server")
      console.error(err);
    }
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await axios.get("http://localhost:5000/auth/checkLogout", {
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


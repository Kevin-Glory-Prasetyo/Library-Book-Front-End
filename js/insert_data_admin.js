const form = document.querySelector("form");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const first_name = document.getElementById("first_name").value;
  const last_name = document.getElementById("last_name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  

  const data = {
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: password,
  };

  axios.post("http://localhost:8000/users/tambahAdmin", data)
    .then(res => {
      window.location.href = "data_admin.html";
    })
    .catch(err => {
      console.error("Gagal tambah admin:", err);
      alert("Gagal menambahkan admin, cek console untuk detail.");
    });
});

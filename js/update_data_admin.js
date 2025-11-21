async function loadAdmin() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) return;

  try {
    const res = await axios.get(`http://localhost:8000/users/admin/${id}`);
    const get = res.data.data;
    console.log(get)

    document.getElementById("first_name").value = get.first_name;
    document.getElementById("last_name").value = get.last_name;
    document.getElementById("email").value = get.email;

  } catch (err) {
    console.error(err);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadAdmin();
});

const form = document.querySelector("form");

form.addEventListener("submit", function(e) {
  e.preventDefault();
  
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const first_name = document.getElementById("first_name").value;
  const last_name = document.getElementById("last_name").value;
  const email = document.getElementById("email").value;

  const data = {
    first_name: first_name,
    last_name: last_name,
    email: email,
  };

  axios.put(`http://localhost:8000/users/updateAdmin/${id}`, data)
    .then(res => {
      window.location.href = "data_admin.html";
    })
    .catch(err => {
      console.error("Gagal update admin:", err);
      alert("Gagal update admin, cek console untuk detail.");
    });
});


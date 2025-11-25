
document.addEventListener("DOMContentLoaded", () => {
  // --------- Utility helpers ----------
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => Array.from(document.querySelectorAll(sel));

  const safeText = (el, text) => { if (el) el.textContent = text ?? ""; };

  // --------- Elements ----------
  const profileBtn = document.getElementById("profileBtn");
  const dropdownMenu = document.getElementById("dropdownMenu");
  const logoutBtn = document.getElementById("logoutBtn");
  const namaPenggunaEl = document.getElementById("nama-pengguna");
  const emailPenggunaEl = document.getElementById("email-pengguna");
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".nav-links");
  const exportBtn = document.querySelector(".btn-export");
  const tableBody = document.querySelector(".table-container table tbody");

  // If table body is missing, create warning and return
  if (!tableBody) {
    console.warn("Tabel history tidak ditemukan di DOM (.table-container table tbody).");
  }

  // --------- 1) AUTH: check login and populate profile ----------
  (async function checkLoginAndFillProfile(){
    try {
      const res = await axios.get("http://localhost:8000/auth/checkLogin", { withCredentials: true });
      const data = res.data;
      if (res.status === 200 && data.user) {
        // jika role bukan user redirect
        if (data.user.role && data.user.role !== "user") {
          window.location.href = "dashboard_admin.html";
          return;
        }
        const fullName = `${data.user.first_name ?? ""} ${data.user.last_name ?? ""}`.trim();
        safeText(namaPenggunaEl, fullName || "Pengguna");
        safeText(emailPenggunaEl, data.user.email ?? "");
      } else {
        console.warn("Auth check returned non-200 or missing user:", data);
        // optional: redirect to login
        // window.location.href = "login.html";
      }
    } catch (err) {
      console.error("Auth check gagal:", err);
      // jika unauthorized, redirect ke login
      const status = err.response?.status;
      if (status === 401 || status === 403) {
        window.location.href = "login.html";
      }
    }
  })();

  // --------- 2) LOGOUT ----------
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      try {
        const res = await axios.post("http://localhost:8000/auth/logout", {}, { withCredentials: true });
        if (res.data?.statusCode === 200 || res.status === 200) {
          window.location.href = "login.html";
        } else {
          alert(res.data?.message || "Gagal logout");
        }
      } catch (err) {
        console.error("Logout error:", err.response?.data || err);
        window.location.href = "login.html";
      }
    });
  }

  // --------- 3) Dropdown profile & Mobile nav toggle ----------
  // guard
  if (profileBtn && dropdownMenu) {
    profileBtn.addEventListener("click", (ev) => {
      ev.stopPropagation();
      dropdownMenu.classList.toggle("show");
      profileBtn.classList.toggle("active");
    });
  }

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", (ev) => {
      ev.stopPropagation();
      navToggle.classList.toggle("is-open");
      // For mobile: toggle class 'is-open' that CSS uses
      mainNav.classList.toggle("is-open");
      // Also ensure visibility: CSS should handle, but fallback:
      if (window.innerWidth <= 900) {
        if (mainNav.style.display === "flex") mainNav.style.display = "none";
        else mainNav.style.display = "flex";
      }
    });

    // Close nav when link clicked (mobile)
    $$(".nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        navToggle.classList.remove("is-open");
        mainNav.classList.remove("is-open");
        mainNav.style.display = ""; // restore to CSS default
      });
    });
  }

  // Click outside to close dropdown / mobile nav
  document.addEventListener("click", (ev) => {
    if (dropdownMenu && profileBtn && !profileBtn.contains(ev.target) && !dropdownMenu.contains(ev.target)) {
      dropdownMenu.classList.remove("show");
      profileBtn.classList.remove("active");
    }
    if (mainNav && navToggle && mainNav.classList.contains("is-open") && !mainNav.contains(ev.target) && !navToggle.contains(ev.target)) {
      mainNav.classList.remove("is-open");
      navToggle.classList.remove("is-open");
      mainNav.style.display = "";
    }
  });

  // ESC key to close
  document.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape") {
      if (dropdownMenu) dropdownMenu.classList.remove("show");
      if (profileBtn) profileBtn.classList.remove("active");
      if (mainNav) mainNav.classList.remove("is-open");
      if (navToggle) navToggle.classList.remove("is-open");
      mainNav.style.display = "";
    }
  });

  // Responsive: ensure initial nav state
  const responsiveInit = () => {
    if (window.innerWidth <= 900) {
      if (mainNav && !navToggle.classList.contains("is-open")) {
        mainNav.style.display = "none";
      }
    } else {
      if (mainNav) mainNav.style.display = "";
    }
  };
  responsiveInit();
  window.addEventListener("resize", responsiveInit);

  // --------- 4) Ambil data history peminjaman user & render tabel ----------
  async function fetchAndRenderHistory() {
    if (!tableBody) return;
    try {
      // Ganti endpoint sesuai API Anda:
      const res = await axios.get("http://localhost:8000/peminjaman/user", { withCredentials: true });
      const rows = res.data?.data || res.data?.history || []; // fleksibel
      tableBody.innerHTML = "";
      if (!rows.length) {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.colSpan = 7;
        td.textContent = "Belum ada riwayat peminjaman";
        td.style.textAlign = "center";
        tr.appendChild(td);
        tableBody.appendChild(tr);
        return;
      }

      // render each row (sesuaikan nama kolom dari API)
      rows.forEach((r, idx) => {
        const tr = document.createElement("tr");

        const noTd = document.createElement("td");
        noTd.textContent = idx + 1;

        const judulTd = document.createElement("td");
        judulTd.textContent = r.judul_buku || r.book_title || "-" ;

        const tglPinjamTd = document.createElement("td");
        const tglKembaliTd = document.createElement("td");
        const tglPengembalianTd = document.createElement("td");
        const statusPinjamTd = document.createElement("td");
        const statusKembaliTd = document.createElement("td");

        tglPinjamTd.textContent = r.tanggal_pinjam || r.tgl_pinjam || r.borrow_date || "-";
        tglKembaliTd.textContent = r.tanggal_kembali || r.tgl_kembali || r.due_date || "-";
        tglPengembalianTd.textContent = r.tanggal_pengembalian || r.tgl_pengembalian || r.return_date || "-";
        statusPinjamTd.textContent = r.status_peminjaman || r.borrow_status || "-";
        statusKembaliTd.textContent = r.status_pengembalian || r.return_status || "-";

        // center align all td (table css already handles but keep consistent)
        [noTd, judulTd, tglPinjamTd, tglKembaliTd, tglPengembalianTd, statusPinjamTd, statusKembaliTd].forEach(td => {
          td.style.textAlign = "center";
          tr.appendChild(td);
        });

        tableBody.appendChild(tr);
      });
    } catch (err) {
      console.error("Gagal memuat history peminjaman:", err);
      // show message in table
      if (tableBody) {
        tableBody.innerHTML = '<tr><td colspan="7" style="text-align:center;color:#a00">Gagal memuat data. Periksa koneksi atau API.</td></tr>';
      }
    }
  }

  // Initial load
  fetchAndRenderHistory();

  // --------- 5) Export CSV (dari tabel) ----------
  function tableToCSV(tableEl) {
    const rows = Array.from(tableEl.querySelectorAll("tr"));
    return rows.map(row => {
      const cols = Array.from(row.querySelectorAll("th, td"));
      return cols.map(c => {
        // escape double quotes
        let txt = c.textContent.trim().replace(/"/g, '""');
        // wrap value in quotes if contains comma/newline/quote
        if (txt.includes(",") || txt.includes("\n") || txt.includes('"')) {
          txt = `"${txt}"`;
        }
        return txt;
      }).join(",");
    }).join("\n");
  }

  if (exportBtn) {
    exportBtn.addEventListener("click", (ev) => {
      ev.preventDefault();
      const tableEl = document.querySelector(".table-container table");
      if (!tableEl) { alert("Tabel tidak ditemukan."); return; }
      const csv = tableToCSV(tableEl);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const dateStr = new Date().toISOString().slice(0,10);
      a.download = `history_peminjaman_${dateStr}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }

  // Optional: expose fetch function to console for debugging
  window.__fetchHistory = fetchAndRenderHistory;
});


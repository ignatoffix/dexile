document.addEventListener("DOMContentLoaded", () => {

    const API_URL = "http://de1.the-ae.ovh:25697";
    const token = localStorage.getItem("token");

    if (!token) {
        location.href = "login.html";
        return;
    }

    const usernameEl = document.getElementById("usernameDisplay");
    const createdAtEl = document.getElementById("createdAtDisplay");
    const logoutBtn = document.getElementById("logoutBtn");

    // ===== ЗАГРУЗКА ПРОФИЛЯ =====
    fetch(`${API_URL}/api/me`, {
        headers: {
            "Authorization": "Bearer " + token
        }
    })
    .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
    })
    .then(data => {
        usernameEl.textContent = data.username;

        if (createdAtEl && data.createdAt) {
            const date = new Date(data.createdAt);
            createdAtEl.textContent = date.toLocaleString("ru-RU");
        }
    })
    .catch(() => {
        localStorage.removeItem("token");
        location.href = "login.html";
    });

    // ===== ВЫХОД =====
    if (logoutBtn) {
        logoutBtn.addEventListener("click", e => {
            e.preventDefault();
            localStorage.removeItem("token");
            location.href = "login.html";
        });
    }

});

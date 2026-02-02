document.addEventListener("DOMContentLoaded", () => {

    const API_URL = "http://de1.the-ae.ovh:25697";
    const token = localStorage.getItem("token");
    if (!token) return;

    const openBtn = document.getElementById("openSecurityModal");
    const modal = document.getElementById("securityModal");
    const closeBtn = document.getElementById("closeSecurityModal");

    const changePasswordBtn = document.getElementById("changePasswordBtn");
    const oldPasswordInput = document.getElementById("oldPassword");
    const newPasswordInput = document.getElementById("newPassword");

    // ===== ОТКРЫТЬ МОДАЛКУ =====
    if (openBtn) {
        openBtn.addEventListener("click", e => {
            e.preventDefault();
            modal.classList.add("active");
        });
    }

    // ===== ЗАКРЫТЬ =====
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            modal.classList.remove("active");
        });
    }

    modal.addEventListener("click", e => {
        if (e.target === modal) {
            modal.classList.remove("active");
        }
    });

    // ===== СМЕНА ПАРОЛЯ =====
    if (changePasswordBtn) {
        changePasswordBtn.addEventListener("click", () => {
            const oldPassword = oldPasswordInput.value;
            const newPassword = newPasswordInput.value;

            fetch(`${API_URL}/api/security/password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                },
                body: JSON.stringify({ oldPassword, newPassword })
            })
            .then(res => res.json())
            .then(data => {
                alert(data.message || "Пароль изменён");
                oldPasswordInput.value = "";
                newPasswordInput.value = "";
            })
            .catch(() => {
                alert("Ошибка");
            });
        });
    }

});

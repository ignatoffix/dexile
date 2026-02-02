// === НАСТРОЙКА ===
const API_URL = "http://de1.the-ae.ovh:25697";

const form = document.getElementById("registerForm");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (username.length < 3) {
        alert("Логин должен быть минимум 3 символа");
        return;
    }

    if (password.length < 8) {
        alert("Пароль должен быть минимум 8 символов");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/api/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "Ошибка регистрации");
            return;
        }

        alert("Регистрация успешна! Теперь войдите.");
        window.location.href = "login.html";

    } catch (err) {
        console.error(err);
        alert("Ошибка соединения с сервером");
    }
});

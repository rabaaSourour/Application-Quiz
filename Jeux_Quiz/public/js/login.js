document.querySelector(".login-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("login-name").value.trim();
    const password = document.getElementById("login-password").value.trim();

    try {
        const response = await fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({ email, password })
        });

        if (response.redirected) {
            window.location.href = response.url;
        } else {
            alert("Identifiants incorrects.");
        }
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
    }
});

function loginUser() {
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    if (username && password) {
        fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                localStorage.setItem("isAuthenticated", true);
                window.location.href = "index.html";
            } else {
                alert("Nom d'utilisateur ou mot de passe incorrect.");
            }
        })
        .catch(err => {
            console.error("Erreur de connexion au serveur :", err);
        });
    } else {
        alert("Veuillez remplir tous les champs.");
    }
}

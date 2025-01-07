function registerUser() {
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    if (username && password) {
        fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Utilisateur enregistré avec succès !");
                window.location.href = 'login.html';
            } else {
                alert("Erreur lors de l'enregistrement. Veuillez réessayer.");
            }
        })
        .catch(err => {
            console.error("Erreur de connexion au serveur :", err);
        });
    } else {
        alert("Veuillez remplir tous les champs.");
    }
}
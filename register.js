function registerUser() {
    const username = document.getElementById("username").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    if (username && email && password) {
        fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, email, password })
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
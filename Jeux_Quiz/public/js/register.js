function registerUser() {
    event.preventDefault();
    const name = document.getElementById("name").value
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    if (name && email && password) {
        fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert("Utilisateur enregistré avec succès !");
                window.location.href = '/login';
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

document.querySelector(".register-form").addEventListener("submit", registerUser);
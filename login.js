function loginUser() {
    const username = document.getElementById("login-username").value
    const password = document.getElementById("login-password").value

    const storedUsername = localStorage.getItem("username")
    const storePassword = localStorage.getItem("password")

    if (username === storedUsername && password === storePassword) {
        localStorage.setItem("isAuthenticated", true)
        window.location.href = "index.html"
    } else {
        alert("Nom d'utilisateur ou mot de passe incorrect.")
    }
}
function calculateScore(callback) {
    const correctAnswers = {
        q1: "Paris",
        q2: "Mercure",
        q3: "Jupitaire",
    }


    const form = document.getElementById("quiz-form")
    let score = 0

    for (const question in correctAnswers) {
        const userAnswer = form[question].value
        if (userAnswer === correctAnswers[question]) {
            score++
        }
    }

    callback(score)
}

function displayReselt(score, callback) {
    const resultDiv = document.getElementById("result")
    resultDiv.innerHTML = 'votre score est de ${score}'

    callback(score)
}

function handleMessage(score) {
    const resultDiv = document.getElementById("result")
    resultDiv.classList.remove("excellent", "good", "try-again")
    if (score === 3) {
        resultDiv.innerHTML += "<br> Exellent !"
        resultDiv.classList.add("exellent")
    } else if (score === 2) {
        resultDiv.innerHTML += "<br> bon travail !"
        resultDiv.classList.add("good")
    } else {
        resultDiv.innerHTML += "<br> vous pouver faire mieux !"
        resultDiv.classList.add("try-again !")
    }
}

function submitQuiz() {
    calculateScore(function (score) {
        displayReselt(score, function () {
            handleMessage(score)
        })
    })
}

function registerUser() {
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    if (username && password) {
        localStorage.setItem("username", username)
        localStorage.setItem("password", password)
        alert("Inscription reussie ! vous pouvez maintenet vous connecter.")
    } else {
        alert("Veuillez remplir tous les champs")
    }
}

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

function checkAuth() {
const isAuthenticated = localStorage.getItem("isAuthenticated")

if (isAuthenticated !== "true") {
    alert("Vellez vous connecter pour accéder ou quizz")

}
}

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

function checkAuth() {
    const isAuthenticated = localStorage.getItem("isAuthenticated")

    if (isAuthenticated !== "true") {
        alert("Vellez vous connecter pour accéder ou quizz")

    }
}

function showUserMenu(username) {
    const usernameDisplay = document.getElementById(username - display)
    usernameDisplay.textContent = storedUsername

}

document.addEventListener('DOMContentLoaded', function () {
    const storedUsername = localStorage.getItem('username')
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    if (storedUsername && (isAuthenticated == "true")) {
        showUserMenu(storedUsername)
    } else {
        window.location.href = "login.html"
    }
})

document.getElementById("logout-btn").addEventListener("click", function () {
    localStorage.setItem("isAuthenticated", false)
    window.location.href = "login.html"
})

let currentQuestionIndex = 0
let questions = []
let selectedDifficulty = ""

async function loadQuestions(difficulty) {
console.log("difficulté choisie" + difficulty)

    try {
        const response = await fetch("questions.json")
        questions = await response.json()

        const FilteredQuestions = questions.filter(
            (q) => q.difficulty === difficulty
        )
        selectedDifficulty = difficulty 
        let currentQuestionIndex = 0

        startQuiz()
    } catch (error) {
        console.log("Erreur lors du chargement des queqtions", error)
    }
}

function startQuiz(){
    document.querySelector('.difficulty-btn').classList.add("hidden")
    document.getElementById('quiz-container').classList.remove("hidden")
    showQuestion();
}

function showQuestion(){
    if(currentQuestionIndex< questions.length){
        const questionData = question[currentQuestionIndex]
        console.log("question data" + questionData)
    }
}

document.querySelectorAll(".difficulty-btn").forEach(btn => {
    btn.addEventListener("click", function () {
        const level = btn.getAttribute("data-level");
        loadQuestions(level);
    });
});

let currentQuestionIndex = 0
let questions = []
let selectedDifficulty = ""
let score = 0
let timeLimit = 10
let timeRemaining = 0
let timer 

const url =
    "https://4caed1f0-e49f-4ab6-a038-9ed66d622bfe.mock.pstmn.io/api/quiz"

async function loadQuestions(difficulty) {
    try {
        const response = await fetch(url)
        if (!response.ok){
            throw new Error(`Erreur http : ${response.status}`)
        }

        const AllQuestions = await response.json()

        questions = AllQuestions.questions.filter((q) => q.difficulty === difficulty);
        selectedDifficulty = difficulty
        currentQuestionIndex = 0
        document.getElementById('progress-bar').classList.add("hidden")

        startQuiz()
    } catch (error) {
        console.log("Erreur lors du chargement des questions", error)
    }
}

function startQuiz() {
    document.querySelector('.difficulty-btn').classList.add("hidden")
    document.getElementById('quiz-container').classList.remove("hidden")
    showQuestion();
}

function showQuestion() {
    document.getElementById('progress-bar').classList.remove("hidden")
    if (currentQuestionIndex < questions.length) {

        const questionData = questions[currentQuestionIndex]
        console.log("question data" + questionData)
        const questionContainer = document.getElementById("quiz-container")

        questionContainer.innerHTML =
            `
        <div class = "question">
        <p>${questionData.question}</p>
        </div>

        <form id ="quiz-form">
        ${questionData.options
                .map((option, index) =>
                    `
            <label>
            <input type="radio" name="answer" value="${option}">
            <span class="custom-radio"></span>
            ${option}
            </label>

            `
                )
                .join("")}
            <button type="button" onClick="submitAnswer()"> Soumettre </button>
        `
        startTimer()
    } else {
        showFinalResult()
    }
}

function startTimer() {
    timeRemaining = timeLimit
    updateProgressBar()
    timer = setInterval(() => {
        timeRemaining--
        updateProgressBar()
        if (timeRemaining <= 0) {
            clearInterval(timer)
            nextQuestion()
        }
    }, 1000);
}

function nextQuestion() {
    currentQuestionIndex++
    showQuestion()
}

function updateProgressBar() {
    const progressBar = document.getElementById("progress-bar")
    const progress = (timeRemaining / timeLimit) * 100
    progressBar.style.width = `${progress}%`

    if (progress <= 30) {
        progressBar.style.backgroundColor = "#e74C3C"
    } else if (progress <= 60) {
        progressBar.style.backgroundColor = "#f5c400"
    } else if (progress > 60) {
        progressBar.style.backgroundColor = "#0dff00";
    }
}

function stopTimer() {
    clearInterval(timer)
}

function submitAnswer() {
    stopTimer()
    const form = document.getElementById("quiz-form")
    const selectedAnswer = form.answer.value

    if (!selectedAnswer) {
        alert("veuillez sélectionner une réponse.")
        return
    }

    checkAnswer(selectedAnswer)
    currentQuestionIndex++
    showQuestion()
}

function checkAnswer(selectedAnswer) {
    const currentQuestion = questions[currentQuestionIndex]
    if (selectedAnswer === currentQuestion.answer) {
        incrementScore()
    }
}

function incrementScore() {
    score++
}

function showFinalResult() {
    const quizContainer = document.getElementById("quiz-container");
    quizContainer.innerHTML = `
        <div id="result">
            <p>Votre score final est de ${score} sur ${questions.length}.</p>
            <button onclick="window.location.href='index.html'">Reprendre le quiz</button>
        </div>
    `;
}


document.querySelectorAll(".difficulty-btn").forEach(btn => {
    btn.addEventListener("click", function () {
        const level = btn.getAttribute("data-level");
        loadQuestions(level);
    });
});

// document.addEventListener('DOMContentLoaded', function () {
//     const storedUsername = localStorage.getItem('username')
//     const isAuthenticated = localStorage.getItem('isAuthenticated')
//     if (storedUsername && (isAuthenticated == "true")) {
//         showUserMenu(storedUsername)
//     } else {
//         window.location.href = "login.html"
//     }
// })

function checkAuth() {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (isAuthenticated !== "true") {
        alert("Veillez vous connecter pour accéder ou quizz")

    }
}

function showUserMenu(username) {
    const usernameDisplay = document.getElementById('username-display')
    usernameDisplay.textContent = Username

}

document.getElementById("logout-btn").addEventListener("click", function () {
    localStorage.setItem("isAuthenticated", "false")
    window.location.href = "login.html"
})



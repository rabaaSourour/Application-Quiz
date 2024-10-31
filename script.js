let currentQuestionIndex = 0
let questions = []
let selectedDifficulty = ""
let score = 0

async function loadQuestions(difficulty) {
    console.log("difficulté choisie" + difficulty)

    try {
        const response = await fetch("questions.json")
        const AllQuestions = await response.json()

        questions = AllQuestions.filter((q) => q.difficulty === difficulty)
        selectedDifficulty = difficulty
        let currentQuestionIndex = 0

        startQuiz()
    } catch (error) {
        console.log("Erreur lors du chargement des queqtions", error)
    }
}

function startQuiz() {
    document.querySelector('.difficulty-btn').classList.add("hidden")
    document.getElementById('quiz-container').classList.remove("hidden")
    showQuestion();
}

function showQuestion() {
    if (currentQuestionIndex < questions.length) {

        const questionData = question[currentQuestionIndex]
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
            <label type="radio" name="answer" value="${option}">${option}</label>

                `)
                .join("")}
            <button type="button" onClick="submitAnswer()"> Soumettre </button>
        `
    } else {
        showFinalResult()
    }
}

function submitAnswer(){
    const form = document.getElementById("quiz-form")
    const selectedAnswer = form.answer.value

    if (!selectedAnswer){
        alert("veuillez sélectionner une réponse.")
        return
    }
    checkAnswer(selectedAnswer)
}

function checkAnswer(selectedAnswer){
    const cuerrentQuestion = questions[currentQuestionIndex]
    if(selectedAnswer === cuerrentQuestion.answer){
        incrementScore()
    }
}

function incrementScore(){
    score++
}

function showFinalResult(){
    const quizContainer = document.getElementById("quiz-container")
    quizContainer.innerHTML =

    `
    <div id="result">
    <p>Votre score final est de ${score} sur ${questions.length}.</p>
    </div>
    `
}

document.querySelectorAll(".difficulty-btn").forEach(btn => {
    btn.addEventListener("click", function () {
        const level = btn.getAttribute("data-level");
        loadQuestions(level);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const storedUsername = localStorage.getItem('username')
    const isAuthenticated = localStorage.getItem('isAuthenticated')
    if (storedUsername && (isAuthenticated == "true")) {
        showUserMenu(storedUsername)
    } else {
        window.location.href = "login.html"
    }
})

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

document.getElementById("logout-btn").addEventListener("click", function () {
    localStorage.setItem("isAuthenticated", false)
    window.location.href = "login.html"
})


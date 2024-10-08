function submitQuiz() {
    
    const correctAnswers = {
        q1: "Paris",
        q2: "Mercure",
        q3: "Jupitaire",
    }

    const form = document.getElementById("quiz-form")
    let score = 0

    for(const question in correctAnswers){
        const userAnswer = form[question].value
        if (userAnswer === correctAnswers[question]){
            score++
        }
    }

    const resultDiv = document.getElementById("result")
    resultDiv.innerHTML = 'votre score est de ${score}'
    
    if (score === 3) {
        resultDiv.innerHTML += "<br> Exellent !"
    } else if (score === 2){
        resultDiv.innerHTML += "<br> bon travail !"
    } else {
        resultDiv.innerHTML += "<br> vous pouver faire mieux !"
    }
}
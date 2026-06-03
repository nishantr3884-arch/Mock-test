// 1. JSON Data (AI theek yahi format dega database ke liye)
const quizData = [
    {
        question: "Who was the first President of India?",
        options: ["Jawaharlal Nehru", "Dr. Rajendra Prasad", "B.R. Ambedkar", "Mahatma Gandhi"],
        correct: 1 // Index 1 yani Dr. Rajendra Prasad
    },
    {
        question: "What is the capital of Uttar Pradesh?",
        options: ["Lucknow", "Kanpur", "Varanasi", "Agra"],
        correct: 0
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60; // 60 seconds ka test
let timerInterval;

// Elements DOM se fetch kar rahe hain
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");
const timerDisplay = document.getElementById("time");

// 2. Load Question Function
function loadQuestion() {
    nextBtn.style.display = "none";
    const currentData = quizData[currentQuestionIndex];
    questionText.innerText = `Q${currentQuestionIndex + 1}: ${currentData.question}`;
    optionsContainer.innerHTML = ""; // Purane options clear karo

    currentData.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerText = option;
        button.classList.add("option-btn");
        button.onclick = () => selectAnswer(index);
        optionsContainer.appendChild(button);
    });
}

// 3. Select Answer Logic
function selectAnswer(selectedIndex) {
    const currentData = quizData[currentQuestionIndex];
    if (selectedIndex === currentData.correct) {
        score += 2; // Har sahi answer par 2 marks
    } else {
        score -= 0.5; // Negative marking set kar di
    }
    
    nextBtn.style.display = "block";
    
    // Ek baar select karne ke baad buttons disable kar do
    const buttons = document.querySelectorAll(".option-btn");
    buttons.forEach(btn => btn.disabled = true);
}

// 4. Timer Logic
function startTimer() {
    timerInterval = setInterval(() => {
        timeLeft--;
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        timerDisplay.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            showResults();
        }
    }, 1000);
}

// 5. Next Button Click
nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

// 6. Show Results & Auto-Submit
function showResults() {
    clearInterval(timerInterval);
    document.getElementById("quiz-container").style.display = "none";
    const resultContainer = document.getElementById("result-container");
    resultContainer.style.display = "block";
    document.getElementById("score").innerText = `${score} Marks`;
}

// 7. Anti-Cheat (Tab Switch Warning)
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        alert("Warning: Tab switching is not allowed! Practice honest mock tests.");
    }
});

// Test start karo
startTimer();
loadQuestion();


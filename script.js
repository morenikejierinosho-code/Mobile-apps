const bgMusic = new Audio("background-music.mp3");

bgMusic.loop = true;
bgMusic.volume = 0.4;

let activeCategory = "Programming";
let activeDifficulty = "Easy";
let activeQuestionCount = 15;

let questionDeck = [];
let currentQuestionIndex = 0;
let correctAnswersCount = 0;
let liveStreakCounter = 0;
let countdownTimer;
const MAX_TIME_PER_QUESTION = 15;

const configContainer = document.querySelector(".config-container");
const quizContainer = document.querySelector(".quiz-container");
const resultContainer = document.querySelector(".result-container");

const categoryButtons = document.querySelectorAll(".category-options button");
const difficultyButtons = document.querySelectorAll(".difficulty-options button");
const questionNumButtons = document.querySelectorAll(".question-options button");
const startQuizBtn = document.querySelector(".start-quiz-btn");
const tryAgainBtn = document.querySelector(".try-again-btn");
const nextQuestionBtn = document.querySelector(".next-question-btn");

const hubTabs = document.querySelectorAll(".nav-tab");
const hubPanels = document.querySelectorAll(".hub-panel");
const themeToggle = document.getElementById("theme-toggle-input");
const soundToggle = document.getElementById("sound-toggle-input");

soundToggle.checked = true;

hubTabs.forEach(tab => {
    tab.addEventListener("click", () => {
        hubTabs.forEach(t => t.classList.remove("active"));
        hubPanels.forEach(p => p.classList.remove("active"));
        
        tab.classList.add("active");
        const targetedPanel = tab.getAttribute("data-target");
        document.getElementById(targetedPanel).classList.add("active");
    });
});

window.addEventListener("DOMContentLoaded", () => {
    const introOverlay = document.createElement("div");
    introOverlay.className = "game-intro-overlay active";
    introOverlay.innerHTML = `
        <div class="intro-content">
            <div class="intro-logo"><span class="material-symbols-rounded">sports_esports</span></div>
            <h1 class="intro-title">QUIZARENA</h1>
            <p class="intro-tagline">Test Your Knowledge • Outsmart The Clock • Build Your Streak</p>
            <button class="press-start-btn">
                <span>START APP</span>
                <span class="material-symbols-rounded">play_arrow</span>
            </button>
        </div>
    `;
    document.body.appendChild(introOverlay);

    const startBtn = introOverlay.querySelector(".press-start-btn");
    startBtn.addEventListener("click", () => {
        introOverlay.classList.remove("active");
        setTimeout(() => {
            introOverlay.remove();
            configContainer.classList.add("active");
            if (soundToggle.checked) {
                bgMusic.play().catch(err => console.log("Audio permission deferred."));
            }
        }, 500);
    });
});

themeToggle.addEventListener("change", () => {
    if (themeToggle.checked) {
        document.body.classList.add("dark-theme");
    } else {
        document.body.classList.remove("dark-theme");
    }
});

soundToggle.addEventListener("change", () => {
    if (soundToggle.checked) {
        bgMusic.play().catch(e => console.log(e));
    } else {
        bgMusic.pause();
    }
});

categoryButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        categoryButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        activeCategory = btn.textContent.trim();
    });
});

difficultyButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        difficultyButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        activeDifficulty = btn.textContent.trim();
    });
});

questionNumButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        questionNumButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        activeQuestionCount = parseInt(btn.textContent.trim(), 10);
    });
});

startQuizBtn.addEventListener("click", () => {
    const filteredQuestions = quizQuestions.filter(q => 
        q.category.toLowerCase() === activeCategory.toLowerCase()
    );

    if (filteredQuestions.length === 0) {
        alert(`Notice: No questions currently loaded for ${activeCategory}.`);
        return;
    }

    questionDeck = filteredQuestions.sort(() => Math.random() - 0.5).slice(0, activeQuestionCount);

    configContainer.classList.remove("active");
    quizContainer.classList.add("active");

    currentQuestionIndex = 0;
    correctAnswersCount = 0;
    liveStreakCounter = 0;
    
    document.querySelector(".quiz-streak").style.display = "none";
    document.querySelector(".quiz-title").textContent = `${activeCategory} Quiz`;

    loadNextQuestion();
});

function loadNextQuestion() {
    clearInterval(countdownTimer);
    nextQuestionBtn.style.visibility = "hidden";
    
    const currentQuestionData = questionDeck[currentQuestionIndex];

    document.querySelector(".question-status").innerHTML = `Question <b>${currentQuestionIndex + 1}</b> of <b>${questionDeck.length}</b>`;
    document.querySelector(".question-text").textContent = currentQuestionData.question;

    const fillPercent = ((currentQuestionIndex) / questionDeck.length) * 100;
    document.querySelector(".progress-bar-fill").style.width = `${fillPercent}%`;

    const answerContainer = document.querySelector(".answer-options");
    answerContainer.innerHTML = "";
    answerContainer.classList.remove("disabled");

    currentQuestionData.options.forEach(option => {
        const li = document.createElement("li");
        li.className = "answer-option";
        li.innerHTML = `
            <p>${option}</p>
            <span class="icon material-symbols-rounded">radio_button_unchecked</span>
        `;
        li.addEventListener("click", () => handleSelectedAnswer(li, option, currentQuestionData.correctAnswer));
        answerContainer.appendChild(li);
    });

    startQuestionCountdown();
}

function startQuestionCountdown() {
    let internalClockTime = MAX_TIME_PER_QUESTION;
    const timeDisplayNode = document.querySelector(".time-duration");
    timeDisplayNode.textContent = internalClockTime;

    countdownTimer = setInterval(() => {
        internalClockTime--;
        timeDisplayNode.textContent = internalClockTime;

        if (internalClockTime <= 0) {
            clearInterval(countdownTimer);
            handleTimeoutExhaustion();
        }
    }, 1000);
}

function handleTimeoutExhaustion() {
    const answerContainer = document.querySelector(".answer-options");
    answerContainer.classList.add("disabled");

    const correctAnswerStr = questionDeck[currentQuestionIndex].correctAnswer;
    const itemNodes = answerContainer.querySelectorAll(".answer-option");

    itemNodes.forEach(node => {
        if (node.querySelector("p").textContent.trim() === correctAnswerStr) {
            node.classList.add("correct");
            node.querySelector(".icon").textContent = "check_circle";
        }
    });

    liveStreakCounter = 0;
    document.querySelector(".quiz-streak").style.display = "none";

    revealNavigationControls();
}

function handleSelectedAnswer(selectedElement, selectedValue, correctValue) {
    clearInterval(countdownTimer);
    const answerContainer = document.querySelector(".answer-options");
    answerContainer.classList.add("disabled");

    const itemNodes = answerContainer.querySelectorAll(".answer-option");

    if (selectedValue === correctValue) {
        selectedElement.classList.add("correct");
        selectedElement.querySelector(".icon").textContent = "check_circle";
        correctAnswersCount++;
        liveStreakCounter++;

        if (liveStreakCounter >= 2) {
            const streakDisplay = document.querySelector(".quiz-streak");
            streakDisplay.style.display = "flex";
            streakDisplay.innerHTML = `<span class="material-symbols-rounded" style="color: #f59e0b;">local_fire_department</span> Streak x${liveStreakCounter}`;
        }
    } else {
        selectedElement.classList.add("incorrect");
        selectedElement.querySelector(".icon").textContent = "cancel";
        liveStreakCounter = 0;
        document.querySelector(".quiz-streak").style.display = "none";

        itemNodes.forEach(node => {
            if (node.querySelector("p").textContent.trim() === correctValue) {
                node.classList.add("correct");
                node.querySelector(".icon").textContent = "check_circle";
            }
        });
    }

    revealNavigationControls();
}

function revealNavigationControls() {
    if (currentQuestionIndex === questionDeck.length - 1) {
        nextQuestionBtn.innerHTML = `<span>View Results</span><span class="material-symbols-rounded">emoji_events</span>`;
    } else {
        nextQuestionBtn.innerHTML = `<span>Next Question</span><span class="material-symbols-rounded">arrow_forward</span>`;
    }
    nextQuestionBtn.style.visibility = "visible";
}

nextQuestionBtn.addEventListener("click", () => {
    if (currentQuestionIndex < questionDeck.length - 1) {
        currentQuestionIndex++;
        loadNextQuestion();
    } else {
        renderEndgameSummaryView();
    }
});

function renderEndgameSummaryView() {
    quizContainer.classList.remove("active");
    resultContainer.classList.add("active");

    const totalQuestions = questionDeck.length;
    const exactPercentageScore = Math.round((correctAnswersCount / totalQuestions) * 100);

    let evaluationHeading = "Quiz Completed!";
    if (exactPercentageScore >= 80) {
        evaluationHeading = "Grandmaster Performance!";
    } else if (exactPercentageScore >= 50) {
        evaluationHeading = "Great Effort!";
    }

    document.querySelector(".result-title").textContent = evaluationHeading;
    document.querySelector(".result-score-details").innerHTML = `
        You answered <b>${correctAnswersCount}</b> out of <b>${totalQuestions}</b> questions correctly.<br>
        Final Score: <b>${exactPercentageScore}%</b>
    `;
}

tryAgainBtn.addEventListener("click", () => {
    resultContainer.classList.remove("active");
    configContainer.classList.add("active");
    document.querySelector(".progress-bar-fill").style.width = `0%`;
});

tryAgainBtn.addEventListener("click", () => {
    resultContainer.classList.remove("active");
    configContainer.classList.add("active");
    document.querySelector(".progress-bar-fill").style.width = `0%`;
});

const feedbackForm = document.getElementById("userFeedbackForm");
const formSuccessMessage = document.getElementById("formSuccessMessage");

if (feedbackForm) {
    feedbackForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const username = document.getElementById("feedbackName").value;
        const rating = document.getElementById("feedbackRating").value;
        const comments = document.getElementById("feedbackComments").value;

        console.log("--- New User Feedback Submitted ---");
        console.log("Player Name:", username);
        console.log("Star Rating Given:", rating + "/5");
        console.log("Comments Box:", comments);
        
        feedbackForm.reset();
        
        formSuccessMessage.style.display = "block";
        setTimeout(() => {
            formSuccessMessage.style.display = "none";
        }, 4000);
    });
}
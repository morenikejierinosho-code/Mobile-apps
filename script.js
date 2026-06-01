// Database housing distinct questions mapped to match the wheel setup layout
const triviaDatabase = {
    art: [
        { q: "Who painted the Mona Lisa?", o: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"], c: "Leonardo da Vinci" },
        { q: "Which art movement is Salvador Dalí associated with?", o: ["Surrealism", "Cubism", "Impressionism", "Pop Art"], c: "Surrealism" }
    ],
    entertainment: [
        { q: "Which movie features the character Simba?", o: ["Aladdin", "The Lion King", "Tarzan", "Frozen"], c: "The Lion King" },
        { q: "How many Academy Awards did the movie Titanic win?", o: ["8", "11", "14", "9"], c: "11" }
    ],
    geography: [
        { q: "What is the capital city of France?", o: ["London", "Berlin", "Madrid", "Paris"], c: "Paris" },
        { q: "Which is the largest ocean on Planet Earth?", o: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"], c: "Pacific Ocean" }
    ],
    sports: [
        { q: "How many players are on a soccer field for one team?", o: ["9", "10", "11", "12"], c: "11" },
        { q: "Olympic games are held after every how many years?", o: ["2 years", "4 years", "5 years", "3 years"], c: "4 years" }
    ],
    science: [
        { q: "What is the closest planet to the Sun?", o: ["Venus", "Mars", "Mercury", "Earth"], c: "Mercury" },
        { q: "What is the chemical symbol for water?", o: ["H2O", "CO2", "O2", "NaCl"], c: "H2O" }
    ],
    history: [
        { q: "In which year did World War II end?", o: ["1941", "1943", "1945", "1950"], c: "1945" },
        { q: "Who was the first President of the United States?", o: ["Abraham Lincoln", "Thomas Jefferson", "George Washington", "John Adams"], c: "George Washington" }
    ]
};

// Alignment maps managing clockwise wheel sector indices 
const categoriesOrder = ['art', 'entertainment', 'geography', 'sports', 'science', 'history'];

// Game State profile architecture models
let earnedCrowns = { art: false, entertainment: false, geography: false, sports: false, science: false, history: false };
let currentCategory = "";
let currentQuestion = null;
let isSpinning = false;
let currentRotation = 0;

// Gather Interactive DOM references
const wheel = document.getElementById('trivia-wheel');
const spinBtn = document.getElementById('spin-btn');
const wheelStatus = document.getElementById('wheel-status');
const wheelScreen = document.getElementById('wheel-screen');
const quizScreen = document.getElementById('quiz-screen');
const victoryScreen = document.getElementById('victory-screen');

const categoryBadge = document.getElementById('category-badge');
const questionText = document.getElementById('question-text');
const answerOptions = document.getElementById('answer-options');
const nextBtn = document.getElementById('next-btn');

const settingsBtn = document.getElementById('settings-btn');
const closeSettingsBtn = document.getElementById('close-settings');
const settingsPanel = document.getElementById('settings-panel');
const darkModeToggle = document.getElementById('dark-mode-toggle');
const resetGameBtn = document.getElementById('reset-game-btn');
const playAgainBtn = document.getElementById('play-again-btn');

// --- 1. LOCALSTORAGE PERSISTENCE ENGINE ---
function saveGameState() {
    localStorage.setItem('trivia_crack_crowns', JSON.stringify(earnedCrowns));
}

function loadGameState() {
    const saved = localStorage.getItem('trivia_crack_crowns');
    if (saved) {
        earnedCrowns = JSON.parse(saved);
        Object.keys(earnedCrowns).forEach(cat => {
            if (earnedCrowns[cat]) {
                const el = document.getElementById(`crown-${cat}`);
                if (el) {
                    el.classList.remove('disabled');
                    el.classList.add('earned');
                }
            }
        });
        checkVictoryCondition(false); // Evaluate for victory without display jumps instantly
    }
}

// --- 2. INTERACTIVE SPINNING WHEEL ENGINE ---
spinBtn.addEventListener('click', () => {
    if (isSpinning) return;
    isSpinning = true;
    wheelStatus.innerText = "Spinning...";

    const randomDeg = Math.floor(Math.random() * 360);
    // Add cumulative calculation values to enforce progressive continuous forward rotations 
    currentRotation += 1800 + randomDeg; 
    
    // Set transition parameters and transform values dynamically
    wheel.style.transition = "transform 4s cubic-bezier(0.1, 0.8, 0.1, 1)";
    wheel.style.transform = `rotate(${currentRotation}deg)`;

    setTimeout(() => {
        isSpinning = false;
        
        // Calculate category under pointer (pointer is at top = 0 deg reference)
        const absoluteDegrees = currentRotation % 360;
        const normalizedDeg = (360 - absoluteDegrees) % 360;
        const sectorIndex = Math.floor(normalizedDeg / 60);
        currentCategory = categoriesOrder[sectorIndex];

        wheelStatus.innerText = `Selected: ${currentCategory.toUpperCase()}!`;
        
        setTimeout(() => { launchQuiz(currentCategory); }, 1200);
    }, 4000);
});

// --- 3. QUESTIONNAIRE APPLICATION LOGIC ---
function launchQuiz(category) {
    wheelScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    nextBtn.classList.add('hidden');
    answerOptions.innerHTML = "";

    // Set dynamic brand background badge tokens
    const rootStyles = getComputedStyle(document.documentElement);
    const categoryColor = rootStyles.getPropertyValue(`--color-${category}`).trim();
    categoryBadge.style.backgroundColor = categoryColor;
    if(category === "entertainment") {
        categoryBadge.style.color = "#1c1e21"; // Fix visual reading contrast parameter on yellow badge background
    } else {
        categoryBadge.style.color = "#ffffff";
    }
    categoryBadge.innerText = category;

    // Pick random question from list array models
    const questionsList = triviaDatabase[category];
    currentQuestion = questionsList[Math.floor(Math.random() * questionsList.length)];
    questionText.innerText = currentQuestion.q;

    // Build option layout nodes
    currentQuestion.o.forEach(option => {
        const btn = document.createElement('button');
        btn.innerText = option;
        btn.classList.add('option-btn');
        btn.addEventListener('click', evaluateSelection);
        answerOptions.appendChild(btn);
    });
}

function evaluateSelection(e) {
    const selectedBtn = e.target;
    const choice = selectedBtn.innerText;
    const allButtons = answerOptions.querySelectorAll('.option-btn');

    allButtons.forEach(btn => btn.disabled = true);

    if (choice === currentQuestion.c) {
        selectedBtn.classList.add('correct');
        earnedCrowns[currentCategory] = true;
        
        const el = document.getElementById(`crown-${currentCategory}`);
        el.classList.remove('disabled');
        el.classList.add('earned');
        saveGameState();
    } else {
        selectedBtn.classList.add('wrong');
        allButtons.forEach(btn => {
            if (btn.innerText === currentQuestion.c) btn.classList.add('correct');
        });
    }
    nextBtn.classList.remove('hidden');
}

nextBtn.addEventListener('click', () => {
    quizScreen.classList.add('hidden');
    checkVictoryCondition(true);
});

function checkVictoryCondition(allowNavigation) {
    const wonGame = Object.values(earnedCrowns).every(val => val === true);
    if (wonGame) {
        if (allowNavigation) {
            victoryScreen.classList.remove('hidden');
            wheelScreen.classList.add('hidden');
        }
    } else if (allowNavigation) {
        wheelScreen.classList.remove('hidden');
        wheelStatus.innerText = "Spin to win another crown!";
    }
}

// --- 4. OPTIONS DRAWER MANAGEMENT AND RESETS ---
settingsBtn.addEventListener('click', () => settingsPanel.classList.add('open'));
closeSettingsBtn.addEventListener('click', () => settingsPanel.classList.remove('open'));

darkModeToggle.addEventListener('change', (e) => {
    document.body.classList.toggle('dark-theme', e.target.checked);
});

const resetAction = () => {
    earnedCrowns = { art: false, entertainment: false, geography: false, sports: false, science: false, history: false };
    saveGameState();
    
    document.querySelectorAll('.crown').forEach(el => {
        el.classList.add('disabled');
        el.classList.remove('earned');
    });
    
    currentRotation = 0;
    wheel.style.transition = "none";
    wheel.style.transform = "rotate(0deg)";
    
    victoryScreen.classList.add('hidden');
    quizScreen.classList.add('hidden');
    wheelScreen.classList.remove('hidden');
    wheelStatus.innerText = "Spin to choose a category!";
    settingsPanel.classList.remove('open');
};

resetGameBtn.addEventListener('click', resetAction);
playAgainBtn.addEventListener('click', resetAction);

// Run the initialization sequence on load execution
loadGameState();

// Local State Properties Tracker
let currentQuestionIndex = 0;
let currentScore = 0;
let activeLevel = 1;        // Tracks whether Level 1 or Level 2 is active
let level2Unlocked = false; // Tracks level condition status

// Level 1 Complete Bank: 10 Beginner Questions
const level1Questions = [
    {
        question: "Which of these everyday items can be recycled in your home green bin?",
        options: ["Clean plastic bottles", "Greasy pizza boxes", "Used paper tissues"],
        correct: 0
    },
    {
        question: "What should you do to a plastic milk carton before throwing it into the recycling bin?",
        options: ["Paint it", "Rinse it out with water", "Cut it into tiny pieces"],
        correct: 1
    },
    {
        question: "Which material can be recycled over and over again forever without losing its quality?",
        options: ["Plastic", "Paper", "Glass"],
        correct: 2
    },
    {
        question: "What does the famous 'Three R's' eco-slogan stand for?",
        options: ["Reduce, Reuse, Recycle", "Run, Race, Repeat", "Read, Write, Review"],
        correct: 0
    },
    {
        question: "Turning old food waste into rich soil for a garden is called what?",
        options: ["Freezing", "Composting", "Baking"],
        correct: 1
    },
    {
        question: "Which item takes the longest time to break down if it is thrown into nature as litter?",
        options: ["An apple core", "A plastic water bottle", "A cardboard box"],
        correct: 1
    },
    {
        question: "Why is leaving electronics on 'Standby' mode overnight a bad habit?",
        options: ["It wastes electricity and energy", "It makes the device break immediately", "It makes the screen too bright"],
        correct: 0
    },
    {
        question: "What is the best eco-friendly alternative to using single-use plastic carrier bags at the supermarket?",
        options: ["No bags at all, just carry everything", "A reusable cloth or canvas tote bag", "Using a new plastic bag every visit"],
        correct: 1
    },
    {
        question: "Which of these items should NEVER be put into a regular household recycling bin?",
        options: ["Shiny aluminium soda cans", "Standard writing paper", "Household batteries"],
        correct: 2
    },
    {
        question: "What is the main environmental benefit of planting more trees in our local communities?",
        options: ["They absorb carbon dioxide and clean our air", "They block out too much sunlight", "They make it easier to build roads"],
        correct: 0
    }
];

// Level 2 Bank: 5 Intermediate Questions
const level2Questions = [
    {
        question: "What is the primary cause of 'ocean acidification'?",
        options: ["Excessive plastic dumping", "Ocean water absorbing carbon dioxide (CO2)", "Oil spills from ships"],
        correct: 1
    },
    {
        question: "Which type of lightbulb is the most energy-efficient for household lighting?",
        options: ["Incandescent bulbs", "Halogen bulbs", "LED bulbs"],
        correct: 2
    },
    {
        question: "What term describes water that gathers underground and supplies wells and springs?",
        options: ["Greywater", "Groundwater", "Blackwater"],
        correct: 1
    },
    {
        question: "What is the main environmental problem associated with landfill sites?",
        options: ["They release methane gas", "They create too much noise", "They take up too much farming space"],
        correct: 0
    },
    {
        question: "Which of these sectors contributes the most greenhouse gas emissions globally?",
        options: ["Aviation and flying", "Energy production (Electricity & Heat)", "Agriculture and farming"],
        correct: 1
    }
];

// Structural Navigation Routing System
function goToScreen(screenId) {
    const screens = document.querySelectorAll('.app-screen');
    screens.forEach(screen => {
        screen.style.display = 'none';
    });
    document.getElementById(screenId).style.display = 'block';
}

// Initialise the active Quiz gameplay
function startQuiz(level) {
    // Prevent entry into Level 2 if it's currently locked
    if (level === 2 && !level2Unlocked) {
        alert("Level 2 is locked! Score at least 70 points in Level 1 to unlock it.");
        return;
    }

    activeLevel = level;
    currentQuestionIndex = 0;
    currentScore = 0;
    document.getElementById('live-score').innerText = currentScore;
    goToScreen('quiz-screen');
    loadQuestion();
}

// Render dynamic current question node layout to interface
function loadQuestion() {
    // Pick the question list based on the active level selection
    const questionList = (activeLevel === 1) ? level1Questions : level2Questions;
    const currentQuestion = questionList[currentQuestionIndex];
    
    // Update question count tracker metadata
    document.getElementById('question-counter').innerText = `Question ${currentQuestionIndex + 1} of ${questionList.length}`;
    document.getElementById('question-text').innerText = currentQuestion.question;
    
    // Dynamic Progress Bar fill calculation logic
    const progressPercent = (currentQuestionIndex / questionList.length) * 100;
    document.getElementById('progress-bar').style.width = progressPercent + "%";

    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = ""; // Wipe previous question buttons

    // Map through options array to mount standard user action buttons
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.onclick = () => checkAnswer(index);
        optionsContainer.appendChild(button);
    });
}

// Evaluate response selections with smooth visual color flashing feedback
function checkAnswer(selectedIndex) {
    const questionList = (activeLevel === 1) ? level1Questions : level2Questions;
    const currentQuestion = questionList[currentQuestionIndex];
    const optionsContainer = document.getElementById('options-container');
    const buttons = optionsContainer.getElementsByTagName('button');
    
    // Freeze choices to prevent multi-tapping
    for (let button of buttons) {
        button.disabled = true;
    }

    // Calculate score points per question relative to level caps (Max Level 1 is 100, Level 2 is 50)
    if (selectedIndex === currentQuestion.correct) {
        currentScore += 10;
        buttons[selectedIndex].style.backgroundColor = "#2E7D32"; // Green flash
    } else {
        buttons[selectedIndex].style.backgroundColor = "#C62828"; // Red flash
        buttons[currentQuestion.correct].style.backgroundColor = "#2E7D32"; // Highlight correct option
    }
    
    document.getElementById('live-score').innerText = currentScore;
    
    // 1.2 second pause before advancing so colors are readable
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questionList.length) {
            loadQuestion();
        } else {
            // End of active session array bounds
            const maxPossible = questionList.length * 10;
            document.getElementById('final-score').innerText = `${currentScore} / ${maxPossible}`;
            
            // Unlocking condition evaluation check: Unlocks if Level 1 score is 70+
            if (activeLevel === 1 && currentScore >= 70) {
                level2Unlocked = true;
                
                // Repaint the Level 2 interface button states dynamically
                const lvl2Btn = document.getElementById('level-2-btn');
                lvl2Btn.classList.remove('btn-locked');
                lvl2Btn.innerText = "Level 2: Intermediate";
                
                alert("Awesome Job! 🎉 You scored 70+ points and unlocked Level 2!");
            }
            
            goToScreen('results-screen');
        }
    }, 1200);
}

// Process data collection forms
function submitFeedbackForm() {
    const name = document.getElementById('user-name').value;
    const rating = document.getElementById('user-rating').value;
    const comments = document.getElementById('user-comments').value;

    if (name.trim() === "" || rating.trim() === "" || comments.trim() === "") {
        alert("Please completely populate all fields before submitting your data.");
    } else {
        alert("Submission Successful!\n\nThank you for helping our community initiative grow!");
        document.getElementById('user-name').value = "";
        document.getElementById('user-rating').value = "";
        document.getElementById('user-comments').value = "";
        goToScreen('home-screen');
    }
}

// High Contrast Theme State Toggler Engine
function toggleHighContrast() {
    const isChecked = document.getElementById('contrast-toggle').checked;
    if (isChecked) {
        document.body.classList.add('high-contrast');
    } else {
        document.body.classList.remove('high-contrast');
    }
}
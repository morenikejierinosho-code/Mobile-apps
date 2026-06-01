
const quizDatabase = {
    "1": [
        { q: "What is the capital of France?", choices: {A:"London", B:"Paris", C:"Berlin", D:"Madrid"}, correct: "B" },
        { q: "Which animal is known as the King of the Jungle?", choices: {A:"Elephant", B:"Tiger", C:"Lion", D:"Cheetah"}, correct: "C" },
        { q: "How many days are there in a normal year?", choices: {A:"365", B:"366", C:"360", D:"350"}, correct: "A" }
    ],
    "2": [
        { q: "What planet is known as the Red Planet?", choices: {A:"Earth", B:"Mars", C:"Jupiter", D:"Saturn"}, correct: "B" },
        { q: "What is the boiling point of pure water?", choices: {A:"90°C", B:"120°C", C:"100°C", D:"80°C"}, correct: "C" },
        { q: "Which gas do human beings breathe in to survive?", choices: {A:"Oxygen", B:"Carbon Dioxide", C:"Nitrogen", D:"Hydrogen"}, correct: "A" }
    ],
    "3": [
        { q: "How many players are on a standard soccer team field?", choices: {A:"9", B:"10", C:"11", D:"12"}, correct: "C" },
        { q: "Which sport uses a racket and a shuttlecock?", choices: {A:"Tennis", B:"Badminton", C:"Squash", D:"Ping Pong"}, correct: "B" },
        { q: "How long is a standard Olympic swimming pool?", choices: {A:"25m", B:"50m", C:"100m", D:"40m"}, correct: "B" }
    ]
};


let currentQuestions = [];
let currentQuestionIndex = 0;
let runningScore = 0;
let selectedStarRating = 0;


function changeScreen(screenId) {
    document.querySelectorAll('.screen').forEach(scr => scr.classList.add('hidden'));
    document.getElementById(screenId).classList.remove('hidden');
}

// Navigation event routing pathways
document.getElementById('start-game-btn').addEventListener('click', () => changeScreen('level-screen'));
document.getElementById('level-back-btn').addEventListener('click', () => changeScreen('home-screen'));
document.getElementById('play-again-btn').addEventListener('click', () => changeScreen('level-screen'));
document.getElementById('go-to-feedback-btn').addEventListener('click', () => changeScreen('feedback-screen'));
document.getElementById('feedback-home-btn').addEventListener('click', () => changeScreen('home-screen'));


document.querySelectorAll('.level-select-btn').forEach(button => {
    button.addEventListener('click', (e) => {
        const levelChosen = e.target.getAttribute('data-level');
        currentQuestions = quizDatabase[levelChosen];
        
        runningScore = 0;
        currentQuestionIndex = 0;
        
        document.getElementById('live-score').textContent = `Score: ${runningScore}`;
        
        loadQuestionData();
        changeScreen('quiz-screen');
    });
});


function loadQuestionData() {
    document.querySelectorAll('.answers-grid .answer-btn').forEach(btn => {
        btn.disabled = false;
        btn.className = 'answer-btn'; 
    });
    document.getElementById('next-question-btn').disabled = true;

    const activeQuestion = currentQuestions[currentQuestionIndex];
    
    document.getElementById('progress-marker').textContent = `Question ${currentQuestionIndex + 1} of ${currentQuestions.length}`;
    document.getElementById('question-text').textContent = activeQuestion.q;
    
    document.querySelectorAll('.answers-grid .answer-btn').forEach(btn => {
        const choiceLetter = btn.getAttribute('data-choice');
        btn.textContent = `${choiceLetter}. ${activeQuestion.choices[choiceLetter]}`;
    });
}


document.querySelectorAll('.answers-grid .answer-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const clickedBtn = e.target;
        const selectedChoice = clickedBtn.getAttribute('data-choice');
        const correctChoice = currentQuestions[currentQuestionIndex].correct;

        
        document.querySelectorAll('.answers-grid .answer-btn').forEach(b => b.disabled = true);

        if (selectedChoice === correctChoice) {
            runningScore += 10; // Increment step logic
            document.getElementById('live-score').textContent = `Score: ${runningScore}`;
            clickedBtn.classList.add('correct'); 
        } else {
            clickedBtn.classList.add('wrong'); // Turn button RED
            
            
            document.querySelectorAll('.answers-grid .answer-btn').forEach(b => {
                if (b.getAttribute('data-choice') === correctChoice) b.classList.add('correct');
            });
        }

        document.getElementById('next-question-btn').disabled = false;
    });
});

// Logic 2: Moving to the Next Question
document.getElementById('next-question-btn').addEventListener('click', () => {
    currentQuestionIndex++;
    
    if (currentQuestionIndex < currentQuestions.length) {
        loadQuestionData(); // Next question index operation loop
    } else {
        document.getElementById('final-score-display').textContent = `${runningScore} Points`;
        changeScreen('results-screen');
    }
});


document.querySelectorAll('.star').forEach(star => {
    star.addEventListener('click', (e) => {
        selectedStarRating = parseInt(e.target.getAttribute('data-rating'));
        
        document.querySelectorAll('.star').forEach(s => {
            const ratingValue = parseInt(s.getAttribute('data-rating'));
            if (ratingValue <= selectedStarRating) {
                s.classList.add('selected');
            } else {
                s.classList.remove('selected');
            }
        });
    });
});


document.getElementById('feedback-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const feedbackPayload = {
        username: document.getElementById('form-name').value,
        rating: selectedStarRating,
        comments: document.getElementById('form-comments').value
    };

    
    localStorage.setItem('QuizApp_ClientReviewData', JSON.stringify(feedbackPayload));
    
    alert('Thank you! Your evaluation data has been saved safely on your device.');
    
    // Clear out values for successive runs
    document.getElementById('feedback-form').reset();
    document.querySelectorAll('.star').forEach(s => s.classList.remove('selected'));
    selectedStarRating = 0;

    changeScreen('home-screen');
});
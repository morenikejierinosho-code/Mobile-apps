
const quizQuestions = [
  {
    category: "Programming",
    level: "Easy",
    question: "Which method is used to add a new element to the end of an array in JavaScript?",
    options: ["pop()", "push()", "shift()", "unshift()"],
    correctAnswer: "push()"
  },
  {
    category: "Programming",
    level: "Easy",
    question: "Which keyword is used to declare a variable that cannot be reassigned?",
    options: ["var", "let", "const", "define"],
    correctAnswer: "const"
  },
  {
    category: "Programming",
    level: "Easy",
    question: "What is the correct syntax to write an alert box in JavaScript?",
    options: ["alertBox('Hello')", "msg('Hello')", "alert('Hello')", "box('Hello')"],
    correctAnswer: "alert('Hello')"
  },
  {
    category: "Programming",
    level: "Easy",
    question: "Which data type is used to represent true or false values?",
    options: ["String", "Boolean", "Number", "Undefined"],
    correctAnswer: "Boolean"
  },
  {
    category: "Programming",
    level: "Easy",
    question: "How do you write a single-line comment in JavaScript?",
    options: ["// This is a comment", "", "/* This is a comment */", "# This is a comment"],
    correctAnswer: "// This is a comment"
  },
  {
    category: "Programming",
    level: "Hard",
    question: "Which operator is used for strict equality comparison (both value and type)?",
    options: ["=", "==", "===", "!=="],
    correctAnswer: "==="
  },
  {
    category: "Programming",
    level: "Hard",
    question: "What is the output of 'typeof NaN' in JavaScript?",
    options: ["string", "number", "undefined", "object"],
    correctAnswer: "number"
  },
  {
    category: "Programming",
    level: "Hard",
    question: "Which JavaScript array method removes the LAST element from an array?",
    options: ["pop()", "push()", "shift()", "unshift()"],
    correctAnswer: "pop()"
  },

  {
    category: "Geography",
    level: "Easy",
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Rome", "Paris"],
    correctAnswer: "Paris"
  },
  {
    category: "Geography",
    level: "Easy",
    question: "Which is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: "Pacific Ocean"
  },
  {
    category: "Geography",
    level: "Easy",
    question: "Which country is shaped like a boot?",
    options: ["Spain", "Italy", "Greece", "Portugal"],
    correctAnswer: "Italy"
  },
  {
    category: "Geography",
    level: "Easy",
    question: "What is the tallest mountain in the world?",
    options: ["K2", "Mount Kilimanjaro", "Mount Everest", "Mount Fuji"],
    correctAnswer: "Mount Everest"
  },
  {
    category: "Geography",
    level: "Hard",
    question: "What is the capital city of Australia?",
    options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
    correctAnswer: "Canberra"
  },
  {
    category: "Geography",
    level: "Hard",
    question: "What is the smallest country in the world by land area?",
    options: ["Monaco", "Malta", "Vatican City", "San Marino"],
    correctAnswer: "Vatican City"
  },
  {
    category: "Geography",
    level: "Hard",
    question: "Which mountain range separates Europe from Asia?",
    options: ["Andes", "Rockies", "Urals", "Alps"],
    correctAnswer: "Urals"
  },

  {
    category: "Mathematics",
    level: "Easy",
    question: "What is the square root of 64?",
    options: ["6", "7", "8", "9"],
    correctAnswer: "8"
  },
  {
    category: "Mathematics",
    level: "Easy",
    question: "How many sides does a hexagon have?",
    options: ["5", "6", "7", "8"],
    correctAnswer: "6"
  },
  {
    category: "Mathematics",
    level: "Easy",
    question: "What is 100 divided by 4?",
    options: ["20", "25", "40", "50"],
    correctAnswer: "25"
  },
  {
    category: "Mathematics",
    level: "Easy",
    question: "What is the value of any number multiplied by zero?",
    options: ["1", "0", "The number itself", "Undefined"],
    correctAnswer: "0"
  },
  {
    category: "Mathematics",
    level: "Hard",
    question: "Solve the expression using proper order of operations: 5 + 3 * 2",
    options: ["16", "11", "10", "13"],
    correctAnswer: "11"
  },
  {
    category: "Mathematics",
    level: "Hard",
    question: "What is the value of 0! (factorial)?",
    options: ["0", "1", "-1", "Undefined"],
    correctAnswer: "1"
  },
  {
    category: "Mathematics",
    level: "Hard",
    question: "What is the median of this sorted data set: 3, 5, 7, 9, 11?",
    options: ["5", "7", "9", "35"],
    correctAnswer: "7"
  },

  {
    category: "Entertainment",
    level: "Easy",
    question: "Who is the main protagonist in the 'Harry Potter' film and book series?",
    options: ["Ron Weasley", "Neville Longbottom", "Harry Potter", "Draco Malfoy"],
    correctAnswer: "Harry Potter"
  },
  {
    category: "Entertainment",
    level: "Easy",
    question: "Which superhero is also known as Bruce Wayne?",
    options: ["Superman", "Spider-Man", "Iron Man", "Batman"],
    correctAnswer: "Batman"
  },
  {
    category: "Entertainment",
    level: "Easy",
    question: "What color is Pac-Man?",
    options: ["Red", "Yellow", "Blue", "Orange"],
    correctAnswer: "Yellow"
  },
  {
    category: "Entertainment",
    level: "Easy",
    question: "What is the name of the snowman in Disney's 'Frozen'?",
    options: ["Kristoff", "Sven", "Hans", "Olaf"],
    correctAnswer: "Olaf"
  },
  {
    category: "Entertainment",
    level: "Hard",
    question: "Which movie won the first-ever Academy Award (Oscar) for Best Animated Feature?",
    options: ["Toy Story", "Shrek", "Monsters, Inc.", "Finding Nemo"],
    correctAnswer: "Shrek"
  },
  {
    category: "Entertainment",
    level: "Hard",
    question: "What is the name of the main island where the original 'Jurassic Park' takes place?",
    options: ["Isla Nublar", "Isla Sorna", "Skull Island", "Amity Island"],
    correctAnswer: "Isla Nublar"
  },
  {
    category: "Entertainment",
    level: "Hard",
    question: "Who wrote the famous classic tragedy play 'Romeo and Juliet'?",
    options: ["Charles Dickens", "Mark Twain", "William Shakespeare", "Jane Austen"],
    correctAnswer: "William Shakespeare"
  }
];
const questions = [
  {
    question: "What is the capital of France?",
    answers: ["Berlin", "Madrid", "Paris", "Lisbon"],
    correct: 2
  },
  {
    question: "What is 2 + 2?",
    answers: ["3", "4", "5", "6"],
    correct: 1
  },
  {
    question: "What is the largest planet in our solar system?",
    answers: ["Earth", "Mars", "Jupiter", "Saturn"],
    correct: 2
  },
];

function loadQuestions() {
  const quizForm = document.getElementById('quiz-form');

  questions.forEach((q, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question';
    questionDiv.innerHTML = `<p>${index + 1}. ${q.question}</p>`;

    q.answers.forEach((answer, i) => {
      questionDiv.innerHTML += `
        <label>
          <input type="radio" name="question${index}" value="${i}" required>
          ${answer}
        </label><br>
      `;
    });

    quizForm.appendChild(questionDiv);
  });
}

document.getElementById('submit').addEventListener('click', function(event) {
  event.preventDefault();
  let score = 0;

  questions.forEach((q, index) => {
    const selectedAnswer = document.querySelector(`input[name="question${index}"]:checked`);
    if (selectedAnswer && parseInt(selectedAnswer.value) === q.correct) {
      score++;
    }
  });

  document.getElementById('result').textContent = `Your score: ${score}/${questions.length}`;
  document.getElementById('result').style.display = 'block'; 
});

loadQuestions();

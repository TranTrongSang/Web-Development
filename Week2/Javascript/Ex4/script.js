let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0; 

document.getElementById('submit').addEventListener('click', function() {
  const userGuess = parseInt(document.getElementById('guess').value);
  const resultDiv = document.getElementById('result');
  attempts++;

  if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
    resultDiv.textContent = 'Please enter a valid number between 1 and 100.';
  } else if (userGuess < randomNumber) {
    resultDiv.textContent = 'Too low! Try again.';
  } else if (userGuess > randomNumber) {
    resultDiv.textContent = 'Too high! Try again.';
  } else {
    resultDiv.textContent = `Congratulations! You guessed it! You guessed the number ${randomNumber} in ${attempts} attempts.`;
    document.getElementById('play-again').style.display = 'block'; 
    document.getElementById('submit').disabled = true; 
  }
});

document.getElementById('play-again').addEventListener('click', function() {
  randomNumber = Math.floor(Math.random() * 100) + 1; 
  attempts = 0; 
  document.getElementById('result').textContent = '';
  document.getElementById('guess').value = '';
  this.style.display = 'none'; 
  document.getElementById('submit').disabled = false; 
});

// Start game button on intro.html
const startGameButton = document.querySelector('#start-game');

// Clue 1 page HTML element
const clue1Page = document.querySelector('#clue1');

// Timer element
const timer = document.querySelector('#timer');

// Dialogue box element
const dialogueBox = document.querySelector('#dialogue-box');

// Animation element
const confettiAnimation = document.querySelector('#confetti-animation');

// Password input element
const passwordInput = document.querySelector('#password');

// Start the game when the user clicks the start game button
startGameButton.addEventListener('click', () => {
  // Open the clue 1 page in full screen
  clue1Page.requestFullscreen();

  // Start the timer
  startTimer();
});

// Submit quest function
function submitQuest() {
  // Stop the timer
  stopTimer();

  // Open the dialogue box
  dialogueBox.classList.add('open');

  // Start the confetti animation
  confettiAnimation.classList.add('playing');

  // Show the congratulation message
  dialogueBox.querySelector('#congratuation-message').textContent = 'Congratulations! You guessed it right! Now move to the next location to continue the hunt.';
}

// Start timer function
function startTimer() {
  // Set the timer to 60 seconds
  let timeRemaining = 60;

  // Update the timer every second
  const timerInterval = setInterval(() => {
    timeRemaining--;
    timer.textContent = timeRemaining;

    if (timeRemaining === 0) {
      // Stop the timer
      clearInterval(timerInterval);

      // Open the dialogue box
      dialogueBox.classList.add('open');

      // Show the time out message
      dialogueBox.querySelector('#congratuation-message').textContent = 'Time out! You didn\'t guess the answer correctly. Please try again.';
    }
  }, 1000);
}

// Stop timer function
function stopTimer() {
  clearInterval(timerInterval);
}

// Close dialogue box function
function closeDialogueBox() {
  // Remove the open class from the dialogue box
  dialogueBox.classList.remove('open');

  // Stop the confetti animation
  confettiAnimation.classList.remove('playing');

  // Clear the password input field
  passwordInput.value = '';
}

// Password input event listener
passwordInput.addEventListener('input', () => {
  // If the password is correct, close the dialogue box and exit full screen
  if (passwordInput.value === '2023') {
    closeDialogueBox();
    document.exitFullscreen();
  }
});

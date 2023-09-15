function showInstructions() {
  const instructionsOverlay = document.getElementById("instructionsOverlay");
  instructionsOverlay.style.display = "flex"; 
}

function dismissInstructions() {
  const instructionsOverlay = document.getElementById("instructionsOverlay");
  instructionsOverlay.style.display = "none"; 
}
function startGame() {
  var teamName = document.getElementById("teamNameInput").value;
  
  if (teamName.trim() !== "") {
      const fullscreenParam = "?fullscreen=true"; // Add this parameter
      window.location.href = `clue1.html?teamName=${encodeURIComponent(teamName)}${fullscreenParam}`;
  } else {
      alert("Please enter a valid team name.");
  }
  
  enterFullScreen(); // Enter full-screen mode AFTER navigating
  startTimer(); 
}

// JavaScript code to generate and animate bubbles
const colors = ['blue', 'red', 'yellow', 'green'];
const container = document.querySelector('.bubbles-container');
const header = document.querySelector('.header');
const textContent = document.querySelector('.centered-content');

function createBubble() {
  const bubble = document.createElement('div');
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  bubble.className = `bubble ${randomColor}`;
  
  const size = Math.random() * 40 + 10; // Random bubble size between 10 and 50 pixels
  bubble.style.width = `${size}px`;
  bubble.style.height = `${size}px`;
  
  // Set the border-radius to make it circular
  bubble.style.borderRadius = '50%';

  let startPositionX, startPositionY;
  let isOverlapping = false;

  // Generate bubble positions until it's not overlapping with the header or text
  do {
    startPositionX = Math.random() * window.innerWidth;
    startPositionY = Math.random() * window.innerHeight;
    
    // Check if the bubble is overlapping with the header
    const bubbleRect = bubble.getBoundingClientRect();
    const headerRect = header.getBoundingClientRect();
    const textRect = textContent.getBoundingClientRect();
    
    if (
      startPositionX + bubbleRect.width < headerRect.left ||
      startPositionX > headerRect.right ||
      startPositionY + bubbleRect.height < headerRect.bottom ||
      startPositionY > textRect.top
    ) {
      isOverlapping = false;
    } else {
      isOverlapping = true;
    }
  } while (isOverlapping);

  bubble.style.left = `${startPositionX}px`;
  bubble.style.top = `${startPositionY}px`;
  
  const animationDuration = Math.random() * 4 + 2; // Random animation duration between 2 and 6 seconds
  bubble.style.animation = `floatBubbles ${animationDuration}s linear infinite`;
  
  container.appendChild(bubble);
  
  setTimeout(() => {
    bubble.remove();
  }, 6000); // Remove bubbles after 6 seconds
}

setInterval(createBubble, 100); // Create a new bubble every 0.1 second

// Check for the "fullscreen" query parameter
const urlParams = new URLSearchParams(window.location.search);
const isFullscreen = urlParams.get("fullscreen");

if (isFullscreen) {
    enterFullScreen(); // Request full-screen mode
}

function enterFullScreen() {
    const element = document.documentElement;

    if (element.requestFullscreen) {
        element.requestFullscreen().catch((err) => {
            console.error(`Error attempting to enable full-screen mode: ${err.message}`);
        });
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen().catch((err) => {
            console.error(`Error attempting to enable full-screen mode: ${err.message}`);
        });
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen().catch((err) => {
            console.error(`Error attempting to enable full-screen mode: ${err.message}`);
        });
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen().catch((err) => {
            console.error(`Error attempting to enable full-screen mode: ${err.message}`);
        });
    }
}

function showPasswordOverlay() {
  const passwordOverlay = document.getElementById("passwordOverlay");
  passwordOverlay.style.display = "flex";
}

function dismissPasswordOverlay() {
  const passwordOverlay = document.getElementById("passwordOverlay");
  passwordOverlay.style.display = "none";
}

let timerInterval;
let time = 40 * 60; 

function updateTimer() {
  const timerElement = document.getElementById("timer"); 
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  if (time <= 0) {
      clearInterval(timerInterval);
      timerElement.textContent = "Time's up!";
  }

  time--;
}


function startTimer() {
    if (!timerInterval) {
        timerInterval = setInterval(updateTimer, 1000);
    }
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

startTimer();

function exitGame() {
stopTimer();
}

function exitFullScreen() {
const passwordInput = document.getElementById("exitPassword");
const password = passwordInput.value.trim();

if (password === "2023") {
  document.exitFullscreen();
  stopTimer();
  window.location.href = "intro.html";
} else {
  alert("Incorrect password. Please try again.");
}
passwordInput.value = "";
}

function submitQuest() {
  const userAnswer = document.getElementById("answerInput").value;
  const expectedAnswer = 30; 
  if (parseInt(userAnswer) === expectedAnswer) {
    showCorrectAnswerMessage();
    stopTimer(); 
  } else {
    showIncorrectAnswerMessage();
  }
}


// Function to show a correct answer message
function showCorrectAnswerMessage() {
  const messageOverlay = document.createElement("div");
  messageOverlay.classList.add("message-overlay");

  const messageCard = document.createElement("div");
  messageCard.classList.add("message-card", "correct-answer");

  const messageHeader = document.createElement("div");
  messageHeader.classList.add("message-header");

  const headerText = document.createElement("span");
  headerText.textContent = "Congratulations!";
  messageHeader.appendChild(headerText);

  const closeButton = document.createElement("button");
  closeButton.classList.add("close-button");
  closeButton.textContent = "Close";
  closeButton.addEventListener("click", dismissMessage);
  messageHeader.appendChild(closeButton);

  const messageBody = document.createElement("div");
  messageBody.classList.add("message-body");
  messageBody.textContent = "You've provided the correct answer. Well done!";

  messageCard.appendChild(messageHeader);
  messageCard.appendChild(messageBody);
  messageOverlay.appendChild(messageCard);

  // Add confetti elements to the message overlay and set their initial positions
  const confettiCount = 2000;
  const confettiContainer = document.createElement("div");
  confettiContainer.classList.add("confetti-container");

  const colors = ['#FFD700', '#FF5733', '#4CAF50', '#2196F3']; // Add your desired colors

  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.left = `${Math.random() * 100}%`; // Random horizontal position
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]; // Random color
    confetti.style.animationDelay = `${Math.random() * 8}s`; // Adjust animation delay for longer falling time
    confettiContainer.appendChild(confetti);
  }

  messageOverlay.appendChild(confettiContainer);

  document.body.appendChild(messageOverlay);
}

// Function to show an incorrect answer message
function showIncorrectAnswerMessage() {
  const messageOverlay = document.createElement("div");
  messageOverlay.classList.add("message-overlay");

  const messageCard = document.createElement("div");
  messageCard.classList.add("message-card", "incorrect-answer");

  const messageHeader = document.createElement("div");
  messageHeader.classList.add("message-header");

  const headerText = document.createElement("span");
  headerText.textContent = "Incorrect Answer";
  messageHeader.appendChild(headerText);

  const closeButton = document.createElement("button");
  closeButton.classList.add("close-button");
  closeButton.textContent = "Close";
  closeButton.addEventListener("click", dismissMessage);
  messageHeader.appendChild(closeButton);

  const messageBody = document.createElement("div");
  messageBody.classList.add("message-body");
  messageBody.textContent = "Sorry, your answer is incorrect. Please try again.";

  messageCard.appendChild(messageHeader);
  messageCard.appendChild(messageBody);
  messageOverlay.appendChild(messageCard);

  document.body.appendChild(messageOverlay);
}

function dismissMessage() {
  const messageOverlay = document.querySelector(".message-overlay");
  if (messageOverlay) {
      messageOverlay.remove();
  }
}

const submitButton = document.getElementById("submitQuestButton");
submitButton.addEventListener("click", submitQuest);

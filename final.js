function showInstructions() {
    const instructionsOverlay = document.getElementById("instructionsOverlay");
    instructionsOverlay.style.display = "flex"; // Show the overlay
}
  
function dismissInstructions() {
    const instructionsOverlay = document.getElementById("instructionsOverlay");
    instructionsOverlay.style.display = "none"; // Hide the overlay
}
  
function startGame() {
      var teamName = document.getElementById("teamNameInput").value;
      if (teamName.trim() !== "") {
          window.location.href = "clue1.html?teamName=" + encodeURIComponent(teamName);
      } else {
          alert("Please enter a valid team name.");
      }
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
let time = 40 * 60; // Initial time in seconds (40 minutes)
  
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
  

  function startGame() {
    enterFullScreen();
    window.location.href = "clue1.html";
    startTimer(); 
}


function submitQuest() {
    const userAnswer = document.getElementById("answerInput").value;
    const expectedAnswer = 30; 

    if (parseInt(userAnswer) === expectedAnswer) {
        showCorrectAnswerMessage();
        stopTimer(); 
        const fireworksContainer = document.querySelector(".fireworks-container");
        fireworksContainer.style.display = "block";
    } else {
        showIncorrectAnswerMessage();
    }
}

let audio;
function showCorrectAnswerMessage() {
  const messageOverlay = document.createElement("div");
  messageOverlay.classList.add("message-overlay");

  const messageCard = document.createElement("div");
  messageCard.classList.add("message-card");

  // Create the message body
  const messageBody = document.createElement("div");
  messageBody.classList.add("message-body");

  // Create a container for GDSC SIT
  const gdscContainer = document.createElement("div");
  gdscContainer.classList.add("gdsc-container");

  const gdscSpan = document.createElement("span");
  gdscSpan.classList.add("gdsc-sit");
  gdscSpan.textContent = "GDSC SIT";

  gdscContainer.appendChild(gdscSpan);

  messageBody.appendChild(gdscContainer);

  // Create the Congratulations! text
  const congratulationsText = document.createElement("div");
  congratulationsText.classList.add("congratulations-text");
  congratulationsText.textContent = "Congratulations!";

  // Apply animation to Congratulations! text
  congratulationsText.style.animation = "bounce 2s ease infinite";

  messageBody.appendChild(congratulationsText);

  const fireworksCanvas = document.createElement("canvas");
  fireworksCanvas.id = "fireworksCanvas";
  fireworksCanvas.classList.add("fireworks-canvas");
  fireworksCanvas.width = messageOverlay.clientWidth; 
  fireworksCanvas.height = messageOverlay.clientHeight; 

  messageCard.appendChild(fireworksCanvas);

  const wonText = document.createElement("div");
  wonText.classList.add("won-text");
  wonText.textContent = "You've won TreasureCoder 2023";
  messageBody.appendChild(wonText);

  const confettiCount = 2000;
  const confettiContainer = document.createElement("div");
  confettiContainer.classList.add("confetti-container");

  const colors = ['#FFD700', '#FF5733', '#4CAF50', '#2196F3']; 

  for (let i = 0; i < confettiCount; i++) {
      const confetti = document.createElement("div");
      confetti.classList.add("confetti");
      confetti.style.left = `${Math.random() * 100}%`; 
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]; 
      confetti.style.animationDelay = `${Math.random() * 8}s`; 
      confettiContainer.appendChild(confetti);
  }

  messageCard.appendChild(messageBody);
  messageCard.appendChild(confettiContainer);

  // Create the close button
  const closeButton = document.createElement("button");
  closeButton.classList.add("final-close-button");
  closeButton.textContent = "Close";

  closeButton.addEventListener("click", () => {
      dismissMessage();
      stopAudio();
      clearCanvas();
  });

  messageCard.appendChild(closeButton);

  messageOverlay.appendChild(messageCard);
  document.body.appendChild(messageOverlay);

  document.addEventListener("click", function (event) {
      if (event.target && event.target.id === "closeCorrectAnswer") {
          dismissMessage();
          stopAudio();
          window.location.href = "intro.html"; 
      }
  });
  
  if (!audio) {
      audio = new Audio('winner.mp3');
  }

  audio.play();
}

function dismissMessage() {
    const messageOverlay = document.querySelector(".message-overlay");
    if (messageOverlay) {
        messageOverlay.remove();
        clearCanvas(); 
        stopAudio();
    }
}

function clearCanvas() {
    const fireworksCanvas = document.getElementById("fireworksCanvas");
    if (fireworksCanvas) {
        const ctx = fireworksCanvas.getContext("2d");
        ctx.clearRect(0, 0, fireworksCanvas.width, fireworksCanvas.height);
    }
}

function stopAudio() {
    if (audio) {
        audio.pause(); 
        audio.currentTime = 0; 
    }
}

// Function to show an incorrect answer message
function showIncorrectAnswerMessage() {
    const messageOverlay = document.createElement("div");
    messageOverlay.classList.add("message-overlay");
  
    const messageCard = document.createElement("div");
    messageCard.classList.add("incorrect-message-card", "incorrect-answer");
  
    const messageHeader = document.createElement("div");
    messageHeader.classList.add("message-header");
  
    const headerText = document.createElement("span");
    headerText.textContent = "Incorrect Answer";
    messageHeader.appendChild(headerText);
  
    const closeButton = document.createElement("button");
    closeButton.classList.add("final-close-button");
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
  
// Event listener for the "X" button

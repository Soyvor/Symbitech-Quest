function showInstructions() {
    // Show the instructions overlay
    document.getElementById("instructionsOverlay").style.display = "flex";
}

function dismissInstructions() {
    // Hide the instructions overlay
    document.getElementById("instructionsOverlay").style.display = "none";
}
function startGame() {
    // Get the team name entered by the player
    var teamName = document.getElementById("teamNameInput").value;

    // Check if the team name is not empty
    if (teamName.trim() !== "") {
        // Redirect the player to the game interface with their team name
        window.location.href = "clue1.html?teamName=" + encodeURIComponent(teamName);
    } else {
        alert("Please enter a valid team name.");
    }
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
    
    // Check if the bubble is overlapping with the header or text
    const bubbleRect = bubble.getBoundingClientRect();
    const headerRect = header.getBoundingClientRect();
    const textRect = textContent.getBoundingClientRect();
    
    if (
      startPositionX + bubbleRect.width < headerRect.left ||
      startPositionX > headerRect.right ||
      startPositionY + bubbleRect.height < headerRect.bottom ||
      startPositionY > textRect.top // Changed from textRect.bottom to textRect.top
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



// Function to enter full screen mode
function enterFullScreen() {
  const element = document.documentElement; // Get the HTML element

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

// Function to start the game and enter full screen mode
function startGame() {
  enterFullScreen();

  // Add your game logic here

  // Open clue1.html in fullscreen mode
  window.location.href = "clue1.html";
}


function exitFullScreen() {
  // Check the password
  const passwordInput = document.getElementById("exitPassword");
  const password = passwordInput.value.trim();

  // Replace "YourPassword" with your actual password
  if (password === "2023") {
    // Exit full screen mode
    document.exitFullscreen();
    
    // Hide the quest and password overlay
    const questContainer = document.getElementById("questContainer");
    questContainer.style.display = "none";
    const passwordOverlay = document.getElementById("passwordOverlay");
    passwordOverlay.style.display = "none";

    // Show the "Start Game" button again
    const startButton = document.getElementById("startGameButton");
    startButton.style.display = "block";
  } else {
    alert("Incorrect password. Please try again.");
  }

  // Clear the password input
  passwordInput.value = "";
}

// Event listener for the "Start Game" button
document.getElementById("startGameButton").addEventListener("click", enterFullScreen);

// Set the initial time (40 minutes in seconds)
let time = 40 * 60;

// Function to update the timer
function updateTimer() {
  const timerElement = document.getElementById("timer");
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  timerElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Check if time is up
  if (time <= 0) {
      clearInterval(timerInterval);
      timerElement.textContent = "Time's up!";
      // Add your game over logic here
  }

  time--;
}

// Update the timer every second
const timerInterval = setInterval(updateTimer, 1000);

// Function to exit the game
function exitGame() {
  // Add your exit game logic here
}

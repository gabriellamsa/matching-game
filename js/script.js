let numberOfClouds = 0;
let score = 0;
let difficultyMultiplier = 0;
let clickCount = 0; 

const theLeftSide = document.getElementById("leftSide");
const theRightSide = document.getElementById("rightSide");
const gameOverModal = document.getElementById("gameOverModal");
const scoreDisplay = document.getElementById("scoreDisplay");
const clickCounter = document.getElementById("clickCounter"); 

function setDifficulty(difficulty) {
  if (difficulty === 'easy'){
    difficultyMultiplier = 3;
    numberOfClouds = 3;
  } else if (difficulty === 'normal') {
    difficultyMultiplier = 5;
    numberOfClouds = 5;
  } else if (difficulty === 'hard') {
    difficultyMultiplier = 7;
    numberOfClouds = 7;
  }
  
  while (theLeftSide.firstChild) {
    theLeftSide.removeChild(theLeftSide.firstChild);
  }
  while (theRightSide.firstChild) {
    theRightSide.removeChild(theRightSide.firstChild);
  }

  // reset state when changing difficulty
  score = 0;
  clickCount = 0; 
  clickCounter.innerText = `Clicks: ${clickCount}`; 

  generateClouds();
}

function generateClouds() {
  const gameArea = document.getElementById("gameArea");
  const maxWidth = gameArea.clientWidth / 2 - 50; 
  const maxHeight = gameArea.clientHeight - 50; 

  for (let i = 0; i < numberOfClouds; i++) {
    let randomTop = Math.floor(Math.random() * maxHeight);
    let randomLeft = Math.floor(Math.random() * maxWidth);
    let cloud = document.createElement("img");

    // set cloud attributes
    cloud.src = 'images/smile-cloud.png';
    cloud.style.top = randomTop + 'px';
    cloud.style.left = randomLeft + 'px';

    cloud.addEventListener('click', gameOver);

    theLeftSide.appendChild(cloud);
  }

  const leftSideImages = theLeftSide.cloneNode(true); 

  leftSideImages.removeChild(leftSideImages.lastChild);
  theRightSide.appendChild(leftSideImages);

  theLeftSide.lastChild.addEventListener('click', nextLevel);
  theLeftSide.lastChild.removeEventListener('click', gameOver);
}

function nextLevel(event) {
  event.stopPropagation();
  numberOfClouds += difficultyMultiplier;
  score += difficultyMultiplier;
  clickCount++; 
  clickCounter.innerText = `Clicks: ${clickCount}`; 

  while (theLeftSide.firstChild) {
    theLeftSide.removeChild(theLeftSide.firstChild);
  }
  while (theRightSide.firstChild) {
    theRightSide.removeChild(theRightSide.firstChild);
  }

  generateClouds();
}

function gameOver(event) {
  event.stopPropagation();
  scoreDisplay.innerText = `Score: ${score}`;
  gameOverModal.style.display = "flex";
}

function closeModal() {
  gameOverModal.style.display = "none";
}

function restartGame() {
  numberOfClouds = 0;
  score = 0;
  clickCount = 0; 
  gameOverModal.style.display = "none";
  setDifficulty('easy');
}

window.addEventListener('load', restartGame);

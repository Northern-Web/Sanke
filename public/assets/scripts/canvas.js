import { Map }      from "./mapObject.js";
import { Snake }    from "./snakeObject.js";
import { Food }     from "./foodObject.js";
import { Settings } from "./settings.js";

var canvas = document.getElementById("snake");
var settings = new Settings();
settings.setInitialState();
// Global variables
var score        = 0;
var scorePerMove = 0;
const ROWS       = 32;
const COLUMNS    = 32;
var isGameOver   = false;
const currentScoreBoard = document.getElementById("current-score");
const scorePerMoveBoard = document.getElementById("score-per-move");
const playerMovesBoard  = document.getElementById("player-moves");
const bestScoreBoard    = document.getElementById("best-score");
const snakeBox          = document.getElementById("snake-box");
const bestScoreLocalStorage = "bestScore";
localStorage.setItem(bestScoreLocalStorage, 0);

const KEY = {
  SPACEBAR: 32,
  ARROW_LEFT: 37,
  ARROW_UP: 38,
  ARROW_RIGHT: 39,
  ARROW_DOWN: 40,
  R: 82,
  W: 87,
  A: 65,
  S: 83,
  D: 68
}

var map   = new Map(ROWS, COLUMNS, canvas, snakeBox);
var snake = new Snake(map);
var food  = Food.getRandomFood(map);

document.addEventListener("keydown", key => {
  snake.getDirection(key.keyCode, KEY);

  // Start game with the press of space bar
  if (key.keyCode === KEY.SPACEBAR) {
    resetScore();
    isGameOver = false;
    gameLoop();
  }

  // Restart the game with the press of R
  if (key.keyCode == KEY.R) {
    isGameOver = true;
    resetScore();
    snake.resetSnake(map);
    food = Food.getRandomFood(map);
    map.drawMap();
    map.drawSnake(snake);
    map.drawFood(food);
    renderScore();
  }

  if (snake.isMovementKey(KEY, key.keyCode)) {
    snake.incrementMove();
  }
});

settings.humanToggle.addEventListener("change", () => {
  settings.toggleHuman();
});

settings.snakeVisionToggle.addEventListener("change", () => {
  settings.toggleSnakeVision();
});

settings.foodLineToggle.addEventListener("change", () => {
  settings.toggleFoodLine();
});

function incrementScore() {
  score += food.value;
  scorePerMove = Math.floor(score / snake.moves);

  if (isCurrentScoreNewBest(score, localStorage.getItem(bestScoreLocalStorage))) {
    localStorage.setItem(bestScoreLocalStorage, score);
  }
}

function isCurrentScoreNewBest(score, best) {
  if (score > best) {
    return true;
  } else {
    return false;
  }
}

function renderScore() {
  scorePerMoveBoard.innerText = scorePerMove;
  playerMovesBoard.innerText  = snake.moves;
  currentScoreBoard.innerText = score;
  bestScoreBoard.innerText    = localStorage.getItem(bestScoreLocalStorage);
}

function resetScore() {
  score = 0;
  scorePerMove = 0;
  currentScoreBoard.innerText = score;
  scorePerMoveBoard.innerText = scorePerMove;
  playerMovesBoard.innerText  = snake.moves;
}

function startGame() {
  gameLoop();
}

function debug() {
  console.log(map);
  console.log(snake);
  console.log(food);
}

map.drawMap();
map.drawSnake(snake);
map.drawFood(food);

//Debug();

function gameLoop() {
  map.drawMap();
  map.drawSnake(snake);
  map.drawFood(food);
  renderScore();

  // Draws snake vision on screen if setting is true
  if (settings.isSnakeVisionVisible) {
    map.drawSnakeVision(snake);
  }

  // Draws food line on screen if setting is true
  if (settings.isFoodLineVisible) {
    map.drawFoodLine(snake, food);
  }

  while (snake.fovPositions.length > 0){
    snake.fovPositions.pop();
  }

  snake.fieldOfView(map);

  snake.incrementTail();
  snake.directionChange(map);


  if (snake.eatFood(food)){
    incrementScore();
    snake.maxLength++;
    food = Food.getRandomFood(map);
  }

  if (food.foodInTail(snake)){
    food = Food.getRandomFood(map);
  }

  if (!snake.isOutOfBounds(map) && !snake.isTouchingItself()) {
  setTimeout(gameLoop, settings.getRefreshRate());
  }
}

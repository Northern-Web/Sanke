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
const BLOCKSIZE  = 32;
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
};

var map   = new Map(BLOCKSIZE, canvas, snakeBox);
var snake = new Snake(map);
var food  = Food.getRandomFood(map);

 //Unit test of food
/*var testResults = Food.testFoodSpawnInSnake(map, snake, 1000000);
  console.log(`=== FOOD SPAWN TEST ===\n
            Food in snake: ${testResults.true} (${testResults.percentTruthy} %)\n
            Food not in snake: ${testResults.false} (${testResults.percentFalsy} %)\n
            Total test cases: ${testResults.total}\n
            === END OF TEST ===`);*/


document.addEventListener("keydown", key => {
  snake.getDirection(key.keyCode, KEY);

  // Start game with the press of space bar
  if (key.keyCode === KEY.SPACEBAR) {
    resetScore();
    isGameOver = false;
    gameLoop();
  }

  // Restart the game with the press of R
  if (key.keyCode === KEY.R) {
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

  console.log("------ Div Container ------");
  console.log("Width: " + map.width);
  console.log("Height: " + map.height);

  console.log("------ Context ------");
  console.log("Width: " + map.ctx.canvas.width);
  console.log("Height: " + map.ctx.canvas.height);

  console.log("------ Canvas ------");
  console.log("Width: " + map.canvas.width);
  console.log("Height: " + map.canvas.height);

  console.log(food);
  console.log("BlockSize: " + map.getBlockSize());



}

map.drawMap();
map.drawSnake(snake);
map.drawFood(food);



debug();

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

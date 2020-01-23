export class Map {
  constructor(blocksize, canvas, snakeBox) {
    this.width   = Math.floor(snakeBox.clientWidth),
    this.height  = Math.floor(snakeBox.clientHeight),
  //  this.numRows = Math.floor(this.height / numRows),
  //  this.numCols = Math.floor(this.width / numCols),
    this.blockSize = blocksize;
    this.backgroundColor = "#838383",
    this.canvas = canvas,
    this.ctx = canvas.getContext("2d"),
    this.foodDistance,
    this.angle;
  }

  getBlockSize() {
    return this.blockSize;
  }

  setCanvasSize() {
    this.ctx.canvas.width  = this.width;
    this.ctx.canvas.height = this.height;
  }

  fitCanvasToContainer(){
  // Make it visually fill the positioned parent
  this.canvas.style.width  = "100%";
  this.canvas.style.height = "100%";
  // Then set the internal size to match
  this.canvas.width  = this.canvas.offsetWidth;
  this.canvas.height = this.canvas.offsetHeight;
}

  drawBlock(iRowCounter, iBlockCounter) {
    // Set the background
    this.ctx.fillStyle = this.backgroundColor;

    // Draw rectangle for the background
    this.ctx.fillRect(iRowCounter * this.getBlockSize(), iBlockCounter * this.getBlockSize(), this.getBlockSize(), this.getBlockSize());
    this.ctx.stroke();
  }

  drawRow(iRowCounter) {
      for (let iBlockCounter = 0; iBlockCounter < this.getBlockSize(); iBlockCounter++) {
          this.drawBlock(iRowCounter, iBlockCounter);
      }
  }

  drawMap() {
    this.fitCanvasToContainer();
    this.setCanvasSize();

    for (let iRowCounter = 0; iRowCounter < this.getBlockSize(); iRowCounter++) {
        this.drawRow(iRowCounter);
    }

      // Draw outline
      this.ctx.lineWidth = 3;
      this.ctx.strokeRect(0, 0, this.getBlockSize() * this.getBlockSize(), this.getBlockSize() * this.getBlockSize());
  }

  drawSnake(snake) {
    for (let i = 0; i < snake.positions.length; i++) {
      this.ctx.fillStyle = (i === 0) ? snake.colorBody : snake.colorHead;
      this.ctx.fillRect(snake.positions[i].x, snake.positions[i].y, this.getBlockSize(), this.getBlockSize());

      //this.ctx.fillStyle = "red";
      //this.ctx.fillRect(snake.positions[i].x, snake.positions[i].y, this.getBlockSize(), this.getBlockSize());
    }
  }

  drawFood(food) {
    this.ctx.fillStyle = food.color;
    this.ctx.fillRect(food.x, food.y, this.getBlockSize(), this.getBlockSize());
  }

  drawSnakeVision (snake) {
    for (let i = 0; i < snake.fovPositions.length; i++) {
      this.ctx.fillStyle = snake.colorFieldOfView;
      this.ctx.globalAlpha = 0.2;
      this.ctx.fillRect(snake.fovPositions[i].x, snake.fovPositions[i].y, this.getBlockSize(), this.getBlockSize());
      this.ctx.globalAlpha = 1;
    }
  }

    drawFoodLine(snake, food) {
      this.ctx.fillStyle = "#800080";
      this.ctx.globalAlpha = 0.2;
      this.ctx.beginPath();
      this.ctx.moveTo(snake.positions[0].x + (this.getBlockSize() / 2), snake.positions[0].y + (this.getBlockSize() / 2));
      this.ctx.lineTo(food.x + (this.getBlockSize() / 2), food.y + (this.getBlockSize() / 2));
      this.ctx.stroke();
    }

  getDistanceFromFood(snake, food) {
    var x = food.x - snake.positions[0].x;
    var y = food.y - snake.positions[0].y;
    this.foodDistance = Math.sqrt(x**2 + y**2);
  }

}

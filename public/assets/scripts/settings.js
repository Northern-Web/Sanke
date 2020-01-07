export class Settings {
  constructor() {
    this.isHumanPlaying       = true,
    this.isSnakeVisionVisible = false,
    this.isFoodLineVisible    = false,
    this.humanToggle          = document.getElementById("player-type"),
    this.snakeVisionToggle    = document.getElementById("snake-vision"),
    this.foodLineToggle       = document.getElementById("food-line");
  }

  read() {
    console.log(this.REFRESH_RATE);
  }

  getRefreshRate(FPS = 15) {
    const SECONDS = 1000;
    return (SECONDS / FPS);
  }

  setInitialState() {
    // Is human playing
    this.isHumanPlaying      = true;
    this.humanToggle.checked = true;

    // Snake Vision
    this.isSnakeVisionVisible       = false;
    this.snakeVisionToggle.disabled = true;
    this.snakeVisionToggle.checked  = false;

    // Food Line
    this.isFoodLineVisible       = false;
    this.foodLineToggle.disabled = true;
    this.foodLineToggle.checked  = false;
  }

  toggleHuman() {
    if (this.isHumanPlaying) {
      this.isHumanPlaying             = false;
      this.snakeVisionToggle.disabled = false;
      this.foodLineToggle.disabled    = false;
    } else {
      this.isHumanPlaying = true;

      this.isSnakeVisionVisible       = false;
      this.snakeVisionToggle.disabled = true;
      this.snakeVisionToggle.checked  = false;

      this.isFoodLineVisible       = false;
      this.foodLineToggle.disabled = true;
      this.foodLineToggle.checked  = false;


    }
  }

  toggleSnakeVision() {
    if (this.isSnakeVisionVisible) {
      this.isSnakeVisionVisible = false;
    } else {
      this.isSnakeVisionVisible = true;
    }
  }

  toggleFoodLine() {
    if (this.isFoodLineVisible) {
      this.isFoodLineVisible = false;
    } else {
      this.isFoodLineVisible = true;
    }
  }
}

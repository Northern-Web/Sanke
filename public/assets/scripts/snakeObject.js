export class Snake {
  constructor(map) {
    this.positions = [{
      x: map.getBlockSize() * 5,
      y: map.getBlockSize() * 5
    },
    {
      x: map.getBlockSize() * 4,
      y: map.getBlockSize() * 5
    },
    {
      x: map.getBlockSize() * 3,
      y: map.getBlockSize() * 5
    }],
    this.colorBody = "#45b6fe",
    this.colorHead = "#0e2433",
    this.colorFieldOfView = "#90ee90",
    this.direction = "RIGHT",
    this.maxLength = 3,
    this.moves = 0,
    this.fovPositions = [];

  }

getDirection(keyCode,keys){
  if (keyCode === keys.ARROW_LEFT || keyCode === keys.A){
    if (this.direction !== "RIGHT"){
      this.direction = "LEFT";
    }
  }
  else if (keyCode === keys.ARROW_UP || keyCode === keys.W){
    if (this.direction !== "DOWN"){
      this.direction = "UP";
    }
  }
  else if (keyCode === keys.ARROW_RIGHT || keyCode === keys.D){
    if (this.direction !== "LEFT"){
      this.direction = "RIGHT";
    }
  }
  else if (keyCode === keys.ARROW_DOWN || keyCode === keys.S){
    if (this.direction !== "UP"){
      this.direction = "DOWN";
    }
  }
}

directionChange(map) {
  switch(this.direction){
    case "LEFT":
      this.positions[0].x -= map.getBlockSize();
      this.positions[0].y += 0;
      break;
    case "UP":
      this.positions[0].x += 0;
      this.positions[0].y -= map.getBlockSize();
      break;
    case "RIGHT":
      this.positions[0].x += map.getBlockSize();
      this.positions[0].y += 0;
      break;
    case "DOWN":
      this.positions[0].x += 0;
      this.positions[0].y += map.getBlockSize();
      break;
    default:
      this.positions[0].x += 0;
      this.positions[0].y += 0;
      break;
    }
  }

  isOutOfBounds(map){
    if (   this.positions[0].x >= map.width
        || this.positions[0].x < 0
        || this.positions[0].y >= map.height
        || this.positions[0].y < 0
      ){
        return true;
      }
  }

  eatFood(food){
    if (  this.positions[0].x == food.x
       && this.positions[0].y == food.y){
         return true;
       } else {
         return false;
       }
   }

   incrementTail(){
     var headPosition = { x: this.positions[0].x,
                          y: this.positions[0].y };

     this.positions.unshift(headPosition);
     if (this.positions.length > this.maxLength) {
       this.positions.pop();
     }
   }

   isTouchingItself(){
     for (var i = 1; i < this.positions.length; i++){
       if (this.positions[0].x === this.positions[i].x
        && this.positions[0].y === this.positions[i].y) {
          return true;
        }
      }
     return false;
   }

   resetSnake(map) {
     this.positions = [{
       x: map.getBlockSize() * 5,
       y: map.getBlockSize() * 5
     },
     {
       x: map.getBlockSize() * 4,
       y: map.getBlockSize() * 5
     },
     {
       x: map.getBlockSize() * 3,
       y: map.getBlockSize() * 5
     }],
     this.direction = "RIGHT",
     this.maxLength = 3,
     this.moves = 0;
   }

   incrementMove() {
     this.moves++;
   }

   isMovementKey(keys, keyCode) {
     switch(keyCode) {
       case keys.ARROW_LEFT:
        return true;
          break;
       case keys.ARROW_UP:
        return true;
          break;
       case keys.ARROW_RIGHT:
        return true;
          break;
       case keys.ARROW_DOWN:
        return true;
          break;
       case keys.W:
        return true;
          break;
       case keys.A:
        return true;
          break;
       case keys.S:
        return true;
          break;
       case keys.D:
        return true;
          break;
       default:
        return false;
     }
   }
   fieldOfView(map){
     for (let i = 1; i <= map.getBlockSize(); i++){
     switch (this.direction){
       case "RIGHT":
       var newFovPosition = {
         x: this.positions[0].x + map.getBlockSize(),
         y: this.positions[0].y - i * map.getBlockSize()
       };

       this.fovPositions.push(newFovPosition);
       
       newFovPosition = {
         x: this.positions[0].x + map.getBlockSize() + i * map.getBlockSize(),
         y: this.positions[0].y + 0
       };

       this.fovPositions.push(newFovPosition);
       newFovPosition = {
         x: this.positions[0].x + map.getBlockSize(),
         y: this.positions[0].y + i * map.getBlockSize()
       };

       this.fovPositions.push(newFovPosition);
       break;

       case "UP":
       var newFovPosition = {
         x: this.positions[0].x - i * map.getBlockSize(),
         y: this.positions[0].y - map.getBlockSize()
       };

       this.fovPositions.push(newFovPosition);

       newFovPosition = {
         x: this.positions[0].x + 0,
         y: this.positions[0].y - map.getBlockSize() - i * map.getBlockSize()
       };

       this.fovPositions.push(newFovPosition);

       newFovPosition = {
         x: this.positions[0].x + i * map.getBlockSize(),
         y: this.positions[0].y - map.getBlockSize()
       };

       this.fovPositions.push(newFovPosition);
       break;

       case "LEFT":
       var newFovPosition = {
         x: this.positions[0].x - map.getBlockSize(),
         y: this.positions[0].y + i * map.getBlockSize()
       };

       this.fovPositions.push(newFovPosition);
       newFovPosition = {
         x: this.positions[0].x - map.getBlockSize() - i * map.getBlockSize(),
         y: this.positions[0].y + 0
       };

       this.fovPositions.push(newFovPosition)
       newFovPosition = {
         x: this.positions[0].x - map.getBlockSize(),
         y: this.positions[0].y - i * map.getBlockSize()
       };

       this.fovPositions.push(newFovPosition);
       break;

       case "DOWN":
       var newFovPosition = {
         x: this.positions[0].x + i * map.getBlockSize(),
         y: this.positions[0].y + map.getBlockSize()
       }
       this.fovPositions.push(newFovPosition)
       newFovPosition = {
         x: this.positions[0].x + 0,
         y: this.positions[0].y + map.getBlockSize() + i * map.getBlockSize()
       };

       this.fovPositions.push(newFovPosition)
       newFovPosition = {
         x: this.positions[0].x - i * map.getBlockSize(),
         y: this.positions[0].y + map.getBlockSize()
       };
       this.fovPositions.push(newFovPosition);
       break;
     }
   }
 }

   foodIsWithinView(food){
     for (let i = 0; i < this.fovPositions.length; i++){
       if (this.fovPositions[i].x === food.x
        && this.fovPositions[i].y === food.y){
          return true;
        }
     }
     return false;
   }
   tailIsWithinView(map){
     for (let i = 0; i < this.fovPositions.length; i++){
       for (let n = 1; n < this.positions.length; n++){
       if (this.fovPositions[i].x === this.positions[n].x
        && this.fovPositions[i].y === this.positions[n].y){
          return true;
          }
        }
     }
     return false;
   }
}

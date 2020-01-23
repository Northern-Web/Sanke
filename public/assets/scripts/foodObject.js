export class Food {
  constructor(x, y) {
    this.x = x,
    this.y = y,
    this.value = 100,
    this.color = "#b11226";
  }

  static getRandomFood(map) {
    var randomX = Math.floor(Math.random() * map.width);
    var randomY = Math.floor(Math.random() * map.height);
    var food = new Food(randomX, randomY);
    return food;
  }

  static getAmountOfRandomFood(map, amount) {
    var foodArray = [];
    for (let i = 0; i < amount; i++) {
      foodArray.push(Food.getRandomFood(map));
    }
    return foodArray;
  }

  static testFoodSpawnInSnake(map, snake, amount) {
    var foods = Food.getAmountOfRandomFood(map, amount);
    var trueTestCases = 0;
    var falseTestCases = 0;

    for (let i = 0; i < foods.length; i++) {
      if (foods[i].foodInTail(snake)) {
        trueTestCases++;
      } else {
        falseTestCases++;
      }
    }
    var result = {
      total: amount,
      true: trueTestCases,
      false: falseTestCases,
      percentTruthy: (trueTestCases / amount) * 100,
      percentFalsy: (falseTestCases / amount) * 100
    }
    return result;
  }

  foodInTail(snake){
    for (var i = 1; i < snake.positions.length; i++){
      if ( snake.positions[i].x === this.x
        && snake.positions[i].y === this.y){
          return true;
        }
      }
      return false;
    }
  }

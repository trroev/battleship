import Ship from "./Ship";

class Gameboard {
  constructor() {
    this.board = [];
    this.missedShots = [];
    this.init();
  }

  init() {
    for (let i = 0; i < 10; i++) {
      this.board[i] = [];
      this.missedShots[i] = [];
      for (let j = 0; j < 10; j++) {
        this.board[i][j] = null;
        this.missedShots[i][j] = false;
      }
    }
  }

  placeShip(ship, row, column, isVertical) {
    if (!this.isPlacementValid(ship, row, column, isVertical)) return false;

    if (isVertical) {
      for (let i = 0; i < ship.length; i++) {
        this.board[row + i][column] = ship;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        this.board[row][column + i] = ship;
      }
    }
    return true;
  }

  placeShipsRandomly() {
    if (!this.isEmpty()) return;

    const ships = [];
    const destroyer = new Ship(2);
    const submarine = new Ship(3);
    const cruiser = new Ship(3);
    const battleship = new Ship(4);
    const carrier = new Ship(5);
    ships.push(destroyer, submarine, cruiser, battleship, carrier);

    let successfulPlacements = 0;

    while (successfulPlacements < 5) {
      const row = Math.floor(Math.random() * 10);
      const column = Math.floor(Math.random() * 10);
      const isVertical = Math.floor(Math.random() * 2) === 1 ? true : false;

      if (this.placeShip(ships[successfulPlacements], row, column, isVertical))
        successfulPlacements++;
    }
  }

  isPlacementValid(ship, row, column, isVertical) {
    // if position is off gameboard
    if (row < 0 || row > 9 || column < 0 || column > 9) return false;
    // if ship does not fit on gameboard
    if (isVertical) {
      if (row + ship.length > 10) return false;
    } else {
      if (column + ship.length > 10) return false;
    }
    // if position is already occupied
    if (isVertical) {
      for (let i = 0; i < ship.length; i++) {
        if (this.board[row + i][column]) return false;
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        if (this.board[row][column + i]) return false;
      }
    }
    // if neighboring positions are occupied
    if (isVertical) {
      for (let i = 0; i < ship.length; i++) {
        for (let x = -1; x <= 1; x++) {
          for (let y = -1; y <= 1; y++) {
            if (
              row + x + i < 0 ||
              row + x + i >= 10 ||
              column + y < 0 ||
              column + y >= 10
            )
              continue;
            if (this.board[row + x + i][column + y]) return false;
          }
        }
      }
    } else {
      for (let i = 0; i < ship.length; i++) {
        for (let x = -1; x <= 1; x++) {
          for (let y = -1; y <= 1; y++) {
            if (
              row + x < 0 ||
              row + x >= 10 ||
              column + y + i < 0 ||
              column + y + i >= 10
            )
              continue;
            if (this.board[row + x][column + y + i]) return false;
          }
        }
      }
    }
    return true;
  }

  receiveAttack(row, column) {
    if (row < 0 || row >= 10 || column < 0 || column >= 10) {
      return false;
    }

    if (this.board[row][column]) {
      let hitIndex = 0;
      if (column > 0 && this.board[row][column - 1]) {
        let i = 1;
        while (column - i >= 0 && this.board[row][column - i]) {
          hitIndex++;
          i++;
        }
      } else if (row > 0 && this.board[row - 1][column]) {
        let i = 1;
        while (row - i >= 0 && this.board[row - i][column]) {
          hitIndex++;
          i++;
        }
      }
      this.board[row][column].hit(hitIndex);
      return true;
    } else {
      this.missedShots[row][column] = true;
      return false;
    }
  }

  gameOver() {
    let isBoardEmpty = true;
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (this.board[i][j]) {
          isBoardEmpty = false;
          if (!this.board[i][j].isSunk()) {
            return false;
          }
        }
      }
    }
    return isBoardEmpty ? false : true;
  }

  isEmpty() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (this.board[i][j] !== null) return false;
      }
    }
    return true;
  }

  getEmptyFieldsAmount() {
    let result = 0;
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (this.board[i][j] === null) result++;
      }
    }
    return result;
  }
}

export default Gameboard;

import Gameboard from "./Gameboard";

class Player {
  constructor(name) {
    this.name = name;
    this.attackCoords = [];
  }

  attack(xCoord, yCoord, gameboard = this.board) {
    if (this.hasAlreadyHit(xCoord, yCoord)) return;

    this.attackCoords.push([xCoord, yCoord]);
    gameboard.receiveAttack(xCoord, yCoord);
  }

  randomAttack(gameboard = this.board) {
    if (this.attackCoords.length === 100) return;

    let xCoord = Math.floor(Math.random() * 10);
    let yCoord = Math.floor(Math.random() * 10);

    while (this.hasAlreadyHit(xCoord, yCoord)) {
      xCoord = Math.floor(Math.random() * 10);
      yCoord = Math.floor(Math.random() * 10);
    }

    this.attackCoords.push([xCoord, yCoord]);
    gameboard.receiveAttack(xCoord, yCoord);
  }

  hasAlreadyHit(xCoord, yCoord) {
    for (let i = 0; i < this.attackCoords.length; i++) {
      if (
        this.attackCoords[i][0] === xCoord &&
        this.attackCoords[i][1] === yCoord
      )
        return true;
    }
    return false;
  }
}

export default Player;

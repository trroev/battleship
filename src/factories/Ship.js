class Ship {
  constructor(length) {
    this.length = length;
    this.hits = [];
  }

  hit(index) {
    if (this.hits.includes(index) || index < 0 || index >= this.length) return;
    this.hits.push(index);
  }

  isSunk() {
    return this.hits.length === this.length;
  }
}

export default Ship;

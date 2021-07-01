// main.js
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;

// Iteration 1
function drawGrid() {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      context.strokeRect(
        (width / 10) * i,
        (height / 10) * j,
        width / 10,
        height / 10
      );
    }
  }
}

function drawPlayer() {
  const playerImage = new Image();
  playerImage.src = './images/character-down.png';
  playerImage.addEventListener('load', () => {
    context.drawImage(
      playerImage,
      (player.row * width) / 10,
      (player.col * height) / 10
    );
  });
}

function drawTreasure() {
  const treasureImage = new Image();
  treasureImage.src = './images/treasure.png';
  treasureImage.addEventListener('load', () => {
    context.drawImage(treasureImage, 20, 20, 20, 20);
  });
}

function drawEverything() {
  drawGrid();
  drawPlayer();
  drawTreasure();
}

drawEverything();

class Character {
  constructor(row, col) {
    this.row = row;
    this.col = col;
  }

  moveUp() {
    if (this.col > 0) {
      this.col--;
    }
  }
  moveDown() {
    if (this.col < 9) {
      this.col++;
    }
  }
  moveLeft() {
    if (this.row > 0) {
      this.row--;
    }
  }
  moveRight() {
    if (this.row < 9) {
      this.row++;
    }
  }
}

class Treasure {
  constructor() {
    this.col = 0;
    this.row = 0;
  }
  setRandomPosition() {}
}

const player = new Character(0, 0);

window.addEventListener('keydown', (e) => {
  e.preventDefault();

  switch (e.key) {
    case 'ArrowLeft':
      player.moveLeft();
      break;
    case 'ArrowUp':
      player.moveUp();
      break;
    case 'ArrowRight':
      player.moveRight();
      break;
    case 'ArrowDown':
      player.moveDown();
      break;
  }
  drawEverything();
});

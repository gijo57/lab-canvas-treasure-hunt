// main.js
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const width = canvas.width;
const height = canvas.height;

class Character {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.direction = 'down';
    this.score = 0;
  }

  addScore() {
    this.score++;
  }
  moveUp() {
    this.direction = 'up';
    if (this.col > 0) {
      this.col--;
    }
  }
  moveDown() {
    this.direction = 'down';
    if (this.col < 9) {
      this.col++;
    }
  }
  moveLeft() {
    this.direction = 'left';
    if (this.row > 0) {
      this.row--;
    }
  }
  moveRight() {
    this.direction = 'right';
    if (this.row < 9) {
      this.row++;
    }
  }
}

class Treasure {
  constructor() {
    this.col = Math.floor(Math.random() * 10);
    this.row = Math.floor(Math.random() * 10);
    this.found = false;
  }
  setRandomPosition() {
    this.col = Math.floor(Math.random() * 10);
    this.row = Math.floor(Math.random() * 10);
  }
}
const treasure = new Treasure();
const player = new Character(0, 0);

function drawGrid() {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      context.fillStyle = 'white';
      context.fillRect(
        (width / 10) * i,
        (height / 10) * j,
        width / 10,
        height / 10
      );
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
  playerImage.src = `./images/character-${player.direction}.png`;
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
    if (player.row === treasure.row && player.col === treasure.col) {
      treasure.setRandomPosition();
      player.addScore();
    }
    context.drawImage(
      treasureImage,
      (treasure.row * width) / 10,
      (treasure.col * height) / 10,
      50,
      50
    );
  });
}

function drawScore() {
  context.fillStyle = 'black';
  context.fillText(`Player 1 score: ${player.score}`, 450, 490);
}

function drawEverything() {
  drawGrid();
  drawPlayer();
  drawTreasure();
  drawScore();
}

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

drawEverything();

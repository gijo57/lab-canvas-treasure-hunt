// main.js
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const width = canvas.width - 300;
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
    drawScore();
  }
  moveUp() {
    this.direction = 'up';
    if (this.row > 0) {
      this.row--;
    }
  }
  moveDown() {
    this.direction = 'down';
    if (this.row < 9) {
      this.row++;
    }
  }
  moveLeft() {
    this.direction = 'left';
    if (this.col > 0) {
      this.col--;
    }
  }
  moveRight() {
    this.direction = 'right';
    if (this.col < 9) {
      this.col++;
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
const player2 = new Character(9, 9);

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
  const player2Image = new Image();
  playerImage.src = `./images/character-${player.direction}.png`;
  player2Image.src = `./images/character-${player2.direction}.png`;
  playerImage.addEventListener('load', () => {
    context.drawImage(
      playerImage,
      (player.col * height) / 10,
      (player.row * width) / 10
    );
  });
  player2Image.addEventListener('load', () => {
    context.drawImage(
      player2Image,
      (player2.col * height) / 10,
      (player2.row * width) / 10
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
    } else if (player2.row === treasure.row && player2.col === treasure.col) {
      treasure.setRandomPosition();
      player2.addScore();
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
  context.fillStyle = 'white';
  context.fillRect(550, 0, 200, 200);
  context.fillStyle = 'black';
  context.font = '20px Arial';
  context.fillText(`Player 1 score: ${player.score}`, 600, 100);
  context.fillText(`Player 2 score: ${player2.score}`, 600, 140);
}

function executeMoves() {
  Object.keys(keyPressController).forEach((key) => {
    keyPressController[key].pressed && keyPressController[key].func();
  });
}

function drawEverything() {
  drawGrid();
  executeMoves();
  drawPlayer();
  drawTreasure();
  drawScore();
}

const keyPressController = {
  ArrowLeft: { pressed: false, func: player.moveLeft.bind(player) },
  ArrowRight: { pressed: false, func: player.moveRight.bind(player) },
  ArrowUp: { pressed: false, func: player.moveUp.bind(player) },
  ArrowDown: { pressed: false, func: player.moveDown.bind(player) },
  a: { pressed: false, func: player2.moveLeft.bind(player2) },
  d: { pressed: false, func: player2.moveRight.bind(player2) },
  w: { pressed: false, func: player2.moveUp.bind(player2) },
  s: { pressed: false, func: player2.moveDown.bind(player2) }
};

window.addEventListener('keydown', (e) => {
  e.preventDefault();

  if (keyPressController[e.key]) {
    keyPressController[e.key].pressed = true;
  }

  drawEverything();
});

window.addEventListener('keyup', (e) => {
  e.preventDefault();

  if (keyPressController[e.key]) {
    keyPressController[e.key].pressed = false;
  }

  drawEverything();
});

drawEverything();

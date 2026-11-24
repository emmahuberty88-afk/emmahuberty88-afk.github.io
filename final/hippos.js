// setup canvas

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const width = (canvas.width = window.innerWidth);
const height = (canvas.height = window.innerHeight);

// top bar button elements
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const deleteBtn = document.getElementById('delete-btn');


const hippo = document.getElementById('hippo') 
let hippox = getComputedStyle(hippo).getPropertyValue('--hippo-x')
let hippoy = getComputedStyle(hippo).getPropertyValue('--hippo-y')
const hippospeed = 10; 

startBtn.addEventListener('click', () => {
    nextBtn.disabled = false;
    deleteBtn.disabled = false;

    window.addEventListener("keydown", (event) => {
if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
    event.preventDefault();
  }

  switch (event.key) {
    case 'ArrowUp':
      hippoy -= hippospeed;
      break;
    case 'ArrowDown':
      hippoy += hippospeed;
      break;
    case 'ArrowLeft':
      hippox -= hippospeed;
      break;
    case 'ArrowRight':
      hippox += hippospeed;
      break;
  }

  // Apply the new coordinates
  hippo.style.setProperty('--hippo-y',hippoy);
  hippo.style.setProperty('--hippo-x',hippox);
});

});


// function to generate random number

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// function to generate random color

function randomRGB() {
  let ballColors = ['#EF476F','#B3B7EE','#33998D','#FFD166','#4EA8DE','#F78C6B'];
  const randomBallColor = ballColors[Math.floor(Math.random() * ballColors.length)]
  return randomBallColor;
}

// class ball setup

class Ball {
  constructor(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }
// ball method: smth you can do to the ball class
  draw() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update() {
    if (this.x + this.size >= width) {
      this.velX = -this.velX;
    }

    if (this.x - this.size <= 0) {
      this.velX = -this.velX;
    }

    if (this.y + this.size >= height) {
      this.velY = -this.velY;
    }

    if (this.y - this.size <= 0) {
      this.velY = -this.velY;
    }

    this.x += this.velX;
    this.y += this.velY;
  }

  collisionDetect() {
    for (const ball of balls) {
      if (this !== ball) {
        const dx = this.x - ball.x;
        const dy = this.y - ball.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < this.size + ball.size) {
          ball.color = this.color = randomRGB();
        }
      }
    }
  }

}

const balls = [];

while (balls.length < 10) {
  const size = random(10, 20);
  const ball = new Ball(
    // ball position always drawn at least one ball width
    // away from the edge of the canvas, to avoid drawing errors
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 9),
    random(-7, 9),
    randomRGB(),
    size,
  );

  balls.push(ball);
}

function loop() {
  ctx.fillStyle = "rgb(0 0 0 / 25%)";
  ctx.fillRect(0, 0, width, height);

  for (const ball of balls) {
    ball.draw();
    ball.update();
    ball.collisionDetect();
  }
//causes it to repeat the loop function, like a gif. makes the speed trails behind the balls, and deletes old versions. 
  requestAnimationFrame(loop);
}

loop();


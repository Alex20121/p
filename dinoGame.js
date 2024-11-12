const dino = document.getElementById('dino');
const obstacles = document.getElementById('obstacles');
const timerElement = document.getElementById('timer');
const pauseButtonDino = document.getElementById('pauseButtonDino');
const pauseMenuDino = document.getElementById('pauseMenuDino');
const resumeButtonDino = document.getElementById('resumeButtonDino');

let isDinoPaused = false;
let isJumping = false;
let dinoBottom = 10;
const jumpHeight = 150;
let gameInterval;
let timer = 0;
let timerInterval;

document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' && !isJumping && !isDinoPaused) {
        jump();
    }
});

function jump() {
    isJumping = true;
    let upInterval = setInterval(() => {
        if (dinoBottom >= jumpHeight) {
            clearInterval(upInterval);
            let downInterval = setInterval(() => {
                if (dinoBottom <= 10) {
                    clearInterval(downInterval);
                    isJumping = false;
                } else {
                    dinoBottom -= 5;
                    dino.style.bottom = dinoBottom + 'px';
                }
            }, 20);
        } else {
            dinoBottom += 5;
            dino.style.bottom = dinoBottom + 'px';
        }
    }, 20);
}

function createObstacle() {
    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    const obstacleType = Math.random() > 0.5 ? 'rock.png' : 'cactus.png';
    obstacle.style.background = `url('${obstacleType}') no-repeat`;
    obstacle.style.left = window.innerWidth + 'px';
    obstacles.appendChild(obstacle);
    moveObstacle(obstacle);
}

function moveObstacle(obstacle) {
    let obstacleLeft = parseInt(obstacle.style.left);
    const moveInterval = setInterval(() => {
        if (isDinoPaused) {
            clearInterval(moveInterval);
            return;
        }
        if (obstacleLeft <= 0) {
            clearInterval(moveInterval);
            obstacle.remove();
        } else {
            obstacleLeft -= 5;
            obstacle.style.left = obstacleLeft + 'px';
        }

        if (checkCollision(obstacle)) {
            clearInterval(moveInterval);
            gameOver();
        }
    }, 20);
}

function checkCollision(obstacle) {
    const dinoRect = dino.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();
    return !(
        dinoRect.top > obstacleRect.bottom ||
        dinoRect.bottom < obstacleRect.top ||
        dinoRect.right < obstacleRect.left ||
        dinoRect.left > obstacleRect.right
    );
}

function startGame() {
    timer = 0;
    timerInterval = setInterval(() => {
        if (!isDinoPaused) {
            timer += 1;
            timerElement.textContent = timer + 's';
        }
    }, 1000);
    gameInterval = setInterval(() => {
        if (!isDinoPaused) {
            createObstacle();
        }
    }, 2000);
}

function gameOver() {
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    alert('Game Over! Time survived: ' + timer + ' seconds');
    location.reload(); // Restart the game
}

function pauseGameDino() {
    isDinoPaused = true;
    pauseMenuDino.style.display = 'block';
}

function resumeGameDino() {
    isDinoPaused = false;
    pauseMenuDino.style.display = 'none';
}

pauseButtonDino.addEventListener('click', pauseGameDino);
resumeButtonDino.addEventListener('click', resumeGameDino);

startGame();

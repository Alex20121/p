// Check Leap Year
function checkLeapYear() {
    const year = document.getElementById('yearInput').value;
    const leapYearResult = document.getElementById('leapYearResult');
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        leapYearResult.textContent = 'Ви народилися у високосний рік!';
    } else {
        leapYearResult.textContent = 'Ви не народилися у високосний рік.';
    }
}

// Guess Number Game
let randomNumber = Math.floor(Math.random() * 100) + 1;
function guessNumber() {
    const guess = parseInt(document.getElementById('guessInput').value);
    const guessResult = document.getElementById('guessResult');
    if (guess === randomNumber) {
        guessResult.textContent = 'Вітаю, ви вгадали число!';
    } else {
        guessResult.textContent = 'Спробуйте ще раз!';
    }
}

// Rock Paper Scissors Game
let userScore = 0;
let compScore = 0;

function playGame(userChoice) {
    const choices = ['rock', 'paper', 'scissors'];
    const compChoice = choices[Math.floor(Math.random() * 3)];
    const result = document.getElementById('rpsResult');
    const userScoreElem = document.getElementById('userScore');
    const compScoreElem = document.getElementById('compScore');

    if (userChoice === compChoice) {
        result.textContent = `Нічия! Комп’ютер вибрав ${compChoice}.`;
    } else if (
        (userChoice === 'rock' && compChoice === 'scissors') ||
        (userChoice === 'paper' && compChoice === 'rock') ||
        (userChoice === 'scissors' && compChoice === 'paper')
    ) {
        result.textContent = `Ви виграли! Комп’ютер вибрав ${compChoice}.`;
        userScore++;
    } else {
        result.textContent = `Ви програли! Комп’ютер вибрав ${compChoice}.`;
        compScore++;
    }

    userScoreElem.textContent = userScore;
    compScoreElem.textContent = compScore;
}

// Calculator
function calculate(operator) {
    const num1 = parseFloat(document.getElementById('calcInput1').value);
    const num2 = parseFloat(document.getElementById('calcInput2').value);
    const resultElem = document.getElementById('calcResult');
    let result;

    if (operator === '+') {
        result = num1 + num2;
    } else if (operator === '-') {
        result = num1 - num2;
    } else if (operator === '*') {
        result = num1 * num2;
    } else if (operator === '/') {
        result = num1 / num2;
    }

    resultElem.textContent = result;
}

// Find Maximum Number
function findMaxNumber() {
    const num1 = parseFloat(document.getElementById('numInput1').value);
    const num2 = parseFloat(document.getElementById('numInput2').value);
    const num3 = parseFloat(document.getElementById('numInput3').value);
    const maxNumber = Math.max(num1, num2, num3);
    document.getElementById('maxNumber').textContent = maxNumber;
}

// Send Message (just a simulated alert for this example)
function sendMessage(event) {
    event.preventDefault();
    alert('Message sent! We will get back to you soon.');
}

// Subscribe (just a simulated alert for this example)
function subscribe(event) {
    event.preventDefault();
    alert('Subscribed successfully!');
}

// Google Dinosaur Game
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let dino = { x: 50, y: 150, width: 50, height: 50, vy: 0, gravity: 0.5, jumpForce: -10, jumping: false };
let obstacles = [];
let score = 0;
let gameOver = false;

function drawDino() {
    ctx.fillStyle = 'black';
    ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
}

function updateDino() {
    if (dino.jumping) {
        dino.vy += dino.gravity;
        dino.y += dino.vy;
        if (dino.y > 150) {
            dino.y = 150;
            dino.vy = 0;
            dino.jumping = false;
        }
    }
}

function jump() {
    if (!dino.jumping) {
        dino.vy = dino.jumpForce;
        dino.jumping = true;
    }
}

function createObstacle() {
    const obstacle = { x: canvas.width, y: 150, width: 20, height: 20 };
    obstacles.push(obstacle);
}

function drawObstacles() {
    ctx.fillStyle = 'red';
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        obstacle.x -= 2;
    });
}

function checkCollision() {
    obstacles.forEach(obstacle => {
        if (
            dino.x < obstacle.x + obstacle.width &&
            dino.x + dino.width > obstacle.x &&
            dino.y < obstacle.y + obstacle.height &&
            dino.y + dino.height > obstacle.y
        ) {
            gameOver = true;
        }
    });
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawDino();
    drawObstacles();
    updateDino();
    checkCollision();
    if (!gameOver) {
        requestAnimationFrame(gameLoop);
    } else {
        ctx.fillStyle = 'black';
        ctx.font = '30px Arial';
        ctx.fillText('Game Over', canvas.width / 2 - 75, canvas.height / 2);
    }
}

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' || event.code === 'ArrowUp') {
        jump();
    }
});


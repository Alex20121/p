const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const goalKeeper = {
    x: 20,  // Goalkeeper on the left side
    y: canvas.height / 2 - 20,
    width: 10,
    height: 40,
    speed: 10,
    dy: 0
};

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 10,
    speed: 4,
    dx: 4,
    dy: 4
};

let isFootballPaused = false;

function drawGoalKeeper() {
    ctx.fillStyle = '#0095DD';
    ctx.fillRect(goalKeeper.x, goalKeeper.y, goalKeeper.width, goalKeeper.height);
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#FF4500';
    ctx.fill();
    ctx.closePath();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function moveGoalKeeper() {
    goalKeeper.y += goalKeeper.dy;

    if (goalKeeper.y < 0) {
        goalKeeper.y = 0;
    }

    if (goalKeeper.y + goalKeeper.height > canvas.height) {
        goalKeeper.y = canvas.height - goalKeeper.height;
    }
}

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
        ball.dx *= -1;
    }

    if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
        ball.dy *= -1;
    }

    if (
        ball.y > goalKeeper.y &&
        ball.y < goalKeeper.y + goalKeeper.height &&
        ball.x - ball.radius < goalKeeper.x + goalKeeper.width
    ) {
        ball.dx *= -1;
    }

    if (ball.x - ball.radius < 0) {
        resetBall();
    }
}

function resetBall() {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    ball.dx = 4 * (Math.random() > 0.5 ? 1 : -1);
    ball.dy = 4 * (Math.random() > 0.5 ? 1 : -1);
}

function updateFootball() {
    if (!isFootballPaused) {
        clearCanvas();
        drawGoalKeeper();
        drawBall();
        moveGoalKeeper();
        moveBall();
    }
    requestAnimationFrame(updateFootball);
}

function keyDownFootball(e) {
    if (e.key === 'ArrowUp') {
        goalKeeper.dy = -goalKeeper.speed;
    } else if (e.key === 'ArrowDown') {
        goalKeeper.dy = goalKeeper.speed;
    }
}

function keyUpFootball(e) {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        goalKeeper.dy = 0;
    }
}

document.addEventListener('keydown', keyDownFootball);
document.addEventListener('keyup', keyUpFootball);

const pauseButtonFootball = document.getElementById('pauseButtonFootball');
const pauseMenuFootball = document.getElementById('pauseMenuFootball');
const resumeButtonFootball = document.getElementById('resumeButtonFootball');

function pauseGameFootball() {
    isFootballPaused = true;
    pauseMenuFootball.style.display = 'block';
}

function resumeGameFootball() {
    isFootballPaused = false;
    pauseMenuFootball.style.display = 'none';
}

pauseButtonFootball.addEventListener('click', pauseGameFootball);
resumeButtonFootball.addEventListener('click', resumeGameFootball);

updateFootball();

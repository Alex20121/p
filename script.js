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
document.getElementById('calculateTimeButton').addEventListener('click', function() {
    const timeInput = document.getElementById('timeInput').value;
    const timeResult = document.getElementById('timeResult');
    
    if (timeInput) {
        const seconds = parseInt(timeInput);
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        timeResult.textContent = `${hours} hours, ${minutes} minutes, and ${remainingSeconds} seconds`;
    } else {
        timeResult.textContent = 'Please enter a valid number.';
    }
});

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
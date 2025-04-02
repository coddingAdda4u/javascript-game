const timer = document.getElementById('timer');
let target = document.getElementById('target');
let scoreDisplay = document.getElementById('score');
const bubbleContainer = document.querySelector('.bubble-container');
const originalTime = 20;
let isTime = 20;
let score = 0;
let bubbleCount = 100;

function create() {
    for (let index = 0; index <= bubbleCount; index++) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble');
        bubble.textContent = Math.floor(Math.random() * 10);
        bubbleContainer.appendChild(bubble)
    }
}
function setTimer() {
    const timeInterval = setInterval(() => {
        isTime--;
        if (isTime === 0) {
            clearInterval(timeInterval);
            bubbleContainer.innerHTML = `
            <div class="final-container">
            <h1>Game Over</h1>
            <h3>Score : ${score}</h3>
            <button onclick="resetGame()">Reset Game</button>
            </div>`;
        }
        timer.textContent = isTime;
    }, 1000);
}

function setTarget() {
    const isTarget = target.textContent = Math.floor(Math.random() * 10);
}

function resetGame() {
    isTime = originalTime;
    score = 0;
    scoreDisplay.textContent = score;
    timer.innerHTML = isTime;
    bubbleContainer.innerHTML = '';
    create();
    setTarget();
    setTimer();
}


bubbleContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('bubble')) {
        setTarget();
        if (e.target.textContent === target.textContent) {
            score += 10;
        } else {
            score -= 5;
        }
        scoreDisplay.textContent = score;
    }
})

create();
setTimer();
setTarget();
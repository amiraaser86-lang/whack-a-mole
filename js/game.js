// إعداد اللعبة
const gameBoard = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const startBtn = document.getElementById('start-btn');

// إعداد المتغيرات
let score = 0;
let timeLeft = 30;
let gameInterval;
let moleInterval;
let isGameRunning = false;

// إنشاء الثقوب
function createHoles() {
    gameBoard.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const hole = document.createElement('div');
        hole.classList.add('hole');
        hole.dataset.index = i;
        gameBoard.appendChild(hole);
    }
}

// ظهور الكره (المول)
function popMole() {
    if (!isGameRunning) return;

    const holes = document.querySelectorAll('.hole');
    const randomHole = holes[Math.floor(Math.random() * holes.length)];

    randomHole.classList.add('mole');

    setTimeout(() => {
        randomHole.classList.remove('mole');
    }, 1000);
}

// تحديث النقاط
function updateScore() {
    score++;
    scoreDisplay.textContent = score;
}

// تحديث الوقت
function updateTime() {
    timeLeft--;
    timeDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
        endGame();
    }
}

// بدء اللعبة
function startGame() {
    if (isGameRunning) return;

    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;
    isGameRunning = true;
    startBtn.disabled = true;

    createHoles();

    moleInterval = setInterval(popMole, 1000);
    gameInterval = setInterval(updateTime, 1000);

    // إعادة اللعبة بعد 30 ثانية
    setTimeout(endGame, 30000);
}

// إنهاء اللعبة
function endGame() {
    clearInterval(moleInterval);
    clearInterval(gameInterval);
    isGameRunning = false;
    startBtn.disabled = false;

    if (confirm(`انتهت اللعبة! نقاطك: ${score}. هل تريد اللعب مرة أخرى؟`)) {
        startGame();
    }
}

// إضافة مستمع للأحداث
startBtn.addEventListener('click', startGame);

// إضافة مستمع للنقر على الثقوب
gameBoard.addEventListener('click', (e) => {
    if (isGameRunning && e.target.classList.contains('mole')) {
        updateScore();
        e.target.classList.remove('mole');
    }
});

// تهيئة اللعبة
createHoles();
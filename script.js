const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');

const gridSize = 20;
let snake = [{ x: 10 * gridSize, y: 10 * gridSize }];
let food = { x: 15 * gridSize, y: 15 * gridSize };
let direction = 'right';
let score = 0;
let gameLoopInterval;

function update() {
    const head = { x: snake[0].x, y: snake[0].y };

    if (direction === 'right') head.x += gridSize;
    if (direction === 'left') head.x -= gridSize;
    if (direction === 'up') head.y -= gridSize;
    if (direction === 'down') head.y += gridSize;

    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreDisplay.innerText = 'Score: ' + score;
        food = {
            x: Math.floor(Math.random() * 20) * gridSize,
            y: Math.floor(Math.random() * 20) * gridSize
        };
    } else {
        snake.pop();
    }

    snake.unshift(head);

    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || checkCollision()) {
        gameOver();
        return;
    }

    draw();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);

    // Draw snake
    ctx.fillStyle = 'orange';
    snake.forEach(segment => {
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });
}

function checkCollision() {
    const head = snake[0];
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

function gameOver() {
    clearInterval(gameLoopInterval);
    alert('Game Over! Your score: ' + score);
    snake = [{ x: 10 * gridSize, y: 10 * gridSize }];
    food = { x: 15 * gridSize, y: 15 * gridSize };
    direction = 'right';
    score = 0;
    scoreDisplay.innerText = 'Score: ' + score;
    startGame(); // Restart the game
}


function startGame() {
    if (gameLoopInterval) {
        clearInterval(gameLoopInterval); // Clear any existing interval
    }
    gameLoopInterval = setInterval(update, 100);
}


document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && direction !== 'down') direction = 'up';
    if (e.key === 'ArrowDown' && direction !== 'up') direction = 'down';
    if (e.key === 'ArrowLeft' && direction !== 'right') direction = 'left';
    if (e.key === 'ArrowRight' && direction !== 'left') direction = 'right';
    if (e.key === 'w' && direction !== 'down') direction = 'up';
    if (e.key === 's' && direction !== 'up') direction = 'down';
    if (e.key === 'a' && direction !== 'right') direction = 'left';
    if (e.key === 'd' && direction !== 'left') direction = 'right';
});

startGame(); // Start the game when the script loads

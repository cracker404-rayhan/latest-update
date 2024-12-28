// Password check function
function checkPassword() {
    const password = document.getElementById("password").value;
    const correctPassword = "00000"; // You can change this to any password you want
    const errorMessage = document.getElementById("error-message");
    
    if (password === correctPassword) {
        document.getElementById("login-screen").style.display = "none";
        document.getElementById("game-screen").style.display = "block";
        startGame();
    } else {
        errorMessage.textContent = "পাসওয়ার্ড ভুল। আবার চেষ্টা করুন!";
    }
}

// Snake game logic
let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

const snakeSize = 10;
let snake = [{ x: 150, y: 150 }];
let food = { x: 0, y: 0 };
let direction = "RIGHT";
let score = 0;

document.addEventListener("keydown", changeDirection);

function startGame() {
    placeFood();
    setInterval(gameLoop, 100);
}

function gameLoop() {
    moveSnake();
    checkCollisions();
    clearCanvas();
    drawSnake();
    drawFood();
    drawScore();
}

function moveSnake() {
    let head = { ...snake[0] };

    if (direction === "LEFT") head.x -= snakeSize;
    if (direction === "RIGHT") head.x += snakeSize;
    if (direction === "UP") head.y -= snakeSize;
    if (direction === "DOWN") head.y += snakeSize;

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        placeFood();
    } else {
        snake.pop();
    }
}

function checkCollisions() {
    let head = snake[0];

    if (
        head.x < 0 || head.x >= canvas.width ||
        head.y < 0 || head.y >= canvas.height ||
        snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y)
    ) {
        // alert("গেম শেষ! আপনার স্কোর: " + score);
        snake = [{ x: 150, y: 150 }];
        score = 0;
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = "black";
        ctx.fillRect(segment.x, segment.y, snakeSize, snakeSize);
    });
}

function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, snakeSize, snakeSize);
    
}

function drawScore() {
    ctx.fillStyle = "black";
    ctx.font = "22px Arial";
    ctx.fillText("স্কোর: " + score, 10, 20);
}

function placeFood() {
    food.x = Math.floor(Math.random() * (canvas.width / snakeSize)) * snakeSize;
    food.y = Math.floor(Math.random() * (canvas.height / snakeSize)) * snakeSize;
}

function changeDirection(event) {
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
}

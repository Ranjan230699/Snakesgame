
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;

let snake = [{ x: 200, y: 200 }];
let food = { x: 100, y: 100 };

let dx = box;
let dy = 0;
let score = 0;
let game;
let running = false;

function drawGame() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, 400, 400);

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    ctx.fillStyle = "#22c55e";

    snake.forEach(part => {
        ctx.fillRect(part.x, part.y, box - 2, box - 2);
    });
}

function moveSnake() {
    const head = {
        x: snake[0].x + dx,
        y: snake[0].y + dy
    };

    if (
        head.x < 0 || head.x >= 400 ||
        head.y < 0 || head.y >= 400 ||
        snake.some(part =>
            part.x === head.x && part.y === head.y
        )
    ) {
        clearInterval(game);
        running = false;
        alert("Game Over! Score: " + score);
        return;
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        document.getElementById("score").innerText = score;
        createFood();
    } else {
        snake.pop();
    }

    drawGame();
}

function createFood() {
    do {
        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        };
    } while (snake.some(part =>
        part.x === food.x && part.y === food.y
    ));
}

document.addEventListener("keydown", function(e) {
    if (e.key === "ArrowUp" && dy === 0) {
        dx = 0;
        dy = -box;
    } else if (e.key === "ArrowDown" && dy === 0) {
        dx = 0;
        dy = box;
    } else if (e.key === "ArrowLeft" && dx === 0) {
        dx = -box;
        dy = 0;
    } else if (e.key === "ArrowRight" && dx === 0) {
        dx = box;
        dy = 0;
    }
});

function getSelectedSpeed() {
    const levelDropdown = document.getElementById("levelSelect");
    return levelDropdown ? parseInt(levelDropdown.value) : 150;
}

function changeSpeed() {
    // If the game is currently running, update speed immediately
    if (running) {
        clearInterval(game);
        game = setInterval(moveSnake, getSelectedSpeed());
    }
}

function startGame() {
    clearInterval(game);

    snake = [{ x: 200, y: 200 }];
    dx = box;
    dy = 0;
    score = 0;
    running = true;

    document.getElementById("score").innerText = score;

    createFood();
    drawGame();

    game = setInterval(moveSnake, getSelectedSpeed());
}

//function startGame() {
//    clearInterval(game);
//
//    snake = [{ x: 200, y: 200 }];
//    dx = box;
//    dy = 0;
//    score = 0;
//    running = true;
//
//    document.getElementById("score").innerText = score;
//
//    createFood();
//    drawGame();
//
//    game = setInterval(moveSnake, 150);
//}

drawGame();

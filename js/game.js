const canvas = document.querySelector('#canvasGame');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext('2d');

let fps = 30;

let ballX = 50;
let ballY = 50;
let ballSpeedX = 10;
let ballSpeedY = 10;

let paddleY = 250;
let paddle2Y = 250;
const paddle_height = 200;

let player1 = 0;
let cpu = 0;

const WINNING_SCORE = 10

canvas.addEventListener('mousemove', (e) => {
    paddleY = e.clientY - 80;
    if(paddleY < 0) {
        paddleY = 0;
    } else if (paddleY > canvas.height - 200) {
        paddleY = canvas.height - 200;
    }
})

// window.addEventListener('keypress', (e) => {
//     console.log(e.keyCode);
//     if (e.keyCode === 119) {
//         paddleY = paddleY - 40;
//         if(paddleY < 0) {
//             paddleY = 0;
//         }
//     } else if (e.keyCode === 115) {
//         paddleY = paddleY + 40;
//         if(paddleY > canvas.height - 200) {
//             paddleY = canvas.height - 200
//         }
//     }

// })

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = 'white';
    ctx.fillRect(10, paddleY, 10, paddle_height);

    ctx.fillStyle = 'white';
    ctx.fillRect(canvas.width - 20, paddle2Y, 10, paddle_height);
    
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(ballX, ballY, 15, 20, Math.PI*2, true);
    ctx.fill();

    ctx.fillText(`${player1}`, (canvas.width * 10) / 100 , 100);
    ctx.fillText(` ${cpu}`, (canvas.width * 80) / 100, 100);
    ctx.font = "normal 82px Game Over";
}

function move() {
    ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY;

    if (ballX > canvas.width - 40) {
        if(ballY > paddle2Y && ballY < paddle2Y + paddle_height) {
            ballSpeedX = -10;
            
            let deltaY = ballY - (paddle2Y + paddle_height / 2);
            ballSpeedY = deltaY * 0.35;
        } else {
            player1++;
            reset();
        }
    } else if (ballX < 40) {
        if(ballY > paddleY && ballY < paddleY + paddle_height) {
            ballSpeedX = 10;
            let delta = ballY - (paddleY + paddle_height / 2);
            ballSpeedY = delta * 0.35;
        } else {
            cpu++;
            reset();
        }
    }

    if (ballY > canvas.height) {
        ballSpeedY = -10;
    } else if (ballY < 0) {
        ballSpeedY = 10;
    }
}

function reset() {
    if (player1 >= WINNING_SCORE || cpu >= WINNING_SCORE) {
        player1 = 0;
        cpu = 0;
        isWin = true;
    } 

    ballSpeedX = -ballSpeedX;
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
}

function computerMovement() {
    let paddleCenter = paddle2Y + (paddle_height / 2);
    if (paddleCenter < ballY - 35) {
        paddle2Y += 9
    } else if(paddleCenter > ballY + 35) {
        paddle2Y -= 9
    }
}

setInterval(() => {
    move();
    draw();
    computerMovement();
}, 500/fps);

console.log(choice)


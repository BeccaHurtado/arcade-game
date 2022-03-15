var canvas;
var canvasContext;

var ballX = 50;
var ballY = 50;

var ballSpeedX = 10;
var ballSpeedY = 4;

var playerLeftScore = 0;
var playerRightScore = 0;

var paddleLeft = 250;
var paddleRight = 250;

const paddleHeight = 100;
const paddleThickness = 10;

function calculateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    };
}

window.onload = function() {
    console.log("Hello World!")
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    var framesPerSecond = 30;
    setInterval(function() {
        moveEverything();
        loadEverything();
        computerMovement();
    }, 
    1000/framesPerSecond);  
    
    canvas.addEventListener('mousemove', function(evt) {
        var mousePos = calculateMousePos(evt);
        paddleLeft = mousePos.y - (paddleHeight / 2)
    })
}

function ballReset() {
    ballSpeedX = -ballSpeedX;
    ballX = canvas.width/2;
    ballY = canvas.height/2
}

function computerMovement() {
    var paddleRightCenter = paddleRight + (paddleHeight / 2)
    if (paddleRightCenter < ballY - 35) {
        paddleRight += 6
    } else if (paddleRightCenter > ballY + 35) {
        paddleRight -= 6
    }
}

function moveEverything() {
    ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY;
    if (ballX < 0) {
        if (ballY > paddleLeft && ballY < paddleLeft + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            ballReset();
            playerRightScore ++
        }
    }
    if (ballX > canvas.width) {
        if (ballY > paddleRight && ballY < paddleRight + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            ballReset();
            playerLeftScore ++
        }
    }
    if (ballY < 0) {
        ballSpeedY = -ballSpeedY;
    }
    if (ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }
}

function loadEverything() {

    // covers screen with black
    colorRect(0, 0, canvas.width, canvas.height, 'black');

    // creates left player paddle
    colorRect(0, paddleLeft, paddleThickness, paddleHeight, 'white');

    // creates right computer paddle
    colorRect(canvas.width - paddleThickness, paddleRight, paddleThickness, paddleHeight, 'white');

    // calls function to create red circle
    colorCircle(ballX, ballY, 10, 'white')

    // numbers are coordinates
    canvasContext.fillText(playerLeftScore, 100, 100)
    canvasContext.fillText(playerRightScore, canvas.width - 100, 100)

}

function colorCircle(centerX, centerY, radius, drawColor) {
    // creates red circle
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
    canvasContext.fill()

}

function colorRect(leftX, topY, width, height, drawColor) {
    
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);

}
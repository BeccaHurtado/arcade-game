var canvas;
var canvasContext;
var ballX = 50;
var ballSpeedX = 10;
var ballY = 50;
var ballSpeedY = 4;

var paddleLeft = 250;
const paddleHeight = 100;

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

function moveEverything() {
    ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY;
    if (ballX < 0) {
        if (ballY > paddleLeft && ballY < paddleLeft + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        } else {
            ballReset();
        }
    }
    if (ballX > canvas.width) {
        ballSpeedX = -ballSpeedX;
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
    colorRect(0, paddleLeft, 10, paddleHeight, 'white');

    // calls function to create red circle
    colorCircle(ballX, ballY, 10, 'white')

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
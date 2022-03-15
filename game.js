var canvas;
var canvasContext;
var ballX = 50;
var ballSpeedX = 15;

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
}

function moveEverything() {
    ballX = ballX + ballSpeedX;
    if (ballX < 0) {
        ballSpeedX = -ballSpeedX;
    }
    if (ballX > canvas.width) {
        ballSpeedX = -ballSpeedX;
    }
}

function loadEverything() {

    // covers screen with black
    colorRect(0, 0, canvas.width, canvas.height, 'black');
    // creates left player paddle
    colorRect(0, 210, 10, 100, 'white');
    // creates red rectangle
    colorRect(ballX, 100, 10, 10, 'red');
}

function colorRect(leftX, topY, width, height, drawColor) {
    
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX, topY, width, height);

}
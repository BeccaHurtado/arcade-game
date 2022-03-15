var canvas;
var canvasContext;
var ballX = 50;

window.onload = function() {
    console.log("Hello World!")
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    var framesPerSecond = 30;
    setInterval(function() {
        moveEverything();
        loadEverything();
    }, 1000/framesPerSecond);    
}

function moveEverything() {
    ballX = ballX + 5;
}

function loadEverything() {

    canvasContext.fillStyle = 'black';
    // 0px from the left, 0px from the right. Size of object in the canvas.
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);

    canvasContext.fillStyle = 'white';
    canvasContext.fillRect(0, 210, 10, 100);

    canvasContext.fillStyle = 'red';
    canvasContext.fillRect(ballX,100, 10, 10);
}
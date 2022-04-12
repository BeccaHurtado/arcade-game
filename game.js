var canvas;
var canvasContext;

var ballX = 50;
var ballY = 50;

var ballSpeedX = 10;
var ballSpeedY = 4;

var playerLeftScore = 0;
var playerRightScore = 0;
const winningScore = 3;

// tells it to now show end screen 
var endGame = false;

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

function handleMouseClick(evt) {
    if (endGame) {
        playerLeftScore = 0
        playerRightScore = 0
        endGame = false
    }
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

    canvas.addEventListener('mousedown', handleMouseClick) 
    
    canvas.addEventListener('mousemove', function(evt) {
        var mousePos = calculateMousePos(evt);
        paddleLeft = mousePos.y - (paddleHeight / 2)
    })
}

function ballReset() {
    if (playerLeftScore >= winningScore || playerRightScore >= winningScore) {
        playerLeftScore = 0;
        playerRightScore = 0;
        endGame = true;
    }
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
    if (endGame) {
        return;
    }

    computerMovement()

    ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY;
    if (ballX < 0) {
        if (ballY > paddleLeft && ballY < paddleLeft + paddleHeight) {
            ballSpeedX = -ballSpeedX;
            
            var deltaY = ballY - (paddleLeft + paddleHeight / 2)
            ballSpeedY = deltaY * 0.35
        } else {
            playerRightScore ++
            ballReset();
        }
    }
    if (ballX > canvas.width) {
        if (ballY > paddleRight && ballY < paddleRight + paddleHeight) {
            ballSpeedX = -ballSpeedX;

            var deltaY = ballY - (paddleRight + paddleHeight / 2)
            ballSpeedY = deltaY * 0.35
        } else {
            // must be BEFORE ballReset() so the score is saved before the reset
            playerLeftScore ++
            ballReset();
        }
    }
    if (ballY < 0) {
        ballSpeedY = -ballSpeedY;
    }
    if (ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }
}

function drawNet() {
    for(var i=0; i<canvas.height; i+=40) {
        colorRect(canvas.width/2-1, i ,2, 20, 'white');
    }
}

function loadEverything() {

    // covers screen with black
    colorRect(0, 0, canvas.width, canvas.height, 'black');

    if(endGame) {
        canvasContext.fillStyle = 'white';

        if (playerLeftScore >= winningScore) {
            canvasContext.fillText("Left Player Won!", 350, 200);
        } else if(playerRightScore >= winningScore) {
            canvasContext.fillText("Right Player Won!", 350, 200);  
        }

        canvasContext.fillText("click to continue", 350, 500);
        return;
    }

    drawNet();

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
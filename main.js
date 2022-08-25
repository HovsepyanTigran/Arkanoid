let canvas = document.createElement("canvas");
let context = canvas.getContext("2d");
document.body.appendChild(canvas);
canvas.style.backgroundColor = "#BAB7B7";
canvas.width = 500;
canvas.height = 500;
var deckWidth = 70, deckHeight = 10, deckX = canvas.width/2 - deckWidth/2, deckY = canvas.height/1.1, deckSpeed = 3;
function drawDeck() {
    context.fillStyle = "black";
    context.fillRect(deckX, deckY, deckWidth, deckHeight);
}

var gameStarted = false;
var chosenValue = Math.random() < 0.5 ? 50 : 130;

window.addEventListener("keydown", function(evt) {
    switch (evt.keyCode) {
        case 37:
            if (deckX > 0) deckX -= deckSpeed;
            break;
        case 39:
            if (deckX < canvas.width - deckWidth) deckX += deckSpeed;
            break;
    }
});

var ballRadius = 10, ballX = canvas.width/2, ballY = canvas.height/1.1 - deckHeight, ballSpeed = 3;
let corner = chosenValue




let moveX = Math.cos(Math.PI / 180 * corner) * ballSpeed;
let moveY = Math.sin(Math.PI / 180 * corner) * ballSpeed;





function drawBall() {
    context.beginPath();
    context.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
    context.fillStyle = "blue";
    context.fill();
}
drawBall();

window.addEventListener("keydown", function(evt) {
    switch (evt.keyCode) {
        case 37:
            if (ballX - deckWidth/2 > 0) ballX -= ballSpeed;
            break;
        case 39:
            if (ballX - deckWidth/2 < canvas.width - deckWidth) ballX += ballSpeed;
            break;
    }
});
var bricks = [], bricksX, bricksY;
var min = 3;
var max = 8;

var bricksHeight = 20;


function buildBricks() {  
    var bricksRows = Math.floor((Math.random() * (max - min + 1) + min));
    for(let i = 0; i < bricksRows; i++) {
        var bricksColumns = Math.floor((Math.random() * (max - min + 1) + min));
        var bricksWidth = Math.floor(canvas.width / bricksColumns);
        for(let j = 0; j < bricksColumns; j++) {
            bricksX = j * bricksWidth;
            bricksY = i * bricksHeight;
            var r = Math.floor((Math.random() * (255 + 1)));
            var g = Math.floor((Math.random() * (255 + 1)));
            var b = Math.floor((Math.random() * (255 + 1)));
            var bricksColor = "rgb" + "(" + r + "," + g + "," + b + ")";
            bricks.push({
                bricksX: bricksX,
                bricksY: bricksY,
                bricksWidth: bricksWidth,
                bricksHeight: bricksHeight,
                bricksColor: bricksColor
            });
        }
    }
}
buildBricks();


function drawBricks() {
    for(var i = 0; i < bricks.length; i++) {
		context.beginPath();
		context.fillStyle = bricks[i].bricksColor;
		context.fillRect(bricks[i].bricksX, bricks[i].bricksY, bricks[i].bricksWidth, bricks[i].bricksHeight);
		context.fill()
	}
}

function deleteBricks() {
    for(var i = 0; i < bricks.length; i++) {
        if (ballY - ballRadius < bricks[i].bricksY + bricks[i].bricksHeight && ballY + (ballRadius*2) > bricks[i].bricksY) {
            if (ballX < bricks[i].bricksX + bricks[i].bricksWidth && ballX > bricks[i].bricksX) {
                bricks[i].bricksWidth = 0;
                bricks[i].bricksHeight = 0;
                bricks.splice(i,1)
                moveY = -moveY;
            }
        }
        
    }
            
}        


var drawAnimationFrame;
function draw(start) {
    if(typeof start != 'boolean' && !started){
        drawAnimationFrame = requestAnimationFrame(draw);
        return;
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    if(started){
        moveBall();
        if(gameOver){
            gameover();
            return;
        }
    }
    drawDeck();
    drawBall();
    drawBricks();

    if(bricks.length === 0 ){
        deleteBricks();
        win();
        return;
    }
    deleteBricks();
    if(ballY > canvas.height/1.1 - deckHeight) {
        ballSpeed = 0;
    }
    drawAnimationFrame = requestAnimationFrame(draw);
    deleteBricks();
}
draw(true);

var ballAnimationFrame;
var started;
window.addEventListener("keydown", function(evt) {
    if(gameStarted !== true) {
        switch (evt.keyCode) {
            case 32 :
                function recursion() {
                    drawBall()
                    drawDeck()
                }
                recursion()
                gameStarted = false
                deckSpeed = 5
                started = true;
                // function recursion() {
                    
                //     moveBall();
                //     requestAnimationFrame(recursion);
                //     deckSpeed = 5;
                // }
                // gameStarted = true;
                recursion();
                break;
        }
    }
});

var gameOver = false;

function gameover(){
    alert('game over');
    cancelAnimationFrame(drawAnimationFrame);
    gameFinished();


}

function win(){
    alert('you win');
    cancelAnimationFrame(drawAnimationFrame);
    gameFinished();
}
// function gameRefresh() {
//     if(bricks.length === 0 || ballY - ballRadius > deckY + ballRadius) {
//         let question = confirm("do you want to continue the game?");
//         if(question === true) {
//             draw();
//         }
//     }
// }
// gameRefresh();

function gameFinished() {
    started = false;
    draw(true);
}

function moveBall() {
    if (ballX > canvas.width - ballRadius || ballX < ballRadius) moveX = -moveX;
    if (ballY > canvas.height - ballRadius || ballY < ballRadius) moveY = -moveY;
    ballX += moveX;
    ballY += moveY;
    if (ballY + ballRadius > deckY) {
        moveY = -moveY;
        if (ballX > deckX + deckWidth) {
            moveY = -moveY;
        }
        if (ballX < deckX) {
            moveY = -moveY;
        }
    }
    //----------------------------------------------------------------------------------------------------------------------------
    if(ballY + ballRadius > deckY + 3) {
        if (ballX + ballRadius >= deckX) {
            moveX = -moveY;
            if (ballY - ballRadius >= deckY + deckHeight && ballY + ballRadius >= deckY) {
                moveX = -moveY;
                console.log("fffff")
            }
        if(ballX - ballRadius < deckX + deckWidth) {
            moveY = -moveY
            if (ballY + ballRadius >= deckY + deckHeight && ballY + ballRadius >= deckY) {
                    moveX = -moveY;
                }
        }
    }
    // if(ballY + ballRadius > deckY + 3) {
    //     if(ballX - ballRadius < deckX + deckWidth) {
    //             moveX = -moveY;
    //             if (ballY + ballRadius >= deckY + deckHeight && ballY + ballRadius >= deckY) {
    //                 console.log("fffff")
                    
    //             moveY = 0
    //             moveX = 0
    //             }
    //          }
    //         }
    }
    
    if (ballY - ballRadius > deckY + deckHeight) {
        moveY = 0;
        moveX = 0;
        gameOver = true;
    }
}

let ball = document.getElementById('ball');
let userpaddle = document.getElementById('userpaddle');
let aipaddle = document.getElementById('aipaddle');
let gamebox = document.getElementById('gamebox');
let userscore = document.getElementById('userscore');
let aiscore = document.getElementById('aiscore');

let isPause = true;
const startButton = document.getElementById('startButton');


function startGame() {
    isPause = false;
    startButton.style.display = 'none';
    pauseButton.style.visibility = 'visible';
    gameLoop();
}
startButton.addEventListener('click', startGame);
reset();


const pauseButton = document.getElementById('pauseButton');
pauseButton.style.visibility = 'hidden';

pauseButton.addEventListener('click', togglePause);

function togglePause() {
    isPause = !isPause; // Toggle the pause state
    if (isPause) {
        pauseButton.textContent = 'Resume Game';
    } else {
        pauseButton.textContent = 'Pause Game';
        gameLoop(); // Restart the game loop if resuming
    }
}



document.addEventListener('keypress' , keypressHandler)

var Vx = -4;
var Vy = -6;
var V = Math.sqrt(Math.pow(Vx , 2) + Math.pow(Vy , 2));

function reset(){
    ball.style.left = 50 + '%';
    ball.style.top = 50 + '%';
    Vx = -4;
    Vy = -6;
    V = Math.sqrt(Math.pow(Vx , 2) + Math.pow(Vy , 2));
}


function keypressHandler(e){
    if(e.key === 'z' && userpaddle.offsetTop > 45){
        userpaddle.style.top = userpaddle.offsetTop - 20 + "px";
        // aipaddle.style.top = aipaddle.offsetTop - 10 + "px";
    }
    else if(e.key === 'x' && userpaddle.offsetTop < gamebox.offsetHeight - userpaddle.offsetHeight + 51){
        userpaddle.style.top = userpaddle.offsetTop + 20 + "px";
        // aipaddle.style.top = aipaddle.offsetTop + 10 + "px";
    }
    // else if(e.key === '.'){
    //     aipaddle.style.top = aipaddle.offsetTop - 5 + "px";
    // }
    // else if(e.key === '/'){
    //     aipaddle.style.top = aipaddle.offsetTop + 5 + "px";
    // }
}



function checkCollision(activepaddle){
    let balltop = ball.offsetTop;
    let ballbottom = ball.offsetTop + ball.offsetHeight;
    let ballleft = ball.offsetLeft;
    let ballright = ball.offsetLeft + ball.offsetWidth;

    let paddletop = activepaddle.offsetTop;
    let paddlebottom = activepaddle.offsetTop + activepaddle.offsetHeight;
    let paddleleft = activepaddle.offsetLeft;
    let paddleright = activepaddle.offsetLeft + activepaddle.offsetWidth;



  if(
     ballbottom >= paddletop && 
     balltop <= paddlebottom &&
     ballright >= paddleleft && 
     ballleft <= paddleright
  ){
     // console.log('collision');
     return true;
  }
  else{
     return false;
  }
}


function gameLoop(){
       
      if(!isPause){

        let paddle = ball.offsetLeft < gamebox.offsetWidth / 2 ? userpaddle : aipaddle;
        // console.log(paddle);
        let ballcenterY = ball.offsetTop + ball.offsetHeight / 2;

        let paddlecenterY = paddle.offsetTop + paddle.offsetHeight / 2;

        let angle = 0;

        if(checkCollision(paddle)){
            if(paddle === userpaddle){
               if(paddlecenterY > ballcenterY){
                  angle = -Math.PI/4
               }
               else if(paddlecenterY < ballcenterY){
                  angle = Math.PI/3
               }
               else{
                 angle = 0
               }
            }
            else if(paddle === aipaddle){
                if(paddlecenterY > ballcenterY){
                    angle = -3*Math.PI/4
                 }
                 else if(paddlecenterY < ballcenterY){
                    angle = 3*Math.PI/4
                 }
                 else{
                   angle = 0
                 }
            }
            V = V + 0.2;
            Vx = V * Math.cos(angle);
            Vy = V * Math.sin(angle);
            
        }

        let aidelay = 1;
        aipaddle.style.top = aipaddle.offsetTop + (ball.offsetTop - aipaddle.offsetTop - aipaddle.offsetHeight/2) * aidelay + 'px';


    if(ball.offsetLeft < 0){
       reset();
       aiscore.innerHTML = parseInt(aiscore.innerHTML) +  1;
    }
    else if(ball.offsetLeft > gamebox.offsetWidth - ball.offsetWidth){
      reset();
      userscore.innerHTML = parseInt(aiscore.innerHTML) + 1;
    }
    else if(ball.offsetTop < 0){
        Vy = -Vy
    }
    else if(ball.offsetTop > gamebox.offsetHeight - ball.offsetHeight){
        Vy = -Vy
    }

    ball.style.left = ball.offsetLeft + Vx + "px";
    ball.style.top = ball.offsetTop + Vy + "px";

    requestAnimationFrame(gameLoop);
 }
}


gameLoop();

// var interval = setInterval(function(){
//     gameLoop()
// },10)


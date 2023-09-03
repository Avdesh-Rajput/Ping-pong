let ball = document.getElementById('ball');
let userpaddle = document.getElementById('userpaddle');
let aipaddle = document.getElementById('aipaddle');
let gamebox = document.getElementById('gamebox');


document.addEventListener('keypress' , keypressHandler)

var Vx = -2;
var Vy = -3;
var V = Math.sqrt(Math.pow(Vx , 2) + Math.pow(Vy , 2));

function reset(){
    ball.style.left = 50 + '%';
    ball.style.top = 50 + '%';
    Vx = -2;
    Vy = -3;
    V = Math.sqrt(Math.pow(Vx , 2) + Math.pow(Vy , 2));
}


function keypressHandler(e){
    if(e.key === 'z' && userpaddle.offsetTop > 51){
        userpaddle.style.top = userpaddle.offsetTop - 10 + "px";
        aipaddle.style.top = aipaddle.offsetTop - 10 + "px";
    }
    else if(e.key === 'x' && userpaddle.offsetTop < gamebox.offsetHeight - userpaddle.offsetHeight + 51){
        userpaddle.style.top = userpaddle.offsetTop + 10 + "px";
        aipaddle.style.top = aipaddle.offsetTop + 10 + "px";
    }
    // else if(e.key === '.'){
    //     aipaddle.style.top = aipaddle.offsetTop - 5 + "px";
    // }
    // else if(e.key === '/'){
    //     aipaddle.style.top = aipaddle.offsetTop + 5 + "px";
    // }
}

function gameLoop(){
    if(ball.offsetLeft < 0){
       reset();
    }
    else if(ball.offsetLeft > gamebox.offsetWidth - ball.offsetWidth){
       reset();
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

gameLoop();

// var interval = setInterval(function(){
//     gameLoop()
// },10)


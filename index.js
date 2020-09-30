//an array of colors where I need to verify in order.
var gamePattern = [];
var userCount = -1;
var gameLevel = 0;

var blueSound= new Audio('sounds/blue.mp3');
var redSound= new Audio('sounds/red.mp3');
var greenSound= new Audio('sounds/green.mp3');
var yellowSound= new Audio('sounds/yellow.mp3');
var gameOverSound = new Audio('sounds/wrong.mp3');

$(document).keydown(startGame);

$("#green").click(function(event){
    greenSound.play();
    if(userCount!=-1 && gamePattern[userCount] == "#green"){
        gameInProgress("#green");
    }
    else{
        gameOver();
    }
});

$("#red").click(function(event){
    redSound.play();
    if(userCount!=-1 && gamePattern[userCount] == "#red"){
        gameInProgress("#red");
    }
    else{
        gameOver();
    }
});

$("#blue").click(function(event){
    blueSound.play();
    if(userCount!=-1 && gamePattern[userCount] == "#blue"){
        gameInProgress("#blue");
    }
    else{
        gameOver();
    }
});

$("#yellow").click(function(event){
    yellowSound.play();
    if(userCount!=-1 && gamePattern[userCount] == "#yellow"){
        gameInProgress("#yellow");
    }
    else{
        gameOver();
    }
});

function startGame(){
    var color = "#" + getRandomColor();
    gamePattern.push(color);
    userCount = 0;
    gameLevel++;
    $("#level-title").text("Level " + gameLevel);
    pressColor(color);
}

//after in progress, the user count should be set to 0 once userCount = game level - 1

function gameInProgress(color){
    $("#level-title").text("Level " + gameLevel);
    pressColor(color);
    userCount++;
    if(gameLevel == userCount)
        setTimeout(startGame, 800);
}


function pressColor(color){

    $(color).addClass("pressed").delay(400).queue(function(){
        $(this).removeClass("pressed").dequeue();
    });
}


function getRandomColor(){
    var randomNumber = Math.floor(Math.random() * 4) + 1;
    switch(randomNumber){
        case 1: greenSound.play(); return "green"; break;
        case 2: blueSound.play(); return "blue" ;break;
        case 3: redSound.play(); return "red"; break;
        case 4: yellowSound.play(); return "yellow"; break;
    }
}

function gameOver(){
    $("#level-title").text("Game Over, Press Any Key to Restart");
    gameOverSound.play();
    $("body").addClass("game-over").delay(400).queue(function(){
        $(this).removeClass("game-over").dequeue();
    });
    gameLevel = 0;
    userCount = -1; 
    gamePattern = [];
}
var gamePattern = [];   //store game patren genrated by nextSequence Function
var userClickedPattern = [];    //to store user click pattern
var buttonColors = ["red", "blue", "green", "yellow"];
var start = false;
var level = 0;

$(document).keypress(function () {
    if (!start) {
        setTimeout(function(){
            $("#level-title").text("Level " + level);
            start = true;
            nextSequence();
        },500)
    }
});

function nextSequence() {
    userClickedPattern = []; // set to empty so we can check pattern fron start
    level++;
    $("#level-title").text("Level " + level);
    var randomNum = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNum];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        // if last index is same then check that length is also same so we can make sure that indexes are not miss matched
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },800);
        }
    } else {
        gameOver();
    }
}

$(".btn").on("click", function () {
    userClickedPattern.push($(this).attr("id"));
    playSound($(this).attr("id"));
    animatePress($(this).attr("id"));
    checkAnswer(userClickedPattern.length - 1);
});

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("." + currentColor).addClass("pressed");
    setTimeout(function () {
        $("." + currentColor).removeClass("pressed");
    }, 100);
}

function gameOver(){
    $("#level-title").text("Game Over !! Press any key to start");
    $("body").addClass("game-over");
    var audio=new Audio("sounds/wrong.mp3");
    audio.play();
    setTimeout(function(){
        $("body").removeClass("game-over");
    },100)
    // set all the variables to empty so we can start again
    start=false;
    gamePattern=[];
    userClickedPattern=[];
    level=0;
}

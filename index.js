var userClickedPattern = [];

var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;

var started = false;


  $(document).on("keypress", function(){
    if (!started){
      nextSequence();
      started = true;
    }
  });


$(".btn").on("click", function(event) {

  var userChosenButton = event.currentTarget.id;

  userClickedPattern.push(userChosenButton);

   playSound(userChosenButton);

   animatePress(userChosenButton);

   checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentLevel){
     if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
       if (userClickedPattern.length === gamePattern.length){
         setTimeout(function(){
           nextSequence();
         }, 1000);
     }
   }  else{
        $("h1").html("Game Over, Press Any Key to Restart");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
          $("body").removeClass("game-over");
        }, 200);
        startOver();
   }
}

function nextSequence(){

  userClickedPattern = [];

  level += 1;

  $("h1").html("Level "+level);

  var randomNumber = Math.floor(Math.random()*4);

  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  var randomButton =   $("#"+randomChosenColour);

  randomButton.fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);

}



function playSound(colourName){

  var audio = new Audio("sounds/"+colourName+".mp3");
  audio.play();

}
function animatePress(currentColour){

  $("." + currentColour).addClass("pressed");
  setTimeout(function (){
    $("." + currentColour).removeClass("pressed");
  }, 100);

}
function startOver(){
  gamePattern = [];
  started = false;
  level = 0;
}

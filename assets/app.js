//GLOBAL VARIABLES
//===========================================
var trivia = {
  initialScreen: "",
  correctCounter: 0,
  inCorrectCounter: 0,
  unAnsweredCounter: 0,
  clickSound: new Audio("./assets/plasticBottle.mp3"),
  gameHTML: "",
  questionsArray: [
                  "The amount of plastic thrown away each year is enough to circle the Earth how many times?", "How many pounds of plastic does the average American throw away per year?", "How many water bottles do Americans throw away per year?", "The Great Pacific Garbage Patch is located in the North Pacific Gyre off the coast of California and is the largest ocean garbage site in the world. This floating mass of plastic is twice the size of what U.S. state?", "Is it true that 93% of Americans ages six or older test positive for BPA (a chemical in plastic)?", "How many plastic straws are used every day in America?", "There is more microplastic in the ocean than there are stars in the Milky Way. T/F"],
  answerArray: [
                ["4 times", "6 times", "10 times", "2 times"], ["300 lbs", "185 lbs", "255 lbs", "120 lbs"], ["2 million", "80 billion", "100 million", "35 billion"], ["Texas", "New Jersey", "Florida", "Ohio"], ["Yes", "No","Idk", "Stop Asking"],["2 billion", " 100 million", "500 million", "450 million"], ["True", "False", "Maybe", "Mmm, chocolate"]],
  correctAnswers: [
                  "A. 4 times", "B. 185 lbs", "D. 35 billion", "A. Texas", "A. Yes","C. 500 million", "A. True"],
  imageArray: [
              "<img class='center-block img-right' src='https://media.giphy.com/media/f5PqvNrx2dcNq/giphy.gif'>", "<img class='center-block img-right' src='https://media.giphy.com/media/5zw6BxBDGXF3mJ2krE/giphy.gif'>", "<img class='center-block img-right' src='https://media.giphy.com/media/26uf4uFMIilb8n6WQ/giphy.gif'>", "<img class='center-block img-right' src='https://media.giphy.com/media/13D92S9ihE1NbW/giphy.gif'>", "<img class='center-block img-right' src='https://media.giphy.com/media/3orif5sSDNieQFRCqQ/giphy.gif'>", "<img class='center-block img-right' src='https://media.giphy.com/media/61Sk26nVLSyREvwl4g/giphy.gif'>", "<img class='center-block img-right' src='https://media0.giphy.com/media/xSzWaLf7hrgBO/200w.webp'>"],
  clock: "",
  questionCounter: 0,
  timeCounter: 20,
};


//FUNCTIONS
//===========================================
function startScreen(){
  //Create the start button
  trivia.initialScreen = "<p class='text-center main-button'><a class='btn btn-primary btn-lg start-button text-center' href='#'>Start!</a></p>";
  //Add Start button to main-area
  $(".main-area").html(trivia.initialScreen);
};

function timer(){
  trivia.clock = setInterval(twentySeconds, 1000);
  function twentySeconds(){
    if(trivia.timeCounter === 0){
      timeOutLoss();
      clearInterval(trivia.clock);
    }
    if(trivia.timeCounter > 0) {
      trivia.timeCounter --;
    }
    $(".timer").html(trivia.timeCounter);
  }
};

function wait(){
  if(trivia.questionCounter < 6) {
    trivia.questionCounter ++;
    generateHTML();
    trivia.timeCounter = 20;
    timer();
  }
  else {
    finalScreen();
  }
};

function win(){
  trivia.correctCounter ++;
  trivia.gameHTML = "<p class='text-center'> Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + trivia.correctAnswers[trivia.questionCounter] + "</p>" + trivia.imageArray[trivia.questionCounter];
  $(".main-area").html(trivia.gameHTML);
  setTimeout(wait, 6000);
};

function loss(){
  trivia.inCorrectCounter ++;
  trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ trivia.correctAnswers[trivia.questionCounter] + "</p>" + trivia.imageArray[trivia.questionCounter];
	$(".main-area").html(trivia.gameHTML);
	setTimeout(wait, 6000);
};

function timeOutLoss(){
  trivia.unAnsweredCounter ++;
  trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + trivia.correctAnswers[trivia.questionCounter] + "</p>" + trivia.imageArray[trivia.questionCounter];
	$(".main-area").html(trivia.gameHTML);
	setTimeout(wait, 6000);
};

function finalScreen(){
  trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + trivia.correctCounter + "</p>" + "<p>Wrong Answers: " + trivia.inCorrectCounter + "</p>" + "<p>Unanswered: " + trivia.unAnsweredCounter + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
  $(".main-area").html(trivia.gameHTML);
};

function resetGame(){
  trivia.questionCounter = 0;
  trivia.correctCounter = 0;
  trivia.inCorrectCounter = 0;
  trivia.unAnsweredCounter = 0;
  trivia.timeCounter = 20;
  generateHTML();
  timer();
};

function generateHTML(){
  trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>20</span></p><p class='text-center'>" + trivia.questionsArray[trivia.questionCounter] + "</p><button class='first-answer answer'>A. " + trivia.answerArray[trivia.questionCounter][0] + "</button><br><button class='answer'>B. "+trivia.answerArray[trivia.questionCounter][1]+"</button><br><button class='answer'>C. "+trivia.answerArray[trivia.questionCounter][2]+"</button><br><button class='answer'>D. "+trivia.answerArray[trivia.questionCounter][3]+"</button>";
  $(".main-area").html(trivia.gameHTML);
}


//MAIN PROCESS
//===========================================
startScreen();

//start-button click
$("body").on("click", ".start-button", function(event){
	event.preventDefault();
	trivia.clickSound.play();
	generateHTML();

	timer();
}); // Closes start-button click

$("body").on("click", ".answer", function(event){
	trivia.clickSound.play();
  //If correct answer
  selectedAnswer = $(this).text();
	if(selectedAnswer === trivia.correctAnswers[trivia.questionCounter]) {

		clearInterval(trivia.clock);
		win();
	}
  //If incorrect ansewr
	else {

		clearInterval(trivia.clock);
		loss();
	}
}); // Close .answer click

//reset-button click
$("body").on("click", ".reset-button", function(event){
	trivia.clickSound.play();
	resetGame();
}); // Closes reset-button click

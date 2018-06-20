var testParagraph = document.querySelector('.testParagraph');
testParagraph.textContent = "Below is a work in progress";

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var myCircle={
	centerX:70,
	centerY:70,
	radius:40,
	fill:'blue'
}

window.addEventListener('keydown',this.check,false);

function redraw(){

    // clear the canvas
    ctx.clearRect(0,0,c.width,c.height);

    // redraw one or more things based on their javascript objects
    ctx.beginPath();
    ctx.arc(myCircle.centerX, myCircle.centerY, myCircle.radius, 0, Math.PI*2 );
    ctx.closePath();
    ctx.fillStyle = myCircle.fill;
    ctx.fill();
}

redraw();

function check(e) {
    var code = e.keyCode;
    switch (code) {
        case 37: 
        	myCircle.centerX -= 10;
        	redraw();
        	break; //Left key
        case 38:
        	myCircle.centerY -= 10;
        	redraw();
        	break; //Up key
        case 39:
        	myCircle.centerX += 10;
        	redraw();
        	break; //Right key
        case 40:
        	myCircle.centerY += 10;
        	redraw(); 
        	break; //Down key
        // default: alert(code); //Everything else
    }
}

			// var randomNumber = Math.floor(Math.random() * 100) + 1;

			// var guesses = document.querySelector('.guesses');
			// var lastResult = document.querySelector('.lastResult');
			// var lowOrHi = document.querySelector('.lowOrHi');

			// var guessSubmit = document.querySelector('.guessSubmit');
			// var guessField = document.querySelector('.guessField');

			// var guessCount = 1;
			// var resetButton;

			// function checkGuess() {
			// 	var userGuess = Number(guessField.value);
			// 	if(guessCount === 1){
			// 		guesses.textContent = 'Previous guesses: ';
			// 	}
			// 	guesses.textContent += userGuess + ' ';

			// 	if (userGuess === randomNumber){
			// 		lastResult.textContent = 'congratulations! You got it right!';
			// 		lastResult.style.backgroundColor = 'green';
			// 		lowOrHi.textContent = '';
			// 		setGameOver();
			// 	} else if(guessCount === 10){
			// 		lastResult.textContent = '!!!GAME OVER!!!';
			// 		setGameOver();
			// 	} else {
			// 		lastResult.textContent = 'Wrong!';
			// 		lastResult.style.backgroundColor = 'red';
			// 		if(userGuess < randomNumber){
			// 			lowOrHi.textContent = 'Last guess was too low!';
			// 		} else if(userGuess > randomNumber){
			// 			lowOrHi.textContent = 'Last guess was too high!';
			// 		}
			// 	}

			// 	guessCount++;
			// 	guessField.value = '';
			// 	guessField.focus();
			// }

			// function setGameOver() {
			// 	guessField.disabled = true;
			// 	guessSubmit.disabled = true;
			// 	resetButton = document.createElement('button');
			// 	resetButton.textContent = 'Start new game';
			// 	document.body.appendChild(resetButton);
			// 	resetButton.addEventListener('click', resetGame);
			// }

			// function resetGame() {
			//   guessCount = 1;

			//   var resetParas = document.querySelectorAll('.resultParas p');
			//   for (var i = 0 ; i < resetParas.length ; i++) {
			//     resetParas[i].textContent = '';
			//   }

			//   resetButton.parentNode.removeChild(resetButton);

			//   guessField.disabled = false;
			//   guessSubmit.disabled = false;
			//   guessField.value = '';
			//   guessField.focus();

			//   lastResult.style.backgroundColor = 'white';

			//   randomNumber = Math.floor(Math.random() * 100) + 1;
			// }

			// guessSubmit.addEventListener('click', checkGuess);
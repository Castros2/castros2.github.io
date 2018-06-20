var testParagraph = document.querySelector('.testParagraph');
testParagraph.textContent = "Below is a work in progress";

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var directionX = 5;
var directionY = 0;

var myCircle={
	centerX:70,
	centerY:70,
	radius:40,
	fill:'blue'
}

var link={
	x:70,
	y:70,
	width:10,
	height:10,
	fill:'black'
}

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

function redrawRect(){
	ctx.clearRect(0,0,c.width,c.height);

	ctx.beginPath();
	ctx.rect(link.x, link.y, link.width, link.height)
	ctx.closePath();
	ctx.fillStyle = link.fill;
	ctx.fill();
}

function checkBoundaries(obj){
	// if(obj.x <= 0) {
	// 	obj.x = 0;
	// }
	rightBoundary = c.width;
	leftBoundary = 0;
	topBoundary = 0;
	bottomBoundary = c.height;
	if (obj.x > rightBoundary){
		obj.x = leftBoundary;
	}
	if (obj.x < leftBoundary){
		obj.x = rightBoundary;
	}
	if(obj.y > bottomBoundary){
		obj.y = topBoundary;
	}
	if(obj.y < topBoundary){
		obj.y = bottomBoundary;
	}
}

function check(e) {
    var code = e.keyCode;
    switch (code) {
        case 37: 
        	directionX = -5;
        	directionY = 0;
        	// redraw();
        	break; //Left key
        case 38:
        	directionX = 0;
        	directionY = -5;
        	// redraw();
        	break; //Up key
        case 39:
        	directionX = 5;
        	directionY = 0;
        	// redraw();
        	break; //Right key
        case 40:
        	directionX = 0;
        	directionY = 5;
        	// redraw(); 
        	break; //Down key
        // default: alert(code); //Everything else
    }
}

/*
* Starting with the semicolon is in case whatever line of code above this example
* relied on automatic semicolon insertion (ASI). The browser could accidentally
* think this whole example continues from the previous line. The leading semicolon
* marks the beginning of our new line if the previous one was not empty or terminated.
*/
// redraw();
redrawRect();

;(function () {
  function main() {
    window.requestAnimationFrame( main );

    link.x += directionX;
    link.y += directionY;
    checkBoundaries(link);
    redrawRect();
    
    // Your main loop contents.
    window.addEventListener('keydown',this.check,false);

  }
  
  main(); // Start the cycle
})();

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
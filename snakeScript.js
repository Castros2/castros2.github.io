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

var food={
	x:0,
	y:0,
	width:20,
	height:20,
	fill:'red'
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

function redrawRect(counter){
	if (typeof redrawRect.linkQueue == 'undefined'){
		redrawRect.linkQueue = [];
	}

	if(counter == linkLength){
		var lastLink =  redrawRect.linkQueue.shift();
		//console.log(lastLink);
		ctx.clearRect(lastLink.x,lastLink.y,link.width,link.height);
	}
	redrawRect.linkQueue.push({x:link.x, y:link.y});
	

	ctx.beginPath();
	ctx.rect(link.x, link.y, link.width, link.height)
	ctx.closePath();
	ctx.fillStyle = link.fill;
	ctx.fill();
}

function redrawFood(){
	ctx.clearRect(food.x,food.y,food.width,food.height);

	food.x = getRandomInt(10, c.width - 10);
	food.y = getRandomInt(10, c.height - 10);

	ctx.beginPath();
	ctx.rect(food.x, food.y, food.width, food.height)
	ctx.closePath();
	ctx.fillStyle = food.fill;
	ctx.fill();

}

function checkFoodCollision(){
	if (link.x < food.x + food.width &&
		link.x + link.width > food.x &&
		link.y < food.y + food.height &&
		link.y + link.height > food.y){
		return 1;
	}
	return 0;
}

function checkSnakeCollision(){
	for(var i = 0; i < redrawRect.linkQueue.length - 1; i++){
		//console.log(redrawRect.linkQueue[i])
		if (link.x < redrawRect.linkQueue[i].x + link.width &&
			link.x + link.width > redrawRect.linkQueue[i].x &&
			link.y < redrawRect.linkQueue[i].y + link.height &&
			link.y + link.height > redrawRect.linkQueue[i].y){
			return 1;
		}
	}
	return 0;
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
        	//Don't allow to back up into itself
        	if(directionX !== Math.abs(speed)){ 
        		directionX = -Math.abs(speed);
        		directionY = 0;
        	}
        	// redraw();
        	break; //Left key
        case 38:
        	if(directionY !== Math.abs(speed)){
        		directionX = 0;
        		directionY = -Math.abs(speed);
        	}
        	// redraw();
        	break; //Up key
        case 39:
        	if(directionX !== -Math.abs(speed)){
        		directionX = Math.abs(speed);
        		directionY = 0;
        	}
        	// redraw();
        	break; //Right key
        case 40:
        	if(directionY !== -Math.abs(speed)){
        		directionX = 0;
        		directionY = Math.abs(speed);
        	}
        	// redraw(); 
        	break; //Down key
        case 73:
        	linkLength += 5;
        	console.log('Link Length: ' + linkLength);
        	break;
        // default: alert(code); //Everything else
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*
* Starting with the semicolon is in case whatever line of code above this example
* relied on automatic semicolon insertion (ASI). The browser could accidentally
* think this whole example continues from the previous line. The leading semicolon
* marks the beginning of our new line if the previous one was not empty or terminated.
*/
// redraw();
var counter = 0;
redrawRect(counter);
redrawFood();

var linkLength = 0;
var speed = 10;

var directionX = Math.abs(speed);
var directionY = 0;

var myReq;
;(function () {
  function main() {

    // request another frame

    myReq = window.requestAnimationFrame( main );

    // calc elapsed time since last loop

    now = Date.now();
    elapsed = now - then;

    // if enough time has elapsed, draw the next frame
    if (elapsed > fpsInterval) {

		// Get ready for next frame by setting then=now, but also adjust for your
	    // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
	    then = now - (elapsed % fpsInterval);

	    // window.requestAnimationFrame( main );
	    // Your main loop contents.
	    link.x += directionX;
	    link.y += directionY;
	    checkBoundaries(link);
	  	redrawRect(counter);
	  	

	  	if(counter < linkLength){
	  		counter += 1;
	  	}

	  	if (checkFoodCollision() == 1 ){
	  		console.log('yummy');
	  		linkLength += 5;
	  		redrawFood();
	  	}

	  	if (checkSnakeCollision() == 1){
	  		console.log('ouch');
	  		gameOver();
	  		// return;
	  	}
	    
	    
	    
	    window.addEventListener('keydown',this.check,false);
	}

  }
  
var stop = false;
var frameCount = 0;
//var $results = $("#results");
var fps, fpsInterval, startTime, now, then, elapsed;


// initialize the timer variables and start the animation

function startAnimating(fps) {
	fpsInterval = 1000 / fps;
	then = Date.now();
	startTime = then;
	main();
	// return;
}

startAnimating(60);

 // main(); // Start the cycle
})();

function gameOver(){
	window.cancelAnimationFrame(myReq);
	ctx.font = "50px Source Sans Pro";
	ctx.textAlign = "center";
	ctx.clearRect(0,0,c.width,c.height);
	ctx.strokeText("Game Over!", c.width/2, c.height/2);
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
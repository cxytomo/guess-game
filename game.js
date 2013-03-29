var Debugger = function() {};
Debugger.log = function(message){
	try {
		console.log(message);
	}
	catch(exception) {
		return;
	}
};

window.addEventListener('load',windowloaded,false);

function windowloaded() {
	canvasApp();
}

function canvasApp() {
	var canv = document.getElementById('game')
	,	contxt = canv.getContext('2d')
	,	guess = 3
	,	message = "Guess The Letter From a(lower) to z(lower)"
	,	letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
	,	today = new Date()
	,	letterToGuess = ""
	,	letterToGArray = []
	,	LowerOrHigher = ""
	,	lettersGuessed
	,	index
	,	game = false;
	canv.width ="500";
	canv.height = "300";
	if(canvasSupport()) {
		initGame();
	}

	function canvasSupport() {
		return Modernizr.canvas;
	}

	function initGame(){
		index = Math.floor(Math.random()*letters.length);
		letterToGuess = letters[index];
		lettersGuessed = [];
		window.addEventListener('keyup',keyPressed,true);
		drawScreen();
	}

	function keyPressed(e){
		if(!game && guess>0){
			var keyPressed
			,	keyPressedIndex;
			e = e || window.event;
			keyPressed = String.fromCharCode(e.keyCode);
			keyPressed = keyPressed.toLowerCase();
			lettersGuessed.push(keyPressed);
			keyPressedIndex = letters.indexOf(keyPressed);
			if(keyPressedIndex >= 0){
				guess = guess - 1;
				if(keyPressedIndex === index) {
					game = true;
					LowerOrHigher = "You win!";
				}
				if(guess != 0) {
					if(keyPressedIndex > index) {
						LowerOrHigher = "Lower";
					}
					if(keyPressedIndex < index) {
						LowerOrHigher = "Higher";
					}
				} else {
					letterToGArray.push(letterToGuess);
					LowerOrHigher = "You loose!";
				}

			} else{
				letterToGArray.push(letterToGuess);
				LowerOrHigher = "That is not a letter";
			}
		}
		canv.height = "300";
		drawScreen();
	}
	
	function drawScreen(){
		contxt.fillStyle = "#0081C2";
		contxt.fillRect(0,0,500,300);
		contxt.strokeStyle = "white";
		contxt.strokeRect(5,5,490,290);
		contxt.textBaseline = "top";
		contxt.fillStyle = "white";
		contxt.font = "10px Arial";
		contxt.fillText(today,160,18);
		contxt.fillStyle = "white";
		contxt.font = "bold 22px Arial";
		contxt.fillText(message,25,60);
		contxt.fillStyle = "orange";
		contxt.font = "18px Arial";
		contxt.fillText("Guess: " + guess,220,90);
		contxt.fillStyle = "white";
		contxt.font = "18px Arial";
		contxt.fillText("LowerOrHigher:  " + LowerOrHigher,25,200);
		contxt.fillStyle = "white";
		contxt.font = "18px Arial";
		contxt.fillText("lettersGuessed:  " + lettersGuessed.join(" "),25,230);
		contxt.fillStyle = "white";
		contxt.font = "18px Arial";
		contxt.fillText("letterToGuess:  ",25,260);
		if(letterToGArray[0]) {
			contxt.fillStyle = "white";
			contxt.font = "18px Arial";
			contxt.fillText(letterToGArray[0],150,260);
		}
	}
}
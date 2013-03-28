(function canvasApp() {
	var canv = document.getElementById('game')
	,	contxt = canv.getContext('2d')
	,	guess = 3
	,	message = "Guess The Letter From a(lower) to Z(higher)"
	,	letters = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
	,	today = new Date()
	,	letterToGuess = ""
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
				if(guess >= 0) {
					if(keyPressedIndex > index) {
						LowerOrHigher = "Lower";
					}
					if(keyPressedIndex < index) {
						LowerOrHigher = "Higher";
					}
				} else {
					LowerOrHigher = "You loose!";
				}
				
			} else{
				LowerOrHigher = "That is not a letter";
			}
		}
		canv.height = "300";
		drawScreen();
	}
	function drawScreen(){
		contxt.fillStyle = "#0081C2";
		contxt.fillRect(0,0,500,300);
		contxt.fillStyle = "white";
		contxt.font = "10px _sans";
		contxt.fillText(today,150,20);
		contxt.fillStyle = "white";
		contxt.font = "18px _sans";
		contxt.fillText(message,90,40);
		contxt.fillStyle = "white";
		contxt.font = "18px _helvetic";
		contxt.fillText("Guess:" + guess,220,60);
		contxt.fillStyle = "white";
		contxt.font = "18px _sans";
		contxt.fillText("LowerOrHigher:" + LowerOrHigher,120,150);
		contxt.fillStyle = "white";
		contxt.font = "18px _sans";
		contxt.fillText("lettersGuessed:" + lettersGuessed.join(" "),20,280);
	}
})();
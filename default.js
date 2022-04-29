newCanvas(1000, 500);		//Creates the canvas
let allImagesLoaded = true; 	//true if no images to load.

//var

//--------------------------- 

// /!\  DON'T FORGET allImagesLoaded = true IN THE LAST ONLOAD /!\
if (allImagesLoaded) draw(); //todo: Do a more user-friendly way

function draw(){
	requestAnimationFrame(draw); //do not delete this line, it allow the canvas to be updated
	background(0);
}


function isKeyPressed(key){
	if(key === "Space"){
		fill(255);
		textSize(40);
		text("Space bar pressed ! ", 10, 50);
	}
}

function isKeyReleased(key){
	if(key === "Space"){
		fill(255);
		textSize(10);
		text("Space bar released !", 10, 80);
	}
}
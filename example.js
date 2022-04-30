newCanvas(1000, 500);		//Creates the canvas
let allImagesLoaded = true; 	//true if no images to load.

//var

//--------------------------- 

if (allImagesLoaded) main();

function main(){
	requestAnimationFrame(main); //do not delete this line, it allow the canvas to be updated every frame
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
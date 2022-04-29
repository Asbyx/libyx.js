newCanvas(100, 100);
var allImagesLoaded = false; //true si pas d'images.

//var

//--------------------------- 

// /!\  NE PAS OUBLIER allImagesLoaded = true DANS LE DERNIER ONLOAD /!\

if (allImagesLoaded) draw();

function draw(){
	requestAnimationFrame(draw);
	background(0); //fonctionne comme le fill();
}

newCanvas(1000, 500); //Creates the canvas

//var
let v = new Vector(100, 100);
//---------------------------

run(main, 60);
function main(){
	clear();
	background(0);
	v.setAngle(v.angle() + Math.PI/12);
	fill(255);
	line(500, 250, 500+v.x, 250+v.y);
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
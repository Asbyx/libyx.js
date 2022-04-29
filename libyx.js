//mouse

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
var width = 100, height = 100;
window.addEventListener("keydown", keyDown, false);
window.addEventListener("keyup", keyUp, false);

var rectCenter = "HG"; //{"HG", "milieu"}
var textSize = 32;
var keys = [], nbKeys = 0;
keys[0] = 0;

//début des fonctions relatives au canvas
function newCanvas(a, b){
	canvas.width = width = a;
	canvas.height = height =  b;
	ctx.imageSmoothingEnabled = false;
	console.log("context created, width: "+width+", height: "+height);
}

function background(a, b, c) {
	if(b === undefined) b = c = a;
	canvas.style.background = "rgb("+a+", "+b+", "+c+")";
}

function clear() {
	ctx.clearRect(0, 0, width, height);
}
//-------------------------------------

//Pratiques----------------------------
function log(text){
	console.log(text);
}
//-------------------------------------

//fonctions draw-----------------------
function fill(a, b, c, d) { 
	if (b === undefined) b = c = a;
	if (d === undefined) d = 1;
	ctx.fillStyle = "rgba("+a+", "+b+", "+c+", "+d+")";
	ctx.strokeStyle = "rgba("+a+", "+b+", "+c+", "+d+")";
}


function rect(x, y, w, h) { //w, h taille
	switch(rectCenter){
	case"HG":
		ctx.fillRect(x, y, w, h);
		break;
	case"BG":
		ctx.fillRect(x, y-h, w, h);
		break;
	case"HD":
		ctx.fillRect(x-w, y, w, h);
		break;
	case"BD":
		ctx.fillRect(x-w, y-h, w, h);
		break;
	case"milieu":
		ctx.fillRect(x-w/2, y-h/2, w, h);
		break;
	}
}


function circle(x, y, r){ //x et y coordonnées du centre ! r rayon
	ctx.beginPath();
	ctx.arc(x, y, r, 0, 2*Math.PI);
	ctx.fill();
	ctx.closePath();
}

function line(x, y, xf, yf){
	ctx.beginPath();
	ctx.moveTo(x, y);
	ctx.lineTo(xf, yf);
	ctx.closePath();
	ctx.stroke();
}


function text(t, x, y, f) {
	if (f == undefined) f = "Arial";
	ctx.font = textSize+"px "+f;
	ctx.fillText(t, x, y);
}
//-------------------------------------


//images-------------------------------
function newImage(src){
	let imageReturned = new Image();
	//imageReturned.crossOrigin = "anonymous";
	imageReturned.src = src;
	return imageReturned;
}
function drawImage(i, x, y, s1, s2, r, mid){ //s1 et s2 le nombre de fois qu'on multiplie la largeur ou la hauteur, r pour la rotation (rad), mid = true => on dessine du milieu
	if (mid == undefined) mid = false;
	if (s1 == undefined) s1 = s2 = 1;
	if(r != undefined){
		if(r != "invert"){
			ctx.translate(x, y);
			ctx.rotate(r);
				if(!mid)
					ctx.drawImage(i, 0-i.width*s1, 0-i.height*s2, i.width*s1, i.height*s2); 
				else ctx.drawImage(i, 0-(i.width*s1)/2, 0-(i.height*s2)/2, i.width*s1, i.height*s2);
			ctx.rotate(-r);
			ctx.translate(-x, -y);
		} else {
			ctx.translate(x, y);
			ctx.scale(-1, 1);
				if(!mid)
					ctx.drawImage(i, 0-i.width*s1, 0-i.height*s2, i.width*s1, i.height*s2); 
				else ctx.drawImage(i, 0-(i.width*s1)/2, 0-(i.height*s2)/2, i.width*s1, i.height*s2);
			ctx.scale(-1, 1);
			ctx.translate(-x, -y);
		}
	}
	else {if(!mid)
			ctx.drawImage(i, x, y, i.width*s1, i.height*s2); 
			else ctx.drawImage(i, x - (i.width*s1)/2, y - (i.height*s2)/2, i.width*s1, i.height*s2)
		}
}
//-------------------------------------


//keyboard-----------------------------
function KeyForKeyboard(key){
	//console.log(key); //pour savoir le nom d'une key et potentiellement le switch après
	this.officialName = key;
	this.isDown = true;
	this.nickname = this.officialName;
	switch(this.officialName){
	case"ArrowUp":
		this.nickname = "Up";
		break;

	case"ArrowRight":
		this.nickname = "Right";
		break;

	case"ArrowLeft":
		this.nickname = "Left";
		break;

	case"ArrowDown":
		this.nickname = "Down";
		break;

	case" ":
		this.nickname = "Space";
		break;
	}
	return this;
}

function keyDown(){
	for (var i = keys.length - 1; i >= 0; i--) {
		if (keys[i].officialName == event.key){
			keys[i].isDown = true;
			//pour éviter le scrolling
			try{isKeyPressed(keys[i].nickname);}catch(err){};
			switch(event.keyCode){
				case 37: case 39: case 38: case 40: case 32:// Arrow keys + Space
				event.preventDefault(); break;
				default: break;
			}
			return;
		}
	}
	nbKeys ++;
	keys[nbKeys] = new KeyForKeyboard(event.key);
try{isKeyPressed(keys[nbKeys].nickname);}catch(err){};
}
function keyUp(){
	for (var i = keys.length - 1; i >= 0; i--) {
		if (keys[i].officialName == event.key){
			keys[i].isDown = false;
try{isKeyUp(keys[i].nickname);}catch(err){};
		}
	}
}

function isKeyDown(key) {
	for (var i = keys.length - 1; i >= 0; i--) {
		if (keys[i].nickname == key && keys[i].isDown){
			return true;
		}
	}
	return false;
}
//-------------------------------------

//Vecteur------------------------------
function Vecteur(x, y) {
	this.x = x;
	this.y = y;
	this.norme = function () {
		let norme;
		norme = Math.sqrt((this.x*this.x)+(this.y*this.y));
		return norme;
	};
	this.setNorme = function (n) {
		let norme = this.norme();
		let x = this.x/norme; y = this.y/norme;
		this.x = x*n;
		this.y = y*n;
	};
	this.angle = function(){
		return Math.atan2(this.y, this.x); 
	}
	this.rotate = function(a){
		let norme = this.norme();
		this.x = norme*Math.cos(a);
		this.y = norme*Math.sin(a);

	}
}
//-------------------------------------


//Check de hitboxs---------------------
function dist(x1, y1, x2, y2){
	return Math.sqrt((x2 - x1)*(x2 - x1)+(y2 - y1)*(y2 - y1));
}

function areCircleColliding(c1x, c1y, c1r, c2x, c2y, c2r) {
	if(dist(c1x, c1y, c2x, c2y) < c1r + c2r) return true; else return false;
}

function areRectsColliding(hg1x, hg1y, bd1x, bd1y, hg2x, hg2y, bd2x, bd2y) {//hg = point haut gauche, bd = bas droite 
    // si un rectangle est à gauche de l'autre
    if (hg1x > bd2x || hg2x > bd1x) { 
        return false; 
    } 
    // si un rectangle est au dessus de l'autre
    if (hg1y > bd2y || hg2y > bd1y) { 
        return false; 
    } 
    return true; 
}

function isPointInRect(px, py, rx, ry, rw, rh){
	//si le point est à gauche
	if(px < rx) return false;
	//à droite
	if(px > rx + rw) return false;

	//si le point est au dessus
	if(py < ry) return false;
	//en dessous
	if(py > ry + rh) return false;

	return true;
}
//--------------------------------------


//autres--------------------------------
function random(a, b, isInt){ 
	if (isInt == undefined)isInt = false;
	if (b == undefined){
		if (isInt) {
			return Math.floor(Math.random()*a);
		} else {
			return Math.random()*a;
		}
	} else {
		if (isInt) {
			return Math.floor(Math.random()*(b-a) + a);
		} else {
			return Math.random()*(b-a) + a;
		}
	}
}
//-------------------------------------



//non-fonctionnelles

var textCenter = "HG";

/*

*/
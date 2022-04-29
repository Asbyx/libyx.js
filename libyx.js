//mouse

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
var width = 100, height = 100;
window.addEventListener("keydown", keyDown, false);
window.addEventListener("keyup", keyUp, false);

var rectCenter = "TL";
var textFontSize = 32;
var keys = [], nbKeys = 0;
keys[0] = 0;

//Canvas functions===============================
/**
 * Creates the canvas where the application will be executed
 * @param a (px) width of the canvas
 * @param b (px) height of the canvas
 */
function newCanvas(a, b) {
    canvas.width = width = a;
    canvas.height = height = b;
    ctx.imageSmoothingEnabled = false;
    console.log("context created, width: " + width + ", height: " + height);
}

/**
 * Set the color of the background of the canvas using rgb
 * @param a (0-255) red value
 * @param b (0-255) blue value
 * @param c (0-255) green value
 */
function background(a, b, c) {
    if (b === undefined) b = c = a;
    canvas.style.background = "rgb(" + a + ", " + b + ", " + c + ")";
}

/**
 * Clear the canvas
 */
function clear() {
    ctx.clearRect(0, 0, width, height);
}

//===============================================

//Useful functions===============================
/**
 * Write in the console (shorter syntax)
 * @param text Text to write
 */
function log(text) {
    console.log(text);
}

//===============================================

//Drawing functions==============================
/**
 * Set the colour of the next shape drawn using rgba
 * @param a (0-255) red value
 * @param b (0-255) blue value
 * @param c (0-255) green value
 * @param d (0-255) alpha can value
 */
function fill(a, b, c, d) {
    if (b === undefined) b = c = a;
    if (d === undefined) d = 1;
    ctx.fillStyle = "rgba(" + a + ", " + b + ", " + c + ", " + d + ")";
    ctx.strokeStyle = "rgba(" + a + ", " + b + ", " + c + ", " + d + ")";
}

/**
 * Change the center of the next rectangle drawn, i.e. the location of (x, y) relative to the rectangle
 * @param a Center (TR, TL, BR, BL, C) (i.e. Top-Right, Top-Left, Bottom-Right, Bottom-Left, Center)
 */
function rectCenter(a) {
    rectCenter = a;
}

/**
 * Draw a rectangle in the canvas
 * @param x x coordinates
 * @param y y coordinates
 * @param w width
 * @param h height
 */
function rect(x, y, w, h) {
    switch (rectCenter) {
        case"TL":
            ctx.fillRect(x, y, w, h);
            break;
        case"BL":
            ctx.fillRect(x, y - h, w, h);
            break;
        case"TR":
            ctx.fillRect(x - w, y, w, h);
            break;
        case"BR":
            ctx.fillRect(x - w, y - h, w, h);
            break;
        case"C":
            ctx.fillRect(x - w / 2, y - h / 2, w, h);
            break;
    }
}

/**
 * Draw a circle in a canvas
 * @param x x coordinate
 * @param y y coordinate
 * @param r radius
 */
function circle(x, y, r) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
}

/**
 * Draw a line in the canvas
 * @param x x coordinate of the start of the line
 * @param y    y coordinate of the start of the line
 * @param xf x coordinate of the end of the line
 * @param yf y coordinate of the end of the line
 */
function line(x, y, xf, yf) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(xf, yf);
    ctx.closePath();
    ctx.stroke();
}

/**
 * Change the font size of the next text which will be written
 * @param a font size
 */
function textSize(a) {
    textFontSize = a;
}

/**
 * Write text on the canvas
 * @param t text to write
 * @param x x coordinate
 * @param y y coordinate
 * @param f font style
 */
function text(t, x, y, f = "Arial") {
    ctx.font = textFontSize + "px " + f;
    ctx.fillText(t, x, y);
}
//===============================================


//Images=========================================
/**
 * Load an image
 * @param src path to the image
 * @returns Image the image loaded
 */
function newImage(src) {
    let imageReturned = new Image();
    //imageReturned.crossOrigin = "anonymous";
    imageReturned.src = src;
    return imageReturned;
}

/**
 * Draw the image in canvas
 * @param i image (must be loaded)
 * @param x x coordinate
 * @param y    y coordinate
 * @param s1 scale of the width (default: 1)
 * @param s2 scale of the height (default: 1)
 * @param r angle of rotation, can be undefined, "invert" to invert the image or a value in radian
 * @param center (boolean) Whether the image should be drawn with (x, y) as its center (default: false)
 */
function drawImage(i, x, y, s1 = 1, s2 = 1, r, center = false) { //s1 et s2 le nombre de fois qu'on multiplie la largeur ou la hauteur, r pour la rotation (rad), mid = true => on dessine du milieu
    if (r !== undefined) {
        if (r !== "invert") {
            ctx.translate(x, y);
            ctx.rotate(r);
            if (!center) ctx.drawImage(i, 0 - i.width * s1, 0 - i.height * s2, i.width * s1, i.height * s2);
            else ctx.drawImage(i, 0 - (i.width * s1) / 2, 0 - (i.height * s2) / 2, i.width * s1, i.height * s2);
            ctx.rotate(-r);
            ctx.translate(-x, -y);
        } else {
            ctx.translate(x, y);
            ctx.scale(-1, 1);
            if (!center) ctx.drawImage(i, 0 - i.width * s1, 0 - i.height * s2, i.width * s1, i.height * s2);
            else ctx.drawImage(i, 0 - (i.width * s1) / 2, 0 - (i.height * s2) / 2, i.width * s1, i.height * s2);
            ctx.scale(-1, 1);
            ctx.translate(-x, -y);
        }
    } else {
        if (!center)
            ctx.drawImage(i, x, y, i.width * s1, i.height * s2);
        else ctx.drawImage(i, x - (i.width * s1) / 2, y - (i.height * s2) / 2, i.width * s1, i.height * s2)
    }
}

//===============================================


//keyboard=======================================
function KeyForKeyboard(key) {
    //log(key); //Uncomment this if you want to know what name the pressed key has
    this.officialName = key;
    this.isDown = true;
    this.nickname = this.officialName;
    switch (this.officialName) {
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

//detector when a key is pressed
function keyDown() {
    for (var i = keys.length - 1; i >= 0; i--) {
        if (keys[i].officialName === event.key) {
            keys[i].isDown = true;

            //call the function if defined by the user
            try {
                isKeyPressed(keys[i].nickname);
            } catch (err) {}

            //Prevent scrolling in a web page if the application uses the arrow keys or the space bar
            switch (event.keyCode) {
                case 37:
                case 39:
                case 38:
                case 40:
                case 32:
                    event.preventDefault();
                    break;
                default:
                    break;
            }
            return;
        }
    }
    nbKeys++;
    keys[nbKeys] = new KeyForKeyboard(event.key);
    try {
        isKeyPressed(keys[nbKeys].nickname);
    } catch (err) {}
}

//detector when a key is released
function keyUp() {
    for (var i = keys.length - 1; i >= 0; i--) {
        if (keys[i].officialName === event.key) {
            keys[i].isDown = false;
            try {
                isKeyReleased(keys[i].nickname);
            } catch (err) {}
        }
    }
}

/**
 * Check whether the given key is down
 * @param key key to check (For arrows, the name of the key is Up, Down, Left or Right, for the spacebar it is Space)
 * @returns boolean
 */
function isKeyDown(key) {
    for (let i = keys.length - 1; i >= 0; i--) {
        if (keys[i].nickname === key && keys[i].isDown) {
            return true;
        }
    }
    return false;
}

//===============================================

//Vector=========================================
/**
 * Class describing a 2-D vector
 * @class
 * @param x x value of the vector
 * @param y y value of the vector
 */
function Vector(x, y) {
    this.x = x;
    this.y = y;

    /**
     * Return the magnitude of the vector
     * @returns number
     */
    this.magnitude = function () {
        return Math.sqrt((this.x * this.x) + (this.y * this.y));
    };

    /**
     * Set the magnitude of the vector
     * @param n new magnitude
     */
    this.setMagnitude = function (n) {
        let magnitude = this.magnitude();
        let x = this.x / magnitude;
        y = this.y / magnitude;
        this.x = x * n;
        this.y = y * n;
    };

    /**
     * Set the angle of the vector
     * @returns number
     */
    this.angle = function () {
        return Math.atan2(this.y, this.x);
    };

    /**
     * Rotates clockwise the vector
     * @param a angle of rotation, in radian
     */
    this.rotate = function (a) {
        let magnitude = this.magnitude();
        this.x = magnitude * Math.cos(a);
        this.y = magnitude * Math.sin(a);
    }
}
//===============================================


//Hitboxs===============================
/**
 * Return the distances between two points
 * @param x1 x coordinate of the first point
 * @param y1 y coordinate of the first point
 * @param x2 x coordinate of the second point
 * @param y2 y coordinate of the second point
 * @returns number
 */
function dist(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
}

/**
 * Return true if the circle are colliding
 *
 * @param c1x x coordinate of the center of the first circle
 * @param c1y y coordinate of the center of the first circle
 * @param c1r radius of the first circle
 * @param c2x x coordinate of the center of the second circle
 * @param c2y y coordinate of the center of the second circle
 * @param c2r radius of the second circle
 * @returns boolean
 */
function areCircleColliding(c1x, c1y, c1r, c2x, c2y, c2r) {
    if (dist(c1x, c1y, c2x, c2y) < c1r + c2r) return true; else return false;
}


/**
 * Return true if the rectangles are colliding
 *
 * @param hg1x x coordinate of the top-left corner of the first rectangle
 * @param hg1y y coordinate of the top-left corner of the first rectangle
 * @param bd1x x coordinate of the bottom-right corner of the first rectangle
 * @param bd1y x coordinate of the bottom-right corner of the first rectangle
 * @param hg2x x coordinate of the top-left corner of the first rectangle
 * @param hg2y y coordinate of the top-left corner of the first rectangle
 * @param bd2x x coordinate of the bottom-right corner of the first rectangle
 * @param bd2y x coordinate of the bottom-right corner of the first rectangle
 * @returns boolean
 */
function areRectsColliding(hg1x, hg1y, bd1x, bd1y, hg2x, hg2y, bd2x, bd2y) {
    if (hg1x > bd2x || hg2x > bd1x) {
        return false;
    }
    return !(hg1y > bd2y || hg2y > bd1y);

}

/**
 * Return true if the a point is in the rectangle
 * @param px x coordinate of the point
 * @param py y coordinate of the point
 * @param rx x coordinate of the top-left corner of the rectangle
 * @param ry y coordinate of the top-left corner of the rectangle
 * @param rw width of the rectangle
 * @param rh height of the rectangle
 * @returns boolean
 */
function isPointInRect(px, py, rx, ry, rw, rh) {
    if (px < rx) return false;
    if (px > rx + rw) return false;
    if (py < ry) return false;
    return py <= ry + rh;


}

//===============================================


//Other =========================================
/**
 * Return a random number between a and b
 * @param a lower bound
 * @param b upper bound (excluded)
 * @param isInt (boolean) is the result an integer
 * @returns number
 */
function random(a, b, isInt = false) {
    if (b === undefined) {
        if (isInt) {
            return Math.floor(Math.random() * a);
        } else {
            return Math.random() * a;
        }
    } else {
        if (isInt) {
            return Math.floor(Math.random() * (b - a) + a);
        } else {
            return Math.random() * (b - a) + a;
        }
    }
}

//===============================================

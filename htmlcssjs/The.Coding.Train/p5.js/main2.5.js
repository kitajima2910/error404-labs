var r = 0;
var b = 255;

// once the p5.js is loaded
function setup() {
    createCanvas(600, 400);
}

// for every frame
function draw() {
    r = map(mouseX, 0, 600, 0, 255);
    b = map(mouseX, 0, 600, 255, 0);
    background(r, 0, b);

    fill(250, 118, 222);
    ellipse(mouseX, 200, 50, 50);
}

// once the p5.js is loaded
function setup() {
    createCanvas(400, 400);
    background(0);
}

// for every frame
function draw() {
    fill(255, 56);
    circle(mouseX, mouseY, 24);
}

function mousePressed() {
    background(0);
}

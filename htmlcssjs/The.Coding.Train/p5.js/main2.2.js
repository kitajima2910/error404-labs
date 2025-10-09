let circleX = 200;

// once the p5.js is loaded
function setup() {
    createCanvas(400, 400);
}

// for every frame
function draw() {
    background(0);

    noStroke();
    fill(255);
    circle(circleX, 150, 64);

    circleX += 1;
}

function mousePressed() {
    circleX = 0;
}

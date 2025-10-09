let x, y, r, g, b;

// once the p5.js is loaded
function setup() {
    createCanvas(500, 600);
    background(0);
}

// for every frame
function draw() {
    r = random(255);
    g = random(255);
    b = random(255);
    x = random(width);
    y = random(height);

    noStroke();
    fill(r, g, b, 100);
    circle(x, y, 24);
}

function mousePressed() {
    background(0);
}

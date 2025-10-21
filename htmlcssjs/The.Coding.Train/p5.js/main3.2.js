var x;
var speed;
var on = false;

var R;
var G;
var B;

function setup() {
    createCanvas(400, 400);

    x = 0;
    speed = 2;

    R = random(255);
    G = random(255);
    B = random(255);
}

function draw() {
    if (on) {
        background(R, G, B);
    } else {
        background(0);
    }

    noFill();
    stroke(255);
    strokeWeight(4);
    ellipse(x + 54, height / 2, 100, 100);

    // if (x + 100 > width) {
    //     speed = -2;
    // } else if (x < 0) {
    //     speed = 2;
    // }

    if (x + 100 > width || x < 0) {
        speed = -speed;
    }

    x = x + speed;

    if (mouseIsPressed) {
        fill(255, 0, 0);
        noStroke();
        ellipse(mouseX, mouseY, 20, 20);
    }
}

function mousePressed() {
    on = !on;

    R = random(255);
    G = random(255);
    B = random(255);
}

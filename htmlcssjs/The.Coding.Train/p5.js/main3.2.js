var x;
var speed;

function setup() {
    createCanvas(400, 400);

    x = 0;
    speed = 2;
}

function draw() {
    background(0);

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
}

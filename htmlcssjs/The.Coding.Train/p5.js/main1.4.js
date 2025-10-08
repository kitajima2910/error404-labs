function setup() {
    createCanvas(400, 300);
    print("Hello, World!");
}

function draw() {
    background(100);

    rectMode(CENTER);
    fill(0, 0, 255);
    stroke(0, 255, 0);
    strokeWeight(5);
    rect(200, 150, 150, 150);

    fill(255, 0, 0, 100);
    noStroke();
    ellipse(100, 150, 100, 100);
}

function setup() {
    createCanvas(600, 400);
}

function draw() {
    background(0);
    strokeWeight(4);
    stroke(255);

    // var x = 0;

    // while (x <= width) {
    //     fill(random(255), random(255), random(255));
    //     ellipse(x, 100, 25, 25);
    //     x = x + 50;
    // }

    // for (var x = 0; x <= width; x = x + 50) {
    //     for (var y = 0; y <= width; y = y + 50) {
    //         fill(random(255), random(255), random(255));
    //         ellipse(x, y, 25, 25);
    //     }
    // }

    for (var x = 0; x <= mouseX; x = x + 50) {
        for (var y = 0; y <= mouseY; y = y + 50) {
            fill(random(255), random(255), random(255));
            ellipse(x, y, 25, 25);
        }
    }
}

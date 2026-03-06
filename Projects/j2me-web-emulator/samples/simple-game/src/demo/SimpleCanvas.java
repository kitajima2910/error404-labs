package demo;

import javax.microedition.lcdui.Canvas;
import javax.microedition.lcdui.Graphics;

public class SimpleCanvas extends Canvas {
    private int x;
    private int y;

    public SimpleCanvas() {
        x = 90;
        y = 140;
    }

    protected void paint(Graphics g) {
        g.fillRect(x, y, 28, 28);
        g.drawString("HELLO", 80, 40, 0);
    }

    protected void keyPressed(int keyCode) {
        if (keyCode == -3) {
            x = x - 5;
        }
        if (keyCode == -4) {
            x = x + 5;
        }
        if (keyCode == -1) {
            y = y - 5;
        }
        if (keyCode == -2) {
            y = y + 5;
        }
        repaint();
    }
}

package demo;

import javax.microedition.lcdui.Display;
import javax.microedition.midlet.MIDlet;

public class SimpleGame extends MIDlet {
    public void startApp() {
        Display display = Display.getDisplay(this);
        display.setCurrent(new SimpleCanvas());
    }
}

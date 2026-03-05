package pl.zb3.freej2me.bridge.shell;

/*
 * note this needs to be scaled.. since scale is done on the JS side
 * JS needs to translate this
 */
public class PointerEvent {
    public int x;
    public int y;

    public PointerEvent(int x, int y) {
        this.x = x;
        this.y = y;
    }
}

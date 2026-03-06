package pl.zb3.freej2me.bridge.shell;

public interface InputListener {
    public void keyPressed(KeyEvent e);
    public void keyReleased(KeyEvent e);

    public void pointerPressed(PointerEvent e);
    public void pointerReleased(PointerEvent e);
    public void pointerDragged(PointerEvent e);

    public void playerEOM(Object handle);
    public void playerVideoFrame(Object handle);
}

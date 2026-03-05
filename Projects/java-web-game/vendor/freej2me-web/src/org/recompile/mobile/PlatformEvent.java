package org.recompile.mobile;

import javax.microedition.lcdui.Canvas;

import pl.zb3.freej2me.bridge.shell.KeyEvent;

public class PlatformEvent
{
    public static final int KEY_PRESSED = 1;
    public static final int KEY_REPEATED = 2;
    public static final int KEY_RELEASED = 3;
    public static final int POINTER_PRESSED = 4;
    public static final int POINTER_DRAGGED = 5;
    public static final int POINTER_RELEASED = 6;
    public static final int REPAINT_CANVAS = 7;
    public static final int RUN = 8;

    int type;
    int code;
    int code2;
    int code3;
    int code4;
    KeyEvent keyEvent;
    Canvas canvas;
    Runnable runnable;

    public PlatformEvent(Canvas canvas, int x, int y, int width, int height)
    {
        this.type = REPAINT_CANVAS;
        this.canvas = canvas;
        this.code = x;
        this.code2 = y;
        this.code3 = width;
        this.code4 = height;
    }


    public PlatformEvent(Runnable runnable)
    {
        this.type = RUN;
        this.runnable = runnable;
    }


    public PlatformEvent(int type, KeyEvent e)
    {
        this.type = type;
        this.keyEvent = e;
    }

    public PlatformEvent(int type, int x, int y)
    {
        this.type = type;
        this.code = x;
        this.code2 = y;
    }


}

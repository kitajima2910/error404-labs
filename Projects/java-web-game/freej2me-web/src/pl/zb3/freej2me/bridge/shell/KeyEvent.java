package pl.zb3.freej2me.bridge.shell;

public class KeyEvent {
    public int code;
    public char keyChar;
    public boolean hasCtrl;
    public boolean hasShift;

    public int platformCode;
    public int normalizedCode;

    public KeyEvent(int code, char keyChar, boolean hasCtrl, boolean hasShift) {
        this.code = code;
        this.keyChar = keyChar;
        this.hasCtrl = hasCtrl;
        this.hasShift = hasShift;
    }

    public static final int VK_ENTER = 13;
    public static final int VK_BACK_SPACE = 8;
    public static final int VK_DELETE = 46;
    public static final int VK_LEFT = 37;
    public static final int VK_UP = 38;
    public static final int VK_RIGHT = 39;
    public static final int VK_DOWN = 40;
    public static final int VK_ESCAPE = 27;

    public static final int VK_0 = 48;
    public static final int VK_1 = 49;
    public static final int VK_2 = 50;
    public static final int VK_3 = 51;
    public static final int VK_4 = 52;
    public static final int VK_5 = 53;
    public static final int VK_6 = 54;
    public static final int VK_7 = 55;
    public static final int VK_8 = 56;
    public static final int VK_9 = 57;

    public static final int VK_NUMPAD0 = 96;
    public static final int VK_NUMPAD1 = 97;
    public static final int VK_NUMPAD2 = 98;
    public static final int VK_NUMPAD3 = 99;
    public static final int VK_NUMPAD4 = 100;
    public static final int VK_NUMPAD5 = 101;
    public static final int VK_NUMPAD6 = 102;
    public static final int VK_NUMPAD7 = 103;
    public static final int VK_NUMPAD8 = 104;
    public static final int VK_NUMPAD9 = 105;

    public static final int VK_NUMPAD_DIVIDE = 111;
    public static final int VK_NUMPAD_ASTERISK = 106;

    public static final int VK_F1 = 112;
    public static final int VK_F2 = 113;
    public static final int VK_F3 = 114;

    public static final int VK_SPACE = 32;

    public static final int VK_A = 65;
    public static final int VK_B = 66;
    public static final int VK_C = 67;
    public static final int VK_D = 68;
    public static final int VK_E = 69;
    public static final int VK_F = 70;
    public static final int VK_G = 71;
    public static final int VK_H = 72;
    public static final int VK_I = 73;
    public static final int VK_J = 74;
    public static final int VK_K = 75;
    public static final int VK_L = 76;
    public static final int VK_M = 77;
    public static final int VK_N = 78;
    public static final int VK_O = 79;
    public static final int VK_P = 80;
    public static final int VK_Q = 81;
    public static final int VK_R = 82;
    public static final int VK_S = 83;
    public static final int VK_T = 84;
    public static final int VK_U = 85;
    public static final int VK_V = 86;
    public static final int VK_W = 87;
    public static final int VK_X = 88;
    public static final int VK_Y = 89;
    public static final int VK_Z = 90;
}

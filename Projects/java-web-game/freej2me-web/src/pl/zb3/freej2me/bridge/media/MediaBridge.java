package pl.zb3.freej2me.bridge.media;

public class MediaBridge {
    //static {
    //    System.loadLibrary("libmediabridge");
    //}

    public static native Object createMediaPlayer();

    public static native boolean playerLoad(Object handle, byte[] data, String contentType);
    public static native void playerPlay(Object handle);
    public static native void playerSetLooping(Object handle, boolean loop);
    public static native void playerStop(Object handle);
    public static native float playerGetPosition(Object handle);
    public static native float playerGetDuration(Object handle);
    public static native void playerSeek(Object handle, float pos);
    public static native void playerClose(Object handle);

    public static native double playerGetVolume(Object handle);
    public static native double playerSetVolume(Object handle, double volume);

    public static native void playerSetupVideo(Object handle, Object canvas, Object player, int videoDisplayX, int videoDisplayY, int videoDisplayWidth,
            int videoDisplayHeight, boolean videoDisplayFullscreen);

    public static native int playerGetWidth(Object handle);
    public static native int playerGetHeight(Object handle);

    public static native byte[] playerGetSnapshot(Object handle, String type);
}

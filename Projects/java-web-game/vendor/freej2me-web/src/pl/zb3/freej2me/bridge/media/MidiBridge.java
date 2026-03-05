package pl.zb3.freej2me.bridge.media;

public class MidiBridge {
    //static {
    //    System.loadLibrary("libmidibridge");
    //}

    /*
     * this assumes we only have one midi player [as in spec], so no object references
     * but don't games actually expect the rules to be relaxed?
     */

    public static native Object getMidiPlayer();
    public static native int midiSetSequence(Object handle, byte[] sequence);
    public static native void midiPlay(Object handle);
    public static native void midiLoop(Object handle, int times);
    public static native void midiStop(Object handle);
    public static native void midiShortEvent(Object handle, int status, int data1, int data2);
    public static native int midiGetPosition(Object handle);
    public static native void midiSeek(Object handle, int pos);
    public static native double midiGetVolume(Object handle);
    public static native double midiSetVolume(Object handle, double volume);
}

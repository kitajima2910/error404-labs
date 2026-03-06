package pl.zb3.freej2me.bridge;

// CheerpJ wrappers aren't equal, this class
public class JSReference {
    //static {
    //    System.loadLibrary("libjsreference");
	//}

    private Object handle;
    private int hashCode;
    public int x;
    public int y;

    public JSReference(Object handle) {
        this.handle = handle;
        this.hashCode = (int)getWeakObjectId(handle);
    }

    public static native long getWeakObjectId(Object handle);
    private static native boolean checkReferenceEquality(Object handle1, Object handle2);

    @Override
    public int hashCode() {
        return this.hashCode;
    }

    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }

        if (hashCode != obj.hashCode()) {
            return false;
        }

        if (!(obj instanceof JSReference)) {
            return false;
        } else {
            JSReference objRef = (JSReference)obj;
            return checkReferenceEquality(handle, objRef);
        }
    }

    public Object getHandle() {
        return handle;
    }
}

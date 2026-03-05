package pl.zb3.freej2me.bridge.media;

import java.lang.ref.WeakReference;
import java.util.Map;
import java.util.List;
import java.util.HashMap;

import pl.zb3.freej2me.bridge.JSReference;

import java.util.LinkedList;

public class PlayerEventHandler {
    // longs live forever.. so we need weak references
    private static final Map<Long, List<WeakReference<StopListener>>> playerStopListeners = new HashMap<>();

    public static void registerStopListener(Object handle, StopListener sl) {
        long key = JSReference.getWeakObjectId(handle);

        synchronized (playerStopListeners) {
            playerStopListeners.computeIfAbsent(key, k -> new LinkedList<>()).add(new WeakReference<>(sl));
        }
    }

    public static void onPlayerStop(Object handle) {
        long key = JSReference.getWeakObjectId(handle);
        List<WeakReference<StopListener>> listeners = playerStopListeners.get(key);

        if (listeners != null) {
            System.out.println("onplayerstop found listeners for handle");
            synchronized (listeners) {
                for (WeakReference<StopListener> wr : listeners) {
                    StopListener sl = wr.get();
                    if (sl != null) {
                        System.out.println("onplayerstop found non weak playerstop");
                        sl.onStop();
                    }
                }
                listeners.removeIf(wr -> wr.get() == null);
            }
        }
    }
}

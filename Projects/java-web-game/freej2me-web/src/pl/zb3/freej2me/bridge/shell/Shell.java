package pl.zb3.freej2me.bridge.shell;

public class Shell {
    public static native Object getScreenCtx();
    public static native void setCanvasSize(int width, int height);

    public static native void setTitle(String title);
    public static native void setIcon(byte[] icon);

    public static native void waitForAndDispatchEvents(InputListener obj);

    private static InputHandler inputHandler;

    public static void startInputListener(InputListener listener) {
        inputHandler = new InputHandler(listener);
        inputHandler.start();
    }

    // note that there's no queue here, the actual queue is on the JS side
    // we shouldn't call locked methods here, so this is not a substiute
    // of the eventqueue
    private static class InputHandler implements Runnable {
		InputListener listener;
		private volatile Thread thread;

		public InputHandler(InputListener listener) {
			this.listener = listener;
		}

		public void start()	{
			if (thread == null) {
				thread = new Thread(this, "InputHandler");
				thread.start();
			}
		}

		public void run() {
			while (!Thread.currentThread().isInterrupted()) {
				try {
					Shell.waitForAndDispatchEvents(listener);
				} catch (Exception e) {
					e.printStackTrace();
					System.out.println("exception in input handler: "+e.getMessage());
				}
			}

			thread = null;
		}
	}

    public static native void restart();
    public static native void exit();
    public static native void sthop();
    public static native void say(String sth);
    public static native void sayObject(String label, Object handle);
}
/*
	This file is part of FreeJ2ME.

	FreeJ2ME is free software: you can redistribute it and/or modify
	it under the terms of the GNU General Public License as published by
	the Free Software Foundation, either version 3 of the License, or
	(at your option) any later version.

	FreeJ2ME is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU General Public License for more details.

	You should have received a copy of the GNU General Public License
	along with FreeJ2ME.  If not, see http://www.gnu.org/licenses/
*/
package org.recompile.mobile;

import java.util.Map;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

import javax.microedition.lcdui.Display;
import javax.microedition.lcdui.Displayable;
import javax.microedition.lcdui.Graphics;
import javax.microedition.lcdui.Canvas;
import javax.microedition.lcdui.game.GameCanvas;

import pl.zb3.freej2me.bridge.graphics.CanvasGraphics;
import pl.zb3.freej2me.bridge.graphics.CanvasImage;
import pl.zb3.freej2me.bridge.shell.KeyEvent;

import javax.microedition.lcdui.Image;


/*

	Mobile Platform

*/

public class MobilePlatform
{

	private CanvasImage lcd;
	private CanvasGraphics gc;
	public int lcdWidth;
	public int lcdHeight;

	Map<String, String> systemPropertyOverrides;

	public MIDletLoader loader;
	EventQueue eventQueue;

	public Runnable painter;

	public String dataPath = "";

	public volatile int keyState = 0;

	public MobilePlatform(String dataPath, int width, int height)
	{
		this.dataPath = dataPath;
		resizeLCD(width, height);

		painter = new Runnable()
		{
			public void run()
			{
				// Placeholder //
			}
		};

		addSystemProperty("microedition.platform", "j2me");
		addSystemProperty("microedition.profiles", "MIDP-2.0");
		addSystemProperty("microedition.configuration", "CLDC-1.1");
		addSystemProperty("microedition.locale", "en-US");
		addSystemProperty("microedition.encoding", "ISO-8859-1");
		addSystemProperty("microedition.m3g.version", "1.1");
		addSystemProperty("wireless.messaging.sms.smsc", "+8613800010000");
		addSystemProperty("device.imei", "000000000000000");
	}

	public void startEventQueue() {
		eventQueue = new EventQueue(this);
		eventQueue.start();
	}

	public void dropQueuedEvents() {
		eventQueue.dropEvents();
	}

	public void resizeLCD(int width, int height)
	{
		lcdWidth = width;
		lcdHeight = height;

		lcd = new CanvasImage(width, height, 0xffffffff);
		gc = lcd.getGraphics();
	}

	public CanvasImage getLCD()
	{
		return lcd;
	}

	public void setPainter(Runnable r)
	{
		painter = r;
	}

	public void keyPressed(KeyEvent e)
	{
		eventQueue.submit(new PlatformEvent(PlatformEvent.KEY_PRESSED, e));
	}

	public void keyReleased(KeyEvent e)
	{
		eventQueue.submit(new PlatformEvent(PlatformEvent.KEY_RELEASED, e));
	}

	public void keyRepeated(KeyEvent e)
	{
		eventQueue.submit(new PlatformEvent(PlatformEvent.KEY_REPEATED, e));
	}

	public void pointerDragged(int x, int y)
	{
		eventQueue.submit(new PlatformEvent(PlatformEvent.POINTER_DRAGGED, x, y));
	}

	public void pointerPressed(int x, int y)
	{
		eventQueue.submit(new PlatformEvent(PlatformEvent.POINTER_PRESSED, x, y));
	}

	public void pointerReleased(int x, int y)
	{
		eventQueue.submit(new PlatformEvent(PlatformEvent.POINTER_RELEASED, x, y));
	}

	public void requestRepaint(Canvas canvas, int x, int y, int width, int height) {
		eventQueue.submit(new PlatformEvent(canvas, x, y, width, height));
	}

	public void callSerially(Runnable r) {
		eventQueue.submit(new PlatformEvent(r));
	}

	public void doKeyPressed(KeyEvent keyEvent)
	{
		if (keyEvent.platformCode != 0) {
			updateKeyState(keyEvent.normalizedCode, 1);
		}
		Displayable d;
		if ((d = Mobile.getDisplay().getCurrent()) != null) {
			d.keyPressed(keyEvent);
		}
	}

	public void doKeyReleased(KeyEvent keyEvent)
	{
		if (keyEvent.platformCode != 0) {
			updateKeyState(keyEvent.normalizedCode, 0);
		}
		Displayable d;
		if ((d = Mobile.getDisplay().getCurrent()) != null) {
			d.keyReleased(keyEvent);
		}
	}

	public void doKeyRepeated(KeyEvent keyEvent)
	{
		Displayable d;
		if ((d = Mobile.getDisplay().getCurrent()) != null) {
			d.keyRepeated(keyEvent);
		}
	}

	public void doPointerDragged(int x, int y)
	{
		Displayable d;
		if ((d = Mobile.getDisplay().getCurrent()) != null) {
			d.pointerDragged(x, y);
		}
	}

	public void doPointerPressed(int x, int y)
	{
		Displayable d;
		if ((d = Mobile.getDisplay().getCurrent()) != null) {
			d.pointerPressed(x, y);
		}
	}

	public void doPointerReleased(int x, int y)
	{
		Displayable d;
		if ((d = Mobile.getDisplay().getCurrent()) != null) {
			d.pointerReleased(x, y);
		}
	}

	public void doRepaintCanvas(Canvas canvas, int x, int y, int width, int height)
	{
		canvas.actuallyRepaint(x, y, width, height);
	}

	private void updateKeyState(int key, int val)
	{
		int mask=0;
		switch (key)
		{
			case Mobile.KEY_NUM2: mask = GameCanvas.UP_PRESSED; break;
			case Mobile.KEY_NUM4: mask = GameCanvas.LEFT_PRESSED; break;
			case Mobile.KEY_NUM6: mask = GameCanvas.RIGHT_PRESSED; break;
			case Mobile.KEY_NUM8: mask = GameCanvas.DOWN_PRESSED; break;
			case Mobile.KEY_NUM5: mask = GameCanvas.FIRE_PRESSED; break;
			case Mobile.KEY_NUM1: mask = GameCanvas.GAME_A_PRESSED; break;
			case Mobile.KEY_NUM3: mask = GameCanvas.GAME_B_PRESSED; break;
			case Mobile.KEY_NUM7: mask = GameCanvas.GAME_C_PRESSED; break;
			case Mobile.KEY_NUM9: mask = GameCanvas.GAME_D_PRESSED; break;
			case Mobile.NOKIA_UP: mask = GameCanvas.UP_PRESSED; break;
			case Mobile.NOKIA_LEFT: mask = GameCanvas.LEFT_PRESSED; break;
			case Mobile.NOKIA_RIGHT: mask = GameCanvas.RIGHT_PRESSED; break;
			case Mobile.NOKIA_DOWN: mask = GameCanvas.DOWN_PRESSED; break;
			case Mobile.NOKIA_SOFT3: mask = GameCanvas.FIRE_PRESSED; break;

		}
		keyState |= mask;
		keyState ^= mask;
		if(val==1) { keyState |= mask; }
	}

	public void setSystemPropertyOverrides(Map<String, String> systemPropertyOverrides) {
		this.systemPropertyOverrides = systemPropertyOverrides;

		if (systemPropertyOverrides != null) {
			for (String key: systemPropertyOverrides.keySet()) {
				System.setProperty(key, systemPropertyOverrides.get(key));
			}
		}
	}

	public void addSystemProperty(String key, String value) {
		if (this.systemPropertyOverrides != null && this.systemPropertyOverrides.containsKey(key)) {
			// overrides have the highest priority
			return;
		}

		System.setProperty(key, value);
	}

/*
	******** Jar Loading ********
*/

	public void setLoader(MIDletLoader loader)
	{
		this.loader = loader;
	}

	public void runJar()
	{
		try
		{
			loader.start();
		}
		catch (Exception e)
		{
			System.out.println("Error Running Jar");
			e.printStackTrace();

			// todo: paint proper BSOD
			gc.setColor(0x000080);
			gc.fillRect(0,0, lcdWidth, lcdHeight);

			gc.setColor(0xFFFFFF);
			gc.drawString("Game crashed :(", lcdWidth/2, lcdHeight/2, Graphics.HCENTER | Graphics.VCENTER);
			painter.run();
		}
	}

/*
	********* Graphics ********
*/

	public void flushGraphics(Image img, int x, int y, int width, int height)
	{
		gc.drawImagePart(img, x, y, width, height);

		painter.run();

		//System.gc();
	}

	public void repaint(Image img, int x, int y, int width, int height)
	{
		gc.drawImagePart(img, x, y, width, height);

		painter.run();

		//System.gc();
	}

	/**
	 * This class exists so we don't block main AWT EventQueue.
	 */
	private static class EventQueue implements Runnable	{
		BlockingQueue<PlatformEvent> queue = new LinkedBlockingQueue<>();
		MobilePlatform platform;
		private volatile Thread thread;

		public EventQueue(MobilePlatform platform) {
			this.platform = platform;
		}

		public void start()	{
			if (thread == null) {
				thread = new Thread(this, "MobilePlatformEventQueue");
				thread.start();
			}
		}

		public void run() {
			while (!Thread.currentThread().isInterrupted()) {
				try {
					PlatformEvent event = queue.take();
					synchronized (Display.calloutLock) {
						handleEvent(event);
					}
				} catch (InterruptedException e) {
					Thread.currentThread().interrupt();
					break;
				} catch (Exception e) {
					e.printStackTrace();
					System.out.println("exception in event handler: "+e.getMessage());
				}
			}

			thread = null;
		}

		public void submit(PlatformEvent event) {
			queue.offer(event);
		}

		public void dropEvents() {
			while (true) {
				if (queue.poll() == null) {
					break;
				}
			}
		}

		private void handleEvent(PlatformEvent event) {
			if (event.type == PlatformEvent.KEY_PRESSED) {
				platform.doKeyPressed(event.keyEvent);
			} else if (event.type == PlatformEvent.KEY_REPEATED) {
				platform.doKeyRepeated(event.keyEvent);
			} else if (event.type == PlatformEvent.KEY_RELEASED) {
				platform.doKeyReleased(event.keyEvent);
			} else if (event.type == PlatformEvent.POINTER_PRESSED) {
				platform.doPointerPressed(event.code, event.code2);
			} else if (event.type == PlatformEvent.POINTER_DRAGGED) {
				platform.doPointerDragged(event.code, event.code2);
			} else if (event.type == PlatformEvent.POINTER_RELEASED) {
				platform.doPointerReleased(event.code, event.code2);
			} else if (event.type == PlatformEvent.REPAINT_CANVAS) {
				platform.doRepaintCanvas(event.canvas, event.code, event.code2, event.code3, event.code4);
			} else if (event.type == PlatformEvent.RUN) {
				event.runnable.run();
			}
		}
	}
}

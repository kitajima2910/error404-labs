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
package org.recompile.freej2me;

/*
	FreeJ2ME - AWT
*/

import org.recompile.mobile.*;

import pl.zb3.freej2me.audio.LibmediaPlayer;
import pl.zb3.freej2me.bridge.graphics.CanvasGraphics;
import pl.zb3.freej2me.bridge.media.MediaBridge;
import pl.zb3.freej2me.bridge.media.PlayerEventHandler;
import pl.zb3.freej2me.bridge.shell.InputListener;
import pl.zb3.freej2me.bridge.shell.KeyEvent;
import pl.zb3.freej2me.bridge.shell.PointerEvent;
import pl.zb3.freej2me.bridge.shell.Shell;
import pl.zb3.freej2me.launcher.LauncherUtil;

import javax.microedition.lcdui.Display;
import javax.microedition.lcdui.Font;
import javax.microedition.lcdui.game.Sprite;

import java.io.File;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class FreeJ2ME {
	public static void main(String args[]) {
		FreeJ2ME app = new FreeJ2ME(args);
	}

	private int lcdWidth;
	private int lcdHeight;

	private CanvasGraphics screen;

	private Config config;
	private ConfigScreen configScreen;
	private boolean rotateDisplay = false;
	private int limitFPS = 0;

	private boolean[] pressedKeys = new boolean[128];

	private Runnable painter;

	public FreeJ2ME(String args[]) {
		/*
		 * app - launch by appId
		 * jar - launch from a given jar
		 */
		String launchMode = args[0];
		String launchName = args[1];

		MIDletLoader loader;

		if (launchMode.equals("app")) {
			loader = MIDletLoader.getMIDletLoader(new File(launchName, "app.jar"), launchName);
			// appId is set, we'll augement the loader with properties later
		} else {
			// jar mode.. install the app from jar, even if exists
			File jarFile = new File(launchName);

			loader = MIDletLoader.getMIDletLoader(jarFile);
			LauncherUtil.ensureAppId(loader, jarFile.getName());
			LauncherUtil.initApp(jarFile, loader, null, null, null);
		}

		LauncherUtil.moveAppIdToTop(loader.getAppId());

		// we shouldn't strictly require this to exist and depend on the launcher..
		String appDataPath = "./"+loader.getAppId();

		config = new Config();
		config.init(appDataPath);

		// override manifest
		loader.setProperties(config.appProperties);

		String mainClassOverride = config.appSettings.get("main");
		if (mainClassOverride != null) {
			loader.className = mainClassOverride;
		}

		Shell.setTitle(loader.name.isEmpty() ? loader.getAppId() : loader.name);
		Shell.setIcon(loader.getIconBytes());

		// screen size needs to be known and requires restart
		// this is also due to font statically depending on that
		lcdWidth = config.getWidth();
		lcdHeight = config.getHeight();
		Mobile.setPlatform(new MobilePlatform(appDataPath, lcdWidth, lcdHeight));

		Font.setFontsSize(config.getFontSize(), lcdWidth, lcdHeight);

		configScreen = new ConfigScreen(config);
		configScreen.onChange = new Runnable() {
			public void run() {
				settingsChanged();
			}
		};

		screen = CanvasGraphics.fromCtxHandle(Shell.getScreenCtx());
		System.out.println("has set screenctx");

		painter = new Runnable() {
			public void run() {
				try {
					if (configScreen.isRunning) {
						screen.drawImage(configScreen.getLCD(), 0, 0);
					} else {
						if (!rotateDisplay) {
							screen.drawImage(Mobile.getPlatform().getLCD(), 0, 0);
						} else {
							screen.drawRegion(Mobile.getPlatform().getLCD(), 0, 0, lcdWidth, lcdHeight,
									Sprite.TRANS_ROT270, 0, 0, 0);
						}

						if (limitFPS > 0) {
							// this is of course a simplification
							Thread.sleep(limitFPS);
						}
					}
				} catch (Exception e) {
					System.out.println(e.getMessage());
				}
			}
		};
		Mobile.getPlatform().setPainter(painter);

		Mobile.setDisplay(new Display());

		configScreen.init(); // set config screen initial size, might be rotated
		// load settings, this calls setCanvasSize
		settingsChanged();

		Mobile.getPlatform().setSystemPropertyOverrides(config.systemProperties);
		Mobile.getPlatform().startEventQueue();

		System.out.println("after starteventqueue");


		// JS can communicate with us only using this mechanism
		Shell.startInputListener(new InputListener() {
			public void keyPressed(KeyEvent e) {
				int keycode = e.code;
				int mobikey = e.platformCode = Mobile.getMobileKey(keycode);
				e.normalizedCode = Mobile.normalizeKey(mobikey);

				if (configScreen.isRunning) {
					configScreen.keyPressed(e);
					return;
				}

				int mobikeyN = (mobikey + 64) & 0x7F; // Normalized value for indexing the pressedKeys array

				switch (keycode) // Handle emulator control keys
				{
					// Config //
					case KeyEvent.VK_ESCAPE:
						Mobile.getPlatform().dropQueuedEvents();
						configScreen.start();
						return;
				}

				if (pressedKeys[mobikeyN] == false) {
					// ~ System.out.println("keyPressed: " + Integer.toString(mobikey));
					Mobile.getPlatform().keyPressed(e);
				} else {
					// ~ System.out.println("keyRepeated: " + Integer.toString(mobikey));
					Mobile.getPlatform().keyRepeated(e);
				}

				if (mobikey != 0) {
					pressedKeys[mobikeyN] = true;
				}
			}

			public void keyReleased(KeyEvent e) {
				int keycode = e.code;
				int mobikey = e.platformCode = Mobile.getMobileKey(keycode);
				e.normalizedCode = Mobile.normalizeKey(mobikey);

				if (configScreen.isRunning) {
					configScreen.keyReleased(e);
					return;
				}

				int mobikeyN = (mobikey + 64) & 0x7F; // Normalized value for indexing the pressedKeys array

				if (mobikey != 0) {
					pressedKeys[mobikeyN] = false;
				}

				// ~ System.out.println("keyReleased: " + Integer.toString(mobikey));
				Mobile.getPlatform().keyReleased(e);

			}

			public void pointerPressed(PointerEvent e) {
				int x = e.x;
				int y = e.y;

				if (rotateDisplay) {
					x = e.y;
					y = e.x;
				}

				Mobile.getPlatform().pointerPressed(x, y);
			}

			public void pointerReleased(PointerEvent e) {
				int x = e.x;
				int y = e.y;

				if (rotateDisplay) {
					x = e.y;
					y = e.x;
				}

				Mobile.getPlatform().pointerReleased(x, y);

			}

			public void pointerDragged(PointerEvent e) {
				int x = e.x;
				int y = e.y;

				if (rotateDisplay) {
					x = e.y;
					y = e.x;
				}

				Mobile.getPlatform().pointerDragged(x, y);
			}

			public void playerEOM(Object handle) {
				// this doesn't need to be a queued event, because potential
				// user callbacks are always run in a separate thread
				System.out.println("playerEOM called");
				PlayerEventHandler.onPlayerStop(handle);
			}

			public void playerVideoFrame(Object handle) {
				if (handle != null) {
					// it can't call user callbacks
					((LibmediaPlayer) handle).handleVideoFramePainted();
				}
			}

		});

		Mobile.getPlatform().setLoader(loader);
		Mobile.getPlatform().runJar();

	}

	private void settingsChanged() {
		limitFPS = Integer.parseInt(config.appSettings.get("fps"));
		if (limitFPS > 0) {
			limitFPS = 1000 / limitFPS;
		}

		String sound = config.appSettings.get("sound");
		Mobile.sound = false;
		if (sound.equals("on")) {
			Mobile.sound = true;
		}

		String phone = config.appSettings.get("phone");
		Mobile.sonyEricsson = false;
		Mobile.nokia = false;
		Mobile.siemens = false;
		Mobile.motorola = false;
		if (phone.equals("Nokia")) {
			Mobile.nokia = true;
		}
		if (phone.equals("Siemens")) {
			Mobile.siemens = true;
		}
		if (phone.equals("Motorola")) {
			Mobile.motorola = true;
		}
		if (phone.equals("SonyEricsson")) {
			Mobile.sonyEricsson = true;
		}

		String rotate = config.appSettings.get("rotate");
		if (rotate.equals("on")) {
			rotateDisplay = true;
		}
		if (rotate.equals("off")) {
			rotateDisplay = false;
		}

		boolean isForceFullscreen = config.appSettings.getOrDefault("forceFullscreen", "off").equals("on");
		boolean isQueuedPaint = config.appSettings.getOrDefault("queuedPaint", "off").equals("on");
		String dgFormat = config.appSettings.getOrDefault("dgFormat", "default");

		System.setProperty("freej2me.forceFullscreen", isForceFullscreen ? "true" : "false");

		Display.usePaintQueue = isQueuedPaint;

		if (!dgFormat.equals("default")) {
			System.setProperty("freej2me.dgFormat", dgFormat);
		}
		lcdWidth = config.getWidth();
		lcdHeight = config.getHeight();
		if (lcdWidth != Mobile.getPlatform().lcdWidth || lcdHeight != Mobile.getPlatform().lcdHeight) {
			Mobile.getPlatform().resizeLCD(lcdWidth, lcdHeight);
		}

		Shell.setCanvasSize(rotateDisplay ? lcdHeight : lcdWidth, rotateDisplay ? lcdWidth : lcdHeight);
		painter.run();

		if (Mobile.nokia) {
			Mobile.getPlatform().addSystemProperty("microedition.platform", "Nokia6233/05.10");
		} else if (Mobile.sonyEricsson) {
			Mobile.getPlatform().addSystemProperty("microedition.platform", "SonyEricssonK750/JAVASDK");
			Mobile.getPlatform().addSystemProperty("com.sonyericsson.imei", "IMEI 00460101-501594-5-00");
		} else if (Mobile.siemens) {
			Mobile.getPlatform().addSystemProperty("com.siemens.OSVersion", "11");
			Mobile.getPlatform().addSystemProperty("com.siemens.IMEI", "000000000000000");

			// this is monochrome, but newer color games were smart enough not to depend on this property...
			Mobile.getPlatform().addSystemProperty("microedition.platform", "SL45i");
		}
	}

}

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

import java.io.InputStream;

import javax.microedition.lcdui.Display;

import pl.zb3.freej2me.bridge.shell.KeyEvent;

import javax.microedition.lcdui.Canvas;

/*

	Mobile

	Provides MobilePlatform access to mobile app

*/

public class Mobile
{
	private static MobilePlatform platform;

	private static Display display;

	public static boolean quiet = false;

	public static boolean nokia = false;

	public static boolean siemens = false;

	public static boolean motorola = false;

	public static boolean sonyEricsson = false;

	public static boolean sound = true;

	//Standard keycodes
	public static final int KEY_NUM0  = Canvas.KEY_NUM0;  // 48
	public static final int KEY_NUM1  = Canvas.KEY_NUM1;  // 49
	public static final int KEY_NUM2  = Canvas.KEY_NUM2;  // 50
	public static final int KEY_NUM3  = Canvas.KEY_NUM3;  // 51
	public static final int KEY_NUM4  = Canvas.KEY_NUM4;  // 52
	public static final int KEY_NUM5  = Canvas.KEY_NUM5;  // 53
	public static final int KEY_NUM6  = Canvas.KEY_NUM6;  // 54
	public static final int KEY_NUM7  = Canvas.KEY_NUM7;  // 55
	public static final int KEY_NUM8  = Canvas.KEY_NUM8;  // 56
	public static final int KEY_NUM9  = Canvas.KEY_NUM9;  // 57
	public static final int KEY_STAR  = Canvas.KEY_STAR;  // 42
	public static final int KEY_POUND = Canvas.KEY_POUND; // 35
	public static final int GAME_UP   = Canvas.UP;     // 1
	public static final int GAME_DOWN = Canvas.DOWN;   // 6
	public static final int GAME_LEFT = Canvas.LEFT;   // 2
	public static final int GAME_RIGHT= Canvas.RIGHT;  // 5
	public static final int GAME_FIRE = Canvas.FIRE;   // 8
	public static final int GAME_A    = Canvas.GAME_A; // 9
	public static final int GAME_B    = Canvas.GAME_B; // 10
	public static final int GAME_C    = Canvas.GAME_C; // 11
	public static final int GAME_D    = Canvas.GAME_D; // 12

	// ???
	public static final int XKEY_SELECT = 20;
    public static final int XKEY_SOFT1 = 21;
    public static final int XKEY_SOFT2 = 22;
    public static final int XKEY_SOFT3 = 23;


	//Nokia-specific keycodes
	public static final int NOKIA_UP    = -1; // KEY_UP_ARROW = -1;
	public static final int NOKIA_DOWN  = -2; // KEY_DOWN_ARROW = -2;
	public static final int NOKIA_LEFT  = -3; // KEY_LEFT_ARROW = -3;
	public static final int NOKIA_RIGHT = -4; // KEY_RIGHT_ARROW = -4;
	public static final int NOKIA_SOFT1 = -6; // KEY_SOFTKEY1 = -6;
	public static final int NOKIA_SOFT2 = -7; // KEY_SOFTKEY2 = -7;
	public static final int NOKIA_SOFT3 = -5; // KEY_SOFTKEY3 = -5;
	public static final int NOKIA_END   = -11; // KEY_END = -11;
	public static final int NOKIA_SEND  = -10; // KEY_SEND = -10;

	//Siemens-specific keycodes
	public static final int SIEMENS_UP    = -59;
	public static final int SIEMENS_DOWN  = -60;
	public static final int SIEMENS_LEFT  = -61;
	public static final int SIEMENS_RIGHT = -62;
	public static final int SIEMENS_SOFT1 = -1;
	public static final int SIEMENS_SOFT2 = -4;
	public static final int SIEMENS_FIRE = -26;

	//Motorola-specific keycodes
	public static final int MOTOROLA_UP    = -1;
	public static final int MOTOROLA_DOWN  = -6;
	public static final int MOTOROLA_LEFT  = -2;
	public static final int MOTOROLA_RIGHT = -5;
	public static final int MOTOROLA_SOFT1 = -21;
	public static final int MOTOROLA_SOFT2 = -22;
	public static final int MOTOROLA_FIRE = -20;

	// interaction with internal UI shouldn't depend on the keyset used
	// but only one key code is passed, so we need to convert it
	public static int normalizeKey(int key) {
		if (key == KEY_NUM2) {
			return NOKIA_UP;
		} else if (key == KEY_NUM8) {
			return NOKIA_DOWN;
		} else if (key == KEY_NUM4) {
			return NOKIA_LEFT;
		} else if (key == KEY_NUM6) {
			return NOKIA_RIGHT;
		} else if (key == KEY_NUM5) {
			return NOKIA_SOFT3;
		}

		if (siemens) {
			if (key == SIEMENS_UP) {
				key = NOKIA_UP;
			} else if (key == SIEMENS_DOWN) {
				key = NOKIA_DOWN;
			} else if (key == SIEMENS_LEFT) {
				key = NOKIA_LEFT;
			} else if (key == SIEMENS_RIGHT) {
				key = NOKIA_RIGHT;
			} else if (key == SIEMENS_SOFT1) {
				key = NOKIA_SOFT1;
			} else if (key == SIEMENS_SOFT2) {
				key = NOKIA_SOFT2;
			} else if (key == SIEMENS_FIRE) {
				key = NOKIA_SOFT3;
			}
		} else if (motorola) {
			if (key == MOTOROLA_UP) {
				key = NOKIA_UP;
			} else if (key == MOTOROLA_DOWN) {
				key = NOKIA_DOWN;
			} else if (key == MOTOROLA_LEFT) {
				key = NOKIA_LEFT;
			} else if (key == MOTOROLA_RIGHT) {
				key = NOKIA_RIGHT;
			} else if (key == MOTOROLA_SOFT1) {
				key = NOKIA_SOFT1;
			} else if (key == MOTOROLA_SOFT2) {
				key = NOKIA_SOFT2;
			} else if (key == MOTOROLA_FIRE) {
				key = NOKIA_SOFT3;
			}
		}

		return key;
	}

	public static int getMobileKey(int keycode)
	{
		if (nokia || sonyEricsson)
		{
			switch(keycode)
			{
				case KeyEvent.VK_UP: return Mobile.NOKIA_UP;
				case KeyEvent.VK_DOWN: return Mobile.NOKIA_DOWN;
				case KeyEvent.VK_LEFT: return Mobile.NOKIA_LEFT;
				case KeyEvent.VK_RIGHT: return Mobile.NOKIA_RIGHT;
				case KeyEvent.VK_ENTER: return Mobile.NOKIA_SOFT3;
			}
		}

		if (siemens)
		{
			switch(keycode)
			{
				case KeyEvent.VK_UP: return Mobile.SIEMENS_UP;
				case KeyEvent.VK_DOWN: return Mobile.SIEMENS_DOWN;
				case KeyEvent.VK_LEFT: return Mobile.SIEMENS_LEFT;
				case KeyEvent.VK_RIGHT: return Mobile.SIEMENS_RIGHT;
				case KeyEvent.VK_F1:
				case KeyEvent.VK_Q:
					return Mobile.SIEMENS_SOFT1;
				case KeyEvent.VK_F2:
				case KeyEvent.VK_W:
					return Mobile.SIEMENS_SOFT2;
				case KeyEvent.VK_ENTER: return Mobile.SIEMENS_FIRE;
			}
		}

		if (motorola)
		{
			switch(keycode)
			{
				case KeyEvent.VK_UP: return Mobile.MOTOROLA_UP;
				case KeyEvent.VK_DOWN: return Mobile.MOTOROLA_DOWN;
				case KeyEvent.VK_LEFT: return Mobile.MOTOROLA_LEFT;
				case KeyEvent.VK_RIGHT: return Mobile.MOTOROLA_RIGHT;
				case KeyEvent.VK_F1:
				case KeyEvent.VK_Q:
					return Mobile.MOTOROLA_SOFT1;
				case KeyEvent.VK_F2:
				case KeyEvent.VK_W:
					return Mobile.MOTOROLA_SOFT2;
				case KeyEvent.VK_ENTER: return Mobile.MOTOROLA_FIRE;
			}
		}

		switch(keycode)
		{
			case KeyEvent.VK_0: return Mobile.KEY_NUM0;
			case KeyEvent.VK_1: return Mobile.KEY_NUM1;
			case KeyEvent.VK_2: return Mobile.KEY_NUM2;
			case KeyEvent.VK_3: return Mobile.KEY_NUM3;
			case KeyEvent.VK_4: return Mobile.KEY_NUM4;
			case KeyEvent.VK_5: return Mobile.KEY_NUM5;
			case KeyEvent.VK_6: return Mobile.KEY_NUM6;
			case KeyEvent.VK_7: return Mobile.KEY_NUM7;
			case KeyEvent.VK_8: return Mobile.KEY_NUM8;
			case KeyEvent.VK_9: return Mobile.KEY_NUM9;

			case KeyEvent.VK_NUMPAD0: return Mobile.KEY_NUM0;
			case KeyEvent.VK_NUMPAD7: return Mobile.KEY_NUM1;
			case KeyEvent.VK_NUMPAD8: return Mobile.KEY_NUM2;
			case KeyEvent.VK_NUMPAD9: return Mobile.KEY_NUM3;
			case KeyEvent.VK_NUMPAD4: return Mobile.KEY_NUM4;
			case KeyEvent.VK_NUMPAD5: return Mobile.KEY_NUM5;
			case KeyEvent.VK_NUMPAD6: return Mobile.KEY_NUM6;
			case KeyEvent.VK_NUMPAD1: return Mobile.KEY_NUM7;
			case KeyEvent.VK_NUMPAD2: return Mobile.KEY_NUM8;
			case KeyEvent.VK_NUMPAD3: return Mobile.KEY_NUM9;

			case KeyEvent.VK_NUMPAD_ASTERISK: return Mobile.KEY_STAR;
			case KeyEvent.VK_NUMPAD_DIVIDE: return Mobile.KEY_POUND;

			case KeyEvent.VK_UP: return Mobile.KEY_NUM2;
			case KeyEvent.VK_DOWN: return Mobile.KEY_NUM8;
			case KeyEvent.VK_LEFT: return Mobile.KEY_NUM4;
			case KeyEvent.VK_RIGHT: return Mobile.KEY_NUM6;

			case KeyEvent.VK_ENTER: return Mobile.KEY_NUM5;

			case KeyEvent.VK_F1:
			case KeyEvent.VK_Q:
				return Mobile.NOKIA_SOFT1;
			case KeyEvent.VK_F2:
			case KeyEvent.VK_W:
				return Mobile.NOKIA_SOFT2;
			case KeyEvent.VK_E: return Mobile.KEY_STAR;
			case KeyEvent.VK_R: return Mobile.KEY_POUND;

			case KeyEvent.VK_A: return -1;
			case KeyEvent.VK_Z: return -2;

			case KeyEvent.VK_SPACE: return Mobile.XKEY_SELECT;
			case KeyEvent.VK_F: return Mobile.XKEY_SOFT1;
			case KeyEvent.VK_G: return Mobile.XKEY_SOFT2;
			case KeyEvent.VK_H: return Mobile.XKEY_SOFT3;

		}
		return 0;
	}

	public static MobilePlatform getPlatform()
	{
		return platform;
	}

	public static void setPlatform(MobilePlatform p)
	{
		platform = p;
	}

	public static Display getDisplay()
	{
		return display;
	}

	public static void setDisplay(Display d)
	{
		display = d;
	}

	public static InputStream getResourceAsStream(Class c, String resource)
	{
		return platform.loader.getMIDletResourceAsStream(resource);
	}

	public static InputStream getMIDletResourceAsStream(String resource)
	{
		return platform.loader.getMIDletResourceAsStream(resource);
	}

	public static void log(String text)
	{
		if(!quiet)
		{
			System.out.println(text);
		}
	}
}

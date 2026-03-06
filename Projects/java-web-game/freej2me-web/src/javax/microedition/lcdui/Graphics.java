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
package javax.microedition.lcdui;

public abstract class Graphics implements
	com.vodafone.v10.graphics.j3d.Graphics3D,
	com.motorola.graphics.j3d.Graphics3D,
	com.jblend.graphics.j3d.Graphics3D
{
	public static final int BASELINE = 64;
	public static final int BOTTOM = 32;
	public static final int DOTTED = 1;
	public static final int HCENTER = 1;
	public static final int LEFT = 4;
	public static final int RIGHT = 8;
	public static final int SOLID = 0;
	public static final int TOP = 16;
	public static final int VCENTER = 2;

	protected int width = 0;
	protected int height = 0;

	protected int translateX = 0;
	protected int translateY = 0;

	protected int color = 0xFFFFFFFF;
	protected Font font = Font.getDefaultFont();
	protected int strokeStyle = SOLID;

	public abstract void copyArea(int x_src, int y_src, int width, int height, int x_dest, int y_dest, int anchor);

	public abstract void drawArc(int x, int y, int width, int height, int startAngle, int arcAngle);

	public abstract void drawChar(char character, int x, int y, int anchor);

	public abstract void drawChars(char[] data, int offset, int length, int x, int y, int anchor);

	public abstract void drawImage(Image img, int x, int y, int anchor);

	public abstract void drawLine(int x1, int y1, int x2, int y2);

	public abstract void drawRect(int x, int y, int width, int height);

	public abstract void drawRegion(Image src, int x_src, int y_src, int width, int height, int transform, int x_dest, int y_dest, int anchor);

	public abstract void drawRGB(int[] rgbData, int offset, int scanlength, int x, int y, int width, int height, boolean processAlpha);

	public abstract void drawRoundRect(int x, int y, int width, int height, int arcWidth, int arcHeight);

	public abstract void drawString(String str, int x, int y, int anchor);

	public abstract void drawSubstring(String str, int offset, int len, int x, int y, int anchor);

	public abstract void fillArc(int x, int y, int width, int height, int startAngle, int arcAngle);

	public abstract void fillRect(int x, int y, int width, int height);

	public abstract void fillRoundRect(int x, int y, int width, int height, int arcWidth, int arcHeight);

	public abstract void drawTriangle(int x1, int y1, int x2, int y2, int x3, int y3);

	public abstract void fillTriangle(int x1, int y1, int x2, int y2, int x3, int y3);

	public int getColor() { return color & 0xffffff; }

	public int getDisplayColor(int trycolor) { return trycolor; }

	public Font getFont() { return font; }

	public int getGrayScale()
	{
		int r = (color>>16) & 0xFF;
		int g = (color>>8) & 0xFF;
		int b = color & 0xFF;
		return ((r+g+b) / 3) & 0xFF;
	}

	public int getBlueComponent() { return color & 0xFF; }

	public int getGreenComponent() { return (color>>8) & 0xFF; }

	public int getRedComponent() { return (color>>16) & 0xFF; }

	public int getStrokeStyle() { return strokeStyle; }


	public abstract void clipRect(int x, int y, int width, int height);

	public abstract void setClip(int x, int y, int width, int height);

	public abstract int getClipHeight();
	public abstract int getClipWidth();
	public abstract int getClipX();
	public abstract int getClipY();

	public abstract void translate(int x, int y);

	public int getTranslateX()
	{
		return translateX;
	}

	public int getTranslateY()
	{
		return translateY;
	}

	public abstract void setColor(int RGB);

	public void setColor(int red, int green, int blue) { setColor((red<<16) + (green<<8) + blue); }

	public abstract void setFont(Font newfont);

	public void setGrayScale(int value)
	{
		value = value & 0xFF;
		setColor((value<<16) + (value<<8) + value);
	}

	public abstract void setStrokeStyle(int style);

	@Override
	public synchronized void drawFigure(com.vodafone.v10.graphics.j3d.Figure figure,
										int x, int y,
										com.vodafone.v10.graphics.j3d.FigureLayout layout,
										com.vodafone.v10.graphics.j3d.Effect3D effect) {
		com.vodafone.v10.graphics.j3d.RenderProxy.drawFigure(this, figure, x, y, layout, effect);
	}

	@Override
	public synchronized void drawFigure(com.motorola.graphics.j3d.Figure figure,
										int x, int y,
										com.motorola.graphics.j3d.FigureLayout layout,
										com.motorola.graphics.j3d.Effect3D effect) {
		com.motorola.graphics.j3d.RenderProxy.drawFigure(this, figure, x, y, layout, effect);
	}

	@Override
	public synchronized void drawFigure(com.jblend.graphics.j3d.Figure figure,
										int x, int y,
										com.jblend.graphics.j3d.FigureLayout layout,
										com.jblend.graphics.j3d.Effect3D effect) {
		com.jblend.graphics.j3d.RenderProxy.drawFigure(this, figure, x, y, layout, effect);
	}

	protected int anchorX(int x, int width, int anchor)
	{
		int xout = x;
		if((anchor & HCENTER)>0) { xout = x-(width/2); }
		if((anchor & RIGHT)>0) { xout = x-width; }
		if((anchor & LEFT)>0) { xout = x; }
		return xout;
	}

	protected int anchorY(int y, int height, int anchor)
	{
		int yout = y;
		if((anchor & VCENTER)>0) { yout = y-(height/2); }
		if((anchor & TOP)>0) { yout = y; }
		if((anchor & BOTTOM)>0) { yout = y-height; }
		if((anchor & BASELINE)>0) { yout = y+height; }
		return yout;
	}

}

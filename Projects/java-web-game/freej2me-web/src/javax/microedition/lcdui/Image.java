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

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;


import org.recompile.mobile.Mobile;

import pl.zb3.freej2me.bridge.graphics.CanvasImage;


public abstract class Image
{
	public int width;
	public int height;
	private boolean hasSiemensAlpha = false;
	private boolean mutable = false;

	public static Image createImage(byte[] imageData, int imageOffset, int imageLength)
	{
		//System.out.println("Create Image from image data ");
		if (imageData == null) {throw new NullPointerException();}
		if (imageOffset + imageLength > imageData.length) {throw new ArrayIndexOutOfBoundsException();}
		byte[] dataPart = new byte[imageLength];

		System.arraycopy(imageData, imageOffset, dataPart, 0, imageLength);

		CanvasImage t = new CanvasImage(dataPart);
		return t;
	}

	public static Image createImage(Image source)
	{
		//System.out.println("Create Image from Image ");
		if (source == null) {throw new NullPointerException();}
		return new CanvasImage((CanvasImage)source);
	}

	public static Image createImage(Image img, int x, int y, int width, int height, int transform)
	{
		//System.out.println("Create Image from sub-image " + " img_w:" + Integer.toString(img.getWidth()) + " img_h:" + Integer.toString(img.getHeight()) + " x:" + Integer.toString(x) + " y:" + Integer.toString(y) + " width:" + Integer.toString(width) + " height:" + Integer.toString(height));
		if (img == null) {throw new NullPointerException();}
		if (x+width > img.getWidth() || y+height > img.getHeight()) {throw new IllegalArgumentException();}
		if (width <= 0 || height <= 0) {throw new IllegalArgumentException();}
		return new CanvasImage((CanvasImage)img, x, y, width, height, transform);
	}

	private static byte[] getBytes(InputStream inputStream) throws IOException {
        try (ByteArrayOutputStream byteBuffer = new ByteArrayOutputStream()) {
            byte[] buffer = new byte[1024];
            int len;
            while ((len = inputStream.read(buffer)) != -1) {
                byteBuffer.write(buffer, 0, len);
            }
            return byteBuffer.toByteArray();
        }
    }

	public static Image createImage(InputStream stream) throws IOException
	{
		//System.out.println("Create Image stream");
		if (stream == null) {throw new NullPointerException();}
		try {
			CanvasImage t = new CanvasImage(getBytes(stream));
			return t;
		} catch (IllegalArgumentException e) {
			throw new IOException(e);
		}
	}

	public static Image createImage(int width, int height)
	{
		//System.out.println("Create Image w,h " + width + ", " + height);
		if (width <= 0 || height <= 0) {throw new IllegalArgumentException();}
		Image ret = new CanvasImage(width, height, 0xffffff);
		ret.mutable = true;
		return ret;
	}

	public static Image createARGBImage(int width, int height, int argb)
	{
		if (width <= 0 || height <= 0) {throw new IllegalArgumentException();}
		return new CanvasImage(width, height, argb);
	}

	public static Image createImage(String name) throws IOException
	{
		//System.out.println("Create Image " + name);
		if (name == null) {throw new NullPointerException();}
		InputStream stream = Mobile.getPlatform().loader.getMIDletResourceAsStream(name);
		if (stream == null) {
			throw new IOException("not found: "+name);
		}
		return createImage(stream);
	}

	public static Image createRGBImage(int[] rgb, int width, int height, boolean processAlpha)
	{
		//System.out.println("Create Image RGB " + width + ", " + height);
		if (rgb == null) {throw new NullPointerException();}
		if (width <= 0 || height <= 0) {throw new IllegalArgumentException();}
		if (rgb.length < width * height) {throw new ArrayIndexOutOfBoundsException();}
		return new CanvasImage(rgb, width, height, processAlpha);
	}

	public abstract Graphics getGraphics();

	public int getHeight() { return height; }

	public abstract void getRGB(int[] rgbData, int offset, int scanlength, int x, int y, int width, int height);

	public int getWidth() { return width; }

	public boolean isMutable() { return mutable; }

	public boolean hasSiemensAlpha() {
		return hasSiemensAlpha;
	}

	public void setHasSiemensAlpha(boolean val) {
		hasSiemensAlpha = val;
	}

	public static javax.microedition.lcdui.Image createImageFromBitmap(byte[] imageData, int imageWidth, int imageHeight) {
		return com.siemens.mp.ui.Image.createImageFromBitmap(imageData, null, imageWidth, imageHeight);
	}


}

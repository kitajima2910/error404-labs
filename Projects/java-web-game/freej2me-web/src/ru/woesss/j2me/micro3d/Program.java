/*
 *  Copyright 2022 Yury Kharchenko
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

package ru.woesss.j2me.micro3d;

import static pl.zb3.freej2me.bridge.gles2.GLES2.Constants.*;

import com.mascotcapsule.micro3d.v3.Graphics3D;

import pl.zb3.freej2me.bridge.gles2.GLES2;


abstract class Program {
	public static final String SHADER_BASE_PATH = "m3d_shaders/";
	static Tex tex;
	static Color color;
	static Simple simple;
	static Sprite sprite;
	private static boolean isCreated;

	protected final Object handle;
	protected Object uAmbIntensity;
	protected Object uDirIntensity;
	protected Object uLightDir;
	protected Object uProjMatrix;
	protected Object uMvMatrix;
	int aPosition;
	int aNormal;
	int aColorData;
	int aMaterial;

	Program(String vertexShader, String fragmentShader) {
		handle = createProgram(vertexShader, fragmentShader);
		getLocations();
	}

	static void create() {
		if (isCreated) return;
		tex = new Tex();
		color = new Color();
		simple = new Simple();
		sprite = new Sprite();
	}

	private Object createProgram(String vertexShader, String fragmentShader) {
		String vertexShaderCode = processShader(loadShaderCode(vertexShader));
		String fragmentShaderCode = processShader(loadShaderCode(fragmentShader));

		return GLES2.createProgram(vertexShaderCode, fragmentShaderCode);
	}

	private String loadShaderCode(String path) {
		return Utils.loadTextFileFromJar(SHADER_BASE_PATH + path);
	}

	protected String processShader(String shaderCode) { // todo merge?
		return shaderCode;
	}

	void use() {
		GLES2.useProgram(handle);
	}

	protected abstract void getLocations();

	static void release() {
		if (!isCreated) return;
		tex.delete();
		color.delete();
		simple.delete();
		sprite.delete();
		isCreated = false;
	}

	void delete() {
		GLES2.deleteProgram(handle);
	}

	void setLight(Light light) {
		if (light == null) {
			GLES2.uniform1f(uAmbIntensity, -1.0f);
			return;
		}
		GLES2.uniform1f(uAmbIntensity, MathUtil.clamp(light.ambIntensity, 0, 4096) * MathUtil.TO_FLOAT);
		GLES2.uniform1f(uDirIntensity, MathUtil.clamp(light.dirIntensity, 0, 16384) * MathUtil.TO_FLOAT);
		float x = light.x;
		float y = light.y;
		float z = light.z;
		float rlf = -1.0f / (float) Math.sqrt(x * x + y * y + z * z);
		GLES2.uniform3f(uLightDir, x * rlf, y * rlf, z * rlf);
	}

	static final class Color extends Program {
		private static final String VERTEX = "color.vsh";
		private static final String FRAGMENT = "color.fsh";
		Object uSphereSize;
		Object uToonThreshold;
		Object uToonHigh;
		Object uToonLow;

		Color() {
			super(VERTEX, FRAGMENT);
		}

		@Override
		protected void getLocations() {

			aPosition = GLES2.getAttribLocation(handle, "aPosition");
			aNormal = GLES2.getAttribLocation(handle, "aNormal");
			aColorData = GLES2.getAttribLocation(handle, "aColorData");
			aMaterial = GLES2.getAttribLocation(handle, "aMaterial");

			uProjMatrix = GLES2.getUniformLocation(handle, "uProjMatrix");
			uMvMatrix = GLES2.getUniformLocation(handle, "uMvMatrix");
			uAmbIntensity = GLES2.getUniformLocation(handle, "uAmbIntensity");
			uDirIntensity = GLES2.getUniformLocation(handle, "uDirIntensity");
			uLightDir = GLES2.getUniformLocation(handle, "uLightDir");
			uSphereSize = GLES2.getUniformLocation(handle, "uSphereSize");
			uToonThreshold = GLES2.getUniformLocation(handle, "uToonThreshold");
			uToonHigh = GLES2.getUniformLocation(handle, "uToonHigh");
			uToonLow = GLES2.getUniformLocation(handle, "uToonLow");
			use();
			GLES2.uniform1i(GLES2.getUniformLocation(handle, "uSphereUnit"), 2);
		}

		void setColor(byte[] rgb) {
			float r = (rgb[0] & 0xff) / 255.0f;
			float g = (rgb[1] & 0xff) / 255.0f;
			float b = (rgb[2] & 0xff) / 255.0f;
			GLES2.vertexAttrib3f(aColorData, r, g, b);
		}

		void setToonShading(int attrs, int threshold, int high, int low) {
			if ((attrs & Graphics3D.ENV_ATTR_TOON_SHADING) != 0) {
				GLES2.uniform1f(uToonThreshold, threshold / 255.0f);
				GLES2.uniform1f(uToonHigh, high / 255.0f);
				GLES2.uniform1f(uToonLow, low / 255.0f);
			} else {
				GLES2.uniform1f(uToonThreshold, -1.0f);
			}
		}

		void bindMatrices(float[] proj, float[] mv) {
			GLES2.uniformMatrix4fv(uProjMatrix, false, proj);
			GLES2.uniformMatrix4fv(uMvMatrix, false, mv);
		}

		void setSphere(TextureImpl sphere) {
			if (sphere != null) {
				GLES2.activeTexture(GL_TEXTURE2);
    			GLES2.bindTexture(GL_TEXTURE_2D, sphere.getTexture());
				GLES2.uniform2f(uSphereSize, sphere.getWidth(), sphere.getHeight());
			} else {
				GLES2.uniform2f(uSphereSize, -1, -1);
			}
		}
	}

	static final class Simple extends Program {
		private static final String VERTEX = "simple.vsh";
		private static final String FRAGMENT = "simple.fsh";
		int aTexture;

		Simple() {
			super(VERTEX, FRAGMENT);
		}

		protected void getLocations() {
			aPosition = GLES2.getAttribLocation(handle, "a_position");
			aTexture = GLES2.getAttribLocation(handle, "a_texcoord0");
			use();
			GLES2.uniform1i(GLES2.getUniformLocation(handle, "sampler0"), 1);
		}
	}

	static final class Tex extends Program {
		private static final String VERTEX = "tex.vsh";
		private static final String FRAGMENT = "tex.fsh";
		Object uTexSize;
		Object uSphereSize;
		Object uToonThreshold;
		Object uToonHigh;
		Object uToonLow;

		Tex() {
			super(VERTEX, FRAGMENT);
		}

		@Override
		protected String processShader(String shaderCode) {
			if (Boolean.getBoolean("micro3d.v3.texture.filter")) {
				shaderCode = "#define FILTER\n" + shaderCode;
			}
			return shaderCode;
		}

		protected void getLocations() {
			aPosition = GLES2.getAttribLocation(handle, "aPosition");
			aNormal = GLES2.getAttribLocation(handle, "aNormal");
			aColorData = GLES2.getAttribLocation(handle, "aColorData");
			aMaterial = GLES2.getAttribLocation(handle, "aMaterial");

			uTexSize = GLES2.getUniformLocation(handle, "uTexSize");
			uSphereSize = GLES2.getUniformLocation(handle, "uSphereSize");
			uProjMatrix = GLES2.getUniformLocation(handle, "uProjMatrix");
			uMvMatrix = GLES2.getUniformLocation(handle, "uMvMatrix");
			uAmbIntensity = GLES2.getUniformLocation(handle, "uAmbIntensity");
			uDirIntensity = GLES2.getUniformLocation(handle, "uDirIntensity");
			uLightDir = GLES2.getUniformLocation(handle, "uLightDir");
			uToonThreshold = GLES2.getUniformLocation(handle, "uToonThreshold");
			uToonHigh = GLES2.getUniformLocation(handle, "uToonHigh");
			uToonLow = GLES2.getUniformLocation(handle, "uToonLow");
			use();
			GLES2.uniform1i(GLES2.getUniformLocation(handle, "uTextureUnit"), 0);
			GLES2.uniform1i(GLES2.getUniformLocation(handle, "uSphereUnit"), 2);
		}

		void setTex(TextureImpl tex) {
			if (tex != null) {
				GLES2.activeTexture(GL_TEXTURE0);
    			GLES2.bindTexture(GL_TEXTURE_2D, tex.getTexture());
				GLES2.uniform2f(uTexSize, tex.getWidth(), tex.getHeight());
			} else {
				GLES2.uniform2f(uTexSize, 256, 256);
				GLES2.bindTexture(GL_TEXTURE_2D, null);
			}
		}

		void setToonShading(int attrs, int threshold, int high, int low) {
			if ((attrs & Graphics3D.ENV_ATTR_TOON_SHADING) != 0) {
				GLES2.uniform1f(uToonThreshold, threshold / 255.0f);
				GLES2.uniform1f(uToonHigh, high / 255.0f);
				GLES2.uniform1f(uToonLow, low / 255.0f);
			} else {
				GLES2.uniform1f(uToonThreshold, -1.0f);
			}
		}

		void bindMatrices(float[] proj, float[] mv) {
			GLES2.uniformMatrix4fv(uProjMatrix, false, proj);
			GLES2.uniformMatrix4fv(uMvMatrix, false, mv);
		}

		void setSphere(TextureImpl sphere) {
			if (sphere != null) {
				GLES2.activeTexture(GL_TEXTURE2);
    			GLES2.bindTexture(GL_TEXTURE_2D, sphere.getTexture());
				GLES2.uniform2f(uSphereSize, sphere.getWidth(), sphere.getHeight());
			} else {
				GLES2.uniform2f(uSphereSize, -1, -1);
			}
		}
	}

	static class Sprite extends Program {
		private static final String VERTEX = "sprite.vsh";
		private static final String FRAGMENT = "sprite.fsh";
		Object uTexSize;
		Object uIsTransparency;

		Sprite() {
			super(VERTEX, FRAGMENT);
		}

		@Override
		protected String processShader(String shaderCode) {
			if (Boolean.getBoolean("micro3d.v3.texture.filter")) {
				shaderCode = "#define FILTER\n" + shaderCode;
			}
			return shaderCode;
		}

		protected void getLocations() {
			aPosition = GLES2.getAttribLocation(handle, "aPosition");
			aColorData = GLES2.getAttribLocation(handle, "aColorData");

			uTexSize = GLES2.getUniformLocation(handle, "uTexSize");
			uIsTransparency = GLES2.getUniformLocation(handle, "uIsTransparency");
			use();
			GLES2.uniform1i(GLES2.getUniformLocation(handle, "uTextureUnit"), 0);
		}

		void setTexture(TextureImpl texture) {
			GLES2.activeTexture(GL_TEXTURE0);
    		GLES2.bindTexture(GL_TEXTURE_2D, texture.getTexture());
			GLES2.uniform2f(uTexSize, texture.getWidth(), texture.getHeight());
		}
	}
}

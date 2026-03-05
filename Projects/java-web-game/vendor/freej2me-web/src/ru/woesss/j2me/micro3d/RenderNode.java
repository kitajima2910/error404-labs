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

abstract class RenderNode {
	final float[] viewMatrix = new float[16];
	final float[] projMatrix = new float[16];
	int attrs;
	Light light;
	TextureImpl specular;
	int toonHigh;
	int toonLow;
	int toonThreshold;

	RenderNode() {}

	void setData(Render render) {
		Render.Environment env = render.env;
		System.arraycopy(env.viewMatrix, 0, viewMatrix, 0, 16);
		System.arraycopy(env.projMatrix, 0, projMatrix, 0, 16);
		attrs = env.attrs;
		Light light = env.light;
		if (this.light == null) {
			this.light = new Light(light);
		} else {
			this.light.set(light.ambIntensity, light.dirIntensity, light.x, light.y, light.z);
		}

		specular = env.specular;
		toonHigh = env.toonHigh;
		toonLow = env.toonLow;
		toonThreshold = env.toonThreshold;
	}

	abstract void render(Render render);

	void recycle() {}

	void flushDone() {}

	static final class FigureNode extends RenderNode {
		TextureImpl[] textures;
		final FigureImpl figure;
		final float[] verticesNormalsBuffer;

		FigureNode(Render render, FigureImpl figure) {
			this.figure = figure;
			Model model = figure.model;
			verticesNormalsBuffer = new float[model.vertexArrayCapacity * 2];
			setData(render);
		}

		@Override
		void setData(Render render) {
			super.setData(render);
			Render.Environment env = render.env;
			textures = new TextureImpl[env.texturesLen];
			System.arraycopy(env.textures, 0, textures, 0, env.texturesLen);
			figure.fillBuffers(verticesNormalsBuffer);
		}

		@Override
		void render(Render render) {
			render.renderFigure(figure.model,
					textures,
					attrs,
					projMatrix,
					viewMatrix,
					verticesNormalsBuffer,
					light,
					specular,
					toonThreshold,
					toonHigh,
					toonLow,
					figure.model.modifiedSinceFlush);
		}

		@Override
		void recycle() {
			figure.stack.push(this);
		}

		@Override
		void flushDone() {
			figure.model.modifiedSinceFlush = false;
		}
	}

	static final class PrimitiveNode extends RenderNode {
		final int command;
		final float[] vertices;
		final float[] normals;
		final byte[] texCoords;
		final byte[] colors;
		final TextureImpl texture;

		PrimitiveNode(Render render, int command,
					  float[] vertices, float[] normals,
					  byte[] texCoords, byte[] colors) {
			setData(render);
			Render.Environment env = render.env;
			this.texture = env.getTexture();
			this.command = command;
			this.vertices = vertices;
			this.normals = normals;
			this.texCoords = texCoords;
			this.colors = colors;
		}

		@Override
		void render(Render render) {
			render.renderPrimitive(this);
		}
	}
}

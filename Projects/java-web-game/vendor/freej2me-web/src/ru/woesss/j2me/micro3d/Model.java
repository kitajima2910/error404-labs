/*
 *  Copyright 2020 Yury Kharchenko
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

import java.nio.ByteBuffer;
import pl.zb3.freej2me.bridge.gles2.GLES2;

import static pl.zb3.freej2me.bridge.gles2.GLES2.Constants.*;

class Model {
	final int numPatterns;
	final boolean hasPolyC;
	final boolean hasPolyT;

	float[] verticesNormalsBuffer;
	final byte[] texCoordArray;
	final float[] originalVertices;
	float[] normals;
	float[] originalNormals;
	final Polygon[] polygonsC;
	final Polygon[] polygonsT;
	final float[] vertices;
	final int vertexArrayCapacity;
	final int[][][] subMeshesLengthsT;
	final int[][] subMeshesLengthsC;
	final int numVerticesPolyT;
	final int[] indices;
	final ByteBuffer bones;

	// setting blend mode is expensive, so we need a mask
	final boolean[] hasBlendModeT;
	final boolean[] hasBlendModeC;

	boolean modifiedSinceFlush = true;

	Model(int vertices, int numBones, int patterns, int numTextures,
		  int polyT3, int polyT4, int polyC3, int polyC4) {
		numPatterns = patterns;
		subMeshesLengthsT = new int[4][numTextures][2];
		subMeshesLengthsC = new int[4][2];
		numVerticesPolyT = polyT3 * 3 + polyT4 * 6;
		int numVertices = (polyT3 + polyC3) * 3 + (polyT4 + polyC4) * 6;
		indices = new int[numVertices];
		vertexArrayCapacity = numVertices * 3;
		polygonsC = new Polygon[polyC3 + polyC4];
		polygonsT = new Polygon[polyT3 + polyT4];
		hasPolyT = polyT3 + polyT4 > 0;
		hasPolyC = polyC3 + polyC4 > 0;
		texCoordArray = new byte[numVertices * 5];
		originalVertices = new float[vertices * 3];
		hasBlendModeC = new boolean[4];
		hasBlendModeT = new boolean[4];
		int i = vertices * 3 + 3;
		this.vertices = new float[i];
		this.vertices[i-1] = Float.POSITIVE_INFINITY;
		bones = BufferUtils.createByteBuffer(numBones * (12 + 2) * 4);
	}

	static final class Polygon {
		// polygon material flags
		static final int TRANSPARENT = 1;
		static final int BLEND_HALF = 2;
		static final int BLEND_ADD = 4;
		static final int BLEND_SUB = 6;
		private static final int DOUBLE_FACE = 16;
		static final int LIGHTING = 32;
		static final int SPECULAR = 64;
		final int[] indices;
		final int blendMode;
		final int doubleFace;
		byte[] texCoords;
		int face = -1;
		int pattern;

		Polygon(int material, byte[] texCoords, int... indices) {
			this.indices = indices;
			this.texCoords = texCoords;
			doubleFace = (material & DOUBLE_FACE) >> 4;
			blendMode = (material & BLEND_SUB);
		}
	}

	/*
	 * persistence: complicated
	 *
	 * when calling renderFigure, we only push the data but don't render
	 * since we need a two-pass render to render transparent things..
	 *
	 * but we need to push vertices and normal contents too, because the model
	 * might be modified after pushing it
	 * here we track whether the model was modified after pushing
	 * so the render node contains information on whether we need to upload
	 * computed vertices and normals again.. we could technically compare arrays..
	 */

	Object colorVao = null;
	Object texVao = null;
	Object vnBufferHandle = null; // dynamic
	Object texBufferHandle = null; // staic
	int vnBufferSize = 0;
	float[] vnBufferBuffer;

	void uploadToGL(float[] verticesNormalsBuffer) {
		if (vnBufferHandle == null) {
			vnBufferHandle = GLES2.createBuffer();
			texBufferHandle = GLES2.createBuffer();

			// one-time vnBuffer initialization

			GLES2.bindBuffer(GL_ARRAY_BUFFER, texBufferHandle);
			GLES2.bufferData(GL_ARRAY_BUFFER, texCoordArray.length, GL_STATIC_DRAW);
			GLES2.bufferSubData(GL_ARRAY_BUFFER, 0, texCoordArray.length, texCoordArray);

			GLES2.bindBuffer(GL_ARRAY_BUFFER, vnBufferHandle);
			GLES2.bufferData(GL_ARRAY_BUFFER, vertexArrayCapacity * 2 * 4, GL_STATIC_DRAW);

			if (hasPolyT) {
				texVao = GLES2.createVertexArray();
				GLES2.bindVertexArray(texVao);

				GLES2.bindBuffer(GL_ARRAY_BUFFER, vnBufferHandle);
				GLES2.enableVertexAttribArray(Program.tex.aPosition);
				GLES2.vertexAttribPointer(Program.tex.aPosition, 3, GL_FLOAT, false, 6 * 4, 0);
				GLES2.enableVertexAttribArray(Program.tex.aNormal);
				GLES2.vertexAttribPointer(Program.tex.aNormal, 3, GL_FLOAT, false, 6 * 4, 3*4);

				GLES2.bindBuffer(GL_ARRAY_BUFFER, texBufferHandle);
				GLES2.enableVertexAttribArray(Program.tex.aColorData);
				GLES2.vertexAttribPointer(Program.tex.aColorData, 2, GL_UNSIGNED_BYTE, false, 5, 0);
				GLES2.enableVertexAttribArray(Program.tex.aMaterial);
				GLES2.vertexAttribPointer(Program.tex.aMaterial, 3, GL_UNSIGNED_BYTE, false, 5, 2);
			}

			if (hasPolyC) {
				colorVao = GLES2.createVertexArray();
				GLES2.bindVertexArray(colorVao);

				int offset = numVerticesPolyT;

				GLES2.bindBuffer(GL_ARRAY_BUFFER, vnBufferHandle);
				GLES2.enableVertexAttribArray(Program.color.aPosition);
				GLES2.vertexAttribPointer(Program.color.aPosition, 3, GL_FLOAT, false, 6 * 4, offset * 6 * 4);
				GLES2.enableVertexAttribArray(Program.color.aNormal);
				GLES2.vertexAttribPointer(Program.color.aNormal, 3, GL_FLOAT, false, 6 * 4, offset * 6 * 4 + 3*4);

				GLES2.bindBuffer(GL_ARRAY_BUFFER, texBufferHandle);
				GLES2.enableVertexAttribArray(Program.color.aColorData);
				GLES2.vertexAttribPointer(Program.color.aColorData, 3, GL_UNSIGNED_BYTE, true, 5, 5 * offset);
				GLES2.enableVertexAttribArray(Program.color.aMaterial);
				GLES2.vertexAttribPointer(Program.color.aMaterial, 2, GL_UNSIGNED_BYTE, false, 5, 5 * offset + 3);
			}
		}

		GLES2.bindBuffer(GL_ARRAY_BUFFER, vnBufferHandle);
		GLES2.bufferSubData(GL_ARRAY_BUFFER, 0, verticesNormalsBuffer.length * 4, verticesNormalsBuffer);
	}

}

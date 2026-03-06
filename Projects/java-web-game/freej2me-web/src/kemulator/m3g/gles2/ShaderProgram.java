package kemulator.m3g.gles2;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;

import pl.zb3.freej2me.bridge.gles2.GLES2;

public class ShaderProgram {
    public static final String SHADER_BASE_PATH = "m3g_shaders/";

    private String name;
    private boolean loaded;
    private Object programHandle;

    public ShaderProgram(String name) {
        this.name = name;
    }

	private static String getShaderSource(String fileName) {
		ClassLoader classLoader = Emulator3D.class.getClassLoader();
		InputStream inputStream = classLoader.getResourceAsStream(fileName);

		if (inputStream == null) {
			throw new IllegalArgumentException("File not found in the JAR: " + fileName);
		}

        StringBuilder shaderSource = new StringBuilder();

		try (BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream))) {
			String line;
			while ((line = reader.readLine()) != null) {
				shaderSource.append(line).append('\n');
			}
		} catch (Exception e) {
			throw new RuntimeException("Error while reading the file: " + fileName, e);
		}

        return shaderSource.toString();
    }

    private void load() {
        programHandle = GLES2.createProgram(getShaderSource(SHADER_BASE_PATH+name+"_vertex.glsl"), getShaderSource(SHADER_BASE_PATH+name+"_fragment.glsl"));

        loaded = true;

        onLoad();
    }

    public void use() {
        if (!loaded) {
            load();
        }
        GLES2.useProgram(programHandle);
    }

    public void delete() {
        if (loaded) {
            GLES2.deleteProgram(programHandle);
        }
    }

    public void onLoad() {

    }

    public Object u(String name) {
        return GLES2.getUniformLocation(programHandle, name);
    }

    public Object u(String name, int idx) {
        return GLES2.getUniformLocation(programHandle, name+"["+idx+"]");
    }

    public int a(String name) {
        return GLES2.getAttribLocation(programHandle, name);
    }

    public int a(String name, int idx) {
        return GLES2.getAttribLocation(programHandle, name+"["+idx+"]");
    }
}

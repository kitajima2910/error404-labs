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

import java.util.HashMap;
import java.util.Map;

import java.io.File;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileOutputStream;
import java.io.BufferedWriter;
import java.io.OutputStreamWriter;
import java.nio.file.Files;
import java.nio.file.Paths;

// config in this case is per-app

public class Config {
	public static final Map<String, String> DEFAULT_SETTINGS = new HashMap<>();

    static {
        DEFAULT_SETTINGS.put("width", "240");
        DEFAULT_SETTINGS.put("height", "320");
        DEFAULT_SETTINGS.put("sound", "on");
		DEFAULT_SETTINGS.put("phone", "Nokia");
        DEFAULT_SETTINGS.put("rotate", "off");
        DEFAULT_SETTINGS.put("fps", "0");
		DEFAULT_SETTINGS.put("fontSize", "0");
		DEFAULT_SETTINGS.put("dgFormat", "4444");
		DEFAULT_SETTINGS.put("forceFullscreen", "off");
		DEFAULT_SETTINGS.put("queuedPaint", "off");
		DEFAULT_SETTINGS.put("textureDisableFilter", "off");
    }

	private File settingsFile;
	private File appPropertiesFile;
	private File systemPropertiesFile;

	public Map<String, String> appSettings = new HashMap<>();
	public Map<String, String> appProperties = new HashMap<>();
	public Map<String, String> systemProperties = new HashMap<>();

	public Config() {
		appSettings.putAll(DEFAULT_SETTINGS);
	}

	public void init(String dataPath) {
		String configPath = dataPath+"/config";
		try {
			Files.createDirectories(Paths.get(configPath));
		} catch (Exception e) {
			System.out.println("Problem Creating Config Path " + configPath);
			System.out.println(e.getMessage());
		}

		try {
			settingsFile = new File(configPath + "/settings.conf");
			if (!settingsFile.exists()) {
				settingsFile.createNewFile();
			}

			appPropertiesFile = new File(configPath + "/appproperties.conf");
			if (!appPropertiesFile.exists()) {
				appPropertiesFile.createNewFile();
			}

			systemPropertiesFile = new File(configPath + "/systemproperties.conf");
			if (!systemPropertiesFile.exists()) {
				systemPropertiesFile.createNewFile();
			}
		} catch (Exception e) {
			System.out.println("Problem Opening Config");
			System.out.println(e.getMessage());
		}

		readKV(settingsFile, appSettings);
		readKV(appPropertiesFile, appProperties);
		readKV(systemPropertiesFile, systemProperties);
	}

	private void readKV(File file, Map<String, String> out) {
		try (BufferedReader reader = new BufferedReader(new FileReader(file))) {
			String line;
			String[] parts;
			while ((line = reader.readLine()) != null) {
				parts = line.split(":", 2);
				if (parts.length == 2) {
					parts[0] = parts[0].trim();
					parts[1] = parts[1].trim();
					if (parts[0] != "" && parts[1] != "") {
						out.put(parts[0], parts[1]);
					}
				}
			}
		} catch (Exception e) {
			System.out.println("Problem Reading Config");
			System.out.println(e.getMessage());
		}
	}

	private void writeKV(Map<String, String> in, File file) {
		try {
			FileOutputStream fout = new FileOutputStream(file);

			BufferedWriter writer = new BufferedWriter(new OutputStreamWriter(fout));

			for (String key : in.keySet()) {
				writer.write(key + ":" + in.get(key) + "\n");
			}
			writer.close();
		} catch (Exception e) {
			System.out.println("Problem Opening Config");
			System.out.println(e.getMessage());
		}
	}

	public void saveConfig() {
		writeKV(appSettings, settingsFile);
		writeKV(appProperties, appPropertiesFile);
		writeKV(systemProperties, systemPropertiesFile);
	}

	public int getWidth() {
		return Integer.parseInt(appSettings.get("width"));
	}

	public int getHeight() {
		return Integer.parseInt(appSettings.get("height"));
	}

	public int getFontSize() {
		return Integer.parseInt(appSettings.getOrDefault("fontSize", "0"));
	}
}

package pl.zb3.freej2me.launcher;

import java.util.regex.Pattern;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

import pl.zb3.freej2me.bridge.shell.Shell;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Enumeration;
import java.util.Locale;
import java.util.regex.Matcher;


public class AnalyserUtil {
    static Pattern screenSizePattern = Pattern.compile("(\\d{3})x(\\d{3})");
    static Pattern seModelPattern = Pattern.compile("[kw]\\d{3}i?\\b");

    static byte[] siemensPackageSig = "com/siemens/mp/".getBytes();
    static byte[] mc3PackageSig = "com/mascotcapsule/micro3d/v3/".getBytes();
    static byte[] dgSig = "\u001fcom/nokia/mid/ui/DirectGraphics".getBytes();
    static byte[] dgFormatSig = "\u0014getNativePixelFormat".getBytes();

    private static void fillFromFileName(String fileName, AnalysisResult result) {
        String fileNameLC = fileName.toLowerCase(Locale.ROOT);

        // fill result.screenWidth and .screenHeight based on filename
        Matcher m = screenSizePattern.matcher(fileNameLC);

        if (m.find()) {
            result.screenWidth = Integer.parseInt(m.group(1));
            result.screenHeight = Integer.parseInt(m.group(2));
        }

        if (fileName.contains(".SE.") || fileName.contains("_SE_") || fileNameLC.contains("ericsson")) {
            result.phoneType = "SonyEricsson";
        } else if (fileNameLC.contains("siemens")) {
            result.phoneType = "Siemens";
        } else if (fileNameLC.contains("motorola")) {
            result.phoneType = "Motorola";
        } else {
            m = seModelPattern.matcher(fileNameLC);

            if (m.find()) {
                result.phoneType = "SonyEricsson";
            }
        }
    }

    private static void fillFromJarFile(File jarFile, AnalysisResult result) {
        String phoneType = null;


        try (ZipFile zipFile = new ZipFile(jarFile)) {
            Enumeration<? extends ZipEntry> entries = zipFile.entries();
            while (entries.hasMoreElements()) {
                ZipEntry entry = entries.nextElement();
                String entryName = entry.getName();

                // read entry into byte array
                byte[] entryData = new byte[(int) entry.getSize()];
                try (InputStream is = zipFile.getInputStream(entry)) {
                    is.read(entryData);
                }

                // check for manifest
                if (entryName.equals("META-INF/MANIFEST.MF")) {
                    String manifest = new String(entryData);
                    if (manifest.contains("Nokia-MIDlet-Category: Game")) {
                        phoneType = "Nokia";
                    }
                }

                if (entryName.endsWith(".class")) {
                    if (phoneType == null && !entryName.startsWith("com/siemens/") &&
                        containsPattern(entryData, siemensPackageSig)) {
                        phoneType = "Siemens";

                    } else if (phoneType == null && containsPattern(entryData, mc3PackageSig)) {
                        phoneType = "SonyEricsson";
                    }

                    if (phoneType == null && !entryName.startsWith("com/nokia/") &&
                        containsPattern(entryData, dgSig) && containsPattern(entryData, dgFormatSig)) {
                        result.hasDGnativeFormat = true;
                    }
                }
            }


        } catch (Exception e) {
            e.printStackTrace();
        }

        if (phoneType != null) {
            result.phoneType = phoneType;
        }

    }

    private static boolean containsPattern(byte[] target, byte[] pattern) {
        if (pattern.length == 0 || target.length < pattern.length) {
            return false;
        }

        for (int i = 0; i <= target.length - pattern.length; i++) {
            boolean match = true;
            for (int j = 0; j < pattern.length; j++) {
                if (target[i + j] != pattern[j]) {
                    match = false;
                    break;
                }
            }
            if (match) {
                return true;
            }
        }
        return false;
    }

    public static AnalysisResult analyseFile(File jarFile, String origName) {
        AnalysisResult result = new AnalysisResult();

        fillFromFileName(origName, result);
        fillFromJarFile(jarFile, result);

        return result;
    }
}

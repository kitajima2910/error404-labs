package pl.zb3.freej2me.launcher;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Map;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.recompile.freej2me.Config;
import org.recompile.mobile.MIDletLoader;

public class LauncherUtil {
    public static void ensureAppId(MIDletLoader loader, String fileName) {
        if (loader.getAppId().isEmpty()) {
            // if there's no manifest, we use the jar name
            // we can't use the name in overrides because we'd not identify which overrides
            // to use
            loader.setAppId(Paths.get(fileName).getFileName().toString().replace('.', '_'));
        }
    }

    public static MIDletLoader initApp(File jarFile, MIDletLoader loader, Map<String, String> appSettings, Map<String, String> appProperties,
            Map<String, String> systemProperties) {
        try {
            Files.createDirectories(Paths.get(loader.getAppId()));
        } catch (Exception e) {
        }

        // copy jar to [appid]/app.jar
        try {
            Files.copy(jarFile.toPath(), Paths.get(loader.getAppId(), "app.jar"));
        } catch (Exception e) {
            e.printStackTrace();
        }

        // should write icon
        if (loader.icon.contains(".")) {
            // copy loader.getResourceAsStream(loader.icon) to [appid]/icon
            try {
                Files.copy(loader.getResourceAsStream(loader.icon), Paths.get(loader.getAppId(), "icon"));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        try {
            Files.write(Paths.get(loader.getAppId(), "name"), loader.name.getBytes());
        } catch (Exception e) {
            e.printStackTrace();
        }

        saveApp(loader.getAppId(), appSettings, appProperties, systemProperties);

        moveAppIdToTop(loader.getAppId());

        return loader;
    }

    public static void saveApp(String appId, Map<String, String> appSettings, Map<String, String> appProperties,
            Map<String, String> systemProperties) {


        Config config = new Config();
        config.init(appId);

        if (appSettings != null) {
            config.appSettings.putAll(appSettings);
        }

        if (appProperties != null) {
            config.appProperties.putAll(appProperties);
        }

        if (systemProperties != null) {
            config.systemProperties.putAll(systemProperties);
        }

        config.saveConfig();
    }

    public static void writeMetaJsonFile(String appId, String contents) {
        // after initApp for the first time, the JS side is supposed to supply a meta file JSON
        // based on loader and the app.jar

        try {
            Files.write(Paths.get(appId, "meta.json"), contents.getBytes());
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    // a method to move the appid to the top in the apps.list file
    public static void moveAppIdToTop(String appId) {
        try {
            File appsListFile = new File("apps.list");
            List<String> lines;
            if (appsListFile.exists()) {
                lines = Files.readAllLines(appsListFile.toPath());
                lines.remove(appId);
            } else {
                lines = new ArrayList<>();
            }

            lines.add(0, appId);
            Files.write(appsListFile.toPath(), lines);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static byte[] exportData() {
        resetTmpDir();
        // export all files and folders from the current directory into a zip file
        return FilesUtil.zipCurrentDirectory();
    }

    public static boolean importData(byte[] zipData) {
        if (!FilesUtil.emptyCurrentDirectory()) {
            return false;
        }

        try {
            FilesUtil.unzipToCurrentDirectory(zipData);
            return true;
        } catch (IOException e) {
            System.out.println("did not unzip: "+e.getMessage());
            return false;
        }
    }

    public static void augementLoaderWithJAD(MIDletLoader loader, byte[] jadContents) {
        Map<String, String> descriptorData = new HashMap<>();

        MIDletLoader.parseDescriptorInto(new ByteArrayInputStream(jadContents), descriptorData);
        loader.setProperties(descriptorData);

    }

    public static void resetTmpDir() {
        /*
         * since urlclassloader caches files, in case we want to add more than one game
         * we need to place jars into different paths.. but we don't want that
         * data to persist
         */
        File tmpDir = new File("/files/_tmp/");
        try {
            FilesUtil.emptyDirectory(tmpDir);
            tmpDir.delete();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }


    public static void copyJar(byte[] jar, File destFile) throws IOException {
        Files.createDirectories(destFile.toPath().getParent());
        try (OutputStream out = new FileOutputStream(destFile)) {
            out.write(jar);
        }
    }

    public static void uninstallApp(String appId) {
        // Remove the app directory
        try {
            FilesUtil.emptyDirectory(new File(appId));
            Files.delete(Paths.get(appId));
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Remove the app from apps.list
        try {
            File appsListFile = new File("apps.list");
            if (appsListFile.exists()) {
                List<String> lines = Files.readAllLines(appsListFile.toPath());
                lines.remove(appId);
                Files.write(appsListFile.toPath(), lines);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void wipeAppData(String appId) {
        // delete [app]/rms directory if it exists
        try {
            File rmsDir = new File(appId + "/rms");
            if (rmsDir.exists()) {
                FilesUtil.emptyDirectory(rmsDir);
                Files.delete(rmsDir.toPath());
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static void installFromBundle(String basePath, String appId) {
        try {
            Files.createDirectories(Paths.get(appId));
        } catch (Exception e) {
            e.printStackTrace();
        }

        try {
            byte[] appData = Files.readAllBytes(Paths.get(basePath, appId + ".zip"));
            FilesUtil.unzipToDirectory(appId, appData);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

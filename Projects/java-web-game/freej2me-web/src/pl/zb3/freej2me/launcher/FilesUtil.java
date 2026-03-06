package pl.zb3.freej2me.launcher;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.FileVisitResult;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.SimpleFileVisitor;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
import java.util.zip.ZipOutputStream;

public class FilesUtil {
    public static byte[] zipCurrentDirectory() {
        return zipDirectory(Paths.get("")); // Use Paths.get("") for the current directory
    }

    public static byte[] zipDirectory(Path directoryPath) {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try (ZipOutputStream zos = new ZipOutputStream(baos)) {
            Files.walkFileTree(directoryPath, new SimpleFileVisitor<Path>() {
                @Override
                public FileVisitResult visitFile(Path file, BasicFileAttributes attrs) throws IOException {
                    Path relativePath = directoryPath.relativize(file);
                    ZipEntry entry = new ZipEntry(relativePath.toString());
                    zos.putNextEntry(entry);
                    Files.copy(file, zos);
                    zos.closeEntry();
                    return FileVisitResult.CONTINUE;
                }

                @Override
                public FileVisitResult preVisitDirectory(Path dir, BasicFileAttributes attrs) throws IOException {
                    Path relativePath = directoryPath.relativize(dir);
                    if (!relativePath.toString().isEmpty()) {
                        ZipEntry entry = new ZipEntry(relativePath.toString() + "/");
                        zos.putNextEntry(entry);
                        zos.closeEntry();
                    }
                    return FileVisitResult.CONTINUE;
                }

                @Override
                public FileVisitResult visitFileFailed(Path file, IOException exc) throws IOException {
                    return FileVisitResult.CONTINUE;
                }
            });

        } catch (IOException e) {
            System.err.println("Error zipping directory: " + e.getMessage());
            e.printStackTrace();
            return null;
        }

        return baos.toByteArray();
    }

    public static boolean emptyCurrentDirectory() {
        try {
            return emptyDirectory(new File("."));
        } catch (IOException e) {
            System.err.println("Error emptying current directory: " + e.getMessage());
            e.printStackTrace();
            return false;
        }
    }

    public static boolean emptyDirectory(File path) throws IOException {
        if (path == null || !path.exists()) {
            return false;
        }

        boolean success = true;

        if (path.isDirectory()) {
            File[] files = path.listFiles();
            if (files != null) {
                for (File file : files) {
                    if (file.isDirectory()) {
                        success &= emptyDirectory(file);
                    }
                    success &= file.delete();
                }
            }
        }

        return success;
    }

    public static void unzipToDirectory(String dirName, byte[] zipData) throws IOException {
        Path currentDir = Paths.get(dirName).toAbsolutePath().normalize();

        try (ByteArrayInputStream bais = new ByteArrayInputStream(zipData);
             ZipInputStream zis = new ZipInputStream(bais)) {

            ZipEntry entry;
            while ((entry = zis.getNextEntry()) != null) {
                Path outputPath = currentDir.resolve(entry.getName()).normalize();

                // Prevent Zip Slip vulnerability
                if (!outputPath.startsWith(currentDir)) {
                    throw new IOException("Invalid zip entry: " + entry.getName());
                }

                if (entry.isDirectory()) {
                    if (!Files.exists(outputPath)) {
                        Files.createDirectories(outputPath);
                    }
                } else {
                    if (!Files.exists(outputPath.getParent())) {
                        Files.createDirectories(outputPath.getParent());
                    }
                    try (OutputStream os = Files.newOutputStream(outputPath)) {
                        byte[] buffer = new byte[4096];
                        int bytesRead;
                        while ((bytesRead = zis.read(buffer)) != -1) {
                            os.write(buffer, 0, bytesRead);
                        }
                    }
                }
                zis.closeEntry();
            }
        }
    }

    public static void unzipToCurrentDirectory(byte[] zipData) throws IOException {
        unzipToDirectory(".", zipData);
    }
}

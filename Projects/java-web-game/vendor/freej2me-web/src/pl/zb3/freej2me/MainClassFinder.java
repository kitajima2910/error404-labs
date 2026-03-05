package pl.zb3.freej2me;

import org.objectweb.asm.ClassReader;
import org.objectweb.asm.Opcodes;
import org.objectweb.asm.commons.EmptyVisitor;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;

/*
 * finds the most specialized non-abstract class extending MIDlet
 */

public class MainClassFinder {
    private static final String TARGET_MAIN_CLASS = "javax/microedition/midlet/MIDlet";

    private static class ClassInfo {
        final String name;
        final String superName;
        final boolean isAbstract;

        ClassInfo(String name, String superName, boolean isAbstract) {
            this.name = name;
            this.superName = superName;
            this.isAbstract = isAbstract;
        }

    }

    private static class ClassDepthPair {
        final String className;
        final int depth;

        ClassDepthPair(String className, int depth) {
            this.className = className;
            this.depth = depth;
        }
    }

    private static class HierarchyBuildingVisitor extends EmptyVisitor {
        private final Map<String, ClassInfo> classMap;
        private String currentClassName;
        private String currentSuperName;
        private boolean isAbstract;

        public HierarchyBuildingVisitor(Map<String, ClassInfo> classMap) {
            this.classMap = classMap;
        }

        @Override
        public void visit(int version, int access, String name, String signature, String superName, String[] interfaces) {
            this.currentClassName = name;
            this.currentSuperName = superName;
            this.isAbstract = (access & Opcodes.ACC_ABSTRACT) != 0;
            super.visit(version, access, name, signature, superName, interfaces);
        }

        @Override
        public void visitEnd() {
            if (currentClassName != null && currentSuperName != null) {
                classMap.put(currentClassName, new ClassInfo(currentClassName, currentSuperName, isAbstract));
            }
            // Reset for next class
            currentClassName = null;
            currentSuperName = null;
            isAbstract = false;
            super.visitEnd();
        }
    }

    private Map<String, ClassInfo> classInfoMap;
    private Map<String, List<String>> childrenMap;

    private Map<String, ClassInfo> parseAllClasses(File jarFileArg) throws IOException {
        Map<String, ClassInfo> classInfoMap = new HashMap<>();

        try (JarFile jarFile = new JarFile(jarFileArg)) {
            Enumeration<JarEntry> entries = jarFile.entries();
            HierarchyBuildingVisitor visitor = new HierarchyBuildingVisitor(classInfoMap);

            while (entries.hasMoreElements()) {
                JarEntry entry = entries.nextElement();
                if (entry.getName().endsWith(".class") && !entry.isDirectory()) {
                    try (InputStream inputStream = jarFile.getInputStream(entry)) {
                        ClassReader classReader = new ClassReader(inputStream);
                        classReader.accept(visitor, ClassReader.SKIP_CODE | ClassReader.SKIP_DEBUG | ClassReader.SKIP_FRAMES);
                    } catch (Exception e) {
                        System.err.println("Warning: Could not parse class file: " + entry.getName() + " - " + e.getMessage());
                    }
                }
            }
        }

        return classInfoMap;
    }


    private List<ClassDepthPair> traverseAndFindCandidates(String startClassName) {
        List<ClassDepthPair> candidates = new ArrayList<>();

        Queue<ClassDepthPair> queue = new ArrayDeque<>();
        Set<String> visited = new HashSet<>();

        ClassInfo startInfo = new ClassInfo(startClassName, null, false);
        classInfoMap.put(startClassName, startInfo);

        queue.offer(new ClassDepthPair(startClassName, 0));
        visited.add(startClassName);

        while (!queue.isEmpty()) {
            ClassDepthPair currentPair = queue.poll();
            String currentClassName = currentPair.className;
            int currentDepth = currentPair.depth;

            ClassInfo currentInfo = classInfoMap.get(currentClassName);

            if (!currentInfo.isAbstract) {
                candidates.add(currentPair);
            }

            List<String> children = childrenMap.getOrDefault(currentClassName, Collections.emptyList());
            for (String childName : children) {
                if (visited.add(childName)) { // .add returns true if the element was not already present
                    queue.offer(new ClassDepthPair(childName, currentDepth + 1));
                }
            }
        }

        return candidates;
    }

    public String findMainClass(File jarFile) {
        try {
            classInfoMap = parseAllClasses(jarFile);
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }

        childrenMap = new HashMap<>();
        for (ClassInfo info : classInfoMap.values()) {
            childrenMap.computeIfAbsent(info.superName, k -> new ArrayList<>()).add(info.name);
        }

        List<ClassDepthPair> candidates = traverseAndFindCandidates(TARGET_MAIN_CLASS);

        if (candidates.isEmpty()) {
            return null; // No non-abstract classes extend the target
        }

        int maxDepth = -1;
        String ret = null;

        for (ClassDepthPair candidate : candidates) {
            if (candidate.depth > maxDepth) {
                maxDepth = candidate.depth;
                ret = candidate.className;
            }
        }

        if (ret != null) {
            ret = ret.replace('/', '.');
        }

        return ret;
    }

    // --- Example Usage ---
    public static void main(String[] args) {
        if (args.length != 1) {
            System.err.println("Usage: java MainClassFinder <path/to/your.jar>");
            System.exit(1);
        }

        String jarPath = args[0];
        MainClassFinder analyzer = new MainClassFinder();

        File jarFile = new File(jarPath);
        String mainClass = analyzer.findMainClass(jarFile);

        if (mainClass != null) {
            System.out.println(jarPath+": found: "+mainClass);
        } else {
            System.out.println(jarPath+": not found");
        }
    }
}
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


import javax.microedition.lcdui.Font;
import javax.microedition.lcdui.Graphics;

import org.recompile.mobile.Mobile;

import pl.zb3.freej2me.bridge.graphics.CanvasImage;
import pl.zb3.freej2me.bridge.shell.KeyEvent;
import pl.zb3.freej2me.bridge.shell.Shell;

class Item {
    public String id;
    public String label;

    public Item(String idAndLabel) {
        this(idAndLabel, idAndLabel);
    }

    public Item(String id, String label) {
        this.id = id;
        this.label = label;
    }
}

public class ConfigScreen {
    public boolean isRunning = false;

    private CanvasImage lcd;
    private Graphics gc;
    private int width;
    private int height;

    private Map<String, Item[]> menuMap;
    private String currentMenu = "main";
    private int currentItem = 0;

    private Config config;
    public Runnable onChange;

    public ConfigScreen(Config config) {
        this.config = config;

        menuMap = new HashMap<String, Item[]>() {
            {
                put("main", new Item[] {
                    new Item("back", "Return to Game"),
                    new Item("size", "Display Size"),
                    new Item("sound", "Sound"),
                    new Item("fps", "Limit FPS"),
                    new Item("phone", "Phone"),
                    new Item("fontSize", "Font size"),
                    new Item("compat", "Compatibility"),
                    new Item("rotate", "Rotate"),
                    new Item("reload", "Reload"),
                    new Item("exit", "Exit"),
                });

                put("size", new Item[] {
                    new Item("96x65"), new Item("96x96"), new Item("104x80"), new Item("128x128"),
                    new Item("132x176"), new Item("128x160"), new Item("176x208"), new Item("176x220"),
                    new Item("208x208"), new Item("240x320"), new Item("320x240"), new Item("240x400"),
                    new Item("352x416"), new Item("360x640"), new Item("640x360"), new Item("480x800"),
                    new Item("800x480")
                });

                put("restart", new Item[] { new Item("restart", "Restart"), new Item("main", "Main Menu") });
                put("rotate", new Item[] { new Item("On"), new Item("Off") });

                put("phone", new Item[] { new Item("Standard"), new Item("Nokia"), new Item("Siemens"),
                        new Item("Motorola"), new Item("SonyEricsson") });

                put("compat", new Item[] {
                        new Item("forceFullscreen", "Force fullscreen canvas"),
                        new Item("queuedPaint", "Queue repaint calls"),
                        new Item("dgFormat", "DG native format") });

                put("compat/dgFormat", new Item[] {
                        new Item("444", "444 RGB"),
                        new Item("4444", "4444 ARGB (default)"),
                        new Item("565", "565 RGB"),
                        new Item("888", "888 RGB"),
                        new Item("8888", "8888 RGB")});

                put("fontSize", new Item[] {
                    new Item("0", "Dynamic"),
                    new Item("1", "Small"),
                    new Item("2", "Medium"),
                    new Item("3", "Large")
                });

                put("fps", new Item[] { new Item("auto", "Auto"), new Item("60", "60 - Fast"),
                        new Item("30", "30 - Slow"), new Item("15", "15 - Turtle") });

            }
        };

        onChange = new Runnable() {
            public void run() {
                // placeholder
            }
        };
    }

    public void init() {
        doUpdateDisplay();
    }

    public void start() {
        isRunning = true;
        render();
        Mobile.getPlatform().painter.run();
    }

    public void stop() {
        isRunning = false;
        Mobile.getPlatform().painter.run();
    }

    public void keyPressed(KeyEvent e) {
        int mobiKey = e.normalizedCode;

        if (mobiKey == Mobile.NOKIA_UP) {
            currentItem--;
        } else if (mobiKey == Mobile.NOKIA_DOWN) {
            currentItem++;
        } else if (mobiKey == Mobile.NOKIA_SOFT1 || e.code == KeyEvent.VK_ESCAPE) {
            if (currentMenu.equals("main")) {
                stop();
                return;
            }

            int slashIdx = currentMenu.lastIndexOf('/');
            String lastPart;

            if (slashIdx == -1) {
                lastPart = currentMenu;
                currentMenu = "main";
            } else {
                lastPart = currentMenu.substring(slashIdx + 1);
                currentMenu = currentMenu.substring(0, slashIdx);
            }

            currentItem = findItemIndex(menuMap.get(currentMenu), lastPart);
        } else if (mobiKey == Mobile.NOKIA_SOFT3) {
            doMenuAction();
        }

        currentItem = Math.max(0, Math.min(currentItem, menuMap.get(currentMenu).length - 1));

        render();
    }

    public void keyReleased(KeyEvent e) {
    }

    public void mousePressed(int key) {
    }

    public void mouseReleased(int key) {
    }

    public CanvasImage getLCD() {
        return lcd;
    }

    public void render() {
        if (!isRunning) {
            return;
        }
        /*
         * technically we'd want title, list of labels and showBack
         *
         */
        String title = "Game Options";
        String[] items = null;

        switch (currentMenu) {
            case "size":
                title = "Screen Size";
                break;
            case "restart":
                title = "Restart Required";
                break;
            case "rotate":
                title = "Rotate";
                break;
            case "phone":
                title = "Phone type";
                break;
            case "fontSize":
                title = "Font size";
                break;
            case "compat":
                title = "Compatibility flags";
                break;
            case "compat/dgFormat":
                title = "DirectGraphics pixel format";
                break;
            case "fps":
                title = "Max FPS";
                break;
        }

        Item[] itemObjects = menuMap.get(currentMenu);
        items = new String[itemObjects.length];

        for (int t = 0; t < items.length; t++) {
            String id = itemObjects[t].id;
            String label = itemObjects[t].label;

            switch (currentMenu) {
                case "main":
                    switch (id) {
                        case "sound":
                            label += ": " + config.appSettings.get(id);
                            break;
                        case "fps":
                            label += ": " + config.appSettings.get(id);
                            break;
                        case "phone":
                            label += ": " + config.appSettings.get(id);
                            break;
                        case "rotate":
                            label += ": " + config.appSettings.get(id);
                            break;
                    }
                    break;

                case "compat":
                    label += ": " + config.appSettings.getOrDefault(id, id.equals("dgFormat") ? "4444" : "off");
                    break;
            }

            items[t] = label;
        }

        gc.setColor(0x000080);
        gc.fillRect(0, 0, width, height);
        gc.setColor(0xFFFFFF);
        gc.drawString(title, width / 2, 2, Graphics.HCENTER);
        gc.drawLine(0, 20, width, 20);
        gc.drawLine(0, height - 20, width, height - 20);

        gc.setColor(0xFFFFFF);
        gc.drawString("Back", 3, height - 17, Graphics.LEFT);

        int ah = (int) ((height - 50) / (items.length + 1));
        if (ah < 15) {
            ah = 15;
        }

        int space = 0;
        if (ah > 15) {
            space = (ah - 15) / 2;
        }

        int max = (int) Math.floor((height - 50) / ah);
        int page = (int) Math.floor(currentItem / max);
        int start = (int) (max * page);
        int pages = (int) Math.ceil(items.length / max);

        if (pages >= 1) {
            gc.setColor(0xFFFFFF);
            gc.drawString("Page " + (page + 1) + " of " + (pages + 1), width - 3, height - 17, Graphics.RIGHT);
        }

        for (int i = start; (i < (start + max)) & (i < items.length); i++) {
            String label = items[i];

            if (i == currentItem) {
                gc.setColor(0xFFFF00);
                gc.drawString("> " + label + " <", width / 2, (25 + space) + (ah * (i - start)), Graphics.HCENTER);
            } else {
                gc.setColor(0xFFFFFF);
                gc.drawString(label, width / 2, (25 + space) + (ah * (i - start)), Graphics.HCENTER);
            }
        }

        Mobile.getPlatform().painter.run();
    }

    private void doMenuAction() {
        Item activeItem = menuMap.get(currentMenu)[currentItem];

        switch (currentMenu) {
            case "main":
                switch (activeItem.id) {
                    case "back":
                        stop();
                        break;
                    case "size":
                        currentMenu = "size";
                        currentItem = findItemIndex(menuMap.get(currentMenu), width + "x" + height);
                        break;
                    case "sound":
                        toggleSound();
                        break;
                    case "fps":
                        currentMenu = "fps";
                        currentItem = findItemIndex(menuMap.get(currentMenu), config.appSettings.get("fps"));
                        break;
                    case "phone":
                        currentMenu = "phone";
                        currentItem = findItemIndex(menuMap.get(currentMenu), config.appSettings.get("phone"));
                        break;
                    case "fontSize":
                        currentMenu = "fontSize";
                        currentItem = findItemIndex(menuMap.get(currentMenu), config.appSettings.getOrDefault("fontSize", "0"));
                        break;
                    case "compat":
                        currentMenu = "compat";
                        currentItem = 0;
                        break;
                    case "rotate":
                        currentMenu = "rotate";
                        currentItem = 0;
                        break;
                    case "reload":
                        Shell.restart();
                        break;
                    case "exit":
                        Shell.exit();
                        break;
                }
                break;

            case "size":
                String[] t = activeItem.id.split("x");

                updateDisplaySize(Integer.parseInt(t[0]), Integer.parseInt(t[1]));

                currentMenu = "restart";
                currentItem = 0;
                break;

            case "restart":
                switch (activeItem.id) {
                    case "restart":
                        Shell.restart();
                        break;
                    case "main":
                        currentMenu = "main";
                        currentItem = 0;
                }
                break;

            case "phone":
                updatePhone(activeItem.id);
                currentMenu = "main";
                currentItem = findItemIndex(menuMap.get("main"), "phone");
                break;

            case "fontSize":
                updateFontSize(activeItem.id);
                currentMenu = "restart";
                currentItem = 0;
                break;


            case "compat":
                switch (activeItem.id) {
                    case "dgFormat":
                        currentMenu += "/" + activeItem.id;
                        currentItem = findItemIndex(menuMap.get(currentMenu),
                            config.appSettings.getOrDefault(activeItem.id, "4444"));
                        break;
                    case "queuedPaint":
                        currentMenu = "restart";
                        currentItem = 0;
                    default:
                        toggleCompatFlag(activeItem.id);
                }
                break;

            case "compat/dgFormat":
                updateDGFormat(activeItem.id);
                currentMenu = "compat";
                currentItem = findItemIndex(menuMap.get(currentMenu), "dgFormat");
                break;

            case "rotate":
                switch (activeItem.id) {
                    case "On":
                        updateRotate("on");
                        break;
                    case "Off":
                        updateRotate("off");
                        break;
                }

                currentMenu = "main";
                currentItem = findItemIndex(menuMap.get("main"), "rotate");
                break;

            case "fps":
                updateFPS(activeItem.id.equals("auto") ? "0" : activeItem.id);
                currentMenu = "main";
                currentItem = findItemIndex(menuMap.get("main"), "fps");
                break;

        }

        render();
    }

    private int findItemIndex(Item[] items, String id) {
        int index = 0;

        for (int t = 0; t < items.length; t++) {
            if (items[t].id.equals(id)) {
                index = t;
                break;
            }
        }

        return index;
    }

    private final void doUpdateDisplay() {
        int configWidth = Integer.parseInt(config.appSettings.get("width"));
        int configHeight = Integer.parseInt(config.appSettings.get("height"));
        boolean rotate = config.appSettings.get("rotate").equals("on");

        width = !rotate ? configWidth : configHeight;
        height = rotate ? configWidth : configHeight;
        lcd = new CanvasImage(width, height, 0xffffffff);
        gc = lcd.getGraphics();
        gc.setFont(Font.getFont(Font.FACE_SYSTEM, Font.STYLE_PLAIN, Font.SIZE__INTERNAL_UI));
    }

    private void updateDisplaySize(int w, int h) {
        config.appSettings.put("width", "" + w);
        config.appSettings.put("height", "" + h);
        config.saveConfig();
        onChange.run();
        doUpdateDisplay();
    }

    private void toggleSound() {
        if (config.appSettings.getOrDefault("sound", "off").equals("on")) {
            config.appSettings.put("sound", "off");
        } else {
            config.appSettings.put("sound", "on");
        }
        config.saveConfig();
        onChange.run();
    }

    private void updatePhone(String value) {
        System.out.println("Config: phone " + value);
        config.appSettings.put("phone", value);
        config.saveConfig();
        onChange.run();
    }

    private void updateFontSize(String value) {
        System.out.println("Config: font size " + value);
        config.appSettings.put("fontSize", value);
        config.saveConfig();
        onChange.run();
    }

    private void updateRotate(String value) {
        System.out.println("Config: rotate " + value);
        config.appSettings.put("rotate", value);
        config.saveConfig();
        onChange.run();
        doUpdateDisplay();
    }

    private void updateFPS(String value) {
        System.out.println("Config: fps " + value);
        config.appSettings.put("fps", value);
        config.saveConfig();
        onChange.run();
    }

    private void toggleCompatFlag(String value) {
        if (config.appSettings.getOrDefault(value, "off").equals("on")) {
            config.appSettings.remove(value);
        } else {
            config.appSettings.put(value, "on");
        }

        config.saveConfig();
        onChange.run();
    }

    private void updateDGFormat(String value) {
        config.appSettings.put("dgFormat", value);
        config.saveConfig();
        onChange.run();
    }
}

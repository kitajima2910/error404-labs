# freej2me-web
Here it is.. the browser version of my [fork of freej2me](https://github.com/zb3/freej2me)!  

This uses [CheerpJ](https://cheerpj.com/) (pretty cool) to run Java in a web browser :)
Running in the browser means you can now safely load any JAR file, since malicious JAR files won't be able to cause any damage thanks to the web platform sandbox.

## Let's play!
https://zb3.github.io/freej2me-web/


### Keyboard controls
| **Key** | **Functions As** |
| :------------: | :--------------: |
| <kbd>Esc</kbd> | Enter/exit freej2me options |
| <kbd>F1</kbd> or <kbd>Q</kbd> | Left soft key |
| <kbd>F2</kbd> or <kbd>W</kbd> | Right soft key |
| <kbd>0</kbd> to <kbd>9</kbd> | Keypad Numbers |
| Numpad keys | Numbers with keys 123 and 789 swaped |
| <kbd>E</kbd> | * |
| <kbd>R</kbd> | # |
| <kbd>↑</kbd> | Up |
| <kbd>↓</kbd> | Down |
| <kbd>←</kbd> | Left |
| <kbd>→</kbd> | Right |
| <kbd>⏎ Enter</kbd> | Action key (OK button) |

#### Phone types and key mappings
Keys like left/right soft, arrows and the action key have different vendor-specific mappings. By default, freej2me uses the most common **Nokia** mapping, but this can be changed in settings by changing the `Phone type`. Note that in the `Standard` phone, arrow keys are mapped to 2, 4, 6, 8 and the enter key is mapped to 5.

When using the numpad keys, the 123 and 789 rows are swapped so as to resemble the key layout on a mobile phone.

## Game doesn't work?
If a game doesn't work, first try changing the settings. Press the <kbd>Esc</kbd> key, change some settings and then restart the game. Try changing these:
* display size
* compatibility flags
* sound (turn off)

If it still doesn't work you can get more information by looking at the console. Note however that **not every game will work with this emulator**. You can report a bug though.


## What's inside
* My fork of FreeJ2ME

* Graphics APIs implemented in JS using 2d canvas rendering context (faster than CheerpJ AWT)

* 3D support
    - Implemented using WebGL 2
    - M3G from KEmulator rewritten to use OpenGL ES 2, then optimized
    - Mascot Capsule v3 support from JL-Mod, optimized

* MIDI playback (`libmidi`)
    - modified and debloated fluidsynth compiled to WebAssembly
    - WebAudio API + AudioWorkletNode

* Media playback (`libmedia`)
    - ffmpeg compiled to WebAssembly (to decode formats like amr)
    - rudimentary - the file is fully converted before anything can be played
    - uses a `<video>` tag to play.. "usually" audio :)

## Building

On the host, you need to have docker installed, currently the image assumes a linux host.

After cloning, build the builder image:
```
docker build --build-arg UID=$(id -u) -t freej2me-web-builder builder_image
```

Build the jar like this:
```
docker run --rm -it -uzb3 -w /app -v`pwd`:/app freej2me-web-builder ant
```

In case you want to rebuild `libmidi` / `libmedia` wasm files, build them like this:
```
docker run --rm -it -uzb3 -w /app -v`pwd`:/app freej2me-web-builder web/libmedia/transcode/wasm/build.sh --release
docker run --rm -it -uzb3 -w /app -v`pwd`:/app freej2me-web-builder web/libmidi/wasm/build.sh --release
```

## Serving locally
Thanks to CheerpJ requirements regarding requests with the `Range` header, this is.. not that obvious. In practice, if you just want to serve locally, this one-liner seems to work:
```
npx serve -u web
```

## CheerpJ?
freej2me-web currently works in the browser thanks to CheerpJ. However, since CheerpJ is proprietary, it introduces some limitations.. notably freej2me-web will not work without an internet connection, and it can be a little slow..

However, freej2me-web intentionally doesn't use its more advanced features like AWT GUI support or wasm JNI modules. In theory it should be possible to port it to a simpler (but most likely slower) VM if CheerpJ stops being available... but it's not planned for now.

## Embedding
To embed a specific game on your website, you first need to self-host this emulator. The `web` directory should be served, but ensure your server properly supports the `Range` header.

When you want to embed a game, you of course want it to work.. however, a JAR file (even with a JAD descriptor) is often not enough to make it work, because the emulator needs to know the screen size, phone type, and potentially other specific configuration settings. You might even need to preload some RMS data..

Therefore, you must first prepare a `.zip` file for each game as follows:

1.  Install the game within the launcher screen.
2.  Tweak emulator settings as needed.
3.  Configure the game if necessary.
4.  Click "Export Data".
5.  Identify the App ID: Launch the application and observe the `app` parameter in the URL.
6.  Locate the App ID folder**: Find the folder named after the App ID within the exported `.zip` file.
7.  **Create the game's `.zip` file**: Compress all contents of that App ID folder into a new `.zip` file named after the App ID (`[app_id].zip`).
8.  **Place the `.zip` file**: Put this newly created `.zip` file into the `apps` folder of your hosted emulator (`run.html` and the `apps` folder should be in the same directory)

Once prepared, you can embed the game directly using `run.html?app=[app_id]` without requiring the user to visit the launcher page first.

Note that your iframe dimensions should match the game's screen size or a multiple thereof. To match only the aspect ratio, pass the `fractionScale` parameter to `run.html`, for example: `run.html?app=[app_id]&fractionScale=1`.

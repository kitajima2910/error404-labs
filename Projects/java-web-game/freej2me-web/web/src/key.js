export const codeMap = {
    'Enter': 13,
    'Backspace': 8,
    'Delete': 46,
    'ArrowLeft': 37,
    'ArrowRight': 39,
    'ArrowUp': 38,
    'ArrowDown': 40,
    'Escape': 27,
    'Digit0': 48,
    'Digit1': 49,
    'Digit2': 50,
    'Digit3': 51,
    'Digit4': 52,
    'Digit5': 53,
    'Digit6': 54,
    'Digit7': 55,
    'Digit8': 56,
    'Digit9': 57,
    'Numpad0': 96,
    'Numpad1': 97,
    'Numpad2': 98,
    'Numpad3': 99,
    'Numpad4': 100,
    'Numpad5': 101,
    'Numpad6': 102,
    'Numpad7': 103,
    'Numpad8': 104,
    'Numpad9': 105,
    'NumpadDivide': 111,
    'NumpadMultiply': 106,
    'F1': 112,
    'F2': 113,
    'F3': 114,
    'Space': 32,
    'KeyA': 65,
    'KeyB': 66,
    'KeyC': 67,
    'KeyD': 68,
    'KeyE': 69,
    'KeyF': 70,
    'KeyG': 71,
    'KeyH': 72,
    'KeyI': 73,
    'KeyJ': 74,
    'KeyK': 75,
    'KeyL': 76,
    'KeyM': 77,
    'KeyN': 78,
    'KeyO': 79,
    'KeyP': 80,
    'KeyQ': 81,
    'KeyR': 82,
    'KeyS': 83,
    'KeyT': 84,
    'KeyU': 85,
    'KeyV': 86,
    'KeyW': 87,
    'KeyX': 88,
    'KeyY': 89,
    'KeyZ': 90,
};



export class KeyRepeatManager {
    static TIME_TO_FIRST_REPEAT = 500;
    static REPEAT_INTERVAL = 30;

    keyStates = new Map();
    listener = null;

    /**
     * Registers or unregisters a listener callback to receive emitted events.
     * @param {(eventType: string, key: string, args: object) => void | null} callback - The function to call or null to unregister.
     * - eventType: 'down', 'repeat', 'up', or 'click'.
     * - key: The identifier of the key.
     * - args: The optional arguments associated with the key event.
     */
    register(callback) {
        if (callback !== null && typeof callback !== 'function') {
            console.error("KeyRepeater.register: Provided callback is not a function or null.");
            return;
        }
        this.listener = callback;
    }

    /**
     * Posts a key event (down or up).
     * @param {boolean} isDown - True if the key is pressed down, false if released up.
     * @param {string} key - The identifier for the key (e.g., "Enter", "ArrowUp", "a").
     * @param {object} [args={}] - Optional dictionary of arguments (e.g., { ctrlKey: true }).
     */
    post(isDown, key, args = {}) {
        if (!key) {
            console.error("KeyRepeater.post: 'key' argument is required.");
            return;
        }

        const currentState = this.keyStates.get(key);

        if (isDown) {
            if (currentState) {
                // key is already down, don't emit another 'down' event
                // just update the args
                currentState.args = args || {};
            } else {
                const newState = {
                    args: args || {},
                    timeoutToFirstRepeatId: null,
                    repeatIntervalId: null,
                };
                this.keyStates.set(key, newState);

                this.emit('down', key, newState.args);

                newState.timeoutToFirstRepeatId = setTimeout(() => {
                    this.emit('repeat', key, newState.args);
                    newState.repeatIntervalId = setInterval(() => {
                        this.emit('repeat', key, newState.args);
                    }, KeyRepeatManager.REPEAT_INTERVAL);
                }, KeyRepeatManager.TIME_TO_FIRST_REPEAT);
            }
        } else if (currentState) {
            this.emit('up', key, currentState.args);

            if (currentState.repeatIntervalId === null) {
                // key released before the first repeat
                // emit a click event

                clearTimeout(currentState.timeoutToFirstRepeatId);
                this.emit('click', key, currentState.args);
            } else {
                clearInterval(currentState.repeatIntervalId);
            }

            this.keyStates.delete(key);
        }
    }

    /**
     * Internal helper method to emit events to the registered listener.
     * @private
     */
    emit(eventType, key, args) {
        if (this.listener) {
            try {
                this.listener(eventType, key, args);
            } catch (error) {
                console.error('Error in key event listener:', error);
            }
        }
    }

    reset() {
        for (const state of this.keyStates.values()) {
            clearTimeout(state.timeoutToFirstRepeatId);
            clearInterval(state.repeatIntervalId);
        }
        this.keyStates.clear();
    }
}

/*
// --- Example Usage ---

const keyRepeater = new KeyRepeater();

// Register the listener
keyRepeater.register((eventType, key, args) => {
    const argsString = Object.keys(args).length > 0 ? JSON.stringify(args) : '';
    console.log(`EVENT: type=${eventType}, key=${key} ${argsString}`);
});

console.log("Simulating 'Enter' press and hold...");
keyRepeater.post(true, "Enter"); // Down

// Simulate holding Ctrl+Shift+Enter after a short delay (before first repeat)
setTimeout(() => {
     console.log("Updating args for 'Enter' to Ctrl+Shift");
    keyRepeater.post(true, "Enter", { ctrlKey: true, shiftKey: true }); // Update args
}, 200);

// Simulate releasing 'Enter' after 700ms (after first repeat should have started)
setTimeout(() => {
    console.log("Simulating 'Enter' release...");
    keyRepeater.post(false, "Enter"); // Up
}, 700);


// Simulate a quick 'Space' press/release (should trigger 'click')
setTimeout(() => {
    console.log("\nSimulating 'Space' quick press/release...");
    keyRepeater.post(true, "Space"); // Down
    setTimeout(() => {
        keyRepeater.post(false, "Space"); // Up (within 500ms)
    }, 100); // Release quickly
}, 1000);

// Simulate holding 'a' for a longer time
setTimeout(() => {
    console.log("\nSimulating 'a' press and hold...");
    keyRepeater.post(true, "a"); // Down
    setTimeout(() => {
         console.log("Simulating 'a' release...");
        keyRepeater.post(false, "a"); // Up
    }, 1500); // Hold for 1.5 seconds
}, 1500);

// Example of resetting
setTimeout(() => {
    console.log("\nSimulating 'b' press then resetting...");
    keyRepeater.post(true, "b");
    setTimeout(() => {
        keyRepeater.reset(); // Reset while 'b' is down
        console.log("Attempting to release 'b' after reset (should have no effect):");
        keyRepeater.post(false, "b"); // This will be ignored
    }, 600) // Reset after first repeat would have triggered
}, 3500);
*/
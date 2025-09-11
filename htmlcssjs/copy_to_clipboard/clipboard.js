export default class Clipboard {


    constructor() {
        
    }

    /**
     * Adds a class to an element.
     * @param {string} element - A query string for the element to select.
     * @param {string} className - The class to add to the element.
     */
    static addClassToElement(element, className) {
        const elementCurrent = document.querySelector(element);
        elementCurrent.classList.add(className);
    }

    
    /**
     * Removes a class from an element.
     * @param {string} element - A query string for the element to select.
     * @param {string} className - The class to remove from the element.
     */

    static removeClassToElement(element, className) {
        const elementCurrent = document.querySelector(element);
        elementCurrent.classList.remove(className);
    }

    /**
     * Copies a given text to the user's clipboard.
     * @param {string} text - The text to copy to the user's clipboard.
     * @returns {Promise<void>}
     */
    static async copyClipboardNew(text) {
        try {
            await navigator.clipboard.writeText(text);
            console.info("Đã sao chép thành công!");
        } catch (error) {
            console.error("Sao chép không thành công: ", error);
        }
    }

}
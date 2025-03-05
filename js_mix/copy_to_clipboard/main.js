import Clipboard from "./clipboard.js";

$(document).ready(() => {
    // Make one function uppercase text for first letter
    const upperCaseFirstLetterText = (text) => {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    // Call the funcition upperCaseFirstLetterText to uppercase the text
    $(".txtCopied").text(upperCaseFirstLetterText($(".txtCopied").text()));

    // Uppercase for text of title
    document.title = document.title.toUpperCase();

    // Call the funcitions and copy the text on button click
    $(".btnCopy").click(() => {
        $(".txtContent").select();
        let selectedText = $(".txtContent").val();
        Clipboard.copyClipboardNew(selectedText);
        Clipboard.addClassToElement(".txtCopied", "bounce-effect");
        setTimeout(() => {
            Clipboard.removeClassToElement(".txtCopied", "bounce-effect");
        }, 800);
    }) 
});
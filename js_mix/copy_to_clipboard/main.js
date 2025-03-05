$(document).ready(() => {
    // Make two funcitions to add and remove the class in the span
    const add = () => {
        $(".txtCopied").addClass("bounce-effect");
    }

    const remove = () => {
        $(".txtCopied").removeClass("bounce-effect");
    }

    // Make one function copy clipboard modern
    const copyClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            console.info("Đã sao chép thành công!");
        } catch (error) {
            console.error("Sao chép không thành công: ", error);
        }
    }

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
        // document.execCommand("copy");
        copyClipboard(selectedText);
        add();
        setTimeout(remove, 800);
    }) 
});
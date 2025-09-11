$(document).ready(() => {
    $(".component-games .list-pages-demo a").each(function() {
        const randomColor = getRandomColor();
        $(this).css("border", "2px dashed " + randomColor);
        $(this).css("color", randomColor);
    });
    
    function getRandomColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    }
});

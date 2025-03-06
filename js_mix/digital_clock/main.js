$(document).ready(() => {

    document.title = "Digital Clock";

    const showTime = () => {
        // Get current time
        const date = new Date();

        // Extract hours, minutes and seconds
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();

        // Determine period (AM/PM)
        const period = hours >= 12 ? "PM" : "AM";

        // Convert hours to 12-hour format
        hours = hours % 12;
        hours = hours ? hours : 12; // If hours is 0, make it 12

        // Add leading zeros for single digits
        const formatTime = (time) => (time < 10 ? "0" + time : time);

        hours = formatTime(hours);
        minutes = formatTime(minutes);
        seconds = formatTime(seconds);

        // Update the DOM elements
        $(".hours").text(hours);
        $(".min").text(minutes);
        $(".sec").text(seconds);
        $(".period").text(period);

        // Update the clock every second
        setTimeout(showTime, 1000);
    };

    // Initial call to display the clock immediately
    showTime();
});

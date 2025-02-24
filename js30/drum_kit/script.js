class Sound {
    constructor() {
        this.boxSounds = document.querySelectorAll(".box-sound");
        this.initEvents();
    }

    initEvents() {
        this.boxSounds.forEach((boxSound) => {
            boxSound.addEventListener("click", () =>
                this.handleClick(boxSound)
            );
        });

        document.addEventListener("keydown", (e) => this.handleKeydown(e));
    }

    handleClick(boxSound) {
        const textBig = boxSound.querySelector(".text-big");
        this.playSound(textBig.dataset.key);
        this.animateBox(boxSound);
    }

    handleKeydown(event) {
        const key = event.key;
        this.playSound(key);

        this.boxSounds.forEach((boxSound) => {
            const textBig = boxSound.querySelector(".text-big");
            if (textBig.dataset.key === key) {
                this.animateBox(boxSound);
            }
        });
    }

    playSound(key) {
        const audio = document.querySelector(`audio[data-key="${key}"]`);
        if (!audio) return;
        audio.currentTime = 0;
        audio.play();
    }

    animateBox(boxSound) {
        boxSound.classList.add("playing");
        setTimeout(() => {
            boxSound.classList.remove("playing");
        }, 100);
    }
}

document.addEventListener("DOMContentLoaded", (e) => {
    new Sound();
});

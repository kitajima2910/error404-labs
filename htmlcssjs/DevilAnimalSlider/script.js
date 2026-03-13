const thumbs = document.querySelectorAll(".thumb li")
const infoSlider = document.querySelectorAll(".info-slider")
const items = document.querySelectorAll(".item")

let index = 0

thumbs.forEach((thumb, ind) => {
    thumb.addEventListener("click", () => {

        setTimeout(() => {
            document.querySelector(".thumb .selected").classList.remove("selected")
            thumb.classList.add("selected")
        }, 100)

        thumbs.forEach(thumb => {
            thumb.classList.add("disabled")
            setTimeout(() => {
                thumb.classList.remove("disabled")
            }, 450)
        })

        let anySelected = false
        let current = event.target.parentElement.nextElementSibling;

        while(current !== null && !anySelected) {
            anySelected = anySelected || current.matches(".selected")
            current = current.nextElementSibling;

            if(anySelected) {
                items[index].classList.add("previously-active")
                setTimeout(() => {
                    document.querySelector(".item.previously-active").classList.remove("previously-active")
                }, 100)

                index = ind
                items[index].classList.add("back-active")
                setTimeout(() => {
                    document.querySelector(".item.back-active").classList.remove("back-active")
                }, 100)
            }
        }

        // console.log(anySelected);
        

        index = ind

        infoSlider.forEach(slide => {
            slide.style.transform = `translateY(${index * -100}%)`
        })

        document.querySelector(".item.active").classList.remove("active")
        items[index].classList.add("active")

    })
})
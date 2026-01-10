/* 

    pxh-ui.js

    Tác giả: Phạm Xuân Hoài
    Thời gian: 2026/01/10
    
    Facebook: https://www.facebook.com/kitajima2910
    Github: https://github.com/kitajima2910

    Setup: 
    - Load pxh-ui.js sau framework

*/

/* ############# CSS ############### */

/* ############# UI ############### */
document.addEventListener('DOMContentLoaded', () => {
    console.log('pxh-ui.js')

    const pxh = document.querySelector('body.pxh')

    if (pxh) {
        // Back To Top
        const pxhBackToTop = document.querySelector('.pxhBackToTop')
        // console.log(pxhBackToTop)

        if (pxhBackToTop) {
            pxhBackToTop.style.right = '5000px'

            window.addEventListener('scroll', () => {
                if (window.scrollY > 500) {
                    pxhBackToTop.style.right = '1rem'
                } else {
                    pxhBackToTop.style.right = '5000rem'
                }
            })

            pxhBackToTop.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                })
            })
        }
    }
})

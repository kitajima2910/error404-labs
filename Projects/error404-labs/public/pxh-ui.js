/* 

    pxh-ui.js

    Tác giả: Phạm Xuân Hoài
    Thời gian: 2026/01/10
    
    Facebook: https://www.facebook.com/kitajima2910
    Github: https://github.com/kitajima2910

    Setup: 
    - Load pxh-ui.js sau framework (nên load sau pxh-ui.css)

*/

/* ############# CSS ############### */

/* ############# UI ############### */

document.addEventListener('DOMContentLoaded', () => {
    console.log('pxh-ui.js')

    if (!document.body.classList.contains('pxh')) return

    /* ================================
       PXH :: Back To Top
    ================================= */
    {
        const btn = document.querySelector('.pxhBackToTop')
        if (!btn) return

        window.addEventListener(
            'scroll',
            () => {
                btn.style.right = window.scrollY > 500 ? '1rem' : '5000rem'
            },
            { passive: true },
        )

        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        })
    }
    /* ================================
       PXH :: Back To Top - END
    ================================= */
})

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

;(() => {
    // Avoid duplicate loading if Astro or HMR reload.
    if (window.__pxh_loaded) return
    window.__pxh_loaded = true

    const ready = (fn) => {
        if (document.readyState !== 'loading') fn()
        else document.addEventListener('DOMContentLoaded', fn)
    }

    ready(() => {
        if (!document.body.classList.contains('pxh')) {
            console.warn('[pxh-ui] body.pxh not found')
            return
        }

        console.log('pxh-ui engine started')

        /* ================= CORE ================= */

        const components = []

        const register = (fn) => components.push(fn)

        const scan = () => {
            components.forEach((fn) => fn())
        }

        new MutationObserver(scan).observe(document.body, {
            childList: true,
            subtree: true,
        })

        /* ================= Back To Top ================= */

        register(() => {
            const backToTopButton = document.querySelector('.pxhBackToTop')
            if (!backToTopButton || backToTopButton.__pxh) return

            backToTopButton.__pxh = true

            let isVisible = false

            backToTopButton.style.right = '-5rem'
            backToTopButton.style.transition = 'right 0.3s ease'

            const updateVisibility = () => {
                const shouldShow = window.scrollY > 500

                if (shouldShow !== isVisible) {
                    isVisible = shouldShow
                    backToTopButton.style.right = shouldShow ? '1rem' : '-5rem'
                }
            }

            window.addEventListener('scroll', updateVisibility, {
                passive: true,
            })

            backToTopButton.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
            })

            updateVisibility()
        })

        /* ================= Modal ================= */

        register(() => {})

        /* ================= Toast ================= */

        register(() => {})

        /* ================= Tooltip ================= */

        register(() => {})

        /* ================= START ================= */

        scan()
    })
})()

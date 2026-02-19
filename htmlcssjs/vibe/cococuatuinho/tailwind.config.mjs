/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                "primary": "#728e6b",
                "accent-pink": "#f4d7d7",
                "background-light": "#FDF6EC",
                "background-dark": "#181a18",
            },
            fontFamily: {
                "display": ["Spline Sans", "sans-serif"]
            },
            borderRadius: {
                "DEFAULT": "0.5rem",
                "lg": "1rem",
                "xl": "1.5rem",
                "full": "9999px"
            },
        },
    },
    plugins: [],
}

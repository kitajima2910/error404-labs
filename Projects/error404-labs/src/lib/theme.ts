import { browser } from "$app/environment"
import { writable } from "svelte/store"

type Theme = 'light' | 'dark'

const userTheme = browser && localStorage.getItem('data-theme')

export const theme = writable(userTheme ?? 'dark')

export function toggleTheme() {
    theme.update(currentTheme => {
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
        document.documentElement.setAttribute('data-theme', newTheme)
        localStorage.setItem('data-theme', newTheme)
        return newTheme
    })
}

export function setTheme(newTheme: Theme) {
    theme.set(newTheme)
}
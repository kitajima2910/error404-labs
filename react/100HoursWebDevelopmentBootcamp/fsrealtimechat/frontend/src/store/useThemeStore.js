import { create } from "zustand"

export const useThemeStore = create((set) => ({
    theme: localStorage.getItem("chat-theme") || "coffee",
    setTheme: (theme) => {
        localStorage.setItem("chat-theme", theme);
        
        // Add arrtibute to html element
        document.documentElement.setAttribute("data-theme", theme);

        set({ theme });
    },
}));
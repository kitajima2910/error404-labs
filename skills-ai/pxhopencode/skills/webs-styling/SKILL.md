---
name: webs-styling
description: Styling production — Tailwind, design system, responsive, dark mode, animation. Không FOUC, không layout shift.
---

# webs-styling — Styling

## Cài đặt Tailwind

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: { 50: "oklch(0.95 0.02 250)", 500: "oklch(0.6 0.2 250)", 900: "oklch(0.2 0.1 250)" },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
      },
      keyframes: {
        fadeIn: { from: { opacity: "0" }, to: { opacity: "1" } },
        slideUp: { from: { opacity: "0", transform: "translateY(10px)" }, to: { opacity: "1", transform: "translateY(0)" } },
      },
    },
  },
  plugins: [],
};
```

## Design System Tokens

```typescript
// lib/design-tokens.ts
export const tokens = {
  spacing: { xs: "4px", sm: "8px", md: "16px", lg: "24px", xl: "32px", "2xl": "48px" },
  radius: { sm: "6px", md: "8px", lg: "12px", xl: "16px", full: "9999px" },
  shadow: { sm: "0 1px 2px rgb(0 0 0 / 0.05)", md: "0 4px 6px -1px rgb(0 0 0 / 0.1)", lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)" },
  fontSize: { sm: "0.875rem", base: "1rem", lg: "1.125rem", xl: "1.25rem", "2xl": "1.5rem", "3xl": "1.875rem" },
  breakpoint: { sm: "640px", md: "768px", lg: "1024px", xl: "1280px" },
};
```

## Mẫu Responsive

```typescript
// Container query (dùng @container)
export function CardGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 @container">
      {children}
    </div>
  );
}

// Aspect ratio
export function AspectRatio({ ratio = 16 / 9, children }: { ratio?: number; children: React.ReactNode }) {
  return (
    <div className="relative" style={{ aspectRatio: ratio }}>
      {children}
    </div>
  );
}
```

## Dark Mode (không FOUC)

```typescript
// hooks/useTheme.ts
export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || stored === "light") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = useCallback(() => setTheme(t => t === "light" ? "dark" : "light"), []);

  return { theme, toggle, isDark: theme === "dark" };
}

// Script chống FOUC — inject trong layout <head>
// <script>document.documentElement.classList.toggle('dark', localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches))</script>
```

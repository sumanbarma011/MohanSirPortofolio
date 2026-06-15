import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "light", // Default fallback theme

      toggleTheme: () =>
        set((state) => {
          const nextTheme = state.theme === "light" ? "dark" : "light";
          return { theme: nextTheme };
        }),

      setTheme: (theme) => set({ theme }),
    }),
    {
      name: "theme-storage", // Unique key for storage item
      storage: createJSONStorage(() => sessionStorage), // 💡 Configured to use sessionStorage instead of localStorage
    },
  ),
);

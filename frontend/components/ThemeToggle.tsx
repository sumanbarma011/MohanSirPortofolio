"use client";

import { useThemeStore } from "@/lib/store/ThemeStore";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <button
      onClick={toggleTheme}
      className="p-2.5 rounded-xl border border-border bg-card text-foreground hover:bg-accent transition-all duration-200"
      aria-label="Toggle visual viewport theme mode"
    >
      {theme === "light" ? (
        <Moon className="w-4 h-4 text-foreground" />
      ) : (
        <Sun className="w-4 h-4 text-amber-400" />
      )}
    </button>
  );
}

"use client";

import { useThemeStore } from "@/lib/store/ThemeStore";
import { useEffect } from "react";

export function ThemeHydrator() {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  return null; // This component handles side-effects only
}

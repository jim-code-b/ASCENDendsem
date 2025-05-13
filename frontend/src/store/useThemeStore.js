import { create } from "zustand";

export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("ascend-theme") || "light",
  setTheme: (theme) => {
    localStorage.setItem("ascend-theme", theme);
    // Apply theme to both html and body elements
    document.documentElement.setAttribute("data-theme", theme);
    document.body.setAttribute("data-theme", theme);
    set({ theme });
  },
}));

// Apply theme on initial load
const initialTheme = localStorage.getItem("ascend-theme") || "light";
document.documentElement.setAttribute("data-theme", initialTheme);
document.body.setAttribute("data-theme", initialTheme);
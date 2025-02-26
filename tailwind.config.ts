import { heroui } from "@heroui/theme";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  darkMode: "class",
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
    heroui({
      themes: {
        light: {
          layout: {
            radius: {
              small: "4px",
              medium: "6px",
              large: "8px",
            },
          },
          colors: {
            success: "#22c55e",
            danger: "#ef4444",
          },
        },
        dark: {
          layout: {
            radius: {
              small: "4px",
              medium: "6px",
              large: "8px",
            },
          },
          colors: {
            success: "#16a34a",
            danger: "#dc2626",
          },
        },
      },
    }),
  ],
} satisfies Config;

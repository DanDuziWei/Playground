import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./lib/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        carbon: "#06070a",
        graphite: "#0d1117",
        ink: "#111827",
        silver: "#d9e1ee",
        "signal-blue": "#7dd3fc",
        "signal-violet": "#a78bfa",
        "signal-green": "#86efac"
      },
      boxShadow: {
        glow: "0 0 80px rgba(125, 211, 252, 0.16)",
        panel: "0 24px 80px rgba(0, 0, 0, 0.42)"
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "ui-sans-serif", "system-ui"]
      }
    }
  },
  plugins: []
};

export default config;

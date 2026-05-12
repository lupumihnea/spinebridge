import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        paper: "#f7f5ef",
        surface: "#fffdf8",
        "surface-muted": "#f0f4f1",
        "surface-strong": "#e7eee9",
        ink: "#17201d",
        "ink-soft": "#283631",
        muted: "#5a6762",
        "muted-soft": "#75827d",
        mist: "#eaf1ee",
        clinical: "#0f766e",
        "clinical-deep": "#0b4f49",
        "clinical-soft": "#dcefeb",
        clay: "#b85c38",
        "clay-soft": "#f0dfd5",
        saffron: "#c78b1c",
        "saffron-soft": "#f4ead2",
        signal: "#b42318",
        "signal-soft": "#f8ddd9",
        graphite: "#24302c",
        "graphite-soft": "#dce1de",
        line: "#d9dedb"
      },
      boxShadow: {
        soft: "0 22px 72px rgba(23, 32, 29, 0.13)",
        panel: "0 16px 44px rgba(23, 32, 29, 0.1)",
        lift: "0 18px 48px rgba(15, 118, 110, 0.16)",
        inset: "inset 0 1px 0 rgba(255, 255, 255, 0.72)"
      },
      borderRadius: {
        panel: "8px"
      }
    }
  },
  plugins: []
};

export default config;

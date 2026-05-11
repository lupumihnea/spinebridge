import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        paper: "#f7f5ef",
        ink: "#17201d",
        muted: "#5a6762",
        mist: "#eaf1ee",
        clinical: "#0f766e",
        clay: "#b85c38",
        saffron: "#c78b1c",
        signal: "#b42318",
        graphite: "#24302c"
      },
      boxShadow: {
        soft: "0 20px 70px rgba(23, 32, 29, 0.12)",
        panel: "0 16px 44px rgba(23, 32, 29, 0.1)"
      },
      borderRadius: {
        panel: "8px"
      }
    }
  },
  plugins: []
};

export default config;

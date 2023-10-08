import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1c6758",
        accent: "#3d8361",
      },
    },
  },
  plugins: [],
} satisfies Config;
import type { Config } from "tailwindcss";

const config = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      width: {
        product: "var(--product-width)",
      },
      height: {
        header: "var(--header-height)",
        product: "var(--product-height)",
      },
      minHeight: {
        section: "calc(90dvh - var(--header-height))",
        page: "calc(100vh - var(--header-height) - 68px) ",
      },
      padding: {
        header: "var(--header-height)",
      },
      boxShadow: {
        top: `0px -5px 10px 0px rgba(0,0,0,0.4);`,
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        primary: {
          DEFAULT: "var(--primary)",
          80: "var(--primary-80)",
          60: "var(--primary-60)",
          40: "var(--primary-40)",
          20: "var(--primary-20)",
          foreground: "var(--primary-foreground)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        sketchy: "1% 1% 2% 4% / 2% 6% 5% 9%",
        "sketchy-big": "0.5% 0.5% 1% 2% / 1% 3% 2.5% 4.5%",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      gridTemplateAreas: {
        "basket-product-sm": [
          "image name name",
          "image price price",
          "image quantity quantity",
        ],
        "basket-product": [
          "image name name",
          "image price quantity",
          "image price quantity",
        ],
        "product-sm": [
          "image image",
          "name name",
          "description description",
          "price price",
        ],
        product: ["image name", "image description", "image price", ". . "],
      },
      gridTemplateColumns: {
        "basket-product": "8rem 1fr 1fr",
        product: "2fr 3fr",
      },
      gridTemplateRows: {
        "basket-product": "auto 2rem 3rem",
        product: "300px 2rem 5rem 3rem",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    require("tailwindcss-motion"),
    require("tailwindcss-intersect"),
    require("@tailwindcss/container-queries"),
    require("@savvywombat/tailwindcss-grid-areas"),
  ],
} satisfies Config;

export default config;

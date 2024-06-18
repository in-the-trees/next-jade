import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
   content: [
      "./pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./app/**/*.{js,ts,jsx,tsx,mdx}",
   ],
   theme: {
      extend: {
         backgroundImage: {
            "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            "gradient-conic":
               "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
         },
         fontWeight: {
            "thin-mid": "150",
            "extralight-mid": "250",
            "light-mid": "350",
            "normal-mid": "450",
            "medium-mid": "550",
            "semibold-mid": "650",
            "bold-mid": "750",
            "extrabold-mid": "850",
         },
         margin: {
            "0.75": "0.1875rem",
            "1.75": "0.4375rem",
         },
         padding: {
            "0.75": "0.1875rem",
            "1.75": "0.4375rem",
         },
         scale: {
            "103": "1.03",
         },
         borderRadius: {
            "lg-half": "0.625rem",
         },
         fontFamily: {
            inter: ["var(--font-inter)"],
            lora: ["var(--font-lora)"],
            commit_mono: ["var(--font-commit-mono)"],
         },
         colors: {
            forest: {
               "50": "#f3f9ec",
               "100": "#e4f2d5",
               "200": "#cae7af",
               "300": "#a8d680",
               "400": "#89c358",
               "500": "#77bb41",
               "600": "#51852b",
               "700": "#3f6625",
               "800": "#355222",
               "900": "#2f4621",
               "950": "#16260d",
            },
         },
      },
   },
   plugins: [require("@tailwindcss/typography")],
};
export default config;

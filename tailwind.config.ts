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
            "1.75": "0.4375rem",
         },
         scale: {
            "103": "1.03",
         },
      },
   },
   plugins: [require("@tailwindcss/typography")],
};
export default config;

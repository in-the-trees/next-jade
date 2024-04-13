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
            "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
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
      },
   },
   plugins: [
      plugin(function ({ addComponents }) {
         addComponents({
            ".btn-sm": {
               display: "flex",
               width: "max-content",
               alignItems: "center",
               justifyContent: "space-between",
               gap: ".5rem",
               borderRadius: ".5rem",
               borderWidth: "1px",
               padding: ".25rem .5rem",
               fontSize: "1em",
               lineHeight: "1.25rem",
               "--tw-shadow": "0 1px 2px 0 rgba(0, 0, 0, .05)",
               "--tw-shadow-colored": "0 1px 2px 0 var(--tw-shadow-color)",
               boxShadow:
                  "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)",
               transitionProperty: "all",
               transitionTimingFunction: "cubic-bezier(.4, 0, .2, 1)",
               transitionDuration: ".15s",
               "&:hover": {
                  "--tw-scale-x": "103%",
                  "--tw-scale-y": "103%",
                  opacity: ".9",
                  transform:
                     "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))",
                  "--tw-border-opacity": "1",
                  borderColor: "rgb(209 213 219 / var(--tw-border-opacity))",
                  "--tw-bg-opacity": "1",
                  backgroundColor: "rgb(249 250 251 / var(--tw-bg-opacity))",
                  textDecorationLine: "none",
               },
               "&:active": {
                  "--tw-scale-x": "98%",
                  "--tw-scale-y": "98%",
                  transform:
                     "translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))",
               },
            },
         });
      }),
   ],
};
export default config;

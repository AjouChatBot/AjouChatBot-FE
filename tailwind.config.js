import { transform } from "typescript";

/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                mono_a: "#000000",
                mono_b: "#646464",
                mono_c: "#AAAAAA",
                mono_c_opacity_10: "#EEEEEE",
                mono_e: "#EAEAEA",
                red_a: "#DA1616",
                blue_a: "#0364B3",
                blue_a_opacity_10: "#DDE7EF",
                blue_b: "#237DE5",
                blue_c: "#558FE8",
            },

            keyframes: {
                bounceDot: {
                    "0%, 80%, 100%": { transform: "scale(0)", opacity: 0.3 },
                    "40%": { transform: "scale(1)", opacity: 1 },
                },
            },
            animation: {
                "bounce-dot":
                    "bounceDot 1.4s cubic-bezier(0, 1, 0.45, 0.45) infinite",
            },
        },
    },
    plugins: [require("tailwind-scrollbar-hide")],
};

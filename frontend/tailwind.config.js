/** @type {import('tailwindcss').Config} */
export const content = ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"];
export const theme = {
  extend: {
    animation: {
      bounce1: "bounce1 1s infinite",
      bounce2: "bounce2 1s infinite",
      bounce3: "bounce3 1s infinite",
      bounce4: "bounce4 1s infinite",
    },
    keyframes: {
      bounce1: {
        "0%, 100%": { transform: "translateY(0)" },
        "50%": { transform: "translateY(-15px)" },
      },
      bounce2: {
        "0%, 100%": { transform: "translateY(0)" },
        "50%": { transform: "translateY(-15px)" },
      },
      bounce3: {
        "0%, 100%": { transform: "translateY(0)" },
        "50%": { transform: "translateY(-15px)" },
      },
      bounce4: {
        "0%, 100%": { transform: "translateY(0)" },
        "50%": { transform: "translateY(-15px)" },
      },
    },
    animationDelay: {
      75: "75ms",
      150: "150ms",
      225: "225ms",
      300: "300ms",
    },
  },
};
export const plugins = [];

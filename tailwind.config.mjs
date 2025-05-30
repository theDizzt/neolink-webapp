// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
    safelist: ["text-softIndigo", "shadow-purple-card", "text-[#E0E3FF]"],
  theme: {
    extend: {
      colors: {
        softIndigo: "#E0E3FF",
      },
      boxShadow: {
        "purple-card": "0 0 6px #63629e, 0 8px 16px rgba(99, 98, 158, 0.4)",
      },
    },
  },
};

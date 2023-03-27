/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primaryLight: "#965cf2",
                primary: "#893ffe",
            },
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        themes: ["light"],
    },
};

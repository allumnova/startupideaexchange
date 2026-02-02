/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    dark: '#0f172a',    // Slate 900
                    electric: '#3b82f6', // Blue 500
                    slate: '#475569',    // Slate 600
                }
            }
        },
    },
    plugins: [],
}

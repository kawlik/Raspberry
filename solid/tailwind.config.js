/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./**/*.{html,js,jsx,ts,tsx}"],
	plugins: [require("daisyui")],
	daisyui: {
		themes: ["light"],
	},
};

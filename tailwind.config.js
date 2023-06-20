/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			animation: {
				toastIn: 'toastIn .8s both',
				toastOut: 'toastOut .8s both',
				showIn: 'showIn .8s both',
			},
			keyframes: {
				toastIn: {
					'0%': { opacity: 0 },
					'100%': { opacity: 1, transform: 'translate(0, 1.25rem)' },
				},
				toastOut: {
					'0%': { opacity: 1, transform: 'translate(0, 1.25rem)' },
					'100%': { opacity: 0, transform: 'translate(0,-1.25rem)' },
				},
				showIn: {
					'0%': { opacity: 0 },
					'100%': { opacity: 1 },
				},
			},
		},
	},
	plugins: [],
	safelist: [
		{
			pattern: /^grid-cols-.*/,
		},
	],
}

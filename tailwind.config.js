/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			animation: {
				toastIn: 'toastIn .8s both',
				toastOut: 'toastOut .8s both',
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
			},
		},
	},
	plugins: [],
	safelist: [
		{
			// pattern: /grid-cols-\[repeat\(([1-9]|1[0-2]),\_minmax\(0,\_1fr\)\)\_([1-9]|[1-9][0-9]|[1-9][0-9][0-9])px\]/
			pattern: /^grid-cols-.*/,
		},
	],
}

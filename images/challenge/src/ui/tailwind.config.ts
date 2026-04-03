import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"*.{js,ts,jsx,tsx,mdx}"
	],
	theme: {
		extend: {
			colors: {
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				chart: {
					'1': 'hsl(var(--chart-1))',
					'2': 'hsl(var(--chart-2))',
					'3': 'hsl(var(--chart-3))',
					'4': 'hsl(var(--chart-4))',
					'5': 'hsl(var(--chart-5))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				'gray-light': '#d3dce6',
				'a': '#6991bf',
				'a-100': '#121d29',
				'a-200': '#233a53',
				'a-300': '#35567c',
				'a-400': '#4773a6',
				'a-500': '#6991bf',
				'a-600': '#87a7cc',
				'a-700': '#a5bdd8',
				'a-800': '#c3d3e5',
				'a-900': '#e1e9f2',
				'b': '#f7f7f7',
				'b-100': '#313131',
				'b-200': '#636363',
				'b-300': '#949494',
				'b-400': '#c6c6c6',
				'b-500': '#f7f7f7',
				'b-600': '#f9f9f9',
				'b-700': '#fafafa',
				'b-800': '#fcfcfc',
				'b-900': '#fdfdfd',
				'c': '#fcdcfb',
				'c-100': '#570855',
				'c-200': '#af0fa9',
				'c-300': '#ed30e7',
				'c-400': '#f587f1',
				'c-500': '#fcdcfb',
				'c-600': '#fde5fc',
				'c-700': '#fdebfd',
				'c-800': '#fef2fd',
				'c-900': '#fef8fe',
				'd': '#918270',
				'd-100': '#1d1a16',
				'd-200': '#3a342c',
				'd-300': '#564d43',
				'd-400': '#736759',
				'd-500': '#918270',
				'd-600': '#a69a8c',
				'd-700': '#bcb3a9',
				'd-800': '#d3cdc5',
				'd-900': '#e9e6e2',
				'e': '#a4b7cc',
				'e-100': '#1a242f',
				'e-200': '#35485e',
				'e-300': '#4f6c8d',
				'e-400': '#7591b1',
				'e-500': '#a4b7cc',
				'e-600': '#b6c5d6',
				'e-700': '#c8d3e0',
				'e-800': '#dae2ea',
				'e-900': '#edf0f5'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			},
			fontFamily: {
				h1: ['Saira', 'sans-serif'],
				h2: ['Noto Sans Pahawh Hmong', 'sans-serif'],
				h3: ['Noto Sans Lepcha', 'serif'],
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
};
export default config;

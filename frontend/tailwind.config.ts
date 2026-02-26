import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ["var(--font-dm-sans)"],
				mono: ["var(--font-space-mono)"],
				sharp: ["Poppins", "sans-serif"],
			},
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
				'dark-bg': '#0a0a0a',
				'neon-green': '#00ff88',
				'purple-accent': '#7c3aed',
				'dark-gray': '#1a1a1a',
				'light-gray': '#f5f5f5'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'pulse-glow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.7' }
				},
				'fadeIn': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'slideInRight': {
					'0%': { transform: 'translateX(500px)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				'slideOutRight': {
					'0%': { transform: 'translateX(0)', opacity: '1' },
					'100%': { transform: 'translateX(500px)', opacity: '0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'fade-in': 'fadeIn 0.5s ease-in-out',
				'slide-in-right': 'slideInRight 0.3s ease-out',
				'slide-out-right': 'slideOutRight 0.3s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
};
export default config;

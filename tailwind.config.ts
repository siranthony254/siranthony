import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0D1B2A',
          50:  '#E8EDF3',
          100: '#C5D3DF',
          200: '#8FAABF',
          300: '#5A809F',
          400: '#2E5A7F',
          500: '#0D1B2A',
          600: '#0A1622',
          700: '#08111A',
          800: '#050C12',
          900: '#02060A',
        },
        gold: {
          DEFAULT: '#C9A84C',
          light: '#E2C97A',
          dark:  '#A0821E',
          muted: 'rgba(201,168,76,0.15)',
        },
        cream: '#F5F0E8',
        stone: '#E8E2D6',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body:    ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        mono:    ['var(--font-jetbrains)', 'monospace'],
      },
      fontSize: {
        '7xl': ['4.5rem',   { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        '8xl': ['6rem',     { lineHeight: '1.0',  letterSpacing: '-0.03em' }],
        '9xl': ['8rem',     { lineHeight: '0.95', letterSpacing: '-0.04em' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
      },
      animation: {
        'fade-up':    'fadeUp 0.7s ease forwards',
        'fade-in':    'fadeIn 0.5s ease forwards',
        'ripple':     'ripple 3s ease-in-out infinite',
        'gold-pulse': 'goldPulse 2s ease-in-out infinite',
        'grain':      'grain 0.5s steps(2) infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        ripple: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.4' },
          '50%':      { transform: 'scale(1.08)', opacity: '0.7' },
        },
        goldPulse: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201,168,76,0.4)' },
          '50%':      { boxShadow: '0 0 0 12px rgba(201,168,76,0)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0,0)' },
          '10%': { transform: 'translate(-2%,-3%)' },
          '20%': { transform: 'translate(3%,2%)' },
          '30%': { transform: 'translate(-1%,4%)' },
          '40%': { transform: 'translate(2%,-2%)' },
          '50%': { transform: 'translate(-3%,3%)' },
          '60%': { transform: 'translate(1%,-1%)' },
          '70%': { transform: 'translate(3%,1%)' },
          '80%': { transform: 'translate(-2%,2%)' },
          '90%': { transform: 'translate(2%,-3%)' },
        },
      },
      backgroundImage: {
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
        'navy-gradient': 'linear-gradient(135deg, #0D1B2A 0%, #0A2240 50%, #0D1B2A 100%)',
        'gold-gradient': 'linear-gradient(135deg, #A0821E 0%, #C9A84C 50%, #E2C97A 100%)',
        'hero-radial':   'radial-gradient(ellipse at 60% 40%, rgba(201,168,76,0.08) 0%, transparent 70%)',
      },
      boxShadow: {
        'gold-sm': '0 2px 8px rgba(201,168,76,0.3)',
        'gold-md': '0 4px 20px rgba(201,168,76,0.4)',
        'gold-lg': '0 8px 40px rgba(201,168,76,0.35)',
        'navy-md': '0 4px 24px rgba(13,27,42,0.6)',
        'navy-lg': '0 12px 48px rgba(13,27,42,0.8)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [],
}

export default config

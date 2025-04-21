/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E9F6F0',
          100: '#D3EDE1',
          200: '#A8DBC3',
          300: '#7CC9A5',
          400: '#51B787',
          500: '#40916C', // Main primary color
          600: '#2D6A4F',
          700: '#224F3A',
          800: '#183526',
          900: '#0E1A13',
        },
        secondary: {
          50: '#E3F2F9',
          100: '#C7E5F3',
          200: '#8FCCE7',
          300: '#57B2DB',
          400: '#1F99CF',
          500: '#1A759F', // Main secondary color
          600: '#155D7F',
          700: '#10465F',
          800: '#0B2E40',
          900: '#051720',
        },
        accent: {
          50: '#FCF5E5',
          100: '#F9EBCC',
          200: '#F3D699',
          300: '#EEC266',
          400: '#E8AD33',
          500: '#D9980F', // Main accent color
          600: '#AD7A0C',
          700: '#815B09',
          800: '#563D06',
          900: '#2B1E03',
        },
        earth: {
          50: '#F5F5F1',
          100: '#EBEBE3',
          200: '#D7D7C6',
          300: '#C3C3AA',
          400: '#AFAF8D',
          500: '#B7B7A4', // Main earth color
          600: '#929283',
          700: '#6E6E62',
          800: '#494941',
          900: '#252521',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'serif'],
      },
      animation: {
        'wave': 'wave 2.5s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        wave: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};
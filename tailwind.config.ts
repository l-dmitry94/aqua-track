import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: '#323f47',
                secondary: '#2f2f2f',
                green: {
                    DEFAULT: '#9BE1A0',
                    dark: '#87d28d',
                },
                white: '#ffffff',
                gray: '#f0eff4',
                error: '#ef5050',
            },
            fontFamily: {
                sans: ['Poppins', 'sans-serif'],
            },
            letterSpacing: {
                tight: '-0.01em',
            },
            borderRadius: {
                custom: '1.875rem',
            },
            screens: {
                mobile: '375px',
                tablet: '768px',
                desktop: '1440px',
            },
        },
    },
    plugins: [],
};
export default config;

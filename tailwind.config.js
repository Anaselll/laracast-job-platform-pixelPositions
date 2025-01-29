import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/**/*.blade.php',
        './resources/**/*.js',
        './resources/**/*.vue',
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                "hanken-grotesk":["Hanken Grotesk","sans-serif"]
            },
            colors:{
                "black":"#060606"
            },
            fontSize:{
                "2xs":".625rem" 
            }
        },
    },
    plugins: [],
};

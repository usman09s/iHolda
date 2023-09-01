/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require('./src/theme/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors,
      fontSize: {
        8: '8px',
        10: '10px',
        12: '12px',
        14: '14px',
        16: '16px',
        18: '18px',
        20: '20px',
        24: '24px',
        30: '30px',
        34: '34px',
        36: '36px',
      },
      lineHeight: {},
      fontFamily: {},
      borderWidth: {
        b1: '1px',
        'b-1.5': '1.5px',
      },
      borderRadius: {},
      width: {},
      height: {},
    },
  },
  plugins: [],
};

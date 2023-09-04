import { cva } from 'class-variance-authority';

export const button = cva(['items-center justify-center active:opacity-20'], {
  variants: {
    type: {
      ghost: '',
      solid: 'bg-black py-4 rounded-full',
      borderedSolid: 'bg-black py-4 rounded-full px-12 border-4 border-white',
      borderedTransparent: '',
    },
    title: {
      ghost: '',
      solid: 'text-20 font-Bold text-white',
      borderedTransparent: '',
      borderedSolid: 'text-15 font-Bold text-white',
    },
    size: {},
    disabled: {
      true: 'opacity-50',
    },
  },
});

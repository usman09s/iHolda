import { cva } from 'class-variance-authority';

export const text = cva(['items-center justify-center'], {
  variants: {
    type: {
      r15: 'text-15 leading-4 font-Regular',
    },
    isCenter: {
      true: 'text-center',
    },
  },
});

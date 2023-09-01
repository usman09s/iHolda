import { cva } from 'class-variance-authority';

export const text = cva(['items-center justify-center'], {
  variants: {
    type: {},
    isCenter: {
      true: 'text-center',
    },
  },
});

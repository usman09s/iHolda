import { cva } from 'class-variance-authority';

export const button = cva(['items-center justify-center'], {
  variants: {
    variants: {},
    title: {},
    size: {},
    disabled: {},
  },
});

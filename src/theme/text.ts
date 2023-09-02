import { cva } from 'class-variance-authority';

export const text = cva(['items-center justify-center'], {
  variants: {
    type: {
      b44: 'text-5xl font-Bold',
      b2o: 'text-20 font-Bold',

      m2o: 'text-20 font-Medium',
      m13: 'text-13 font-Medium',

      r15: 'text-15 leading-5 font-Regular',
      r16: 'text-16 font-Regular',
      r18: 'text-18 font-Regular',
      r20: 'text-20 font-Regular',
      r26: 'text-26 font-Regular',
      r32: 'text-32 font-Regular',
      r36: 'text-36 font-Regular',

      l13: 'text-13 font-Light',
    },
    isCenter: {
      true: 'text-center',
    },
  },
});

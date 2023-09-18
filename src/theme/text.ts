import { cva } from 'class-variance-authority';

export const text = cva(['items-center justify-center'], {
  variants: {
    type: {
      b44: 'text-5xl font-Bold',
      b34: 'text-34 font-Bold',
      b32: 'text-32 font-Bold',
      b26: 'text-26 font-Bold',
      b20: 'text-20 font-Bold',
      b28: 'text-28 font-Bold',
      b30: 'text-30 font-Bold',
      b18: 'text-18 font-Bold',
      b16: 'text-16 font-Bold',
      b15: 'text-15 font-Bold',
      b12: 'text-12 font-Bold',
      b13: 'text-13 font-Bold',

      m2o: 'text-20 font-Medium',
      m28: 'text-[28px] font-Medium',
      m18: 'text-18 font-Medium',
      m16: 'text-16 font-Medium',
      m12: 'text-12 font-Medium',
      m10: 'text-10 font-Medium',
      m13: 'text-13 font-Medium',
      m24: 'text-24 font-Medium',
      m48: 'text-[48px] font-Medium',

      r15: 'text-15 leading-5 font-Regular',
      r10: 'text-10 font-Regular',
      r12: 'text-12 font-Regular',
      r13: 'text-13 font-Regular',
      r16: 'text-16 font-Regular',
      r18: 'text-18 font-Regular',
      r20: 'text-20 font-Regular',
      r24: 'text-24 font-Regular',
      r26: 'text-26 font-Regular',
      r32: 'text-32 font-Regular',
      r36: 'text-36 font-Regular',

      l13: 'text-13 font-Light',
      l16: 'text-16 font-Light',
      l20: 'text-20 font-Light',
      l24: 'text-24 font-Light',
      l48: 'text-[48px] font-Light',
    },
    isCenter: {
      true: 'text-center',
    },
  },
});

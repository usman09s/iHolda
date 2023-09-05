import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { PlasticItemType } from 'types/PlasticTypes';

export type PlasticState = {
  plasticSizes: (PlasticItemType & { count: number })[];
};

const initialState: PlasticState = {
  plasticSizes: [],
};

export const plasticSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setPlasticsSize: (state, action: PayloadAction<PlasticItemType[]>) => ({
      ...state,
      plasticSizes: action.payload.map(item => ({ ...item, count: 0 })),
    }),

    increasePlasticCount: (state, action: PayloadAction<number>) => ({
      ...state,
      plasticSizes: state.plasticSizes.map(item =>
        item.id === action.payload ? { ...item, count: item.count + 1 } : item,
      ),
    }),
    decreasePlasticCount: (state, action: PayloadAction<number>) => ({
      ...state,
      plasticSizes: state.plasticSizes.map(item =>
        item.id === action.payload
          ? { ...item, count: item.count === 0 ? 0 : item.count - 1 }
          : item,
      ),
    }),
  },
});

export const { setPlasticsSize, increasePlasticCount, decreasePlasticCount } = plasticSlice.actions;

export default plasticSlice.reducer;

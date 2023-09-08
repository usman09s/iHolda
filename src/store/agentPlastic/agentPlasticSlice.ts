import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { PlasticItemType } from 'types/PlasticTypes';

export type agentPlasticState = {
  upcomingDropOffs: unknown[];
  plasticId: number | undefined;
  plasticSizes: (PlasticItemType & { count: number })[];
};

const initialState: agentPlasticState = {
  plasticSizes: [],
  plasticId: undefined,
  upcomingDropOffs: [],
};

export const agentPlasticSlice = createSlice({
  name: 'agentPlastic',
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

    setPlasticId: (state, action: PayloadAction<number | undefined>) => ({
      ...state,
      plasticId: action.payload,
    }),

    setDropOffs: (state, action: PayloadAction<unknown[]>) => ({
      ...state,
      upcomingDropOffs: action.payload,
    }),
  },
});

export const {
  setDropOffs,
  setPlasticId,
  setPlasticsSize,
  increasePlasticCount,
  decreasePlasticCount,
} = agentPlasticSlice.actions;

export default agentPlasticSlice.reducer;

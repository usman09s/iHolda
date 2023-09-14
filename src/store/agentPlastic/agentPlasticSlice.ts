import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { DecodePlasticsQrResponseType } from 'types/AgentPlasticTypes';

type ScannedPlasticItemType = {
  plasticId: number;
  sizes: { size: number | string; quantity: number; price: number; image: string }[];
};

export type AgentPlasticState = {
  queryId?: string;
  plasticId?: number;
  plasticOwner?: string;
  upcomingDropOffs: unknown[];
  scannedPlastics?: ScannedPlasticItemType;
  plasticSizes: { size: number | string; quantity: number; price: number; image: string }[];
};

const initialState: AgentPlasticState = {
  plasticSizes: [],
  plasticId: undefined,
  upcomingDropOffs: [],
};

export const agentPlasticSlice = createSlice({
  name: 'agentPlastic',
  initialState,
  reducers: {
    increasePlasticCount: (state, action: PayloadAction<number>) => ({
      ...state,
      plasticSizes: state.plasticSizes.map(item =>
        item.size === action.payload ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    }),

    decreasePlasticCount: (state, action: PayloadAction<number>) => ({
      ...state,
      plasticSizes: state.plasticSizes.map(item =>
        item.size === action.payload
          ? { ...item, quantity: item.quantity === 0 ? 0 : item.quantity - 1 }
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

    setScannedPlastic: (state, action: PayloadAction<DecodePlasticsQrResponseType>) => {
      const sizes = action.payload.sizes.map(item => ({
        size: Number(item.size),
        image: item.image,
        quantity: item.quantity,
        price: Number(item.price_per_plastic),
      }));

      return {
        ...state,
        plasticSizes: sizes,
        queryId: action.payload.query_id,
        plasticId: action.payload.plastic_id,
        plasticOwner: action.payload.user_name,
        scannedPlastics: {
          plasticId: action.payload.plastic_id,
          sizes,
        },
      };
    },
  },
});

export const {
  setDropOffs,
  setPlasticId,
  setScannedPlastic,
  increasePlasticCount,
  decreasePlasticCount,
} = agentPlasticSlice.actions;

export default agentPlasticSlice.reducer;

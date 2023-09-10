import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { MomentType } from 'types/MomentsTypes';

export type momentsState = {
  caption: string;
  moments: MomentType[];
  selectedMoment?: MomentType;
};

const initialState: momentsState = {
  moments: [],
  caption: '',
  selectedMoment: undefined,
};

export const momentsSlice = createSlice({
  name: 'moments',
  initialState,
  reducers: {
    addMoment: (state, action: PayloadAction<Omit<MomentType, 'id'>>) => ({
      ...state,
      moments: [...state.moments, { id: state.moments.length + 1, ...action.payload }],
    }),

    deleteMoment: (state, action: PayloadAction<number>) => ({
      ...state,
      selectedMoment: undefined,
      moments: state.moments.filter(moment => moment.id !== action.payload),
    }),

    setSelectedMoment: (state, action: PayloadAction<MomentType | undefined>) => ({
      ...state,
      selectedMoment: action.payload,
    }),

    setCaption: (state, action: PayloadAction<string>) => ({
      ...state,
      caption: action.payload,
    }),
  },
});

export const { setSelectedMoment, addMoment, deleteMoment, setCaption } = momentsSlice.actions;

export default momentsSlice.reducer;

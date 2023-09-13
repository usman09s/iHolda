import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { MatchedUserType, MomentType } from 'types/MomentsTypes';

export type momentsState = {
  mood?: string;
  caption: string;
  meetupId?: number;
  moments: MomentType[];
  selectedMoment?: MomentType;
  matchedUser?: MatchedUserType;
};

const initialState: momentsState = {
  moments: [],
  caption: '',
  meetupId: undefined,
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

    setMatchedUser: (state, action: PayloadAction<MatchedUserType & { meetupId: number }>) => ({
      ...state,
      matchedUser: action.payload,
      meetupId: action.payload.meetupId,
    }),

    setMood: (state, action: PayloadAction<string>) => ({
      ...state,
      mood: action.payload,
    }),

    resetState: state => ({
      ...state,
      ...initialState,
    }),
  },
});

export const {
  setMood,
  addMoment,
  resetState,
  setCaption,
  deleteMoment,
  setMatchedUser,
  setSelectedMoment,
} = momentsSlice.actions;

export default momentsSlice.reducer;

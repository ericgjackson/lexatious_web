import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Achievement {
  title: string;
  description: string;
  achieved: boolean;
}

const achievementsInitialState: Achievement[] = [];

const achievementsSlice = createSlice({
  initialState: achievementsInitialState,
  name: 'achievements',
  reducers: {
    init: (_state, action: PayloadAction<Achievement[]>) => {
      return action.payload;
    },

    reset: () => achievementsInitialState,
  },
});

export default achievementsSlice;

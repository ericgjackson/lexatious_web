import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SingleOpponentStats {
  opponent: string;
  wins: number;
  losses: number;
}

const statisticsInitialState: SingleOpponentStats[] = [];

const statisticsSlice = createSlice({
  initialState: statisticsInitialState,
  name: 'statistics',
  reducers: {
    init: (_state, action: PayloadAction<SingleOpponentStats[]>) => {
      return action.payload;
    },

    reset: () => statisticsInitialState,
  },
});

export default statisticsSlice;

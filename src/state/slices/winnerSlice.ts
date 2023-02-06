import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialWinner = -1;

const winnerSlice = createSlice({
  initialState: initialWinner,
  name: 'winner',
  reducers: {
    reset: () => initialWinner,
    set: (_state, action: PayloadAction<number>) => {
      return action.payload;
    },
  },
});

export default winnerSlice;

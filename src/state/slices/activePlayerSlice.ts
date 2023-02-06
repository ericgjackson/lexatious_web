import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialActivePlayer = -1;

const activePlayerSlice = createSlice({
  initialState: initialActivePlayer,
  name: 'activePlayer',
  reducers: {
    reset: () => initialActivePlayer,
    set: (_state, action: PayloadAction<number>) => {
      return action.payload;
    },
  },
});

export default activePlayerSlice;

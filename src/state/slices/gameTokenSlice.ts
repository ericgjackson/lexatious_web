import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const gameTokenInitialState = '';

const gameTokenSlice = createSlice({
  initialState: gameTokenInitialState,
  name: 'gameToken',
  reducers: {
    reset: () => gameTokenInitialState,
    set: (_state, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export default gameTokenSlice;

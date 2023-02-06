import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const opponentNameInitialState = '';

const opponentNameSlice = createSlice({
  initialState: opponentNameInitialState,
  name: 'opponentName',
  reducers: {
    reset: () => opponentNameInitialState,
    set: (_state, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export default opponentNameSlice;

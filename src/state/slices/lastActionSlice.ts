import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const lastActionInitialState = '';

const lastActionSlice = createSlice({
  initialState: lastActionInitialState,
  name: 'lastAction',
  reducers: {
    reset: () => lastActionInitialState,
    set: (_state, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export default lastActionSlice;

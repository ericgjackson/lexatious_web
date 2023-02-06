import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const lastChangesInitialState: number[] = [];

const lastChangesSlice = createSlice({
  initialState: lastChangesInitialState,
  name: 'lastChanges',
  reducers: {
    init: (_state, action: PayloadAction<number[]>) => {
      return action.payload;
    },

    reset: () => lastChangesInitialState,
  },
});

export default lastChangesSlice;

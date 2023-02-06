import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const invalidInitialState = false;

const invalidSlice = createSlice({
  initialState: invalidInitialState,
  name: 'invalid',
  reducers: {
    reset: () => invalidInitialState,
    set: (_state, action: PayloadAction<boolean>) => {
      return action.payload;
    },
  },
});

export default invalidSlice;

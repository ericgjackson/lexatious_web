import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const deviceIDInitialState = '';

const deviceIDSlice = createSlice({
  initialState: deviceIDInitialState,
  name: 'deviceID',
  reducers: {
    reset: () => deviceIDInitialState,
    set: (_state, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export default deviceIDSlice;

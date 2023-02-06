import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialPlayer = -1;

const playerSlice = createSlice({
  initialState: initialPlayer,
  name: 'player',
  reducers: {
    reset: () => initialPlayer,
    set: (_state, action: PayloadAction<number>) => {
      return action.payload;
    },
  },
});

export default playerSlice;

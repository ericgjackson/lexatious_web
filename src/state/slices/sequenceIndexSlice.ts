import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialSequenceIndex = 0;

const sequenceIndexSlice = createSlice({
  initialState: initialSequenceIndex,
  name: 'sequenceIndex',
  reducers: {
    reset: () => initialSequenceIndex,
    set: (_state, action: PayloadAction<number>) => {
      return action.payload;
    },
  },
});

export default sequenceIndexSlice;

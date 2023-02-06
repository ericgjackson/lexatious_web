import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const invalidCellsInitialState: number[] = [];

const invalidCellsSlice = createSlice({
  initialState: invalidCellsInitialState,
  name: 'invalidCells',
  reducers: {
    set: (
      _state,
      action: PayloadAction<number[]>) => {
      return action.payload;
    },
    reset: () => invalidCellsInitialState,
  },
});

export default invalidCellsSlice;

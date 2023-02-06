import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const errorMessageInitialState = '';

const errorMessageSlice = createSlice({
  initialState: errorMessageInitialState,
  name: 'errorMessage',
  reducers: {
    reset: () => errorMessageInitialState,
    set: (_state, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export default errorMessageSlice;

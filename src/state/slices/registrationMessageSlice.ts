import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const registrationMessageInitialState = '';

const registrationMessageSlice = createSlice({
  initialState: registrationMessageInitialState,
  name: 'registrationMessage',
  reducers: {
    reset: () => registrationMessageInitialState,
    set: (_state, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export default registrationMessageSlice;

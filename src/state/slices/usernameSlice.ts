import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const usernameInitialState = '';

const usernameSlice = createSlice({
  initialState: usernameInitialState,
  name: 'username',
  reducers: {
    reset: () => usernameInitialState,
    set: (_state, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export default usernameSlice;

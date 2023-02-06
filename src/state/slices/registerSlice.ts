import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NewGameInitialState {
  error: unknown | undefined;
  isLoading: boolean;
}

const registerInitialState: NewGameInitialState = {
  error: undefined,
  isLoading: false,
};

const registerSlice = createSlice({
  initialState: registerInitialState,
  name: 'register',
  reducers: {
    submit: (state, _action:PayloadAction<{username: string}>) => {
      const error = registerInitialState.error;
      return { ...state, error, isLoading: true };
    },

    submitFailure: (state, action: PayloadAction<unknown>) => {
      const error = action.payload;
      return { ...state, error, isLoading: false };
    },

    submitSuccess: (state) => {
      const error = registerInitialState.error;
      return { ...state, error, isLoading: false };
    },
  },
});

export default registerSlice;

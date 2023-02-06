import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NewGameInitialState {
  error: unknown | undefined;
  isLoading: boolean;
}

const newGameInitialState: NewGameInitialState = {
  error: undefined,
  isLoading: false,
};

const newGameSlice = createSlice({
  initialState: newGameInitialState,
  name: 'newGame',
  reducers: {
    submit: (state, _action:PayloadAction<{opponentName: string, opponentGoesFirst: boolean}>) => {
      const error = newGameInitialState.error;
      return { ...state, error, isLoading: true };
    },

    submitFailure: (state, action: PayloadAction<unknown>) => {
      const error = action.payload;
      return { ...state, error, isLoading: false };
    },

    submitSuccess: (state) => {
      const error = newGameInitialState.error;
      return { ...state, error, isLoading: false };
    },
  },
});

export default newGameSlice;

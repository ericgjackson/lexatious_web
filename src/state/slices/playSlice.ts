import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PlayInitialState {
  error: unknown | undefined;
  isLoading: boolean;
}

const playInitialState: PlayInitialState = {
  error: undefined,
  isLoading: false,
};

const playSlice = createSlice({
  initialState: playInitialState,
  name: 'play',
  reducers: {
    submit: (state) => {
      const error = playInitialState.error;
      return { ...state, error, isLoading: true };
    },

    submitFailure: (state, action: PayloadAction<unknown>) => {
      const error = action.payload;
      return { ...state, error, isLoading: false };
    },

    submitSuccess: (state) => {
      const error = playInitialState.error;
      return { ...state, error, isLoading: false };
    },
  },
});

export default playSlice;

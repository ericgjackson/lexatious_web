import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ExchangeInitialState {
  error: unknown | undefined;
  isLoading: boolean;
}

const exchangeInitialState: ExchangeInitialState = {
  error: undefined,
  isLoading: false,
};

const exchangeSlice = createSlice({
  initialState: exchangeInitialState,
  name: 'exchange',
  reducers: {
    submit: (state) => {
      const error = exchangeInitialState.error;
      return { ...state, error, isLoading: true };
    },

    submitFailure: (state, action: PayloadAction<unknown>) => {
      const error = action.payload;
      return { ...state, error, isLoading: false };
    },

    submitSuccess: (state) => {
      const error = exchangeInitialState.error;
      return { ...state, error, isLoading: false };
    },
  },
});

export default exchangeSlice;

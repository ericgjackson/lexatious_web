import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ConcedeInitialState {
  error: unknown | undefined;
  isLoading: boolean;
}

const concedeInitialState: ConcedeInitialState = {
  error: undefined,
  isLoading: false,
};

const concedeSlice = createSlice({
  initialState: concedeInitialState,
  name: 'concede',
  reducers: {
    submit: (state) => {
      const error = concedeInitialState.error;
      return { ...state, error, isLoading: true };
    },

    submitFailure: (state, action: PayloadAction<unknown>) => {
      const error = action.payload;
      return { ...state, error, isLoading: false };
    },

    submitSuccess: (state) => {
      const error = concedeInitialState.error;
      return { ...state, error, isLoading: false };
    },
  },
});

export default concedeSlice;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GetStateInitialState {
  error: unknown | undefined;
  isLoading: boolean;
}

const getStateInitialState: GetStateInitialState = {
  error: undefined,
  isLoading: false,
};

const getStateSlice = createSlice({
  initialState: getStateInitialState,
  name: 'getState',
  reducers: {
    submit: (state, _action:PayloadAction<{gameToken: string}>) => {
      const error = getStateInitialState.error;
      return { ...state, error, isLoading: true };
    },

    submitFailure: (state, action: PayloadAction<unknown>) => {
      const error = action.payload;
      return { ...state, error, isLoading: false };
    },

    submitSuccess: (state) => {
      const error = getStateInitialState.error;
      return { ...state, error, isLoading: false };
    },
  },
});

export default getStateSlice;

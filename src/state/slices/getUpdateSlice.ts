import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GetUpdateInitialState {
  error: unknown | undefined;
  isLoading: boolean;
}

const getUpdateInitialState: GetUpdateInitialState = {
  error: undefined,
  isLoading: false,
};

const getUpdateSlice = createSlice({
  initialState: getUpdateInitialState,
  name: 'getUpdate',
  reducers: {
    submit: (state) => {
      const error = getUpdateInitialState.error;
      return { ...state, error, isLoading: true };
    },

    submitFailure: (state, action: PayloadAction<unknown>) => {
      const error = action.payload;
      return { ...state, error, isLoading: false };
    },

    submitSuccess: (state) => {
      const error = getUpdateInitialState.error;
      return { ...state, error, isLoading: false };
    },
  },
});

export default getUpdateSlice;

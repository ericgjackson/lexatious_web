import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GetUserDataInitialState {
  error: unknown | undefined;
  isLoading: boolean;
}

const getUserDataInitialState: GetUserDataInitialState = {
  error: undefined,
  isLoading: false,
};

const getUserDataSlice = createSlice({
  initialState: getUserDataInitialState,
  name: 'getUserData',
  reducers: {
    submit: (state) => {
      const error = getUserDataInitialState.error;
      return { ...state, error, isLoading: true };
    },

    submitFailure: (state, action: PayloadAction<unknown>) => {
      const error = action.payload;
      return { ...state, error, isLoading: false };
    },

    submitSuccess: (state) => {
      const error = getUserDataInitialState.error;
      return { ...state, error, isLoading: false };
    },
  },
});

export default getUserDataSlice;

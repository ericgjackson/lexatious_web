import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GetFriendInitialState {
  error: unknown | undefined;
  isLoading: boolean;
}

const getFriendInitialState: GetFriendInitialState = {
  error: undefined,
  isLoading: false,
};

const getFriendSlice = createSlice({
  initialState: getFriendInitialState,
  name: 'getFriend',
  reducers: {
    submit: (state) => {
      const error = getFriendInitialState.error;
      return { ...state, error, isLoading: true };
    },

    submitFailure: (state, action: PayloadAction<unknown>) => {
      const error = action.payload;
      return { ...state, error, isLoading: false };
    },

    submitSuccess: (state) => {
      const error = getFriendInitialState.error;
      return { ...state, error, isLoading: false };
    },
  },
});

export default getFriendSlice;

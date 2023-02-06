import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GetStatisticsInitialState {
  error: unknown | undefined;
  isLoading: boolean;
}

const getStatisticsInitialState: GetStatisticsInitialState = {
  error: undefined,
  isLoading: false,
};

const getStatisticsSlice = createSlice({
  initialState: getStatisticsInitialState,
  name: 'getStatistics',
  reducers: {
    submit: (state) => {
      const error = getStatisticsInitialState.error;
      return { ...state, error, isLoading: true };
    },

    submitFailure: (state, action: PayloadAction<unknown>) => {
      const error = action.payload;
      return { ...state, error, isLoading: false };
    },

    submitSuccess: (state) => {
      const error = getStatisticsInitialState.error;
      return { ...state, error, isLoading: false };
    },
  },
});

export default getStatisticsSlice;

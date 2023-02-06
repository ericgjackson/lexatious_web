import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GetAchievementsInitialState {
  error: unknown | undefined;
  isLoading: boolean;
}

const getAchievementsInitialState: GetAchievementsInitialState = {
  error: undefined,
  isLoading: false,
};

const getAchievementsSlice = createSlice({
  initialState: getAchievementsInitialState,
  name: 'getAchievements',
  reducers: {
    submit: (state) => {
      const error = getAchievementsInitialState.error;
      return { ...state, error, isLoading: true };
    },

    submitFailure: (state, action: PayloadAction<unknown>) => {
      const error = action.payload;
      return { ...state, error, isLoading: false };
    },

    submitSuccess: (state) => {
      const error = getAchievementsInitialState.error;
      return { ...state, error, isLoading: false };
    },
  },
});

export default getAchievementsSlice;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Friend {
  username: string;
  device_id: string;
}

const friendsInitialState: Friend[] = [];

const friendsSlice = createSlice({
  initialState: friendsInitialState,
  name: 'friends',
  reducers: {
    init: (_state, action: PayloadAction<Friend[]>) => {
      return action.payload;
    },

    reset: () => friendsInitialState,
  },
});

export default friendsSlice;

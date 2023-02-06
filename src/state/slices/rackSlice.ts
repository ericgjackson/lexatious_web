import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Rack, RackLetter } from 'ltypes';

import rackInitialState from './rackInitialState';

const rackSlice = createSlice({
  initialState: rackInitialState,
  name: 'rack',
  reducers: {
    init: (_state, action: PayloadAction<Rack>) => {
      return action.payload;
    },

    setUnselected: (_state, action: PayloadAction<string []>) => {
      return Rack.fromArrays(
        action.payload,
        Array(action.payload.length).fill(false),
      );
    },

    set: (_state, action: PayloadAction<{ letters: string [], selected: boolean [] }>) => {
      return Rack.fromArrays(
        action.payload.letters,
        action.payload.selected,
      );
    },

    reset: () => rackInitialState,

    toggleSelected: (state, action: PayloadAction<{ index: number }>) => {
      const newRack = state.clone();
      const { index } = action.payload;
      newRack.update(index, (rl) => {
        return new RackLetter({ ...rl, selected: !rl.selected });
      });
      return newRack;
    },

    shuffle: (state) => {
      const newRack = state.clone();
      newRack.shuffle();
      return newRack;
    },
  },
});

export default rackSlice;

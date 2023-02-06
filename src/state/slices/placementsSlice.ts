import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Placement } from 'ltypes';

const placementsInitialState: Placement[] = [];

const placementsSlice = createSlice({
  initialState: placementsInitialState,
  name: 'placements',
  reducers: {
    add: (
      state,
      action: PayloadAction<{ character: string; x: number; y: number }>
    ) => {
      const { character, x, y } = action.payload;
      const newPlacements = state.map((p) => p.clone());
      newPlacements.push(new Placement({ character: character.toUpperCase(), x, y }));
      return newPlacements;
    },
    replace: (
      state,
      action: PayloadAction<{ character: string; x: number; y: number }>
    ) => {
      const { character, x, y } = action.payload;
      const newPlacements = state.map((p) => p.clone());
      const filteredPlacements = newPlacements.filter((p) => p.x !== x || p.y !== y);
      filteredPlacements.push(new Placement({ character: character.toUpperCase(), x, y }));
      return filteredPlacements;
    },
    remove: (
      state,
      action: PayloadAction<{ x: number; y: number }>
    ) => {
      const { x, y } = action.payload;
      // Is it necessary to do a deep copy first like this?
      const newPlacements = state.map((p) => p.clone());
      const filteredPlacements = newPlacements.filter((p) => p.x !== x || p.y !== y);
      return filteredPlacements;
    },
    reset: () => {
      return placementsInitialState;
    },
  },
});

export default placementsSlice;

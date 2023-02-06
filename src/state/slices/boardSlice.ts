import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Board, Cell, EMPTY_CELL, Point, Tile } from 'ltypes';

import boardInitialState from './boardInitialState';

const combineCharacters = (oldTile: Tile, newCharacter: string, newOccupier: number) => {
  if (!newCharacter || newCharacter === EMPTY_CELL) {
    if (oldTile.occupier === newOccupier) {
      return EMPTY_CELL;
    }
    return oldTile.character;
  }
  return newCharacter;
};

const combineOccupiers = (oldOccupier: number, newOccupier: number, clearing: boolean) => {
  if (clearing) {
    if (oldOccupier === 3) {
      return 3 - newOccupier;
    }
    if (oldOccupier === newOccupier) {
      return 0;
    }
    // Shouldn't happen
    return 0;
  }
  if (oldOccupier === 1 && newOccupier === 2) {
    return 3;
  }
  if (oldOccupier === 2 && newOccupier === 1) {
    return 3;
  }
  return newOccupier;
};

const boardSlice = createSlice({
  initialState: boardInitialState,
  name: 'board',
  reducers: {
    changeCellValue: (
      state,
      action: PayloadAction<{ value: string; occupier: number; x: number; y: number }>
    ) => {
      const newBoard = state.clone();
      const { value, occupier, x, y } = action.payload;
      const oldTile = state.getRow(y)[x].tile;
      const combinedCharacter = combineCharacters(oldTile, value, occupier);
      const clearing = !value || value === EMPTY_CELL;
      const isEmpty = !combinedCharacter || combinedCharacter === EMPTY_CELL;
      const oldOccupier = oldTile ? oldTile.occupier : 0;
      const combinedOccupier = combineOccupiers(oldOccupier, occupier, clearing);
      // For complicated reasons, when we revert a tile to the state it was prior to the user's
      // play, we want to store a capital letter in the cell.  This ensures that onChange() gets
      // called when the user types over the letter.
      const reverting = clearing && combinedOccupier > 0;
      const tileCharacter = reverting ? combinedCharacter.toUpperCase() : combinedCharacter;
      const tile = isEmpty ? Tile.Null : new Tile({
        character: tileCharacter,
        occupier: combinedOccupier,
      });

      newBoard.updateCell(x, y, (cell) => {
        return new Cell({ ...cell, isEmpty, tile });
      });

      return newBoard;
    },

    clearCells: (
      state,
      action: PayloadAction<{ positions: Point[]; player: number }>
    ) => {
      const newBoard = state.clone();
      const { positions, player } = action.payload;
      positions.forEach(({ x, y }) => {
        const oldTile = state.getRow(y)[x].tile;
        const newCharacter = combineCharacters(oldTile, EMPTY_CELL, player + 1);
        const isEmpty = !newCharacter || newCharacter === EMPTY_CELL;
        const oldOccupier = oldTile ? oldTile.occupier : 0;
        const newOccupier = combineOccupiers(oldOccupier, player + 1, true);
        const newTile = isEmpty ? Tile.Null : new Tile({
          character: newCharacter,
          occupier: newOccupier,
        });

        newBoard.updateCell(x, y, (cell) => {
          return new Cell({ ...cell, isEmpty, tile: newTile });
        });
      });
      return newBoard;
    },

    change: (_state, action: PayloadAction<Board>) => {
      const board = action.payload;
      return board;
    },

    init: (_state, action: PayloadAction<Board>) => {
      const board = action.payload;
      return board;
    },

    // Pretty inefficient to calculate width/height here as we do
    set: (_state, action: PayloadAction<{ letters: string, occupiers: string }>) => {
      const dim = Math.floor(Math.sqrt(action.payload.letters.length));
      return Board.fromStrings(
        action.payload.letters,
        action.payload.occupiers,
        dim,
        dim,
      );
    },

    reset: () => {
      return boardInitialState;
    },
  },
});

export default boardSlice;

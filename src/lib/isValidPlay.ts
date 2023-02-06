import { Cell, EMPTY_CELL, Placement, Rack } from 'ltypes';

interface NumberDictionary {
  [index: string]: number;
}

// Return two booleans: valid and replacement.
// If valid is true, this is a valid move and there is a change to be made to the board and to
// placements.
// If replacement is true, this is a replacement of one our letters on the board with another.
// This is a special case of a valid move.  We call a different method on the placements object
// to make the replacement.
// We (typically) don't currently allow the user to type over a placed letter with the same
// letter.
// character may not be EMPTY_CELL.  Use isValidRemoval() for removals.
/* eslint-disable-next-line max-statements */
const isValidPlay = (
  character: string,
  rack: Rack,
  placements: Placement[],
  rows: Cell[][],
  x: number,
  y: number,
  /* eslint-disable-next-line max-params */
  player: number) => {
  const rackLetters = rack.letters.map((rl) => rl.letter);
  const initialCounts: NumberDictionary = {};
  const counts = rackLetters.reduce((acc, letter) => {
    if (!acc[letter]) {
      acc[letter] = 0;
    }
    acc[letter] += 1;
    return acc;
  }, initialCounts);
  const placedLetters = placements.map((p) => p.character);
  placedLetters.forEach((letter) => {
    counts[letter] -= 1;
  });
  const upper = character.toUpperCase();
  if (!counts[upper] || counts[upper] <= 0) {
    return { valid: false, replacement: false };
  }

  const tile = rows[y][x].tile;
  // I think currently you can have cells with tiles that contain the character EMPTY_CELL.
  // This is unfortunate.  We should change things so that whenever you delete a character,
  // the tile is removed from the cell.
  if (!tile || tile.character === EMPTY_CELL) {
    return { valid: true, replacement: false };
  }

  if (tile.occupier === 3) {
    // This cannot be valid, not even as a replacement
    return { valid: false, replacement: false };
  }

  const existingPlacement = (placements.filter((p) => p.x === x && p.y === y).length > 0);
  if (existingPlacement) {
    // The tile must only be occupied by the current player.  So we have a replacement.
    return { valid: true, replacement: true };
  }

  if (tile.occupier === player + 1) {
    return { valid: false, replacement: false };
  }

  // At this point, we must be dealing with a cell occupied by the opponent (and only the
  // opponent).

  if (tile.character === upper) {
    // Placing the same letter over an opponent's tile with the same letter.
    return { valid: true, replacement: false };
  }
  return { valid: false, replacement: false };
};

export default isValidPlay;

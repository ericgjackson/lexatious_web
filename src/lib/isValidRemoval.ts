import { Cell, EMPTY_CELL, Placement } from 'ltypes';

/* eslint-disable-next-line max-params */
const isValidRemoval = (placements: Placement[], rows: Cell[][], x: number, y: number, player: number) => {
  const tile = rows[y][x].tile;
  if (!tile || tile.character === EMPTY_CELL) {
    return false;
  }
  if (placements.filter((p) => p.x === x && p.y === y).length === 0) {
    return false;
  }
  return tile.occupier === player + 1 || tile.occupier === 3;
};

export default isValidRemoval;

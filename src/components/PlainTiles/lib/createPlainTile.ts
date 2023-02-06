import {
  PLAIN_TILES_COLOR_DEFAULT,
  PLAIN_TILES_TILE_MAX_SCATTER,
  PLAIN_TILES_TILE_SIZE,
} from 'parameters';

import { CreatePlainTileOptions, PlainTile } from '../types';

import getX from './getX';
import getY from './getY';
import randomize from './randomize';

const createPlainTile = ({ cellIndex, character, color, rowIndex }: CreatePlainTileOptions): PlainTile => {
  const defaultColor = PLAIN_TILES_COLOR_DEFAULT;
  const x = getX(cellIndex) + PLAIN_TILES_TILE_SIZE / 2;
  const y = getY(0) + PLAIN_TILES_TILE_SIZE / 2;

  return {
    character,
    color: color || defaultColor,
    size: PLAIN_TILES_TILE_SIZE,
    transform: `rotate(${Math.floor(cellIndex / 2) === cellIndex / 2 ? 10 : -10}, ${x}, ${y})`,
    x: randomize(getX(cellIndex), PLAIN_TILES_TILE_MAX_SCATTER),
    y: randomize(getY(rowIndex), PLAIN_TILES_TILE_MAX_SCATTER),
  };
};

export default createPlainTile;

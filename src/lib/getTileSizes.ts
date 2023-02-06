import { BOARD_TILE_FONT_SIZE_MIN } from 'parameters';

interface TileSizes {
  tileFontSize: number;
  tileSize: number;
}

const getTileSizes = (tileSize: number): TileSizes => ({
  tileFontSize: Math.max(Math.round(tileSize * 0.6), BOARD_TILE_FONT_SIZE_MIN),
  tileSize,
});

export default getTileSizes;

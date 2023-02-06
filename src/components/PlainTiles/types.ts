export interface CreatePlainTileOptions {
  cellIndex: number;
  character: string;
  color?: string;
  rowIndex: number;
}

export interface CreatePlainTilesOptions {
  color?: string;
  content: string[][];
}

export interface PlainTile {
  character: string;
  color: string;
  size: number;
  transform: string;
  x: number;
  y: number;
}

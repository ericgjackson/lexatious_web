import isObject from './isObject';

interface TileJson {
  character: string;
  occupier: number;
}

export const isTileJson = (value: unknown): value is TileJson => {
  return isObject(value) && typeof value.character === 'string' && typeof value.occupier === 'number';
};

export default TileJson;

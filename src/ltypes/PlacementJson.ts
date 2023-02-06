import isObject from './isObject';

interface PlacementJson {
  character: string;
  x: number;
  y: number;
}

export const isPlacementJson = (value: unknown): value is PlacementJson => {
  return isObject(value) &&
    typeof value.character === 'string' &&
    typeof value.x === 'number' &&
    typeof value.y === 'number';
};

export default PlacementJson;

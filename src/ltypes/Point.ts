import isObject from './isObject';

interface Point {
  x: number;
  y: number;
}

export const isPoint = (value: unknown): value is Point => {
  return isObject(value) && typeof value.x === 'number' && typeof value.y === 'number';
};

export default Point;

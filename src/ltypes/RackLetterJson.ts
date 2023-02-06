import isObject from './isObject';

interface RackLetterJson {
  letter: string;
  selected: boolean;
}

export const isRackLetterJson = (value: unknown): value is RackLetterJson => {
  return (
    isObject(value) &&
    typeof value.selected === 'boolean' &&
    typeof value.letter === 'string'
  );
};

export default RackLetterJson;

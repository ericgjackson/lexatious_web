import isObject from './isObject';
import RackLetterJson, { isRackLetterJson } from './RackLetterJson';

interface RackJson {
  letters: RackLetterJson[];
}

export const isRackJson = (value: unknown): value is RackJson => {
  if (!isObject(value)) {
    return false;
  }
  const rackLetters = value.letters;
  if (!Array.isArray(rackLetters)) {
    return false;
  }
  for (const l of rackLetters) {
    if (!isRackLetterJson(l)) {
      return false;
    }
  }
  return true;
};

export default RackJson;

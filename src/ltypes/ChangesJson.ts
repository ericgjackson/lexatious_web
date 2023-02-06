import isObject from './isObject';

interface ChangeJson {
  row: number;
  col: number;
  letter: string;
}

type ChangesJson = ChangeJson[];

export const isChangeJson = (value: unknown): value is ChangeJson => {
  return (
    isObject(value) &&
    typeof value.letter === 'string' &&
    typeof value.row === 'number' &&
    typeof value.col === 'number'
  );
};

export const isChangesJson = (value: unknown): value is ChangesJson => {
  if (!Array.isArray(value)) {
    return false;
  }

  for (const change of value) {
    if (!isChangeJson(change)) {
      return false;
    }
  }

  return true;
};

export default ChangesJson;

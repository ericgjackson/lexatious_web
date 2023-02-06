import scrabble from './scrabble';

const configs = [scrabble];

const isConfigId = (configId: unknown): boolean => {
  return configs.some(({ id }) => id === configId);
};

export default isConfigId;

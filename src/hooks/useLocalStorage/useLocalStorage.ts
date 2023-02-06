import useLocalStorageConfigId from './useLocalStorageConfigId';
import useLocalStorageLocale from './useLocalStorageLocale';

const useLocalStorage = (): void => {
  useLocalStorageConfigId();
  useLocalStorageLocale();
};

export default useLocalStorage;

export const usePersist = () => {
  const setLocalStorage = (
    key: string,
    value: string,
  ): void => {
    localStorage.setItem(key, value);
  }

  const getLocalStorage = (
    key: string,
  ) => {
    return localStorage.getItem(key);
  }

  const deleteLocalStorage = (
    key: string,
  ): boolean => {
    const exist = getLocalStorage(key);
    localStorage.removeItem(key);
    return (exist !== null);
  }

  return {
    setLocalStorage,
    getLocalStorage,
    deleteLocalStorage,
  }
}

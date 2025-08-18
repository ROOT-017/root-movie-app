import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useMemo, useState } from "react";
import Storage from "react-native-storage";

export const useStorage = <T>(key: string, func: () => Promise<T>) => {
  const [item, setItem] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Memoize the storage instance to prevent unnecessary recreations
  const storage = useMemo(
    () =>
      new Storage({
        size: 10,
        storageBackend: AsyncStorage,
        enableCache: true,
      }),
    []
  );

  // Wrap functions in useCallback to maintain stable references
  const getItem = useCallback(
    async (forceRefresh = false): Promise<T | null> => {
      try {
        setLoading(true);

        if (!forceRefresh) {
          try {
            const cachedData = await storage.load({ key });
            setItem(cachedData);
            return cachedData;
          } catch (cacheError) {
            // Cache miss is expected, proceed to fetch fresh data
          }
        }

        const freshData = await func();
        await setItemInStorage(freshData);
        return freshData;
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
        return null;
      } finally {
        setLoading(false);
      }
    },
    [key, func, storage]
  );

  const setItemInStorage = useCallback(
    async (value: T) => {
      try {
        await storage.save({
          key,
          data: value,
          expires: null,
        });
        setItem(value);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      }
    },
    [key, storage]
  );

  const removeItem = useCallback(async () => {
    try {
      await storage.remove({ key });
      setItem(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    }
  }, [key, storage]);

  useEffect(() => {
    getItem();
  }, [getItem]);

  return {
    item,
    error,
    getItem,
    loading,
    removeItem,
    setItemInStorage,
    refresh: () => getItem(true), // Added refresh function for force updates
  };
};

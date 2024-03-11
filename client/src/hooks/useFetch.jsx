import { useEffect, useState } from 'react';
import useLocalStorage from './useLocalStorage';
export function useFetch(fetchFn, initialValue, resource='') {
  const [loading, setLoading] = useState();
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState(initialValue);
  const { setItem, value } = useLocalStorage("album");

  useEffect(() => {
    async function fetchData() {
        setLoading(true);
      try {
        const data = await fetchFn();
        console.log("ddd", data)
        setFetchedData(data);
        if(resource === 'albums'){
          setItem(data);
        }
      } catch (error) {
        setError({ message: error.message || 'Failed to fetch data.' });
      }

      setLoading(false);
    }

    fetchData();
  }, [fetchFn]);

  return {
    loading,
    fetchedData,
    error
  }
}
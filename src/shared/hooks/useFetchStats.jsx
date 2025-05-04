import { useState, useEffect, useCallback } from 'react';
import { getStats } from '../../services';

export default function useFetchStats(pollInterval = 30000) {
  const [data, setData]      = useState(null);
  const [isLoading, setLoad] = useState(false);
  const [error, setError]    = useState(null);

  const fetch = useCallback(async () => {
    setLoad(true);
    const response = await getStats();
    setLoad(false);

    if (response.error) setError(response.e);
    else               setData(response.data);
  }, []);

  useEffect(() => {
    fetch();

    const id = setInterval(fetch, pollInterval);
    return () => clearInterval(id);
  }, [fetch, pollInterval]);

  return { data, isLoading, error };
}

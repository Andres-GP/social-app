import { useEffect, useState } from "react";
import { fetchTrends, Trend } from "../fetchers";

export function useTrends() {
  const [trends, setTrends] = useState<Trend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTrends()
      .then(setTrends)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { trends, loading, error };
}

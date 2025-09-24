export interface Trend {
  country: string;
  hashtag: string;
  shares: number;
  link: string;
}

export async function fetchTrends(): Promise<Trend[]> {
  const res = await fetch("/api/trending");

  if (!res.ok) {
    throw new Error("Failed to fetch trends");
  }

  const data = await res.json();

  if (data.error) throw new Error(data.error);

  return data;
}

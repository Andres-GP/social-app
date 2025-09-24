// lib/fetchers.ts
export interface User {
  fullName: string;
  userName: string;
  avatar: string;
}

export async function fetchUsers(): Promise<User[]> {
  const res = await fetch("https://randomuser.me/api/?results=3&inc=name,login,picture");

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  const data = await res.json();

  return data.results.map((u: any) => ({
    fullName: `${u.name.first} ${u.name.last}`,
    userName: `@${u.login.username}`,
    avatar: u.picture.medium,
  }));
}

// lib/fetchers.ts
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

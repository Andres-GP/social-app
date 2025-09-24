"use client";

import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import WhoToFollow from "./WhoToFollow";
import Trending from "./Trending";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import { useTranslations } from "next-intl";

interface Trend {
  country: string;
  hashtag: string;
  shares: number;
  link: string;
}

interface User {
  fullName: string;
  userName: string;
  avatar: string;
}

const Widgets = () => {
  const [users, setUsers] = useState<User[]>([]);
  const t = useTranslations("post");

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=3&inc=name,login,picture")
      .then((res) => res.json())
      .then((data) => {
        const formatted: User[] = data.results.map((u: any) => ({
          fullName: `${u.name.first} ${u.name.last}`,
          userName: `@${u.login.username}`,
          avatar: u.picture.medium,
        }));
        setUsers(formatted);
      });
  }, []);

  const [trends, setTrends] = useState<Trend[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/trending")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch trends");
        return res.json();
      })
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setTrends(data);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader className="md:w-[400px] xs:w-full" />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <aside className="p-3 flex flex-col space-y-4 md:w-[400px] xs:w-full">
      <section className="bg-[#EFF3F4] text-[#89959D] flex items-center space-x-3 h-[44px] rounded-full pl-5 ps-10">
        <MagnifyingGlassIcon className="w-[20px] h-[20px]" />
        <label htmlFor="search" className="sr-only">
          {t("search_post")}
        </label>
        <input
          id="search"
          type="text"
          placeholder={t("search_post")}
          className="bg-transparent outline-none"
        />
      </section>

      <section className="bg-[#EFF3F4] rounded-xl p-3" aria-label="Trending posts">
        {trends.length > 0 &&
          trends.map((trend, index) => (
            <Trending
              key={index}
              link={trend.link}
              country={trend.country}
              hashtag={trend.hashtag}
              shares={trend.shares}
            />
          ))}
      </section>

      <section className="bg-[#EFF3F4] rounded-xl p-3" aria-label="Who to follow">
        {users.length > 0 &&
          users.map((user, index) => (
            <WhoToFollow
              key={index}
              avatar={user.avatar}
              userName={user.userName}
              fullName={user.fullName}
            />
          ))}
      </section>
    </aside>
  );
};

export default Widgets;

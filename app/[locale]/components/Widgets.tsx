"use client";

import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import WhoToFollow from "./WhoToFollow";
import Trending from "./Trending";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import { useTranslations } from "next-intl";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/slices/searchSlice";
import { useUsers } from "@/hooks/useUsers";
import { useTrends } from "@/hooks/useTrends";

interface WidgetsProps {
  isDetail?: boolean;
}

const Widgets = ({ isDetail }: WidgetsProps) => {
  const t = useTranslations("post");
  const dispatch = useDispatch();
  const { trends, loading: trendsLoading, error: trendsError } = useTrends();
  const { users, loading: usersLoading, error: usersError } = useUsers();

  if (trendsLoading || usersLoading) return <Loader className="md:w-[400px] xs:w-full" />;
  if (trendsError || usersError)
    return <ErrorMessage error={trendsError ?? usersError ?? "Unknown error"} />;

  return (
    <aside className="p-3 flex flex-col space-y-4 md:w-[400px] xs:w-full">
      {isDetail && (
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
            onChange={(e) => dispatch(setSearchQuery(e.target.value))}
          />
        </section>
      )}

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

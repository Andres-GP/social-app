import React from "react";

interface TrendingProps {
  link: string;
  country: string;
  hashtag: string;
  shares: number;
}
const Trending = ({ link, country, hashtag, shares }: TrendingProps) => {
  return (
    <a href={link ?? "https://www.reddit.com/"} target="_blank" rel="noopener noreferrer">
      <article className="flex flex-col py-3 hover:-translate-y-1 transition space-y-0.5">
        <div className="flex justify-between text-[#53671] text-[13px]">
          <span>{country} Trending</span>
        </div>
        <p className="font-bold text-sm">{hashtag}</p>
        <p className="text-[#53671] text-xs">{shares ? `${shares} shares` : ""}</p>
      </article>
    </a>
  );
};

export default Trending;

import React from "react";
import { useTranslations } from "next-intl";

interface TrendingProps {
  link: string;
  country: string;
  hashtag: string;
  shares: number;
}
const Trending = ({ link, country, hashtag, shares }: TrendingProps) => {
  const t = useTranslations("common");
  return (
    <a href={link ?? "https://www.reddit.com/"} target="_blank" rel="noopener noreferrer">
      <article className="flex flex-col py-3 hover:-translate-y-1 transition space-y-0.5">
        <div className="flex justify-between text-[#53671] text-[13px]">
          <span>
            {country} {t("trending")}
          </span>
        </div>
        <p className="font-bold text-sm">{hashtag}</p>
        <p className="text-[#53671] text-xs">{shares ? `${shares} ${t("shares")}` : ""}</p>
      </article>
    </a>
  );
};

export default Trending;

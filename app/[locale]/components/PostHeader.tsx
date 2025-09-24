"use client";
import React from "react";
import Image from "next/image";
import { Timestamp } from "firebase/firestore";
import { useTranslations } from "next-intl";

interface PostHeaderProps {
  username: string;
  name: string;
  timestamp?: Timestamp;
  text: string;
  replyTo?: string;
}

const PostHeader = ({ username, name, timestamp, text, replyTo }: PostHeaderProps) => {
  const t = useTranslations("post");

  const date = timestamp ? timestamp.toDate() : new Date(0);
  const diffMs = new Date().getTime() - date.getTime();
  const daysAgo = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  return (
    <article className="flex pl-3 space-x-5">
      <Image
        src="/profile_default.png"
        width={44}
        height={44}
        alt="Profile Picture"
        className="w-11 h-11 rounded-full z-10 bg-white"
      />
      <div className="text-[15px] flex flex-col space-y-1.5">
        <header className="flex space-x-1.5 text-[#707E89]">
          <span className="font-bold text-[#0F1419] whitespace-nowrap overflow-hidden text-ellipsis inline-block max-[60px] min-[400]:max-w-[100px] min-[500px]:max-w-[140px] sm:max-w-[160px]">
            {name.length > 0 ? name : "Guest"}
          </span>
          <span className="inline-block whitespace-nowrap overflow-hidden text-ellipsis max-[60px] min-[400]:max-w-[100px] min-[500px]:max-w-[140px] sm:max-w-[160px]">
            {username.length > 0 ? username : "guest123"}
          </span>
          {timestamp && (
            <>
              <span aria-hidden="true">·</span>
              <span>{t("days_ago", { days_ago: daysAgo })}</span>
            </>
          )}
        </header>
        <p>{text}</p>

        {replyTo && (
          <span className="text-[15px] text-[#707E89]">
            {t("replying_to")} <span className="text-[#F4AF01]">@{replyTo}</span>
          </span>
        )}
      </div>
    </article>
  );
};

export default PostHeader;

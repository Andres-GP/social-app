import React from "react";
import PostHeader from "./PostHeader";
import {
  ArrowUpTrayIcon,
  ChartBarIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

const Post = () => {
  return (
    <article>
      <PostHeader />
      <footer className="ml-16 p-3 flex space-x-14">
        <button
          className="relative cursor-pointer hover:text-[#F4AF01] transition"
          aria-label="Comment"
        >
          <ChatBubbleOvalLeftEllipsisIcon className="w-[22px] h-[22px]" />
          <span className="absolute text-xs top-1 -right-3">2</span>
        </button>
        <button
          className="relative cursor-pointer hover:text-[#F4AF01] transition"
          aria-label="Like"
        >
          <HeartIcon className="w-[22px] h-[22px]" />
          <span className="absolute text-xs top-1 -right-3">2</span>
        </button>
        <div className="relative cursor-not-allowed" aria-hidden="true">
          <ChartBarIcon className="w-[22px] h-[22px]" />
        </div>
        <div className="relative cursor-not-allowed" aria-hidden="true">
          <ArrowUpTrayIcon className="w-[22px] h-[22px]" />
        </div>
      </footer>
    </article>
  );
};

export default Post;

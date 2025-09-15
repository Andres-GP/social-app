import React from "react";
import PostHeader from "./PostHeader";
import {
  ArrowUpTrayIcon,
  ChartBarIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

interface CommentProps {
  name: string;
  username: string;
  text: string;
}
const Comment = ({ name, username, text }: CommentProps) => {
  return (
    <div className="border-b border-gray-100">
      <PostHeader name={name} username={username} text={text} />

      <div className="flex space-x-14 p-3 ms-16">
        <ChatBubbleOvalLeftEllipsisIcon className="w-[22px] h-[22px] text-[#707E89] cursor-not-allowed" />
        <HeartIcon className="w-[22px] h-[22px] cursor-not-allowed" />
        <ChartBarIcon className="w-[22px] h-[22px] cursor-not-allowed" />
        <ArrowUpTrayIcon className="w-[22px] h-[22px] cursor-not-allowed" />
      </div>
    </div>
  );
};

export default Comment;

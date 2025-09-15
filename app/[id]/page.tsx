import React from "react";
import Sidebar from "../components/Sidebar";
import SignUpPrompt from "../components/SignUpPrompt";
import Widgets from "../components/Widgets";
import {
  ArrowLeftIcon,
  ArrowUpTrayIcon,
  ChartBarIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/firebase";
import Comment from "../components/Comment";

const fetchPost = async (id: string) => {
  const postRef = doc(db, "posts", id);
  const postSnap = await getDoc(postRef);
  return postSnap.data();
};

interface PageProps {
  params: {
    id: string;
  };
}

interface Comment {
  name: string;
  text: string;
  username: string;
}
const page = async ({ params }: PageProps) => {
  const { id } = params;
  const post = await fetchPost(id);
  return (
    <>
      <div className="text-[#F1419] min-h-screen max-w-[1400px] mx-auto flex flex-col md:flex-row">
        <Sidebar />

        <div className="flex-grow border max-w2xl border-x border-gray-100">
          <div className="flex items-center py-4 px-3 text-lg sm:text-xl sticky top-0 z-50 bg-white bg-opacity-80 backdrop-blur-sm font-bold border-b border-gray-100">
            <Link href="/">
              <ArrowLeftIcon className="w-5 h-5 mr-10" />
            </Link>
            Bumble
          </div>

          <div className="flex flex-col p-3 sp space-y-5 border-b border-gray-100">
            <div className="flex justify-between items-center mb-1.5">
              <div className="flex space-x-3">
                <Image
                  src="/profile_default.png"
                  width={44}
                  height={44}
                  alt="Profile Picture"
                  className="w-11 h-11 rounded-full"
                />
                <div className="flex flex-col text-[15px]">
                  <span className="font-bold whitespace-nowrap overflow-hidden text-ellipsis inline-block max-[60px] min-[400]:max-w-[100px] min-[500px]:max-w-[140px] sm:max-w-[160px]">
                    {post?.name.length > 0 ? post?.name : "Guest"}
                  </span>
                  <span className="text-[#707E89] whitespace-nowrap overflow-hidden text-ellipsis inline-block max-[60px] min-[400]:max-w-[100px] min-[500px]:max-w-[140px] sm:max-w-[160px]">
                    {post?.username.length > 0 ? post?.username : "guest123"}
                  </span>
                </div>
              </div>
              <EllipsisHorizontalIcon className="w-5 h-5" />
            </div>

            <span className="text-[15px]">{post?.text}</span>
          </div>

          <div className="border-b border-gray-100 p-3 text-[15px]">
            <span className="font-bold">{post?.likes.length}</span> Likes
          </div>

          <div className="border-b border-gray-100 p-3 text-[15px] flex justify-evenly">
            <ChatBubbleOvalLeftEllipsisIcon className="w-[22px] h-[22px] text-[#707E89] cursor-not-allowed" />
            <HeartIcon className="w-[22px] h-[22px] text-[#707E89] cursor-not-allowed" />
            <ChartBarIcon className="w-[22px] h-[22px] text-[#707E89] cursor-not-allowed" />
            <ArrowUpTrayIcon className="w-[22px] h-[22px] text-[#707E89] cursor-not-allowed" />
          </div>

          {post?.comments.map((comment: Comment) => (
            <Comment name={comment.name} username={comment.username} text={comment.text} />
          ))}
        </div>
        <Widgets />
      </div>

      <SignUpPrompt />
    </>
  );
};

export default page;

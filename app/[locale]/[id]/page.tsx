"use client";
import React from "react";
import Sidebar from "../components/Sidebar";
import SignUpPrompt from "../components/SignUpPrompt";
import Widgets from "../components/Widgets";
import { ArrowLeftIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
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
      <main className="text-[#F1419] min-h-screen max-w-[1400px] mx-auto flex flex-col md:flex-row">
        <aside>
          <Sidebar />
        </aside>

        <article className="flex-grow border max-w2xl border-x border-gray-100">
          <header className="flex items-center py-4 px-3 text-lg sm:text-xl sticky top-0 z-50 bg-white bg-opacity-80 backdrop-blur-sm font-bold border-b border-gray-100">
            <Link href="/" aria-label="Back to Home">
              <ArrowLeftIcon className="w-5 h-5 mr-10" />
            </Link>
            Social App
          </header>

          <section className="flex flex-col p-3 space-y-5 border-b border-gray-100">
            <header className="flex justify-between items-center mb-1.5">
              <div className="flex space-x-3">
                <Image
                  src="/profile_default.png"
                  width={44}
                  height={44}
                  alt="Profile Picture"
                  className="w-11 h-11 rounded-full"
                />
                <div className="flex flex-col text-[15px]">
                  <strong className="whitespace-nowrap overflow-hidden text-ellipsis inline-block max-[60px] min-[400]:max-w-[100px] min-[500px]:max-w-[140px] sm:max-w-[160px]">
                    {post?.name.length > 0 ? post?.name : "Guest"}
                  </strong>
                  <span className="text-[#707E89] whitespace-nowrap overflow-hidden text-ellipsis inline-block max-[60px] min-[400]:max-w-[100px] min-[500px]:max-w-[140px] sm:max-w-[160px]">
                    {post?.username.length > 0 ? post?.username : "guest123"}
                  </span>
                </div>
              </div>
              <EllipsisHorizontalIcon className="w-5 h-5" />
            </header>

            <p className="text-[15px]">{post?.text}</p>
          </section>

          <section className="border-b border-gray-100 p-3 text-[15px]">
            <strong>{post?.likes.length} Likes</strong>
          </section>

          <section>
            {post?.comments.map((comment: Comment, idx: number) => (
              <Comment
                key={idx}
                name={comment.name}
                username={comment.username}
                text={comment.text}
              />
            ))}
          </section>
        </article>

        <aside>
          <Widgets />
        </aside>
      </main>

      <footer>
        <SignUpPrompt />
      </footer>
    </>
  );
};

export default page;

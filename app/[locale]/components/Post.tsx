"use client";

import React from "react";
import PostHeader from "./PostHeader";
import { ChatBubbleOvalLeftEllipsisIcon, HeartIcon } from "@heroicons/react/24/outline";

import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { arrayRemove, arrayUnion, doc, DocumentData, updateDoc } from "firebase/firestore";
import { openCommentModal, openLogInModal, setCommentDetails } from "@/redux/slices/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { RootState } from "@/redux/store";
import { db } from "@/firebase";

interface PostProps {
  data: DocumentData;
  id: string;
}

const Post = ({ data, id }: PostProps) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  async function likePost() {
    if (!user.username) {
      dispatch(openLogInModal());
      return;
    }
    const postRef = doc(db, "posts", id);

    if (data.likes.includes(user.uid)) {
      await updateDoc(postRef, {
        likes: arrayRemove(user.uid),
      });
    } else {
      await updateDoc(postRef, {
        likes: arrayUnion(user.uid),
      });
    }
  }
  return (
    <article className="border-b border-gray-100 pt-4">
      <Link href={"/" + id}>
        <PostHeader
          username={data.username}
          name={data.name}
          timestamp={data.timestamp}
          text={data.text}
        />
      </Link>
      <div className="ml-16 p-3 flex space-x-14">
        <button
          className="relative cursor-pointer hover:text-[#F4AF01] transition"
          aria-label="Comment"
          onClick={() => {
            if (!user.username) {
              dispatch(openLogInModal());
              return;
            }

            dispatch(
              setCommentDetails({
                name: data.name,
                username: data.username,
                id: id,
                text: data.text,
              })
            );
            dispatch(openCommentModal());
          }}
        >
          <ChatBubbleOvalLeftEllipsisIcon className="w-[22px] h-[22px]" />
        </button>
        <button
          className="relative cursor-pointer hover:text-[#F4AF01] transition"
          aria-label="Like"
        >
          {data.likes.includes(user.uid) ? (
            <HeartSolidIcon
              className="w-[22px] h-[22px] cursor-pointer text-pink-500 transition"
              onClick={() => likePost()}
            />
          ) : (
            <HeartIcon
              className="w-[22px] h-[22px] cursor-pointer hover:text-pink-500 transition"
              onClick={() => likePost()}
            />
          )}
          {data.likes.length > 0 && (
            <span className="absolute text-xs top-1 -right-3">{data.likes.length}</span>
          )}
        </button>
      </div>
    </article>
  );
};

export default Post;

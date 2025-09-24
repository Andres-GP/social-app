"use client";
import React, { useEffect } from "react";
import PostInput from "./PostInput";
import Post from "./Post";
import { Timestamp } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { closeLoadingScreen } from "@/redux/slices/loadingSlice";
import { useTranslations } from "next-intl";
import { RootState } from "@/redux/store";
import { usePosts } from "@/hooks/usePosts";

interface PostType {
  id: string;
  username?: string;
  content?: string;
  timestamp?: Timestamp;
  text?: string;
}

const PostFeed = () => {
  const posts = usePosts();
  const dispatch = useDispatch();
  const t = useTranslations("home");
  const searchText = useSelector((state: RootState) => state.search.query);
  const filteredPosts =
    searchText.trim() === ""
      ? posts
      : posts.filter((post) => post.text?.toLowerCase().includes(searchText.toLowerCase()));

  useEffect(() => {
    if (posts.length > 0) {
      dispatch(closeLoadingScreen());
    }
  }, [posts, dispatch]);

  return (
    <div className="flex-grow border max-w2xl border-x border-gray-100">
      <div className="py-4 px-3 text-lg sm:text-xl sticky top-0 z-50 bg-white bg-opacity-80 backdrop-blur-sm font-bold border-b border-gray-100">
        {t("home")}
      </div>
      <PostInput />
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => <Post key={post.id} data={post} id={post.id} />)
      ) : (
        <p className="px-3 py-2 text-gray-500">No hay resultados</p>
      )}
    </div>
  );
};

export default PostFeed;

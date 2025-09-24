"use client";
import React, { useEffect, useState } from "react";
import PostInput from "./PostInput";
import Post from "./Post";
import { collection, onSnapshot, orderBy, query, Timestamp } from "firebase/firestore";
import { db } from "@/firebase";
import { useDispatch } from "react-redux";
import { closeLoadingScreen } from "@/redux/slices/loadingSlice";
import { useTranslations } from "next-intl";

interface PostType {
  id: string;
  username?: string;
  content?: string;
  timestamp?: Timestamp;
}

const PostFeed = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const dispatch = useDispatch();
  const t = useTranslations("home");

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const snapshotDocs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<PostType, "id">),
      }));
      setPosts(snapshotDocs);

      dispatch(closeLoadingScreen());
    });

    return unsubscribe;
  }, []);
  return (
    <div className="flex-grow border max-w2xl border-x border-gray-100">
      <div className="py-4 px-3 text-lg sm:text-xl sticky top-0 z-50 bg-white bg-opacity-80 backdrop-blur-sm font-bold border-b border-gray-100">
        {t("home")}
      </div>
      <PostInput />
      {posts.length > 0 ? (
        posts.map((post) => <Post key={post.id} data={post} id={post.id} />)
      ) : (
        <></>
      )}
    </div>
  );
};

export default PostFeed;

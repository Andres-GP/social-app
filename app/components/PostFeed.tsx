import React from "react";
import PostInput from "./PostInput";
import Post from "./Post";

const PostFeed = () => {
  return (
    <div className="flex-grow border max-w2xl border-x border-gray-100">
      <div className="py-4 px-3 text-lg sm:text-xl sticky top-0 z-50 bg-white bg-opacity-80 backdrop-blur-sm font-bold border-b border-gray-100">
        Home
      </div>
      <PostInput />
      <Post />
    </div>
  );
};

export default PostFeed;

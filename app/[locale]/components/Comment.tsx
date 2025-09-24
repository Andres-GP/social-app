import React from "react";
import PostHeader from "./PostHeader";

interface CommentProps {
  name: string;
  username: string;
  text: string;
}
const Comment = ({ name, username, text }: CommentProps) => {
  return (
    <div className="border-b border-gray-100">
      <PostHeader name={name} username={username} text={text} />
    </div>
  );
};

export default Comment;

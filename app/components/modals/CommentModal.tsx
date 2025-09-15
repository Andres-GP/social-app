"use client";
import { Modal } from "@mui/material";
import { RootState } from "@/redux/store";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeCommentModal } from "@/redux/slices/modalSlice";
import PostHeader from "../PostHeader";
import PostInput from "../PostInput";
import { XMarkIcon } from "@heroicons/react/24/outline";

const CommentModal = () => {
  const open = useSelector((state: RootState) => state.modals.commentModalOpen);
  const commentDetails = useSelector((state: RootState) => state.modals.commentPostDetails);
  const dispatch = useDispatch();
  return (
    <>
      <Modal
        className="flex justify-center items-center"
        open={open}
        onClose={() => dispatch(closeCommentModal())}
      >
        <div className="bg-white w-full h-full sm:w-[600px] sm:h-fit sm:rounded-xl outline:none relative">
          <button type="button" aria-label="Close" onClick={() => dispatch(closeCommentModal())}>
            <XMarkIcon className="w-7 cursor-pointer" />
          </button>
          <div className="pt-5 pb-10 px-0 sm:px-5 flex flex-col">
            <PostHeader
              name={commentDetails.name}
              username={commentDetails.username}
              text={commentDetails.text}
              replyTo={commentDetails.username}
            />
            <div className="mt-4">
              <PostInput insideModal={true} />
            </div>
            <div className="absolute w-0.5 h-32 bg-gray-300 left-[33px] sm:left-[53px] top-20 z-0"></div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CommentModal;

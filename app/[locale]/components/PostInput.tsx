"use client";
import React, { useState } from "react";
import Image from "next/image";
import { RootState } from "@/redux/store";
import {
  CalendarIcon,
  ChartBarIcon,
  FaceSmileIcon,
  MapPinIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import Button from "./Button";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/firebase";
import { useDispatch, useSelector } from "react-redux";
import { closeCommentModal, openLogInModal } from "@/redux/slices/modalSlice";
import { useTranslations } from "next-intl";

interface PostInputProps {
  insideModal?: boolean;
}
const PostInput = ({ insideModal }: PostInputProps) => {
  const [text, setText] = useState("");
  const user = useSelector((state: RootState) => state.user);
  const commentDetails = useSelector((state: RootState) => state.modals.commentPostDetails);
  const dispatch = useDispatch();
  const t = useTranslations("post");

  async function sendPost() {
    if (!user.username) {
      dispatch(openLogInModal());
      return;
    }
    await addDoc(collection(db, "posts"), {
      text: text,
      name: user.name,
      username: user.username,
      timestamp: serverTimestamp(),
      likes: [],
      comments: [],
    });
    setText("");
  }

  async function sendComment() {
    const postRef = doc(db, "posts", commentDetails.id);

    await updateDoc(postRef, {
      comments: arrayUnion({
        name: user.name,
        username: user.username,
        text: text,
      }),
    });

    setText("");
    dispatch(closeCommentModal());
  }

  return (
    <div className="flex space-x-5 p-3 border-b border-gray-100">
      {insideModal && (
        <Image
          src={"/profile_default.png"}
          width={44}
          height={44}
          alt={"Profile Picture"}
          className="w-11 h-11 z-10 rounded-full bg-white"
        />
      )}
      <div className="w-full">
        <label htmlFor="postContent" className="sr-only">
          {t("whats_up")}
        </label>
        <textarea
          id="postContent"
          name="postContent"
          className="resize-none outline-none w-full min-h-[50px] text-lg"
          placeholder={insideModal ? t("send_your_replay") : t("whats_up")}
          onChange={(event) => setText(event.target.value)}
          value={text}
        />

        <div className="flex justify-between pt-5 items-center border-t border-gray-100">
          <div role="group" aria-label="Post tools" className="flex space-x-1.5">
            <PhotoIcon className="w-[22px] h-[22px] text-[#F4AF01] hover:-translate-y-1 transition" />
            <ChartBarIcon className="w-[22px] h-[22px] text-[#F4AF01] hover:-translate-y-1 transition" />
            <FaceSmileIcon className="w-[22px] h-[22px] text-[#F4AF01] hover:-translate-y-1 transition" />
            <CalendarIcon className="w-[22px] h-[22px] text-[#F4AF01] hover:-translate-y-1 transition" />
            <MapPinIcon className="w-[22px] h-[22px] text-[#F4AF01] hover:-translate-y-1 transition" />
          </div>

          <Button
            disabled={!text}
            text={t("post")}
            className="bg-[#F4AF01] disabled:bg-opacity-60"
            handleClick={() => (insideModal ? sendComment() : sendPost())}
          />
        </div>
      </div>
    </div>
  );
};

export default PostInput;

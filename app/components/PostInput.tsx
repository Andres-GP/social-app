"use client";
import React, { useState } from "react";
import Image from "next/image";
import {
  CalendarIcon,
  ChartBarIcon,
  FaceSmileIcon,
  MapPinIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import Button from "./Button";

const PostInput = () => {
  const [press, setPress] = useState();
  return (
    <form className="flex space-x-5 p-3">
      {/* <Image src="" width={44} height={44} alt="Logo" className="w-11 h-11" /> */}

      <div className="w-full">
        <label htmlFor="postContent" className="sr-only">
          What's happening!?
        </label>
        <textarea
          id="postContent"
          name="postContent"
          className="resize-none outline-none w-full min-h-[50px] text-lg"
          placeholder="What's happening!?"
        />

        <div className="flex justify-between pt-5 items-center">
          <div role="group" aria-label="Post tools" className="flex space-x-1.5">
            <PhotoIcon className="w-[22px] h-[22px] text-[#F4AF01]" />
            <ChartBarIcon className="w-[22px] h-[22px] text-[#F4AF01]" />
            <FaceSmileIcon className="w-[22px] h-[22px] text-[#F4AF01]" />
            <CalendarIcon className="w-[22px] h-[22px] text-[#F4AF01]" />
            <MapPinIcon className="w-[22px] h-[22px] text-[#F4AF01]" />
          </div>

          <Button text="Post" className="bg-[#F4AF01]" handleClick={() => setPress()} />
        </div>
      </div>
    </form>
  );
};

export default PostInput;

import React from "react";
import Image from "next/image";

const PostHeader = () => {
  return (
    <article className="flex pl-3 space-x-5">
      {/* <Image 
      src={} 
      width={44} 
      height={44} 
      alt="Profile Picture" 
      className="w-11 h-11"
    /> */}
      <div className="text-[15px] flex flex-col space-y-1.5">
        <header className="flex space-x-1.5 text-[#707E89]">
          <span className="font-bold text-[#0F1419] whitespace-nowrap overflow-hidden text-ellipsis inline-block max-[60px] min-[400]:max-w-[100px] min-[500px]:max-w-[140px] sm:max-w-[160px]">
            Guest
          </span>
          <span className="inline-block whitespace-nowrap overflow-hidden text-ellipsis max-[60px] min-[400]:max-w-[100px] min-[500px]:max-w-[140px] sm:max-w-[160px]">
            @guest0000234
          </span>
          <span aria-hidden="true">·</span>
          <time dateTime="2025-08-28">A day ago</time>
        </header>
        <p>wefwergerg</p>
      </div>
    </article>
  );
};

export default PostHeader;

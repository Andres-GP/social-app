"use client";

import React from "react";
import Button from "./Button";

const SignUpPrompt = () => {
  return (
    <footer className="fixed w-full h-[80px] bg-[#F4AF01] bottom-0 flex justify-center items-center md:space-x-5 lg:justify-between lg:px-20 xl:px:30 2xl:px-80">
      <section className="hidden md:flex flex-col text-white">
        <h2 className="text-xl font-bold">Don't miss out on the buzz</h2>
        <p>People on Busy Bee are always the first to know.</p>
      </section>

      <nav className="flex space-x-2 w-full md:w-fit p-3" aria-label="User authentication">
        <Button
          text="Log In"
          className="w-full h-[48px] md:w-[88px] md:h-[40px] md:text-smt text-md border-2 border-gray-100 font-bold bg-gray-800 hover:bg-gray-800/25"
          handleClick={() => console.log("press")}
        />

        <Button
          text="Sign Up"
          className="w-[88px] h-[40px] md:text-sm font-bold bg-white text-black"
          handleClick={() => console.log("press")}
        />
      </nav>
    </footer>
  );
};

export default SignUpPrompt;

"use client";

import React from "react";
import SignUpModal from "./modals/SignUpModal";
import LogInModal from "./modals/LogInModal";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const SignUpPrompt = () => {
  const name = useSelector((state: RootState) => state.user.name);
  return (
    !name && (
      <footer className="fixed w-full h-[80px] bg-[#F4AF01] bottom-0 flex justify-center items-center md:space-x-5 lg:justify-between lg:px-20 xl:px:30 2xl:px-80">
        <section className="hidden md:flex flex-col text-white">
          <h2 className="text-xl font-bold">Don't miss out on the buzz</h2>
          <p>People on Busy Bee are always the first to know.</p>
        </section>

        <nav className="flex space-x-2 w-full md:w-fit p-3" aria-label="User authentication">
          <LogInModal />
          <SignUpModal />
        </nav>
      </footer>
    )
  );
};

export default SignUpPrompt;

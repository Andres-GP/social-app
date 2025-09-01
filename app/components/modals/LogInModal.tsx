"use client";

import React, { useState } from "react";
import Button from "../Button";
import { Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { openLogInModal, closeLogInModal } from "@/redux/slices/modalSlice";
import { EyeIcon, EyeSlashIcon, XMarkIcon } from "@heroicons/react/24/outline";

const LogInModal = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const isOpen = useSelector((state: RootState) => state.modals.logInModalOpen);

  const dispatch: AppDispatch = useDispatch();

  return (
    <>
      <Button
        text="Log In"
        className="w-full h-[48px] md:w-[88px] md:h-[40px] md:text-smt text-md border-2 border-gray-100 font-bold bg-gray-800 hover:bg-gray-800/25"
        handleClick={() => dispatch(openLogInModal())}
      />

      <Modal
        className="flex justify-center items-center"
        open={isOpen}
        onClose={() => dispatch(closeLogInModal())}
      >
        <section
          role="dialog"
          aria-modal="true"
          aria-labelledby="login-title"
          className="w-full h-full sm:w-[600px] sm:h-fit bg-white sm:rounded-xl mt-20 flex flex-col"
        >
          <header className="flex items-center justify-between px-5 pt-5">
            <h1 id="login-title" className="text-3xl font-bold">
              Log in
            </h1>
            <button type="button" aria-label="Close" onClick={() => dispatch(closeLogInModal())}>
              <XMarkIcon className="w-7 cursor-pointer" />
            </button>
          </header>
          <main className="flex-1 px-4 sm:px-20 py-10">
            <form className="space-y-5">
              <div className="flex flex-col">
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  className="w-full h-[54px] border border-gray-200 outline-none ps-3 rounded-[4px] focus:border-[#F4AF01] transition"
                  placeholder="Email"
                  type="email"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div className="w-full h-[54px] border border-gray-200 outline-none ps-3 rounded-[4px] focus-within:border-[#F4AF01] transition flex items-center overflow-hidden">
                  <input
                    id="password"
                    name="password"
                    className="w-full h-full outline-none"
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    required
                  />
                  <button
                    type="button"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword(!showPassword)}
                    className="w-7 h-7 text-gray-400 cursor-pointer mr-2"
                  >
                    {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>
              <Button
                text="Log In"
                className="bg-[#F4AF01] h-[48px] shadow-md w-full"
                handleClick={() => console.log("Login pressed")}
              />
            </form>
          </main>
          <footer className="px-4 sm:px-20 pb-6 text-center">
            <span className="mb-5 text-sm block">Or</span>
            <Button
              text="Log In as Guest"
              className="bg-[#F4AF01] h-[48px] shadow-md w-full"
              handleClick={() => console.log("Guest login pressed")}
            />
          </footer>
        </section>
      </Modal>
    </>
  );
};

export default LogInModal;

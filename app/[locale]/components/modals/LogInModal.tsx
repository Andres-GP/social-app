"use client";

import React, { useState } from "react";
import Button from "../Button";
import { Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { openLogInModal, closeLogInModal } from "@/redux/slices/modalSlice";
import { EyeIcon, EyeSlashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { useTranslations } from "next-intl";

const LogInModal = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoginDisabled, setIsLoginDisabled] = useState<boolean>(true);
  const isOpen = useSelector((state: RootState) => state.modals.logInModalOpen);
  const t = useTranslations("session");
  const dispatch: AppDispatch = useDispatch();

  const handleEmail = (val: string) => {
    setEmail(val);
    if (password.length > 0 && email.length > 0) {
      setIsLoginDisabled(false);
    } else {
      setIsLoginDisabled(true);
    }
  };

  const handlePassword = (val: string) => {
    setPassword(val);
    if (password.length > 0 && email.length > 0) {
      setIsLoginDisabled(false);
    } else {
      setIsLoginDisabled(true);
    }
  };

  async function handleLogin() {
    await signInWithEmailAndPassword(auth, email, password);
    dispatch(closeLogInModal());
  }

  async function handleLoginAsGuest() {
    await signInWithEmailAndPassword(auth, "guest@guest.com", "1234567890");
    dispatch(closeLogInModal());
  }

  return (
    <>
      <Button
        text={t("log_in")}
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
          className="outline:none w-full h-full sm:w-[600px] sm:h-fit bg-white sm:rounded-xl mt-20 flex flex-col"
        >
          <header className="flex items-center justify-start px-5 pt-5">
            <button type="button" aria-label="Close" onClick={() => dispatch(closeLogInModal())}>
              <XMarkIcon className="w-7 cursor-pointer" />
            </button>
          </header>
          <main className="flex-1 px-4 sm:px-20 py-10">
            <div className="space-y-5 flex flex-col items-center">
              <h1 id="login-title" className="text-3xl font-bold mb-10 text-center">
                {t("log_in")}
              </h1>
              <fieldset className="w-full space-y-5 mb-10">
                <label htmlFor="email" className="sr-only">
                  {t("email")}
                </label>
                <input
                  id="email"
                  name="email"
                  className="w-full h-[54px] border border-gray-200 outline-none ps-3 rounded-[4px] focus:border-[#F4AF01] transition"
                  placeholder={t("email")}
                  type="email"
                  required
                  onChange={(event) => handleEmail(event.target.value)}
                  value={email}
                />
              </fieldset>
              <div className="flex flex-col w-full">
                <label htmlFor="password" className="sr-only">
                  {t("password")}
                </label>
                <div className="w-full h-[54px] border border-gray-200 outline-none ps-3 rounded-[4px] focus-within:border-[#F4AF01] transition flex items-center overflow-hidden">
                  <input
                    id="password"
                    name="password"
                    className="w-full h-full outline-none"
                    placeholder={t("password")}
                    type={showPassword ? "text" : "password"}
                    required
                    onChange={(event) => handlePassword(event.target.value)}
                    value={password}
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
                text={`${t("log_in")}!`}
                className="bg-[#F4AF01] h-[48px] shadow-md w-full"
                disabled={isLoginDisabled}
                handleClick={() => handleLogin()}
              />
              <span className="mb-5 text-sm block">{t("or")}</span>
              <Button
                text={t("log_in_as_guest")}
                className="bg-[#F4AF01] h-[48px] shadow-md w-full mb-5"
                handleClick={() => handleLoginAsGuest()}
              />
            </div>
          </main>
        </section>
      </Modal>
    </>
  );
};

export default LogInModal;

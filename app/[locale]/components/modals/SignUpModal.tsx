"use client";

import React, { useEffect, useState } from "react";
import Button from "../Button";
import { Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { openSignUpModal, closeSignUpModal } from "@/redux/slices/modalSlice";
import { signInUser } from "@/redux/slices/userSlice";
import { EyeIcon, EyeSlashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { createUserWithEmailAndPassword, onAuthStateChanged, updateProfile } from "firebase/auth";
import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useTranslations } from "next-intl";

const SignUpModal = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const isOpen = useSelector((state: RootState) => state.modals.signUpModalOpen);
  const [isLoginDisabled, setIsLoginDisabled] = useState<boolean>(true);
  const t = useTranslations("session");

  const handleName = (val: string) => {
    setName(val);
    if (password.length > 0 && email.length > 0 && name.length > 0) {
      setIsLoginDisabled(false);
    } else {
      setIsLoginDisabled(true);
    }
  };

  const handleEmail = (val: string) => {
    setEmail(val);
    if (password.length > 0 && email.length > 0 && name.length > 0) {
      setIsLoginDisabled(false);
    } else {
      setIsLoginDisabled(true);
    }
  };

  const handlePassword = (val: string) => {
    setPassword(val);
    if (password.length > 0 && email.length > 0 && name.length > 0) {
      setIsLoginDisabled(false);
    } else {
      setIsLoginDisabled(true);
    }
  };

  const dispatch: AppDispatch = useDispatch();

  const handleSignUp = async () => {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(userCredentials.user, {
      displayName: name,
    });

    dispatch(
      signInUser({
        name: userCredentials.user.displayName,
        username: userCredentials.user.email!.split("@")[0],
        email: userCredentials.user.email,
        uid: userCredentials.user.uid,
      })
    );
    dispatch(closeSignUpModal());
  };

  async function handleLoginAsGuest() {
    await signInWithEmailAndPassword(auth, "guest@guest.com", "1234567890");
    dispatch(closeSignUpModal());
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) return;
      dispatch(
        signInUser({
          name: currentUser.displayName,
          username: currentUser.email!.split("@")[0],
          email: currentUser.email,
          uid: currentUser.uid,
        })
      );
    });

    return unsubscribe;
  }, []);
  return (
    <>
      <Button
        text={t("sign_up")}
        className="w-[88px] h-[40px] md:text-sm font-bold bg-white !text-black"
        handleClick={() => dispatch(openSignUpModal())}
      />
      <Modal
        className="flex justify-center items-center"
        open={isOpen}
        onClose={() => dispatch(closeSignUpModal())}
        aria-labelledby="signup-title"
        aria-describedby="signup-description"
      >
        <section
          role="dialog"
          aria-modal="true"
          className="outline:none w-full h-full sm:w-[600px] sm:h-fit bg-white sm:rounded-xl mt-20"
        >
          <header className="flex justify-start">
            <button
              type="button"
              onClick={() => dispatch(closeSignUpModal())}
              aria-label="Close sign up form"
              className="w-7 mt-5 ms-5 cursor-pointer"
            >
              <XMarkIcon />
            </button>
          </header>
          <main>
            <div className="pt-10 pb-12 px-4 sm:px-20">
              <h1 id="signup-title" className="text-3xl font-bold mb-10 text-center">
                {t("create_your_account")}
              </h1>

              <fieldset className="w-full space-y-5 mb-10">
                <legend className="sr-only">{t("sign_up_form")}</legend>

                <label className="block">
                  <span className="sr-only">{t("name")}</span>
                  <input
                    className="w-full h-[54px] border border-gray-200 outline-none ps-3 rounded-[4px] focus:border-[#F4AF01] transition"
                    placeholder={t("name")}
                    type="text"
                    required
                    onChange={(event) => handleName(event.target.value)}
                    value={name}
                  />
                </label>

                <label className="block">
                  <span className="sr-only">{t("email")}</span>
                  <input
                    className="w-full h-[54px] border border-gray-200 outline-none ps-3 rounded-[4px] focus:border-[#F4AF01] transition"
                    placeholder={t("email")}
                    type="email"
                    required
                    onChange={(event) => handleEmail(event.target.value)}
                    value={email}
                  />
                </label>

                <label className="block">
                  <span className="sr-only">{t("password")}</span>
                  <div className="w-full h-[54px] border border-gray-200 outline-none ps-3 rounded-[4px] focus-within:border-[#F4AF01] transition flex items-center overflow-hidden">
                    <input
                      className="w-full h-full outline-none"
                      placeholder={t("password")}
                      type={showPassword ? "text" : "password"}
                      required
                      onChange={(event) => handlePassword(event.target.value)}
                      value={password}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="w-7 h-7 text-gray-400 cursor-pointer mr-2"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                    </button>
                  </div>
                </label>
              </fieldset>

              <Button
                text={t("sign_up")}
                disabled={isLoginDisabled}
                className="bg-[#F4AF01] h-[48px] shadow-md mb-5 w-full"
                handleClick={() => handleSignUp()}
              />

              <p className="mb-5 text-sm text-center">{t("or")}</p>

              <Button
                text={t("log_in_as_guest")}
                className="bg-[#F4AF01] h-[48px] shadow-md w-full"
                handleClick={() => handleLoginAsGuest()}
              />
            </div>
          </main>
        </section>
      </Modal>
    </>
  );
};

export default SignUpModal;

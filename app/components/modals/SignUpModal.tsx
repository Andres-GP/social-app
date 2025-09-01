"use client";

import React, { useEffect, useState } from "react";
import Button from "../Button";
import { Modal } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { openSignUpModal, closeSignUpModal } from "@/redux/slices/modalSlice";
import { signInUser } from "@/redux/slices/userSlice";
import { EyeIcon, EyeSlashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";

const SignUpModal = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const isOpen = useSelector((state: RootState) => state.modals.signUpModalOpen);

  const dispatch: AppDispatch = useDispatch();

  const handleSignUp = async () => {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) return;

      // Handle Redux Actions
      dispatch(
        signInUser({
          name: "",
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
        text="Sign Up"
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
          className="w-full h-full sm:w-[600px] sm:h-fit bg-white sm:rounded-xl mt-20"
        >
          <header className="flex justify-end">
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
            <div className="pt-10 pb-20 px-4 sm:px-20">
              <h1 id="signup-title" className="text-3xl font-bold mb-10 text-center">
                Create your account
              </h1>

              <fieldset className="w-full space-y-5 mb-10">
                <legend className="sr-only">Sign up form</legend>

                <label className="block">
                  <span className="sr-only">Name</span>
                  <input
                    className="w-full h-[54px] border border-gray-200 outline-none ps-3 rounded-[4px] focus:border-[#F4AF01] transition"
                    placeholder="Name"
                    type="text"
                    required
                  />
                </label>

                <label className="block">
                  <span className="sr-only">Email</span>
                  <input
                    className="w-full h-[54px] border border-gray-200 outline-none ps-3 rounded-[4px] focus:border-[#F4AF01] transition"
                    placeholder="Email"
                    type="email"
                    required
                    onChange={(event) => setEmail(event.target.value)}
                    value={email}
                  />
                </label>

                <label className="block">
                  <span className="sr-only">Password</span>
                  <div className="w-full h-[54px] border border-gray-200 outline-none ps-3 rounded-[4px] focus-within:border-[#F4AF01] transition flex items-center overflow-hidden">
                    <input
                      className="w-full h-full outline-none"
                      placeholder="Password"
                      type={showPassword ? "text" : "password"}
                      required
                      onChange={(event) => setPassword(event.target.value)}
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
                text="Sign Up"
                className="bg-[#F4AF01] h-[48px] shadow-md mb-5 w-full"
                handleClick={() => handleSignUp()}
              />

              <p className="mb-5 text-sm text-center">Or</p>

              <Button
                text="Log In as Guest"
                className="bg-[#F4AF01] h-[48px] shadow-md mb-5 w-full"
                handleClick={() => console.log("press")}
              />
            </div>
          </main>
        </section>
      </Modal>
    </>
  );
};

export default SignUpModal;

"use client";

import React, { useState, useCallback } from "react";
import { Menu, MenuItem } from "@mui/material";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { signOutUser } from "@/redux/slices/userSlice";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import LocaleSwitch from "./LocaleSwitch";
import { useTranslations } from "next-intl";
import Image from "next/image";

const SidebarUserInfo = () => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const pathname = usePathname();
  const locale = pathname.startsWith("/es") ? "es" : "en";
  const t = useTranslations("session");

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleOpenMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    dispatch(signOutUser());
    handleClose();
  };

  return user.username.length > 0 ? (
    <>
      <div
        onClick={handleOpenMenu}
        className="flex items-center justify-start space-x-2 hover:bg-gray-500 hover:bg-opacity-10 transition p-3 pe-6 rounded-full cursor-pointer xl:p-3 xl:pe-6 w-fit xl:w-[240px] "
      >
        <Image
          src={"/profile_default.png"}
          width={44}
          height={44}
          alt={"Profile Picture"}
          className="w-11 h-11 z-10 rounded-full bg-white"
        />
        <div className="flex flex-col text-sm max-w-40">
          <span className="whitespace-nowrap text-ellipsis overflow-hidden font-bold">
            {user.name}
          </span>
          <span className="whitespace-nowrap text-ellipsis overflow-hidden text-gray-500">
            @{user.username}
          </span>
        </div>
      </div>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          className: "rounded-xl shadow-lg",
        }}
      >
        <MenuItem>
          <LocaleSwitch locale={locale} />
        </MenuItem>
        <MenuItem onClick={handleSignOut}>{t("sign_out")}</MenuItem>
      </Menu>
    </>
  ) : (
    <div className="w-fit xl:w-[240px] h-3"></div>
  );
};

export default SidebarUserInfo;

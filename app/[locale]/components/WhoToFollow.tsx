import React, { useState } from "react";
import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Button from "./Button";
import { useTranslations } from "next-intl";

interface WhoToFollowProps {
  avatar: string | StaticImport;
  fullName?: string;
  userName?: string;
}

const WhoToFollow = ({ avatar, userName, fullName }: WhoToFollowProps) => {
  const [follow, setFollow] = useState<boolean>(false);

  const t = useTranslations("common");

  return (
    <article className="flex justify-between items-center py-3">
      <header className="flex items-center space-x-3 pointer-events-ignore cursor-default">
        {avatar && (
          <figure className="w-14 h-14">
            <Image
              src={avatar}
              width={56}
              height={56}
              alt={`${fullName} ${t("profiles_picture")}`}
              className="w-14 h-14 rounded-full"
            />
            <figcaption className="sr-only">
              {t("profile_picture_of")}
              {fullName ?? t("guest")}
            </figcaption>
          </figure>
        )}
        <div className="flex flex-col text-sm">
          <span className="font-bold">{fullName ?? t("guest")}</span>
          <span>{userName ?? `@${t("guest")}`}</span>
        </div>
      </header>

      <Button
        text={follow ? t("followed") : t("follow")}
        className={follow ? "bg-[#0F1419]" : "bg-[#0F1419]"}
        handleClick={() => setFollow((prev) => !prev)}
      />
    </article>
  );
};

export default WhoToFollow;

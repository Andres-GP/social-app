"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

export default function LocaleSwitch({ locale }: { locale: string }) {
  const pathname = usePathname();
  const t = useTranslations("languages");

  const nextLocale = locale === "es" ? "en" : "es";
  const label = locale === "es" ? t("switch_to_english") : t("switch_to_spanish");

  const newPath = pathname.replace(/^\/(en|es)/, `/${nextLocale}`);

  return (
    <Link href={newPath} locale={nextLocale}>
      {label}
    </Link>
  );
}

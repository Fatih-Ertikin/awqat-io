import { useTranslations } from "next-intl";
import { Anchor } from "../atoms/anchor";

export function MenuItems() {
  const t = useTranslations("Global.Menu");

  return (
    <>
      <Anchor href="/">{t("home")}</Anchor>
      <Anchor href="/calculation-method">{t("calculation_method")}</Anchor>
      <Anchor href="/about">{t("about")}</Anchor>
    </>
  );
}

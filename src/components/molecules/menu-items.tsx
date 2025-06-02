import { getTranslations } from "next-intl/server";
import { Anchor } from "../atoms/anchor";

export async function MenuItems() {
  const t = await getTranslations("Global.Menu");

  return (
    <>
      <Anchor href="/">{t("home")}</Anchor>
      <Anchor href="/calculation-method">{t("calculation_method")}</Anchor>
      <Anchor href="/about">{t("about")}</Anchor>
    </>
  );
}

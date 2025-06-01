"use client";
import { useParams } from "next/navigation";
import { useCallback, useMemo, useState, useTransition } from "react";
import { Combobox, InputBase, useCombobox } from "@mantine/core";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import { routing, SUPPORTED_APP_LOCALES } from "@/i18n/routing";

type SupportedAppLocale = (typeof SUPPORTED_APP_LOCALES)[number];

const localeLabels: Record<
  SupportedAppLocale,
  {
    label: string;
    emoji: string;
  }
> = {
  en: { label: "English", emoji: "🇬🇧" },
  nl: { label: "Nederlands", emoji: "🇳🇱" },
  // Add more locales as needed
  // ar: { label: "العربية", emoji: "🇸🇦" },
  // tr: { label: "Türkçe", emoji: "🇹🇷" },
  // fr: { label: "Français", emoji: "🇫🇷" },
  // de: { label: "Deutsch", emoji: "🇩🇪" },
  // es: { label: "Español", emoji: "🇪🇸" },
  // it: { label: "Italiano", emoji: "🇮🇹" },
};

export function LocaleSelect() {
  const router = useRouter();
  const currentLocale = useLocale() as SupportedAppLocale;
  const pathname = usePathname();
  const params = useParams();
  const [isPending, startTransition] = useTransition();

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const getLocaleEmoji = useCallback((locale: SupportedAppLocale) => {
    return localeLabels[locale].emoji;
  }, []);

  const initialLocaleEmoji = useMemo(() => {
    return localeLabels[currentLocale].emoji;
  }, [currentLocale]);

  const [comboboxValue, setComboboxValue] = useState<string | null>(
    initialLocaleEmoji
  );

  const options = routing.locales.map((locale, i) => (
    <Combobox.Option value={locale} key={`locale-${locale}-${i}`}>
      {localeLabels[locale].label} {localeLabels[locale].emoji}
    </Combobox.Option>
  ));

  const handleSelectLocale = (nextLocal: string) => {
    // if same request same locale as current locale, do nothing
    if (nextLocal === currentLocale) {
      return;
    }

    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocal }
      );
    });
  };

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(value: string) => {
        setComboboxValue(getLocaleEmoji(value as SupportedAppLocale));
        combobox.closeDropdown();
        handleSelectLocale(value);
      }}
    >
      <Combobox.Target>
        <InputBase
          component="button"
          type="button"
          pointer
          rightSection={<Combobox.Chevron />}
          rightSectionPointerEvents="none"
          onClick={() => combobox.toggleDropdown()}
          disabled={isPending}
        >
          {comboboxValue}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown miw={145}>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}

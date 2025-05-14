"use client";

import { useEffect, useState } from "react";

const FALLBACK_LOCALE = "en-US"; // Fallback locale if navigator.language is not available

const EN_HIJRI_LOCALE = "en-SA-u-ca-islamic-umalqura"; // Hijri locale for English

const AR_HIJRI_LOCALE = "ar-SA-u-ca-islamic-umalqura"; // Hijri locale for Arabic

type LocalizedSystemTime = {
  date: Date;
  system: string;
  hijri: string;
};

export function useLocalizedSystemTime(): LocalizedSystemTime {
  const [systemLanguage, setSystemLanguage] = useState<string | undefined>(
    FALLBACK_LOCALE
  );

  const [systemTime, setSystemTime] = useState<Date | undefined>(undefined);

  // Get the system language from the browser
  useEffect(() => {
    if (navigator.language) {
      setSystemLanguage(navigator.language);
      setSystemTime(new Date());
    }
  }, []);

  const system = new Intl.DateTimeFormat(systemLanguage, {
    dateStyle: "full", // uses locale-specific ordering
  });

  const hijri = new Intl.DateTimeFormat(EN_HIJRI_LOCALE, {
    dateStyle: "long",
  });

  return {
    date: systemTime!,
    hijri: hijri.format(systemTime),
    system: system.format(systemTime!),
  };
}

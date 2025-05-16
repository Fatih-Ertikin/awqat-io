"use client";

import { useEffect, useState } from "react";

const FALLBACK_LOCALE = "en-US"; // Fallback locale if navigator.language is not available

const EN_HIJRI_LOCALE = "en-SA-u-ca-islamic-umalqura"; // Hijri locale for English

// const AR_HIJRI_LOCALE = "ar-SA-u-ca-islamic-umalqura"; // Hijri locale for Arabic

type LocalizedSystemTime = {
  date: Date;
  browser: string;
  hijri: string;
  time: string;
};

export function useLocalizedDateTime(): LocalizedSystemTime {
  const [browserLanguage, setBrowserLanguage] = useState<string | undefined>(
    FALLBACK_LOCALE
  );

  const [browserTime, setBrowserTime] = useState<Date | undefined>(undefined);

  // Get the system language from the browser
  useEffect(() => {
    if (navigator.language) {
      setBrowserLanguage(navigator.language);
      setBrowserTime(new Date());
    }
  }, []);

  const browserFormat = new Intl.DateTimeFormat(browserLanguage, {
    dateStyle: "full", // uses locale-specific ordering
  });

  const hijriFormat = new Intl.DateTimeFormat(EN_HIJRI_LOCALE, {
    dateStyle: "long",
  });

  const time = new Intl.DateTimeFormat(browserLanguage, {
    timeStyle: "long",
    hour12: false,
  });

  return {
    date: browserTime!,
    hijri: hijriFormat.format(browserTime),
    browser: browserFormat.format(browserTime),
    time: time.format(browserTime),
  };
}

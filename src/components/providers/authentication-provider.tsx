"use client";

import { SessionProvider } from "next-auth/react";

export function AuthenticationProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SessionProvider>{children}</SessionProvider>;
}

// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import "@mantine/core/styles.css";
import "./globals.css";
import {
  ActionIcon,
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";
import type { Metadata } from "next";
import { ColorSchemeToggle } from "@/components/atoms/color-scheme-toggle";
import { Anchor } from "@/components/atoms/anchor";
import { IconCalendar, IconHome, IconSettings } from "@tabler/icons-react";
import { MenuButton } from "@/components/atoms/menu-button";

export const metadata: Metadata = {
  title: "Awqat.io",
  description: "Islamic Prayer & Important Times & Dates",
};

function MenuItems() {
  return (
    <>
      <MenuButton
        icon={<IconSettings size={50} stroke={1.5} />}
        label="settings"
      />
      <MenuButton icon={<IconHome size={50} stroke={1.5} />} label="home" />
      <MenuButton
        icon={<IconCalendar size={50} stroke={1.5} />}
        label="calender"
      />
      <ColorSchemeToggle iconSize={50} label="mode" stroke={1.5} />
    </>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <MantineProvider>
          <div className="flex flex-col min-h-screen">
            {/* Page content area with sidebar */}
            <div className="flex flex-1">
              {/* Main content */}
              <main className="flex-1 p-6">
                <div>{children}</div>
              </main>

              {/* Right sidebar (desktop only) */}
              <nav className="w-15 p-4 border-l hidden sm:block">
                <nav className="flex flex-col justify-between align-middle">
                  <MenuItems />
                </nav>
              </nav>
            </div>

            {/* Bottom mobile nav */}
            <nav className="sm:hidden p-4 border-t">
              <div className="flex justify-around">
                <MenuItems />
              </div>
            </nav>
          </div>
        </MantineProvider>
      </body>
    </html>
  );
}

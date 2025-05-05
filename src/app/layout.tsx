import "./globals.css";
import type { Metadata } from "next";
import { MobileMenu } from "@/components/molecules/mobile-menu";
import { Anchor } from "@/components/atoms/anchor";
import { ColorSchemeToggle } from "@/components/atoms/color-scheme-toggle";
import { ThemeProvider } from "@/components/providers/theme-provider";

export const metadata: Metadata = {
  title: "Awqat.io",
  description: "Islamic Prayer & Important Times & Dates",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            {/* Header */}
            <header className="w-full p-4 sticky top-0 z-50">
              <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
                <div className="text-2xl font-bold">Awqat.io</div>
                <nav className="hidden md:flex space-x-6 items-center">
                  <Anchor href="#">calculation method</Anchor>
                  <Anchor href="#">about</Anchor>
                  <ColorSchemeToggle />
                </nav>
                {/* Mobile Menu */}
                <div className="md:hidden">
                  <ColorSchemeToggle />
                  <MobileMenu />
                </div>
              </div>
            </header>

            <main className="flex-1">
              <div className="max-w-7xl mx-auto px-4 py-6">{children}</div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

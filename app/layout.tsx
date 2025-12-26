import "./globals.css";
import type { ReactNode } from "react";
import { Comfortaa, Public_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Navbar } from "@/components/navigation/navbar";

const publicSans = Public_Sans({ subsets: ["latin"], variable: "--font-sans" });
const comfortaa = Comfortaa({ subsets: ["latin"], variable: "--font-display" });

export const metadata = {
  title: "distra",
  description: "A free and open source video sharing platform.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${publicSans.variable} ${comfortaa.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

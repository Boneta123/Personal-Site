import type { Metadata } from "next";
import { Geist, Geist_Mono, Shippori_Mincho_B1 } from "next/font/google";
import "./globals.css";
import { profile } from "@/content/site";

// globals.css maps Tailwind's font-sans to --font-sans, so bind Geist to that
// name directly — otherwise the token resolves to nothing and text renders serif.
const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Mincho: the high-contrast serif tradition the woodblock prints were lettered
// in. subsets is latin-only on purpose — the japanese subset is megabytes and
// every string on this site is Latin.
const display = Shippori_Mincho_B1({
  variable: "--font-display",
  weight: ["600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${profile.name} — Portfolio`,
  description: profile.title,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} ${display.variable} h-full antialiased`}
    >
      <body className="bg-void-deep min-h-full flex flex-col overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Pilot's Son | Memories of the Modern World",
  description:
    "A 3D scrollytelling experience tracing the Cold War through the eyes of Steve Simpson, son of a Navy fighter pilot — from Vietnam to 9/11.",
  openGraph: {
    title: "The Pilot's Son | Memories of the Modern World",
    description: "A scrollytelling journey through the Cold War, Vietnam, and 9/11.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="bg-[#020408] overflow-x-hidden">{children}</body>
    </html>
  );
}

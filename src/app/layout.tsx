import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const jbMono = JetBrains_Mono({
  variable: "--font-mono",
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
      className={`${inter.variable} ${playfair.variable} ${jbMono.variable} antialiased`}
    >
      <body className="bg-[#020408] overflow-x-hidden">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}

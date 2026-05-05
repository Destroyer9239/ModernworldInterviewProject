import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Carrier Born | Memories of the Modern World",
  description:
    "A 3D scrollytelling experience tracing the Cold War through the eyes of Stephen Vance, son of a Navy carrier pilot — from Vietnam to 9/11.",
  openGraph: {
    title: "Carrier Born | Memories of the Modern World",
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
      className={`${inter.variable} ${jetbrains.variable} ${cormorant.variable} antialiased`}
    >
      <body className="overflow-x-hidden" style={{ background: "var(--bg)" }}>
        {/* Subtle film grain — barely visible, adds editorial texture */}
        <div className="film-grain" aria-hidden />
        {children}
      </body>
    </html>
  );
}

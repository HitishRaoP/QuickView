import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans"
import { HomeHeader } from "@/components/home-header";

export const metadata: Metadata = {
  title: "Briefchat",
  description:
    "A Youtube Video Summarization Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className="dark"
    >
      <body className={GeistSans.className}>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}

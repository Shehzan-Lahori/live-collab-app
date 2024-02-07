import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import { Room } from "./Room";
import "./globals.css";

const WorkSans = Work_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Figma clone",
  description:
    "I am making a figma clone using live blocks and fabric framework",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={WorkSans.className}>
        <Room>{children}</Room>
      </body>
    </html>
  );
}

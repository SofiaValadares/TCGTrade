import type { Metadata } from "next";
import "./globals.scss";
import QueryProvider from "@/app/lib/QueryProvider";


export const metadata: Metadata = {
  title: "TCGTrade",
  description: "Tamplete - Front React",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body ><QueryProvider>{children}</QueryProvider></body>
    </html>
  );
}
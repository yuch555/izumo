import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/base/Header";
import { Footer } from "@/components/base/Footer";

export const metadata: Metadata = {
  title: "Izumo App",
  description: "Created with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

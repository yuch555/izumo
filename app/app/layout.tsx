import type { Metadata } from "next";
import "./globals.css";
import { Header } from "../src/components/base/Header";
import { Footer } from "../src/components/base/Footer";

export const metadata: Metadata = {
  title: "出雲市お役立ちWEBサイト",
  description:
    "出雲市のゴミ分別検索、リサイクルステーション検索、お知らせ情報など、生活に役立つ情報をまとめたサイトです。",
  keywords: ["出雲市", "ゴミ分別", "リサイクル", "お知らせ", "便利ツール"],
  openGraph: {
    title: "出雲市お役立ちWEBサイト",
    description:
      "出雲市のゴミ分別検索、リサイクルステーション検索、お知らせ情報など",
    type: "website",
    locale: "ja_JP",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-5VLRZ53YFB"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-5VLRZ53YFB');
            `,
          }}
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "リハビリ実施率アプリ",
  description: "自主トレの記録と実施率を可視化するアプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
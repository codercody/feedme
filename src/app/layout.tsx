import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import RootProvider from "./RootProvider";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "feedme",
  description: "Compare recommender algorithms for Farcaster",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const a = cookies().get("a")?.value;
  const b = cookies().get("b")?.value;

  return (
    <html lang="en">
      <body className={inter.className}>
        <RootProvider initialA={a} initialB={b}>
          <Sidebar />
          <div className="sm:ml-64 min-h-screen flex">
            <div className="flex-1 py-4 px-6">{children}</div>
          </div>
        </RootProvider>
      </body>
    </html>
  );
}

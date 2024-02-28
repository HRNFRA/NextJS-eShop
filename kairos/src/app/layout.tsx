import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "./footer";
import SessionProvider from "@/app/SessionProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kairos",
  description: "We value your time",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          <NavBar />
          <main className="p-4 max-w-7xl m-auto min-w-[300]">
            {children}
          </main>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}

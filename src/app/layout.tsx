"use client";

import { usePathname } from "next/navigation";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() ?? "";

  const specialLayoutPaths = [
    "/digital-business-cards/",
    "/dashboard",
    "/dbc",
    "/visiting-card/",
  ];

  const isSpecialLayout = specialLayoutPaths.some((path) =>
    pathname.startsWith(path)
  );

  return (
    <html lang="en">
      <title>StylusQR | Free QR Code Generator</title>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {!isSpecialLayout && <Header />}
        <main className="flex-1">{children}</main>
        {!isSpecialLayout && <Footer />}
      </body>
    </html>
  );
}

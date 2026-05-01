import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ethdevberlin.github.io/berlin-ethereum-day"),
  title: "Berlin Ethereum Day · June 15, 2026",
  description:
    "A full day of sessions on Ethereum's future — technical direction, core values, and the road ahead. June 15, 2026 at Funkhaus Berlin.",
  openGraph: {
    title: "Berlin Ethereum Day",
    description: "June 15, 2026 · Funkhaus, Berlin",
    images: ["/og-banner.png"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-banner.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

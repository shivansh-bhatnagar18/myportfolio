import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '../styles/globals.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shivansh Bhatnagar",
  description: "Welcome to my terminal based portfolio where you can have a look at my journey and projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

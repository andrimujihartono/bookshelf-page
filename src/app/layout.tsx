import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import type { ReactNode } from "react";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata = {
  title: "Welcome to my little bookshelf 🍃",
  description: "This is my personal collection of books, novels, and stories worth keeping. Each book holds its own world, waiting to be discovered, remembered, and revisited.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" className={`${cormorant.variable} ${plusJakarta.variable}`}>
      <body>{children}</body>
    </html>
  );
}
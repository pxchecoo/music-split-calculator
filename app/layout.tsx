import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Music Split Calculator",
  description:
    "Create songs, add contributors, assign percentages, and calculate payouts instantly."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

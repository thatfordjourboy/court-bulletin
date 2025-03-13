import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ghana Court Bulletin",
  description: "Your trusted source for legal updates in Ghana",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className="antialiased font-['Inter']">
        {children}
      </body>
    </html>
  );
}

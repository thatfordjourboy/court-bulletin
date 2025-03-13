import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ghana Court Bulletin",
  description: "Access comprehensive information about Ghana's court system and legal proceedings",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

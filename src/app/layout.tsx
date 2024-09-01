import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";

export const metadata: Metadata = {
  title: "QAangel",
  description: "Prevent the traditional culture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body>{children}</body>
      </AuthProvider>
    </html>
  );
}

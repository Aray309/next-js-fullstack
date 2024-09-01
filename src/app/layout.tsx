import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
        <body>
          {children}
          <ToastContainer
            style={{ width: "300px", height: "50px", zIndex: "1000px" }}
          />
        </body>
      </AuthProvider>
    </html>
  );
}

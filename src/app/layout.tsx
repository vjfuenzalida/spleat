import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner"

import "./globals.css";

export const metadata: Metadata = {
  title: "Spleat",
  description: "Divide y conquista",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}

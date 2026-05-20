import type { Metadata } from "next";
import "./globals.css";

import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: "Create-A-Curriculum",
  description: "Our AI-driven approach revolutionizes education. Enter a product, and receive a comprehensive, tailored curriculum fit to your needs. ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider  attribute="class" defaultTheme="system">
          {children}
          <Toaster />
          <Analytics/>
        </ThemeProvider>
      </body>
    </html>
  );
}

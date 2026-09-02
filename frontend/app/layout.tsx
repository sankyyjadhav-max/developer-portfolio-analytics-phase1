import "./globals.css";
import { ThemeProvider } from "../components/theme-provider";
import type { ReactNode } from "react";

export const metadata = {
  title: "Devfolio — Portfolio Builder",
  description:
    "Build, customize, and publish a professional developer portfolio.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
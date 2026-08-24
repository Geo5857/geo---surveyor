import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GEO SURVEYORS | Professional Surveyors Platform",
  description: "Find verified surveyors and hire with confidence."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
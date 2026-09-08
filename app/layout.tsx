import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GEO SURVEYORS | Professional Surveyors Platform",
  description:
    "Find verified surveyors, evaluate professional skills and connect with trusted surveying professionals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

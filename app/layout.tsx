import type { Metadata } from "next";
import { Crimson_Pro, Atkinson_Hyperlegible } from "next/font/google";
import "./globals.css";

const crimsonPro = Crimson_Pro({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const atkinsonHyperlegible = Atkinson_Hyperlegible({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "BrandOS - LinkedIn Brand Building Workshop Guide",
  description: "Build your LinkedIn brand in one guided session. Powered by Southasiaforce DMV.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${crimsonPro.variable} ${atkinsonHyperlegible.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body">{children}</body>
    </html>
  );
}

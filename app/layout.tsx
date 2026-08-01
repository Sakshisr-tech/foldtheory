import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { SiteChrome } from "@/components/site-chrome";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Fold Theory — Bespoke Branding & Packaging",
    template: "%s — Fold Theory",
  },
  description:
    "A considered creative studio shaping brand identities, packaging systems, and tactile experiences.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={geist.variable}>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}

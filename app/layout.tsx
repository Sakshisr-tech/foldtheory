import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { SiteChrome } from "@/components/site-chrome";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fold-theory-new-delhi.sakshisriva0729.chatgpt.site"),
  title: {
    default: "Fold Theory — Branding & Packaging Studio in New Delhi",
    template: "%s — Fold Theory",
  },
  description:
    "Fold Theory is an independent branding and packaging studio in New Delhi, creating brand identities, product packaging, print and tactile experiences.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "/",
    siteName: "Fold Theory",
    title: "Fold Theory — Branding & Packaging Studio in New Delhi",
    description:
      "Thoughtful brand identities, packaging systems and printed experiences for food, hospitality, lifestyle and consumer brands.",
  },
  twitter: {
    card: "summary",
    title: "Fold Theory — Branding & Packaging Studio",
    description:
      "Brand identities, packaging systems and printed experiences made tangible in New Delhi.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f2eee6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <body className={geist.variable}>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}

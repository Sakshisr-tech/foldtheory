import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { headers } from "next/headers";
import { SiteChrome } from "@/components/site-chrome";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host")?.split(",")[0]?.trim() ||
    requestHeaders.get("host") ||
    "fold-theory-new-delhi.sakshisriva0729.chatgpt.site";
  const forwardedProtocol = requestHeaders.get("x-forwarded-proto")?.split(",")[0]?.trim();
  const protocol = forwardedProtocol || (host.startsWith("localhost") ? "http" : "https");
  const metadataBase = new URL(`${protocol}://${host}`);
  const socialImage = new URL("/og.png", metadataBase).toString();

  return {
    metadataBase,
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
      images: [{ url: socialImage, width: 1200, height: 630, alt: "Fold Theory — branding, packaging and print" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Fold Theory — Branding & Packaging Studio",
      description:
        "Brand identities, packaging systems and printed experiences made tangible in New Delhi.",
      images: [socialImage],
    },
    robots: { index: true, follow: true },
  };
}

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

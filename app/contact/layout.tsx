import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start a Project",
  description:
    "Share your brand, packaging, hospitality, print, gifting, or art direction project with Fold Theory.",
};

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}

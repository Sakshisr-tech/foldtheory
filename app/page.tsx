import type { Metadata } from "next";
import { HomeExperience } from "@/components/home-experience";

export const metadata: Metadata = {
  title: "Bespoke Branding & Packaging",
  description:
    "Fold Theory creates thoughtful brand identities and packaging systems for products people remember.",
};

export default function Home() {
  return <HomeExperience />;
}

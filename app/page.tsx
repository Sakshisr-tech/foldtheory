import type { Metadata } from "next";
import { HomeExperience } from "@/components/home-experience";

export const metadata: Metadata = {
  title: "Brand Identity & Packaging Design Studio",
  description:
    "Fold Theory creates thoughtful brand identities, packaging systems, print and production-ready tactile experiences in New Delhi.",
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://fold-theory-new-delhi.sakshisriva0729.chatgpt.site/#organization",
    name: "Fold Theory",
    url: "https://fold-theory-new-delhi.sakshisriva0729.chatgpt.site/",
    logo: "https://fold-theory-new-delhi.sakshisriva0729.chatgpt.site/images/projects/fold-theory-wordmark.jpg",
    sameAs: ["https://www.instagram.com/fold.theory2/"],
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": "https://fold-theory-new-delhi.sakshisriva0729.chatgpt.site/#studio",
    name: "Fold Theory",
    url: "https://fold-theory-new-delhi.sakshisriva0729.chatgpt.site/",
    image: "https://fold-theory-new-delhi.sakshisriva0729.chatgpt.site/images/projects/cecilia-pasta-kit.jpg",
    description:
      "Independent branding and packaging studio creating brand identities, packaging, print and production-ready tactile experiences.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "C 29, Okhla Phase 1",
      addressLocality: "New Delhi",
      addressCountry: "IN",
    },
    sameAs: ["https://www.instagram.com/fold.theory2/"],
    knowsAbout: [
      "Brand strategy",
      "Brand identity design",
      "Product packaging design",
      "Hospitality branding",
      "Food and beverage packaging",
      "Print production",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Brand identity and packaging design",
    provider: {
      "@id": "https://fold-theory-new-delhi.sakshisriva0729.chatgpt.site/#studio",
    },
    serviceType: [
      "Brand Strategy",
      "Visual Identity",
      "Packaging Design",
      "Print and Collateral",
      "Art Direction",
      "Production Support",
    ],
  },
];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomeExperience />
    </>
  );
}

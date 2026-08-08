export type TrustItem = {
  label: string;
  value: string;
};

export type ContactLink = {
  label: string;
  value: string;
  href?: `https://${string}`;
};

export const studio = {
  label: "Independent Branding & Packaging Studio",
  location: "C 29, Okhla Phase 1, New Delhi, India",
  introduction:
    "We create considered identities and packaging systems that make brands tangible, memorable and meaningful.",
  supportingCopy:
    "From planning and packaging structure through print, finishing and production, we help brands bring physical packaging to life with precision and craft.",
  philosophy:
    "Good packaging is more than a container. It is the first physical conversation between a brand and its audience.",
  approach:
    "Thoughtful strategy, strong visual systems, tactile material choices and practical production support come together in work designed to perform beyond the screen.",
  capabilityStrip: ["Planning", "Packaging", "Printing", "Finishing", "Production"],
} as const;

export const trustItems = [
  { label: "Studio base", value: "C 29, Okhla Phase 1, New Delhi, India" },
  { label: "Core practice", value: "Branding, packaging & print" },
  { label: "Production", value: "Artwork, material & vendor-ready guidance" },
] as const satisfies readonly TrustItem[];

export const selectedClients = [
  "Cecilia Pizzeria",
  "Soda Shop",
  "Bombaa",
  "Khoya",
  "Secret Ingredient",
  "Ice Pop",
] as const;

export type TrustedClient = {
  name: string;
  logo?: string;
  /** Visual shape for consistent scale weighting */
  shape?: "wide" | "square" | "default";
};

/**
 * Order balances wide / square / compact marks so circular logos are not clustered.
 */
export const trustedClients: readonly TrustedClient[] = [
  { name: "Park Inn by Radisson", logo: "/images/brand_logos/clean/park-inn-by-radisson.png", shape: "wide" },
  { name: "Asian Haus", logo: "/images/brand_logos/clean/asian-haus.png", shape: "square" },
  { name: "Secret Ingredient", logo: "/images/brand_logos/clean/secret-ingredient.png", shape: "default" },
  { name: "Bercos", logo: "/images/brand_logos/clean/bercos.png", shape: "wide" },
  { name: "Café Ledor", logo: "/images/brand_logos/clean/cafe-ledor.png", shape: "default" },
  { name: "Khoya Mithai Ltd.", logo: "/images/brand_logos/clean/khoya-mithai.png", shape: "square" },
  { name: "Pop Thai", logo: "/images/brand_logos/clean/pop-thai.png", shape: "wide" },
  { name: "Hotel Trident Gurgaon", logo: "/images/brand_logos/clean/hotel-trident-gurgaon.png", shape: "default" },
  { name: "Cafe Notorious", logo: "/images/brand_logos/clean/cafe-notorious.png", shape: "wide" },
  { name: "Kairali Ayurvedic Products Pvt. Ltd.", logo: "/images/brand_logos/clean/kairali-ayurvedic.png", shape: "default" },
  { name: "Café Six Degree", logo: "/images/brand_logos/clean/cafe-six-degree.png", shape: "square" },
  { name: "Bomba Pizzeria", logo: "/images/brand_logos/clean/bomba-pizzeria-badge.png", shape: "square" },
  { name: "CTC Fashion House", logo: "/images/brand_logos/clean/ctc-fashion-house.png", shape: "square" },
  { name: "Café Blanca", logo: "/images/brand_logos/clean/cafe-blanca.png", shape: "default" },
  { name: "Empire Spirits India Ltd.", logo: "/images/brand_logos/clean/empire-spirits.png", shape: "square" },
];

// Add verified metrics here when supplied. Empty entries remain hidden in production UI.
export const verifiedMetrics: readonly TrustItem[] = [];

export const contactLinks = [
  {
    label: "Instagram",
    value: "@fold.theory2",
    href: "https://www.instagram.com/fold.theory2/",
  },
  {
    label: "Studio",
    value: "C 29, Okhla Phase 1, New Delhi, India",
  },
] as const satisfies readonly ContactLink[];

export const contactCopy = {
  heading: "Have something worth unfolding?",
  supportingText: "Tell us about your brand, product or next packaging project.",
  availabilityNote: null,
  replyTime: null,
} as const;

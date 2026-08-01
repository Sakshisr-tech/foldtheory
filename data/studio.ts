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
  location: "New Delhi, India",
  introduction:
    "We create considered identities and packaging systems that make brands tangible, memorable and meaningful.",
  supportingCopy:
    "From strategy and identity to packaging and production, we help emerging and established brands build physical experiences people remember.",
  philosophy:
    "Good packaging is more than a container. It is the first physical conversation between a brand and its audience.",
  approach:
    "Thoughtful strategy, strong visual systems, tactile material choices and practical production support come together in work designed to perform beyond the screen.",
  capabilityStrip: ["Strategy", "Identity", "Packaging", "Print", "Art Direction", "Production"],
} as const;

export const trustItems = [
  { label: "Studio base", value: "New Delhi, India" },
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
    value: "New Delhi, India",
  },
] as const satisfies readonly ContactLink[];

export const contactCopy = {
  heading: "Have something worth unfolding?",
  supportingText: "Tell us about your brand, product or next packaging project.",
  availabilityNote: null,
  replyTime: null,
} as const;

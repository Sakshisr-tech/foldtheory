import type { ProjectImage } from "./projects";

export type Service = {
  id: string;
  number: string;
  title: string;
  description: string;
  capability: string;
  relatedImage: ProjectImage;
};

export const services = [
  {
    id: "brand-strategy",
    number: "01",
    title: "Brand Strategy",
    description: "Positioning, audience thinking and a clear creative brief to guide every expression.",
    capability: "Positioning & creative direction",
    relatedImage: {
      src: "/images/projects/fold-theory-wordmark.jpg",
      alt: "Fold Theory wordmark from the studio archive",
      width: 1440,
      height: 1440,
    },
  },
  {
    id: "visual-identity",
    number: "02",
    title: "Visual Identity",
    description: "Distinctive systems across typography, colour, imagery and brand voice.",
    capability: "Identity systems",
    relatedImage: {
      src: "/images/projects/cecilia-pasta-kit.jpg",
      alt: "Illustrated Cecilia Pizzeria packaging from the Fold Theory archive",
      width: 1440,
      height: 1440,
    },
  },
  {
    id: "packaging-design",
    number: "03",
    title: "Packaging Design",
    description: "Structural thinking, range architecture, labels and shelf-ready visual systems.",
    capability: "Packaging systems",
    relatedImage: {
      src: "/images/projects/ice-pop-cartons.jpg",
      alt: "Colourful Ice Pop cartons from the Fold Theory archive",
      width: 749,
      height: 937,
    },
  },
  {
    id: "print-collateral",
    number: "04",
    title: "Print & Collateral",
    description: "Menus, coasters, stationery and tactile touchpoints that complete the brand experience.",
    capability: "Print applications",
    relatedImage: {
      src: "/images/projects/bombaa-print.jpg",
      alt: "Bombaa printed collateral from the Fold Theory archive",
      width: 1440,
      height: 1440,
    },
  },
  {
    id: "corporate-gifting",
    number: "05",
    title: "Corporate Gifting",
    description: "Considered gifting concepts, custom boxes and memorable presentation moments.",
    capability: "Gifting & presentation",
    relatedImage: {
      src: "/images/projects/green-gift-boxes.jpg",
      alt: "Green gift boxes from the Fold Theory studio archive",
      width: 1440,
      height: 1440,
    },
  },
  {
    id: "hospitality-branding",
    number: "06",
    title: "Hospitality Branding",
    description: "Joined-up identities for menus, service, tabletop details and takeaway.",
    capability: "Brand experience",
    relatedImage: {
      src: "/images/projects/soda-shop-bottle.jpg",
      alt: "Printed Soda Shop bottle from the Fold Theory archive",
      width: 743,
      height: 929,
    },
  },
  {
    id: "art-direction",
    number: "07",
    title: "Art Direction",
    description: "Image worlds, still-life direction and a cohesive approach to product presentation.",
    capability: "Image & styling direction",
    relatedImage: {
      src: "/images/projects/production-rigid-boxes.jpg",
      alt: "Khoya packaging arranged on a production worktable",
      width: 1440,
      height: 1440,
    },
  },
  {
    id: "production-support",
    number: "08",
    title: "Production Support",
    description: "Artwork, prototypes, material guidance and practical vendor-ready delivery.",
    capability: "Production guidance",
    relatedImage: {
      src: "/images/projects/pinewood-cases.jpg",
      alt: "Pinewood presentation cases from the Fold Theory studio archive",
      width: 640,
      height: 1136,
    },
  },
] as const satisfies readonly Service[];

export type ProjectTypeOption = {
  value: string;
  label: string;
};

export const projectTypeOptions = [
  { value: "brand-strategy", label: "Brand Strategy" },
  { value: "visual-identity", label: "Visual Identity" },
  { value: "packaging-design", label: "Packaging Design" },
  { value: "print-collateral", label: "Print & Collateral" },
  { value: "corporate-gifting", label: "Corporate Gifting" },
  { value: "hospitality-branding", label: "Hospitality Branding" },
  { value: "art-direction", label: "Art Direction" },
  { value: "other", label: "Other" },
] as const satisfies readonly ProjectTypeOption[];

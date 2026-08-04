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
    id: "corrugated-boxes",
    number: "01",
    title: "Corrugated Boxes",
    description:
      "2-ply, 3-ply and 5-ply boxes tailored to your packaging and branding requirements.",
    capability: "Custom corrugated packaging",
    relatedImage: {
      src: "/images/services/coffee-carriers.jpg",
      alt: "Custom corrugated packaging carriers from Fold Theory production",
      width: 1200,
      height: 1500,
    },
  },
  {
    id: "glass-mug-printing",
    number: "02",
    title: "Glass & Mug Printing",
    description:
      "Customized printing for mugs and glassware using logos, brand names, artwork, and bespoke designs.",
    capability: "Glassware & ceramic print",
    relatedImage: {
      src: "/images/services/branded-mugs-still.jpg",
      alt: "Custom printed ceramic mugs produced by Fold Theory",
      width: 1200,
      height: 1500,
    },
  },
  {
    id: "paper-bags",
    number: "03",
    title: "Paper Bags",
    description:
      "Custom printed paper bags with premium finishes, twisted or flat handles, and flexible sizing options.",
    capability: "Retail carry bags",
    relatedImage: {
      src: "/images/projects/heads-up-for-tails-bag.png",
      alt: "Orange Heads Up For Tails branded paper carry bag",
      width: 768,
      height: 1024,
    },
  },
  {
    id: "embossing",
    number: "04",
    title: "Embossing",
    description:
      "Raised detailing that adds depth, texture, and a refined premium finish to packaging.",
    capability: "Tactile finishing",
    relatedImage: {
      src: "/images/services/cecilia-close.jpg",
      alt: "Close-up of embossed and printed packaging surface detail",
      width: 1200,
      height: 1500,
    },
  },
  {
    id: "printing-solutions",
    number: "05",
    title: "Printing Solutions",
    description:
      "High-quality CMYK printing, Pantone and special-colour printing for professional brand presentation.",
    capability: "CMYK & special colour print",
    relatedImage: {
      src: "/images/services/ice-pop-still.jpg",
      alt: "Premium colour print production detail from Fold Theory",
      width: 1200,
      height: 1500,
    },
  },
  {
    id: "foil-stamping",
    number: "06",
    title: "Foil Stamping",
    description:
      "Metallic finishes in gold, silver, rose gold, and other premium foil options.",
    capability: "Metallic foil finishing",
    relatedImage: {
      src: "/images/projects/green-gift-boxes.png",
      alt: "Deep green Naanche rigid box with gold foil logo detail",
      width: 1024,
      height: 1024,
    },
  },
] as const satisfies readonly Service[];

export type ProjectTypeOption = {
  value: string;
  label: string;
};

export const projectTypeOptions = [
  { value: "food-packaging", label: "Food Packaging" },
  { value: "beverage-packaging", label: "Beverage Packaging" },
  { value: "gifting", label: "Gifting" },
  { value: "retail-packaging", label: "Retail Packaging" },
  { value: "rigid-boxes", label: "Rigid Boxes" },
  { value: "cups-and-sleeves", label: "Cups and Sleeves" },
  { value: "bags", label: "Bags" },
  { value: "corrugated-boxes", label: "Corrugated Boxes" },
  { value: "glass-mug-printing", label: "Glass & Mug Printing" },
  { value: "other", label: "Other" },
] as const satisfies readonly ProjectTypeOption[];

import type { ProjectImage } from "./projects";

export type Service = {
  id: string;
  title: string;
  description: string;
  capability: string;
  relatedImage: ProjectImage;
};

export const services = [
  {
    id: "glass-mug-printing",
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
    id: "embossing",
    title: "Embossing",
    description:
      "Raised detailing that creates depth, texture, and a refined tactile finish, adding a premium touch to luxury packaging.",
    capability: "Tactile finishing",
    relatedImage: {
      src: "/images/services/embossing-fold-theory-box.png",
      alt: "Beige Fold Theory box with embossed logo on a stone surface",
      width: 633,
      height: 1024,
    },
  },
  {
    id: "printing-solutions",
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

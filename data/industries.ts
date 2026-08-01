export type Industry = {
  id: string;
  label: string;
};

export type Capability = {
  id: string;
  label: string;
};

export const industries = [
  { id: "food-beverage", label: "Food & Beverage" },
  { id: "hospitality", label: "Hospitality" },
  { id: "beauty", label: "Beauty" },
  { id: "lifestyle", label: "Lifestyle" },
  { id: "consumer-products", label: "Consumer Products" },
  { id: "corporate-gifting", label: "Corporate Gifting" },
  { id: "retail", label: "Retail" },
  { id: "events", label: "Events" },
] as const satisfies readonly Industry[];

export const capabilities = [
  { id: "brand-strategy", label: "Brand Strategy" },
  { id: "identity-systems", label: "Identity Systems" },
  { id: "packaging", label: "Packaging" },
  { id: "print", label: "Print" },
  { id: "art-direction", label: "Art Direction" },
  { id: "product-styling", label: "Product Styling" },
  { id: "production-guidance", label: "Production Guidance" },
] as const satisfies readonly Capability[];

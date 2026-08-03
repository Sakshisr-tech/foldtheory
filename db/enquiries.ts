export type NewEnquiry = {
  name: string;
  email: string;
  company: string;
  phone: string;
  projectTypes: string[];
  description: string;
  budget?: string;
  timeline?: string;
  reference?: string;
};

export async function saveEnquiry(enquiry: NewEnquiry) {
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  console.log("New enquiry received:", {
    id,
    createdAt,
    ...enquiry,
  });

  return {
    id,
    createdAt,
  };
}
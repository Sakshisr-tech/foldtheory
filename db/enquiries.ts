import { env } from "cloudflare:workers";

export type NewEnquiry = {
  name: string;
  email: string;
  company: string;
  projectTypes: string[];
  description: string;
  budget?: string;
  timeline?: string;
  reference?: string;
};

const createEnquiriesTable = `
  CREATE TABLE IF NOT EXISTS enquiries (
    id TEXT PRIMARY KEY NOT NULL,
    created_at TEXT NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT NOT NULL,
    project_types TEXT NOT NULL,
    description TEXT NOT NULL,
    budget TEXT,
    timeline TEXT,
    reference TEXT,
    status TEXT NOT NULL DEFAULT 'new'
  )
`;

let initialization: Promise<unknown> | null = null;

function getBinding() {
  if (!env.DB) throw new Error("Enquiry storage is unavailable");
  return env.DB;
}

async function ensureEnquiriesTable() {
  const database = getBinding();
  initialization ??= database.prepare(createEnquiriesTable).run();
  await initialization;
  return database;
}

export async function saveEnquiry(enquiry: NewEnquiry) {
  const database = await ensureEnquiriesTable();
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  const result = await database
    .prepare(
      `INSERT INTO enquiries (
        id, created_at, name, email, company, project_types,
        description, budget, timeline, reference, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new')`,
    )
    .bind(
      id,
      createdAt,
      enquiry.name,
      enquiry.email,
      enquiry.company,
      JSON.stringify(enquiry.projectTypes),
      enquiry.description,
      enquiry.budget || null,
      enquiry.timeline || null,
      enquiry.reference || null,
    )
    .run();

  if (!result.success) throw new Error("Enquiry could not be stored");
  return { id, createdAt };
}

export type EnquiryInput = {
  name: string;
  email: string;
  company: string;
  phone: string;
  projectTypes: string[];
  description: string;
  budget: string;
  timeline: string;
  reference: string;
};

type D1PreparedStatement = {
  bind: (...values: unknown[]) => D1PreparedStatement;
  run: () => Promise<unknown>;
};

type D1Database = {
  prepare: (query: string) => D1PreparedStatement;
};

type EnquiryEnv = {
  DB?: D1Database;
};

declare global {
  // Optional Cloudflare D1 binding when running on ChatGPT/Workers hosting.
  var DB: D1Database | undefined;
}

const ENSURE_TABLE = `
CREATE TABLE IF NOT EXISTS enquiries (
  id TEXT PRIMARY KEY NOT NULL,
  created_at TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  phone TEXT,
  project_types TEXT NOT NULL,
  description TEXT NOT NULL,
  budget TEXT,
  timeline TEXT,
  reference TEXT,
  status TEXT DEFAULT 'new' NOT NULL
)
`;

function getDatabase(): D1Database {
  const fromGlobal = globalThis.DB;
  if (fromGlobal) return fromGlobal;

  throw new Error("D1 database binding is unavailable.");
}

export async function saveEnquiry(input: EnquiryInput, env?: EnquiryEnv) {
  const db = env?.DB ?? getDatabase();

  await db.prepare(ENSURE_TABLE).run();

  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  await db
    .prepare(
      `INSERT INTO enquiries (
        id, created_at, name, email, company, phone, project_types, description, budget, timeline, reference, status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new')`,
    )
    .bind(
      id,
      createdAt,
      input.name,
      input.email,
      input.company,
      input.phone,
      JSON.stringify(input.projectTypes),
      input.description,
      input.budget,
      input.timeline,
      input.reference || null,
    )
    .run();

  return { id, createdAt };
}

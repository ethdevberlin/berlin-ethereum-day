import fs from "fs";
import path from "path";

// Load .env for local development (no-op if file absent or var already set)
if (fs.existsSync(".env")) {
  fs.readFileSync(".env", "utf8")
    .split("\n")
    .forEach((line) => {
      const eq = line.indexOf("=");
      if (eq === -1) return;
      const key = line.slice(0, eq).trim();
      const val = line.slice(eq + 1).trim();
      if (key && !process.env[key]) process.env[key] = val;
    });
}

const FILLOUT_API_KEY = process.env.FILLOUT_API_KEY;

const API_URL =
  "https://tables.fillout.com/api/v1/bases/98aa8e3a65b56754/tables/tnaYF6PkXSi/records/list";

const SPEAKERS_JSON = path.join(__dirname, "../src/data/speakers.json");

interface FilloutRecord {
  id: string;
  fields: {
    "Speaker Name": string | null;
    Affiliation: string | null;
    X: string | null;
    Github: string | null;
    Image: { url: string }[] | null | [];
  };
}

interface FilloutResponse {
  records: FilloutRecord[];
  total: number;
  hasMore: boolean;
}

interface Speaker {
  name: string;
  affiliation: string | null;
  photo: string | null;
  x: string | null;
  github: string | null;
}

async function fetchPage(offset: number): Promise<FilloutResponse> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${FILLOUT_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ limit: 500, offset }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Fillout API error ${res.status}: ${body}`);
  }
  return res.json() as Promise<FilloutResponse>;
}

async function main() {
  if (!FILLOUT_API_KEY) {
    console.log("[fetch-speakers] FILLOUT_API_KEY not set — keeping existing speakers.json");
    process.exit(0);
  }

  console.log("[fetch-speakers] Fetching speakers from Fillout Tables…");

  const allRecords: FilloutRecord[] = [];
  let offset = 0;

  while (true) {
    const data = await fetchPage(offset);
    allRecords.push(...data.records);
    if (!data.hasMore) break;
    offset += 500;
  }

  const speakers: Speaker[] = allRecords
    .filter((r) => r.fields["Speaker Name"])
    .map((r) => {
      const image = Array.isArray(r.fields.Image) && r.fields.Image.length > 0
        ? (r.fields.Image as { url: string }[])[0].url
        : null;

      return {
        name: r.fields["Speaker Name"]!,
        affiliation: r.fields.Affiliation ?? null,
        photo: image,
        x: r.fields.X ?? null,
        github: r.fields.Github ?? null,
      };
    });

  fs.writeFileSync(SPEAKERS_JSON, JSON.stringify(speakers, null, 2));
  console.log(`[fetch-speakers] Wrote ${speakers.length} speakers to src/data/speakers.json`);
}

main().catch((err) => {
  console.error("[fetch-speakers] Fatal error:", err);
  process.exit(1);
});

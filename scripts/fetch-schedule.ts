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

// Same Fillout base as the speakers table — just a different table ID.
// Create the "Schedule" table in Fillout and put its table ID here (or set
// SCHEDULE_TABLE_ID in the environment). Until then this script keeps the
// existing schedule.json so the build never breaks.
const BASE_ID = "98aa8e3a65b56754";
const SCHEDULE_TABLE_ID = process.env.SCHEDULE_TABLE_ID || "tqCpRECdA4V";

const API_URL = `https://tables.fillout.com/api/v1/bases/${BASE_ID}/tables/${SCHEDULE_TABLE_ID}/records/list`;

const SCHEDULE_JSON = path.join(__dirname, "../src/data/schedule.json");

interface FilloutRecord {
  id: string;
  fields: {
    Time: string | null;
    Speaker: string | null;
    Project: string | null;
    "Session Type": string | null;
    Track: string | null;
    Title: string | null;
    Abstract: string | null;
  };
}

interface FilloutResponse {
  records: FilloutRecord[];
  total: number;
  hasMore: boolean;
}

interface ScheduleSession {
  time: string;
  speaker: string | null;
  project: string | null;
  sessionType: string | null;
  track: string | null;
  title: string | null;
  abstract: string | null;
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

// Parse the start time out of a "HH:MM - HH:MM" string for stable sorting.
function startMinutes(time: string): number {
  const match = time.match(/(\d{1,2}):(\d{2})/);
  if (!match) return Number.MAX_SAFE_INTEGER;
  return parseInt(match[1], 10) * 60 + parseInt(match[2], 10);
}

async function main() {
  if (!FILLOUT_API_KEY) {
    console.log("[fetch-schedule] FILLOUT_API_KEY not set — keeping existing schedule.json");
    process.exit(0);
  }

  console.log("[fetch-schedule] Fetching schedule from Fillout Tables…");

  const allRecords: FilloutRecord[] = [];
  let offset = 0;

  while (true) {
    const data = await fetchPage(offset);
    allRecords.push(...data.records);
    if (!data.hasMore) break;
    offset += 500;
  }

  const sessions: ScheduleSession[] = allRecords
    .filter((r) => r.fields.Time)
    .map((r) => ({
      time: r.fields.Time!,
      speaker: r.fields.Speaker ?? null,
      project: r.fields.Project ?? null,
      sessionType: r.fields["Session Type"] ?? null,
      track: r.fields.Track ?? null,
      title: r.fields.Title ?? null,
      abstract: r.fields.Abstract ?? null,
    }))
    .sort((a, b) => startMinutes(a.time) - startMinutes(b.time));

  fs.writeFileSync(SCHEDULE_JSON, JSON.stringify(sessions, null, 2));
  console.log(`[fetch-schedule] Wrote ${sessions.length} sessions to src/data/schedule.json`);
}

main().catch((err) => {
  console.error("[fetch-schedule] Fatal error:", err);
  process.exit(1);
});

import fs from "fs";
import path from "path";
import https from "https";

const FILLOUT_API_KEY = process.env.FILLOUT_API_KEY;
const FILLOUT_FORM_ID = process.env.FILLOUT_FORM_ID;

const SPEAKERS_JSON = path.join(__dirname, "../src/data/speakers.json");
const PHOTOS_DIR = path.join(__dirname, "../public/speakers");

interface FilloutQuestion {
  id: string;
  name: string;
  type: string;
  value: string | null | { url: string; filename: string }[];
}

interface FilloutSubmission {
  submissionId: string;
  submissionTime: string;
  questions: FilloutQuestion[];
}

interface FilloutResponse {
  responses: FilloutSubmission[];
  totalResponses: number;
  pageCount: number;
}

interface Speaker {
  name: string;
  title: string | null;
  affiliation: string | null;
  bio: string | null;
  photo: string | null;
  twitter: string | null;
  website: string | null;
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function downloadFile(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https
      .get(url, (response) => {
        response.pipe(file);
        file.on("finish", () => {
          file.close();
          resolve();
        });
      })
      .on("error", (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
  });
}

function getField(submission: FilloutSubmission, name: string): string | null {
  const q = submission.questions.find((q) => q.name === name);
  if (!q || q.value === null || q.value === undefined) return null;
  if (typeof q.value === "string") return q.value.trim() || null;
  return null;
}

function getFileField(
  submission: FilloutSubmission,
  name: string
): { url: string; filename: string } | null {
  const q = submission.questions.find((q) => q.name === name);
  if (!q || !Array.isArray(q.value) || q.value.length === 0) return null;
  return q.value[0] as { url: string; filename: string };
}

async function fetchPage(offset: number, limit = 150): Promise<FilloutResponse> {
  const url = `https://api.fillout.com/v1/api/forms/${FILLOUT_FORM_ID}/submissions?limit=${limit}&offset=${offset}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${FILLOUT_API_KEY}` },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Fillout API error ${res.status}: ${body}`);
  }
  return res.json() as Promise<FilloutResponse>;
}

async function main() {
  if (!FILLOUT_API_KEY || !FILLOUT_FORM_ID) {
    console.log(
      "[fetch-speakers] FILLOUT_API_KEY/FORM_ID not set — keeping existing speakers.json"
    );
    process.exit(0);
  }

  console.log("[fetch-speakers] Fetching speaker submissions from Fillout…");

  const allSubmissions: FilloutSubmission[] = [];
  let offset = 0;
  const limit = 150;

  while (true) {
    const data = await fetchPage(offset, limit);
    allSubmissions.push(...data.responses);
    if (allSubmissions.length >= data.totalResponses) break;
    offset += limit;
  }

  console.log(`[fetch-speakers] Retrieved ${allSubmissions.length} submissions`);

  if (!fs.existsSync(PHOTOS_DIR)) {
    fs.mkdirSync(PHOTOS_DIR, { recursive: true });
  }

  const speakers: Speaker[] = [];

  for (const submission of allSubmissions) {
    const name = getField(submission, "Name") ?? getField(submission, "Full Name");
    if (!name) continue;

    const slug = slugify(name);
    const photoFile = getFileField(submission, "Photo") ?? getFileField(submission, "Headshot");
    let photoPath: string | null = null;

    if (photoFile) {
      const ext = path.extname(photoFile.filename) || ".jpg";
      const dest = path.join(PHOTOS_DIR, `${slug}${ext}`);
      try {
        await downloadFile(photoFile.url, dest);
        photoPath = `/speakers/${slug}${ext}`;
      } catch (err) {
        console.warn(`[fetch-speakers] Failed to download photo for ${name}:`, err);
      }
    }

    speakers.push({
      name,
      title: getField(submission, "Talk Title") ?? getField(submission, "Title"),
      affiliation: getField(submission, "Affiliation") ?? getField(submission, "Organization"),
      bio: getField(submission, "Bio") ?? getField(submission, "Short Bio"),
      photo: photoPath,
      twitter: getField(submission, "Twitter") ?? getField(submission, "X / Twitter"),
      website: getField(submission, "Website"),
    });
  }

  fs.writeFileSync(SPEAKERS_JSON, JSON.stringify(speakers, null, 2));
  console.log(`[fetch-speakers] Wrote ${speakers.length} speakers to src/data/speakers.json`);
}

main().catch((err) => {
  console.error("[fetch-speakers] Fatal error:", err);
  process.exit(1);
});

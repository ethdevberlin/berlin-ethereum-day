# Berlin Ethereum Day

Website for **Berlin Ethereum Day** — June 15, 2026 at Funkhaus Berlin.

Live: https://ethdevberlin.github.io/berlin-ethereum-day/

## Stack

- [Next.js 15](https://nextjs.org/) (App Router, static export)
- [Tailwind CSS 3](https://tailwindcss.com/)
- TypeScript
- Deployed to GitHub Pages via GitHub Actions

## Development

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # static export to ./out
```

## Speakers

Confirmed speakers are stored in `src/data/speakers.json`. In production the CI workflow fetches live data from a private Fillout form at build time; the committed file contains placeholder data used for local development and when secrets are not configured.

### Setting up the Fillout integration

1. Go to **Settings → Secrets → Actions** in this repo.
2. Add two secrets:
   - `FILLOUT_API_KEY` — your Fillout API key
   - `FILLOUT_FORM_ID` — the ID of the speaker submission form
3. Push any commit (or trigger **Run workflow** manually) to redeploy with live speaker data.

The fetch script (`scripts/fetch-speakers.ts`) is a no-op when the secrets are absent, so CI always passes.

To run the fetch locally:

```bash
FILLOUT_API_KEY=<key> FILLOUT_FORM_ID=<id> npm run fetch-speakers
```

The script maps form fields by name (`Name`, `Talk Title`, `Affiliation`, `Bio`, `Photo`, `Twitter`, `Website`). Adjust the field names in `scripts/fetch-speakers.ts` to match your actual Fillout form once it is created.

## GitHub Pages / basePath

The site is deployed to a subpath (`/berlin-ethereum-day`), so `next/image` sources must include the path prefix. This is handled via the `NEXT_PUBLIC_BASE_PATH` env var:

- **Local dev**: unset → empty string → images resolve from `/`
- **CI build**: set to `/berlin-ethereum-day` in `.github/workflows/nextjs.yml`

The constant is centralised in `src/lib/basePath.ts`. Any new component that renders a `<Image>` from `/public` must import it:

```ts
import basePath from "@/lib/basePath";
// ...
<Image src={`${basePath}/my-image.png`} ... />
```

**When a custom domain is added**, set `NEXT_PUBLIC_BASE_PATH` to `""` in the workflow (or remove the env line) and the prefix disappears automatically.

## Updating placeholder links

Several links are placeholder `href="#"` and need real URLs before launch:

| Location | Link | Needs |
|---|---|---|
| `src/components/Header.tsx` | Apply to Speak | Pretalx URL |
| `src/components/Header.tsx` | Register | Pretix URL |
| `src/components/Hero.tsx` | Apply to Attend | Pretix URL |
| `src/components/Hero.tsx` | Apply to Speak | Pretalx URL |
| `src/components/SpeakersGrid.tsx` | Apply via Pretalx | Pretalx URL |
| `src/components/Footer.tsx` | GitHub source link | Confirm repo URL |
| `src/components/Header.tsx` | GitHub icon | Confirm repo URL |
| `src/app/layout.tsx` | `metadataBase` | Update when custom domain is set |

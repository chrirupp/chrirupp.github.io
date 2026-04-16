# chrirupp.github.io

Personal academic website for [Christian Rupprecht](https://chrirupp.github.io), built with Next.js and deployed via GitHub Pages.

## Updating content

All content lives in `src/content/` as JSON files — no code changes needed for routine updates.

| File | What to edit |
|------|-------------|
| `profile.json` | Name, title, bio, social links |
| `news.json` | News items (publications, awards, etc.) |
| `teaching.json` | Courses and lecture slides |
| `team.json` | Current students and alumni |

### Adding a news item

Add an entry to the top of `newsItems` in `news.json`:

```json
{
  "date": "Month YYYY",
  "title": "...",
  "description": "...",
  "type": "publication",
  "conference": "VENUE'YY",
  "links": [{ "text": "Paper", "url": "https://arxiv.org/..." }]
}
```

Valid types: `publication`, `award`, `presentation`, `teaching`, `service`, `position`, `project`, `education`, `event`

### Adding a team member

Add an entry to `currentStudents` in `team.json`, then run the photo scraper (see below).

### Adding course slides

Place PDF files in `public/teaching/YEAR/` and add entries to the `slides` array in `teaching.json`.

## Development

```bash
npm install
npm run dev       # Start dev server at localhost:3000
npm run build     # Build static export to /out
```

## Scraping team photos

Fetches profile photos from Google Scholar for all team members who have a `googleScholar` ID set:

```bash
npm run dev:scrape-scholar-images
```

This updates `team.json` image paths and saves photos to `public/images/team/`.

## Deployment

Pushing to `master` triggers GitHub Pages deployment automatically.

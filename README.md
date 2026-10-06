# DevFest Tender Package Builder

A frontend-only Tender Document Package Builder for AI DevFest. It runs entirely in the browser and processes tender PDFs locally.

## Main features

- Load and validate `requirements.json` and show tender details sorted by document order.
- Upload up to 30 PDFs with a 50 MB total limit.
- Show every uploaded file name, page count and SHA-256 fingerprint.
- Reject non-PDF, unreadable or password-protected PDFs with a clear message.
- Remove uploaded files at any time.
- One-to-one document matching with change/undo support.
- Exact duplicate detection by file content; duplicate copies cannot be assigned to different requirements.
- Expiry-date entry and immediate validation against the tender submission deadline.
- Exact required statuses: Missing, Expiry date needed, Expired, Not provided, OK.
- Generate button remains disabled while a blocking status exists.
- Create a combined PDF in requirement order with an English cover page and safe bottom footer on every page.
- Download as `<tender_id>_Package.pdf`.
- Complete English/Bangla UI with document names switching between `title_en` and `title_bn`.
- Filename-based auto-match as a bonus feature.

## Run locally

```bash
npm install
npm run dev
```

Open the local Vite URL in Google Chrome.

## Build

```bash
npm run build
npm run preview
```

## Tech

- React + Vite
- pdf-lib
- Browser APIs: File API, Web Crypto SHA-256, Blob/Object URL
- No participant-controlled backend, database or online storage

## Important contest note

Create the required public repository during the allowed setup time and do not commit project code before T+0. Keep at least 3 commits, with a short change description and the AI prompt used in each commit message. Finish the final eligible commit and public HTTPS deployment by T+90.

## Sample output

`output/T-2026-0417_Package.pdf` is included as a sample-pack result after resolving the sample pack's issues.

## Screenshots

`screenshots/statuses.png` shows the document checklist/status view for the sample scenario.

## AI tools

AI-assisted development was used. The most useful prompt focused on implementing the Tender Package Builder main tasks, strict status rules, browser-only PDF processing, exact duplicate detection and safe PDF footer generation.

## License

MIT

## Submission Checklist

The repository includes the final package generated from the provided sample pack:

- `output/T-2026-0417_Package.pdf`
- `screenshots/statuses.png`

### Main Workflow

1. Load `requirements.json`
2. Upload and validate PDF documents
3. Match files to required documents
4. Enter expiry dates where required
5. Review document statuses
6. Resolve all blocking issues
7. Generate and download the final tender package

### AI Usage

AI assistance was used during development for implementation guidance, debugging, UI refinement, validation logic, and PDF package generation.

### Useful AI Prompt

"Build a frontend-only tender package builder that loads requirements.json, validates and matches PDF documents, detects duplicate file content, checks expiry dates against the submission deadline, supports Bangla and English, and generates a combined PDF with an English cover page and Page X of Y footer."


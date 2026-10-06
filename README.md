# Tender Package Builder

A frontend-only web application for preparing, validating, and generating complete tender submission packages from PDF documents.

## 🚀 Live Demo

https://ai-dev-fest-2026-kazi-aurpon-4edoxhvpx-aurpon.vercel.app

## 💻 GitHub Repository

https://github.com/kaziaurpon/AI-Dev-Fest-2026-Kazi_Aurpon

---

## 📌 Project Overview

Tender Package Builder helps bidders organize required tender documents, validate submission requirements, detect duplicate documents, manage expiry dates, and generate a final combined PDF package.

The application runs entirely in the browser without requiring a backend, database, or user login.

It supports both **English and Bangla** for a more accessible tender preparation workflow.

---

## ✨ Key Features

### 1. Tender Requirements

- Loads tender requirements from `requirements.json`
- Displays tender ID, title, procuring entity, bidder name, and submission deadline
- Displays required documents according to their defined order
- Supports English and Bangla document titles using `title_en` and `title_bn`

### 2. PDF Document Management

- Uploads multiple PDF documents
- Displays uploaded filenames and page counts
- Clearly rejects non-PDF files
- Allows uploaded files to be removed
- Handles invalid or unsupported PDF files safely

### 3. Document Matching

- Matches uploaded PDFs with required tender documents
- Maintains one-to-one matching between files and required documents
- Allows document matching to be changed or undone
- Prevents one file from being matched to multiple documents

### 4. Expiry Date Validation

- Supports expiry dates for documents where required
- Requests an expiry date when `has_expiry` is enabled
- Compares document expiry dates with the tender submission deadline
- Treats an expiry date equal to the submission deadline as valid

### 5. Duplicate Detection

- Detects exact-content duplicate PDF files
- Detects duplicates even when filenames are different
- Prevents duplicate content from being matched to different required documents

### 6. Document Status

Each required document receives exactly one status:

| Status | Meaning | Blocking |
|---|---|---|
| **Missing** | Required document has not been provided | Yes |
| **Expiry Date Needed** | Required expiry date has not been entered | Yes |
| **Expired** | Document expires before the submission deadline | Yes |
| **Not Provided** | Optional document has not been provided | No |
| **OK** | Document satisfies all requirements | No |

Statuses update immediately when document matching or expiry information changes.

### 7. PDF Package Generation


The repository contains the required final submission artifacts.

### Final Generated Tender Package

**Tender ID:** `T-2026-0417`

[📄 Open / Download Final Tender Package](https://github.com/kaziaurpon/AI-Dev-Fest-2026-Kazi_Aurpon/blob/main/output/T-2026-0417_Package.pdf)

The PDF is the final combined tender package generated from the provided sample documents.

### Document Status Screenshot

![Document Status Screenshot](https://github.com/kaziaurpon/AI-Dev-Fest-2026-Kazi_Aurpon/blob/main/screenshots/statuses.png)

[🖼️ Open Full-Size Screenshot](https://github.com/kaziaurpon/AI-Dev-Fest-2026-Kazi_Aurpon/blob/main/screenshots/statuses.png)

The screenshot demonstrates the document status interface of the application.

---

## 🌐 Language Support

The complete application interface supports:

- English
- বাংলা (Bangla)

Document names are displayed using the appropriate `title_en` or `title_bn` value.

- Package generation is disabled while blocking issues exist
- Shows why the package cannot be generated
- Generates a combined PDF when all blocking issues are resolved
- Creates an English cover page
- Includes tender information and included documents
- Arranges documents according to their required order
- Preserves the original page order of each document
- Skips optional documents that were not provided
- Adds a readable footer to every page
- Uses the required filename format:

`<tender_id>_Package.pdf`

### 8. Language Support

The application supports:

- English
- বাংলা (Bangla)

Document names are displayed using the appropriate `title_en` or `title_bn` value.

---

## 🛠️ Technology Stack

- React
- Vite
- JavaScript
- HTML5
- CSS3
- Browser-based PDF processing
- SHA-256 content hashing for duplicate detection

The application is designed as a frontend-only solution and does not require a backend or external database.

---

## 📂 Project Structure

```text
AI-Dev-Fest-2026-Kazi_Aurpon/
│
├── public/
│
├── src/
│   ├── main.jsx
│   └── styles.css
│
├── output/
│   └── T-2026-0417_Package.pdf
│
├── screenshots/
│   └── statuses.png
│
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── README.md
├── LICENSE
└── .gitignore
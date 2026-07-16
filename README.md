# BAY-CLIMACCESS Evidence Observatory — GitHub Pages package

This public portal supports the proposed **BAY-CLIMACCESS: Climate-Triggered Malaria Care for Children and Pregnant Women** Proof of Concept.

## What the portal is

- a reviewer-facing evidence and accountability interface;
- a public map of approved settlement- and health-facility-catchment aggregates;
- a registry of live Earth Engine applications;
- a versioned record of evidence, triggers, actions and measured outcomes.

## What the portal is not

- the secure operational database;
- a system for storing names, telephone numbers, pregnancy records, household records, calls, referrals or clinical records;
- a live Earth Engine processing environment;
- proof that health outcomes have improved before the PoC evaluation.

## Local preview

Open the folder in VS Code, open `index.html`, right-click and select **Open with Live Server**.

## GitHub Pages deployment

1. Upload the contents of this folder to the repository root.
2. Confirm that `index.html`, `app.js`, `styles.css`, `fallback-data.js`, `data/` and `.nojekyll` are visible at the repository root.
3. In GitHub: **Settings → Pages → Deploy from a branch → main → /(root)**.
4. Wait for deployment and open the generated GitHub Pages URL.

## Public data structure

- `data/reference/` — approved stable geography and facilities;
- `data/observations/` — template schemas for protected/source observations; publish only authorized aggregates;
- `data/outputs/` — public map-ready settlement/catchment summaries;
- `data/metadata/` — indicator catalogue, source rules, evidence grades and data dictionary.

Read `DATA_UPLOAD_GUIDE.md` before adding data.

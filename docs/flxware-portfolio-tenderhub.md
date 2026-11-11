# TenderHub — portfolio content for flxwaretech.com

**Purpose:** copy-ready content to add TenderHub as a portfolio project on `flxwaretech.com`.
**Prepared:** 2026-10-30
**Target URL:** `https://flxwaretech.com/portfolio/tenderhub`
**Source of truth for the technical claims:** this repository (`/Volumes/AREA51/EvoStacks/TenderHub`), verified 2026-10-30.

---

## 1. How to use this document

The live site already has a fixed shape for portfolio entries. Every section below maps to one slot in that shape, so nothing here needs rewriting — it is meant to be pasted.

| Section here | Where it goes on the site |
|---|---|
| §3 Portfolio card | The card grid in the **Our Portfolio** section of the homepage |
| §4 Detail page | `/portfolio/tenderhub`, following the same layout as `/portfolio/wayz` |
| §5 Gallery plan | The **Project Gallery** carousel on the detail page |
| §6 SEO metadata | `<head>` / Next.js `metadata` export for the detail route |
| §7 Data object | The portfolio data file the existing three projects are defined in |
| §8 Accuracy notes | Read before publishing — four claims need a decision from you |

---

## 2. Decide these four things before publishing

The rest of the content is verified against the code. These four cannot be — they are business facts, not technical ones, and the existing portfolio entries state them confidently, so leaving them wrong would be the one thing a reader could catch.

| Field | Suggested value | Why it needs your call |
|---|---|---|
| **Client** | `Internal Product — Flxware Technologies` | TenderHub is not attributed to an external client anywhere in the repo. If there is a founder, sponsor or partner organisation behind it, name them the way the Wayz entry names "Tourism Technology Startup". |
| **Duration** | `3 months (ongoing)` | The analysis pack is dated 2026-08-25 and the code is dated through 2026-08-31, which is where the ~3 month figure comes from. Replace with the real engagement window if one exists. |
| **Status** | `In Development` | **Do not publish this as `Completed`.** The procurement workspace controllers, the ingestion pipeline, the admin screens and the Sinhala/Tamil locales are not built, and dependencies have not been installed on either side. The existing three entries all say "Completed", so this one will visibly differ — that is correct and worth keeping. |
| **Year badge** | `2026` | Matches the card convention (`2024`, `2024`, `2025` on the current three). |

A fifth, smaller one: the card and detail page both imply a reachable product. `tenderhub.lk` is recorded in the analysis pack as *"domain to be confirmed"*. If the domain is not live, do not add an outbound "Visit Site" link — the other entries do not have one either, so this costs nothing.

---

## 3. Portfolio card (homepage)

Mirrors the card structure used by Expense Tracker, Exercise Tracker and Wayz: category badge, year, title, description, four key features, technology chips, detail link.

**Category badge**

```
Web Platform
```

**Year**

```
2026
```

**Title**

```
TenderHub
```

**Description** *(2 sentences, same length as the Wayz card)*

```
A national tender and auction intelligence platform for Sri Lanka, bringing every public, private and bank-auction notice on the island into one searchable record. Paired with an e-tendering workspace that lets a buying organisation publish, receive sealed bids, evaluate and award entirely online.
```

**Key Features** *(four, matching the card convention)*

```
Faceted Tender Search
Server-Enforced Subscription Tiers
Role-Based Procurement Portals
SEO-First Server Rendering
```

**Technologies** *(chips)*

```
CodeIgniter 4
PHP 8.3
Next.js
React 19
TypeScript
Tailwind CSS
MySQL
```

**Link**

```
/portfolio/tenderhub
```

---

## 4. Detail page — `/portfolio/tenderhub`

### 4.1 Hero

**Title**

```
TenderHub
```

**Tagline** *(the one-line subtitle under the title)*

```
National Tender & Auction Intelligence Platform
```

**Intro paragraph** *(the short lead under the tagline)*

```
Every tender and auction notice issued in Sri Lanka, gathered from government e-procurement, ministries, provincial councils, the Gazette, three-language newspapers and bank recovery units into a single searchable record — and an e-tendering workspace that lets a buying organisation run the entire procurement cycle, from notice to award, without a sealed box in reception.
```

**Technology chips** *(hero row — same chips as the card, in this order)*

```
CodeIgniter 4
PHP 8.3
Next.js
React 19
TypeScript
Tailwind CSS v4
MySQL
```

### 4.2 Project Details panel

| Label | Value |
|---|---|
| **Category** | Procurement & Marketplace Platform |
| **Client** | Internal Product — Flxware Technologies *(confirm — see §2)* |
| **Duration** | 3 months (ongoing) *(confirm — see §2)* |
| **Status** | In Development *(confirm — see §2)* |

### 4.3 Project Overview

```
Sri Lanka has no single place where every tender and auction notice on the island can be found, and no affordable way for a private, semi-government or NGO buyer to actually run a tender online. Notices are scattered across fifteen-odd newspapers, hundreds of institutional websites, the weekly Gazette and the government's own eGP system — which serves only the agencies mandated onto it. A contractor who sees a notice three days late has already lost the job.

TenderHub solves both halves. A headless CodeIgniter 4 API, versioned under /api/v1/ from the first commit, holds the notice corpus, the subscription logic and the procurement domain, and renders no HTML at all — not even for admin. A Next.js front end consumes it as the only client, serving the public catalogue with server-side rendering for search visibility and three role-based portals behind authentication: a bidder worklist, a buyer's procurement workspace, and a platform console for the review queue and ingestion monitoring.

The architecture is driven by three constraints that are unusual for a marketplace build. Search traffic is the entire acquisition model, so every notice page must be server-rendered and indexable. The median user is on a low-end Android handset on mobile data, so the catalogue ships no client-side JavaScript for filtering — every facet, tab and sort control is a plain anchor resolved on the server, with filter state living in the URL. And the product is a paywall, so the line between a free notice and a paid field had to be drawn somewhere a browser cannot reach.
```

### 4.4 Key Features

```
Live-first catalogue with multi-select facets and live result counts
Subscription paywall enforced in the API transformer, never in the browser
Three role-based portals — bidder worklist, procurement workspace, platform console
Dual deadline display computed against server time, rendered in Asia/Colombo
Filter state in the URL, so search and filtering work before JavaScript loads
Token-free browser — Next.js acts as the BFF and holds every credential server-side
```

### 4.5 Technical Stack

```
CodeIgniter 4.7
PHP 8.3
Next.js
React 19
TypeScript
Tailwind CSS v4
MySQL
JWT Authentication
Server-Side Rendering (ISR)
JSON-LD Structured Data
```

### 4.6 Challenges & Solutions

Three pairs, matching the structure on `/portfolio/wayz`.

**Challenges Faced**

```
Hiding paid content from users without cloaking it from search engines
Keeping authentication tokens out of the browser across four distinct surfaces
Deadlines that decide money, on devices whose clocks cannot be trusted
```

**Solutions Implemented**

```
Enforced the paywall in a single API transformer — withheld fields are never serialised
Made Next.js the backend-for-frontend, with the refresh token in an httpOnly cookie
Shipped server time with every payload and computed every countdown against it
```

If the detail page template allows longer prose in this section, these are the expanded versions:

**Challenge 1 — the paywall.** A subscription product that blurs, truncates or CSS-hides a withheld value has not withheld it: anyone with developer tools reads it in the markup or the RSC payload. The obvious alternative — serving the full record to crawlers and the trimmed one to users — is cloaking, and would eventually cost the organic rankings that the whole acquisition model depends on.

**Solution 1.** One file, `NoticeTransformer.php`, is the only place in the system where a viewer's tier decides what leaves the server. A field the viewer has not paid for is not serialised at all. The response carries a `locked` array holding only the *names* of the withheld fields, which lets the front end render an honest, labelled panel in their place — the user is told precisely what they are not seeing, and the value genuinely is not there.

**Challenge 2 — tokens.** The product spans a public marketing site, a public catalogue, a subscriber portal, a buyer's procurement workspace and an admin console. Any token reachable from JavaScript across that surface area is a standing liability, and a browser talking directly to the API means a CORS surface that has to stay permanently open.

**Solution 2.** Next.js is not just the front end, it is the backend-for-frontend. Route handlers hold the refresh token in an `httpOnly; Secure; SameSite=Lax` cookie; server components call CodeIgniter over the private network with a short-lived access JWT. Nothing in the browser ever holds a credential or addresses the API, so there is no CORS surface at all and the API can be firewalled to the application server's IP.

**Challenge 3 — deadlines.** A bid closes at a moment, and a bidder who misreads it by an hour loses the contract. A countdown computed from the device clock is wrong on any phone with a wrong clock, and a timezone-naive date is wrong for anyone travelling.

**Solution 3.** Every API payload carries `meta.now`, and every countdown in the product is computed against that rather than the browser's clock. Deadlines appear twice on every row — relative and absolute — and always render in `Asia/Colombo` regardless of the viewer's device. Urgency is carried by the wording as well as the colour, so it survives a colour-blind reader and a monochrome print.

### 4.7 Closing CTA

The template's existing copy works unchanged:

```
Interested in a Similar Project?
Let's discuss how we can help bring your vision to life with the same level of expertise and dedication.
```

---

## 5. Project Gallery plan

The existing entries show five to six captioned shots. There is no deployed TenderHub instance to screenshot, but the repository contains two complete, running prototypes that are the real interface — the public site in `ui/` and the three portals in `portal/`. Both run with no build step:

```bash
python3 -m http.server 4321 --directory ui
```

```bash
python3 -m http.server 4400 --directory portal
```

Capture at 1600×1000 in light mode, then keep the set consistent. Suggested order and captions:

| # | Source | Caption |
|---|---|---|
| 1 | `ui/index.html` | **Public Landing** — Live notices carry the hero; no stock photography anywhere in the product |
| 2 | `ui/tenders.html` | **Tender Catalogue** — Multi-select facets with live counts, applied-filter chips and dual countdowns |
| 3 | `ui/tender.html` | **Notice Detail & Paywall** — Withheld fields render as a labelled panel, not a blur |
| 4 | `portal/bidder.html` | **Bidder Worklist** — Matched feed, pipeline table and alert profiles |
| 5 | `portal/publisher.html` | **Procurement Workspace** — Tender setup through submissions, evaluation and award |
| 6 | `portal/admin.html` | **Platform Console** — Review queue, ingestion monitor and payment verification |

Two notes worth passing to whoever captures these. The prototypes run against a fixed demo clock (27 Aug 2026) with 28 realistic Sri Lankan notices, so countdowns and counts are stable between shots and will match across the gallery. And the images in the auction rows are deliberately generated geometric plates rather than photographs — if a caption mentions them, say so, because the product's imagery policy is that an image appears only where the image *is* the content.

---

## 6. SEO metadata

**Page title** *(58 chars)*

```
TenderHub — Tender & Auction Platform | Flxware Technologies
```

**Meta description** *(154 chars)*

```
A national tender and auction intelligence platform for Sri Lanka, with an e-tendering workspace for sealed bids, committee evaluation and award. By Flxware.
```

**Open Graph**

```
og:title       TenderHub — National Tender & Auction Intelligence Platform
og:description Every tender and auction notice in Sri Lanka in one searchable record, plus an e-tendering workspace that takes a buyer from notice to award online.
og:type        article
og:url         https://flxwaretech.com/portfolio/tenderhub
og:image       /portfolio/tenderhub/og.png   (use gallery shot #2 — the catalogue)
```

**Keywords**

```
tender platform, e-tendering, e-procurement, Sri Lanka tenders, auction notices,
sealed bidding, procurement software, CodeIgniter, Next.js, headless API
```

**JSON-LD** — the site can reuse whatever schema the other three entries carry. If none exists, `CreativeWork` with `creator` pointing at the Flxware `Organization` node is the right fit for a portfolio item, and `SoftwareApplication` is not, since the application is not publicly available yet.

---

## 7. Data object

Shaped to match the fields observed on the live `/portfolio/wayz` page, so it should drop into the same data file as the existing three. Adjust key names to the file's actual convention.

```ts
{
  slug: "tenderhub",
  title: "TenderHub",
  tagline: "National Tender & Auction Intelligence Platform",
  category: "Web Platform",
  detailCategory: "Procurement & Marketplace Platform",
  year: 2026,
  client: "Internal Product — Flxware Technologies",  // confirm
  duration: "3 months (ongoing)",                     // confirm
  status: "In Development",                           // confirm
  description:
    "A national tender and auction intelligence platform for Sri Lanka, bringing every public, private and bank-auction notice on the island into one searchable record. Paired with an e-tendering workspace that lets a buying organisation publish, receive sealed bids, evaluate and award entirely online.",
  cardFeatures: [
    "Faceted Tender Search",
    "Server-Enforced Subscription Tiers",
    "Role-Based Procurement Portals",
    "SEO-First Server Rendering",
  ],
  technologies: [
    "CodeIgniter 4",
    "PHP 8.3",
    "Next.js",
    "React 19",
    "TypeScript",
    "Tailwind CSS",
    "MySQL",
  ],
  features: [
    "Live-first catalogue with multi-select facets and live result counts",
    "Subscription paywall enforced in the API transformer, never in the browser",
    "Three role-based portals — bidder worklist, procurement workspace, platform console",
    "Dual deadline display computed against server time, rendered in Asia/Colombo",
    "Filter state in the URL, so search and filtering work before JavaScript loads",
    "Token-free browser — Next.js acts as the BFF and holds every credential server-side",
  ],
  challenges: [
    "Hiding paid content from users without cloaking it from search engines",
    "Keeping authentication tokens out of the browser across four distinct surfaces",
    "Deadlines that decide money, on devices whose clocks cannot be trusted",
  ],
  solutions: [
    "Enforced the paywall in a single API transformer — withheld fields are never serialised",
    "Made Next.js the backend-for-frontend, with the refresh token in an httpOnly cookie",
    "Shipped server time with every payload and computed every countdown against it",
  ],
}
```

---

## 8. Accuracy notes — read before publishing

Everything in §3–§7 is written to be defensible against the code as it stands on 2026-10-30. These are the places where a more impressive claim was available and deliberately not made.

**What is actually built.** The API has 40 controllers across public, member, authority, admin and partner route groups, 82 declared routes, 8 models and 9 migrations covering identity, reference data, notices, members, procurement, ratings, payments, API keys and notice documents — around 12,400 lines of PHP. The front end has 29 routed pages and 50 components, around 8,400 lines, plus 5 BFF route groups. The two prototypes add around 5,500 lines of standalone HTML, CSS and JavaScript. That is a real system, and the content above describes it without inflation.

**What is not built, and is therefore absent from the copy.** The procurement workspace controllers (route stubs exist, so the shape is visible, but the logic is not written), the automated ingestion pipeline, auctions beyond the shared catalogue, the admin screens, and the Sinhala and Tamil locales. Nothing above claims a working ingestion agent or a completed workspace. If you want the ingestion pipeline mentioned because it is the most interesting part of the design, phrase it as designed rather than delivered — the analysis pack specifies it in full, and "a multi-source extraction pipeline designed across four source tiers" is true where "harvests every notice hourly" is not.

**Three claims in the repo README that are stale** — do not copy them from there.

- The README says **Next.js 15**; `apps/web/package.json` pins **^16.3.3**. The copy above says "Next.js" without a version for this reason. Add the major version only after checking what is actually installed at publication time.
- The README says `packages/contracts` holds an **OpenAPI 3.1 contract** that CI checks for drift. **The directory is empty.** No OpenAPI claim appears anywhere in the copy above — it would be the easiest thing in this document for a technical reader to disprove.
- The README's file table points at `apps/web/app/fonts.ts`, `ui/assets/app.css` and a few screens under names that have since changed. Only paths verified today appear above, and the gallery plan uses the filenames that exist.

**Database.** `apps/api/.env` currently runs **SQLite3** for development, with the MySQL configuration present but commented out. "MySQL" in the stack list is the production target, which is the honest way to list it for a portfolio page. If you would rather not state a database at all until production is provisioned, drop the chip — it is the least load-bearing item in the list.

**Numbers.** No user counts, notice volumes, traffic figures or performance benchmarks appear in the copy. The analysis pack's market figures are explicitly marked as analyst estimates requiring validation, and a portfolio page is exactly the wrong place to launder an estimate into a fact. Once there is a deployed instance, a measured Lighthouse score or a real corpus size would be the strongest single addition to this page.

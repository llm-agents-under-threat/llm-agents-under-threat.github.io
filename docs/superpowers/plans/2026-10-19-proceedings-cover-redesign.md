# Proceedings Cover Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the workshop website around the selected “Proceedings Cover” visual while preserving accurate event content, accessible behavior, and the GitHub Pages deployment path.

**Architecture:** Keep the existing React data model and static GitHub Pages generator, but replace their page structure and shared CSS with one editorial design system. Add one project-owned raster hero artwork matching the selected reference; keep all text as accessible HTML and all people portraits as existing assets. Verify the React preview and generated static site at matching desktop and mobile viewports.

**Tech Stack:** React 19, TypeScript/TSX, CSS, Vinext, Node test runner, static GitHub Pages generator, built-in Image Gen for the hero artwork.

**Spec:** `docs/superpowers/specs/2026-10-18-academic-security-redesign-design.md`

## Global Constraints

- Preserve the public workshop facts, organizer hierarchy, and Google Group contact address.
- Preserve “February 22 or 23, 2027”, “November 20, 2026”, and “Anywhere on Earth” exactly.
- Do not show a live submission button until an official OpenReview venue exists.
- Avoid glowing brains, robots, chatbot bubbles, neon dashboards, and generic AI motifs.
- Preserve semantic headings, landmarks, tables, keyboard navigation, reduced motion, and WCAG AA contrast.
- Static GitHub Pages output must contain no framework runtime paths.

## Review Focus

- Long title, email, and affiliations must wrap without horizontal overflow on 375 px mobile screens; pin in responsive markup/CSS tests.
- The mobile menu must remain keyboard-operable and return focus after Escape; retain behavior assertions.
- The hero artwork must remain decorative/supportive and never contain the only copy of essential event information; assert visible HTML text.
- The static generator must copy the new hero asset and use the same section order and roles as the React page; assert paths and ordering.
- Scope copy additions for topics 05, 07, and 09 must survive both render paths; assert exact phrases in content and generated HTML.

---

### Task 1: Lock the selected editorial contract in tests

**Files:**
- Modify: `tests/content.test.mjs`
- Modify: `tests/markup.test.mjs`
- Modify: `tests/github-pages.test.mjs`

**Interfaces:**
- Consumes: exported records from `app/workshop-data.mjs` and source strings from page/layout/styles.
- Produces: failing assertions for the new structure, artwork path, exact scope copy, section hierarchy, and responsive safeguards.

- [ ] **Step 1: Add exact content assertions for topics 05, 07, and 09**

Assert the three revised descriptions include `unauthorized actions and resource abuse`, `access control` plus `resource controls`, and `adaptive red teaming` plus the four named metric classes.

- [ ] **Step 2: Add markup assertions for the selected visual structure**

Require `hero-folio`, `hero-copy`, `hero-artwork`, `deadline-panel`, `research-questions`, `section-kicker`, and `editorial-shell`; remove old Montréal-photo-specific expectations.

- [ ] **Step 3: Add static-output assertions for the new hero asset and accessible event text**

Require `./agent-threat-surface.png`, the exact date/deadline copy in HTML, the new section classes, and no old `hero-montreal.jpg` or photograph credit.

- [ ] **Step 4: Run tests and verify RED**

Run: `node --test tests/content.test.mjs tests/markup.test.mjs tests/github-pages.test.mjs`
Expected: FAIL because the new structure and hero asset do not yet exist.

- [ ] **Step 5: Commit the failing contract**

```bash
git add tests/content.test.mjs tests/markup.test.mjs tests/github-pages.test.mjs app/workshop-data.mjs
git commit -m "test selected editorial redesign"
```

### Task 2: Produce the hero threat-surface artwork

**Files:**
- Create: `public/agent-threat-surface.png`

**Interfaces:**
- Consumes: selected reference image `exec-22f00089-f975-456c-b98a-4edfb806ce54.png`.
- Produces: a text-free, project-owned raster artwork used by both React and static pages at `/agent-threat-surface.png`.

- [ ] **Step 1: Generate the artwork at the measured hero slot ratio**

Create a layered monochrome security-boundary composition with one vermilion broken path, negative space, no labels, no logos, and no AI-brain or robot imagery.

- [ ] **Step 2: Inspect the output at full size**

Confirm the artwork matches the selected palette, contains no accidental text/watermark, and crops cleanly in the right hero column.

- [ ] **Step 3: Save the selected asset into `public/agent-threat-surface.png`**

Copy the built-in generated image from its generated-images path; keep the original generated file intact.

- [ ] **Step 4: Commit the asset**

```bash
git add public/agent-threat-surface.png
git commit -m "add editorial threat-surface artwork"
```

### Task 3: Implement the selected page structure

**Files:**
- Modify: `app/page.tsx`
- Modify: `scripts/build-github-pages.mjs`

**Interfaces:**
- Consumes: `workshop`, `researchQuestions`, `cfpTopics`, `importantDates`, `submissionPolicy`, `schedule`, and people arrays from `app/workshop-data.mjs`; hero artwork from Task 2.
- Produces: matching React and static markup using the new class contract from Task 1.

- [ ] **Step 1: Build the hero folio and editorial hero**

Implement the vertical AAAI-27/2027/Montréal folio, HTML title/summary/metadata, artwork image, deadline panel, and CFP anchor link.

- [ ] **Step 2: Build the research-focus introduction and current-status strip**

Render the three `researchQuestions` as numbered rows and keep accepted-workshop news visible without creating a generic card.

- [ ] **Step 3: Recompose CFP, dates, guidelines, schedule, and people sections**

Use semantic two-column editorial markup, a date rail, definition-list guidelines, semantic schedule table, and the approved people hierarchy.

- [ ] **Step 4: Mirror the React structure in the static generator**

Generate equivalent markup and copy `agent-threat-surface.png`; remove the old Montréal hero image and credit from public output.

- [ ] **Step 5: Run tests and verify remaining failures are styling-only**

Run: `node --test tests/content.test.mjs tests/markup.test.mjs tests/github-pages.test.mjs`
Expected: structural/content assertions PASS; any CSS contract added for Task 4 may still FAIL.

### Task 4: Implement the responsive editorial design system

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`
- Modify: `DESIGN.md`

**Interfaces:**
- Consumes: class names from Task 3.
- Produces: desktop, tablet, and mobile layouts matching the selected visual target and updated documented tokens.

- [ ] **Step 1: Implement colors, type, navigation, and hero grid**

Use warm ivory, deep ink navy, mineral blue, pale cyan-gray, and restrained vermilion. Use an editorial serif for headings and Geist for body/interface text; preserve local/static fallbacks.

- [ ] **Step 2: Style the full content progression**

Add consistent folio/kicker/rule language to CFP, dates, guidelines, schedule, organizers, advisers, students, contact, and footer without card mosaics or shadow stacks.

- [ ] **Step 3: Add tablet/mobile adaptations**

Collapse the hero into a single reading flow, reduce/remove the vertical folio rail as appropriate, stack milestones, retain readable table behavior, and protect emails/affiliations from overflow.

- [ ] **Step 4: Update `DESIGN.md` to the implemented system**

Record the selected visual thesis, exact palette, typography, spacing, artwork rules, and responsive behavior.

- [ ] **Step 5: Run the full automated suite and verify GREEN**

Run: `node --test tests/*.test.mjs`
Expected: all tests PASS with no warnings.

- [ ] **Step 6: Commit implementation**

```bash
git add app/page.tsx app/globals.css app/layout.tsx scripts/build-github-pages.mjs DESIGN.md
git commit -m "implement proceedings cover workshop design"
```

### Task 5: Build, visually compare, and publish

**Files:**
- Create: `design-qa.md`
- Generate: `dist-pages/**`

**Interfaces:**
- Consumes: selected reference image and completed site.
- Produces: passing design QA, verified static build, deployed GitHub Pages site.

- [ ] **Step 1: Generate the static site**

Run: `node scripts/build-github-pages.mjs dist-pages`
Expected: exits 0 and includes the new artwork and all people assets.

- [ ] **Step 2: Start the local preview and capture desktop plus mobile screenshots**

Verify navigation, CFP link, mobile menu open/close/Escape behavior, section anchors, and no horizontal overflow.

- [ ] **Step 3: Compare the desktop capture with the selected reference**

Write `design-qa.md`, fix all P0/P1/P2 visual issues, repeat capture/compare, and end with `final result: passed`.

- [ ] **Step 4: Run final verification**

Run: `node --test tests/*.test.mjs && node scripts/build-github-pages.mjs dist-pages`
Expected: all tests PASS and build exits 0.

- [ ] **Step 5: Commit QA evidence and publish**

```bash
git add design-qa.md
git commit -m "verify editorial workshop redesign"
git push origin main
```

- [ ] **Step 6: Verify the GitHub Pages workflow and live URL**

Confirm the deployment action succeeds and the live page serves the new hero structure, asset, revised scope copy, and correct organizer hierarchy.

# Academic Security Redesign — Design Specification

Date: 2026-10-18

## Objective

Redesign the existing AAAI-27 workshop website so it feels authored, academically credible, and visually polished while preserving the approved facts, copy, organizer hierarchy, and public URL. The visual language should communicate security research through structure and restraint rather than generic AI imagery.

## Design thesis

**A research field guide to adversarial agents.**

The site will feel like a contemporary security-research publication: warm paper surfaces, deep ink-blue typography, precise rules, compact technical metadata, and one original systems-oriented hero graphic. It should be recognizably about agent security without using glowing brains, robot faces, chat bubbles, neon dashboards, or stock “AI” motifs.

## Information architecture

The single-page order remains:

1. Navigation
2. Hero and event metadata
3. News / current status
4. About and framing questions
5. Call for Papers and scope
6. Important dates
7. Submission guidelines
8. Schedule
9. Workshop Organizers
10. Advisory Board
11. Student Organizers
12. Contact and footer

No factual content or policy is changed by the redesign. The site must not display a live submission button until an official OpenReview submission venue exists.

## First viewport

The first viewport must answer four questions immediately:

- What is this? — “LLM Agents Under Threat in Cyberspace”
- Where does it belong? — AAAI-27 Workshop
- When and where? — February 22 or 23, 2027 · Montréal, Canada
- What is the nearest action? — submission deadline November 20, 2026 (AoE), with CFP navigation rather than a false submission CTA

### Hero composition

- Use a structured split composition rather than centered text over a city photograph.
- Left: title, one-sentence positioning statement, event metadata, and CFP/deadline emphasis.
- Right: an original abstract diagram showing an agent system under adversarial pressure using nodes, pathways, permission boundaries, and corrupted signals.
- The illustration should be editorial and diagrammatic, not photorealistic or generative-looking.
- Use deep navy, mineral blue, muted cyan, warm off-white, and one restrained vermilion risk accent.
- Avoid gradients as decorative wallpaper. Any tonal change must serve depth or legibility in the illustration.

## Navigation

- Compact sticky header with a short workshop wordmark on the left.
- Section links on desktop; accessible menu on mobile.
- Quiet border and high-contrast focus treatment.
- Navigation visually recedes behind the hero and content.

## Typography

- Display and section headings: a credible editorial serif or high-character academic face.
- Body and interface text: a clean sans-serif with excellent small-size legibility.
- Technical metadata and numbering: restrained monospace or tabular numerals only where useful.
- Avoid excessive all-caps; reserve it for short labels.
- Body copy remains at least 16 px with comfortable line height.

## Layout and rhythm

- Expand the page from the current 880 px single reading column into a 1180–1240 px editorial canvas.
- Long prose remains constrained to readable line lengths.
- Alternate between asymmetric two-column sections and full-width information bands.
- Use deliberate whitespace, hairline rules, and alignment rather than floating card stacks.
- Keep section numbering subtle and consistent to make the page feel like a research program.

## Section treatments

### About

- Pair the workshop introduction with three compact research questions: what enters the agent, what the agent can reach, and whom the agent can trust.
- Present these as numbered editorial rows, not generic rounded cards.

### Call for Papers

- Lead with the CFP text in a readable column.
- Present ten scope areas as a clean two-column numbered index.
- Use concise visual separation so the list scans quickly without resembling a dashboard.

### Important dates

- Use a high-contrast horizontal date rail on desktop and stacked milestones on mobile.
- Make the submission deadline dominant, followed by notification and workshop date.
- Preserve “Anywhere on Earth” and “February 22 or 23” wording exactly.

### Submission guidelines

- Use a structured definition-list layout for length, format, review, publication, and responsible disclosure.
- Clearly label the submission destination as forthcoming.

### Schedule

- Preserve semantic table markup.
- Replace the plain spreadsheet appearance with a time rail and typographic session hierarchy.
- Breaks, talks, paper sessions, panel, and closing remain easy to distinguish without relying only on color.

### People

- Keep the approved hierarchy: Workshop Organizers, Advisory Board, Student Organizers.
- Standardize image crops, portrait sizes, role hierarchy, and affiliation wrapping.
- Workshop organizers receive the strongest visual emphasis; advisers remain prominent because they were prior co-organizers; students appear in a quieter final tier.
- Use no card shadows or decorative profile frames.

### Contact and footer

- Finish with a concise contact band using the Google Group address.
- Footer includes workshop identity and required image/licensing information only when applicable.

## Motion and interaction

- Use only subtle, purposeful interaction: link underline movement, a small navigation transition, and optional slow diagram drift.
- No scroll-jacking, entrance choreography, parallax, cursor effects, or looping glow.
- Respect `prefers-reduced-motion` completely.

## Responsive behavior

- Desktop: editorial split layouts and two-column scope index.
- Tablet: reduced asymmetry while preserving hierarchy.
- Mobile: single-column reading order, stacked date rail, two-column people grids where legible and one column when necessary.
- No horizontal page overflow; emails and long affiliations wrap safely.
- Touch targets remain at least 44 px where interactive.

## Accessibility and quality constraints

- Maintain semantic headings, landmarks, tables, labels, and keyboard navigation.
- Meet WCAG AA contrast for text and controls.
- Provide meaningful alternative text for the hero visual and portraits.
- Do not encode essential meaning through color alone.
- Preserve all existing content and behavior tests, updating tests only for intentional structural changes.

## Acceptance criteria

- The first viewport communicates title, conference, date/location, and deadline without scrolling.
- The visual direction feels academic and authored, not like a generic AI landing page.
- CFP scope, dates, and submission rules are materially easier to scan.
- Organizer hierarchy and the two corrected chair titles remain accurate.
- Desktop and mobile layouts are visually verified.
- Static GitHub Pages build and automated tests pass before deployment.

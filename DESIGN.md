---
name: Agents Under Threat
description: An editorial proceedings-cover website for the AAAI-27 workshop on deployed LLM-agent security.
colors:
  paper: "#ffffff"
  paper-deep: "#f7f8fa"
  paper-cool: "#ffffff"
  ink: "#071d3e"
  ink-soft: "#17395e"
  muted: "#5b6874"
  mineral: "#2d7195"
  rule: "#cbd2d3"
  risk: "#ef4b25"
typography:
  editorial: "Georgia, Times New Roman, serif"
  interface: "Geist, Arial, Helvetica, sans-serif"
layout:
  max-width: "1240px"
  navigation-height: "70px"
  hero-columns: "112px / flexible copy / flexible artwork"
  tablet-breakpoint: "900px"
  mobile-breakpoint: "760px"
---

# Design System: Agents Under Threat

## Visual thesis

The site should feel like the cover and interior matter of an academic proceedings volume, not a startup landing page or a generic AI-security dashboard. The composition combines a narrow navy folio, a pure-white editorial field, a restrained serif title, a vermilion threat path, and a text-free layered systems illustration. Information density is handled with rules, numbered sections, and typographic hierarchy rather than card stacks.

## Palette

- `paper` is a true white primary surface, giving the site the clarity of a conference proceedings page.
- `ink` carries primary type, folios, and the contact band.
- `mineral` is reserved for structural labels, dates, and quiet system annotations.
- `risk` marks deadlines, sequence numbers, active navigation, and adversarial emphasis.
- `rule` separates content without boxes or shadows.
- Do not add gradients, neon glows, glass panels, or multicolor AI effects.

## Typography

Headings use the local editorial serif stack beginning with Georgia. Body copy, controls, and metadata use Geist with Arial/Helvetica fallbacks. Hero and section titles are restrained rather than oversized, with tracking no tighter than `-0.035em`; supporting copy stays at `16–17px` with generous leading. Kicker labels use compact uppercase sans with tracked letters.

## Hero and artwork

The desktop hero is a three-part grid: the AAAI folio rail, title and event facts, then the threat-surface artwork. The image contains no text and should be treated like a journal-cover plate. Interface labels for inputs, tools, memory, and actions remain HTML so they stay crisp and accessible. The image may be cropped to fill its column but must not receive decorative CSS-generated illustrations.

## Section grammar

Every major section follows a consistent numbered kicker, large serif heading, and hairline rule. Research questions use three ruled columns. Scope topics form a two-column numbered index. Dates and people use restrained grids. Submission guidance and the schedule use semantic definition-list and table markup. The organizer hierarchy is always Organizers, Advisory Board, then Student Organizers.

Portraits are rectangular `4:5` editorial crops with almost square corners. They should never become floating circular avatars or shadowed cards. The public contact remains the shared Google Group address.

## Responsive behavior

At `900px`, desktop navigation collapses and portrait grids reduce. At `760px`, the folio becomes a horizontal strip and the hero becomes a single reading flow with the artwork below the title. Research questions, dates, scope, and long-form text stack without horizontal overflow. At `640px`, event metadata and the deadline panel stack, the schedule receives its own horizontal scrolling region, emails wrap, and people remain in a compact two-column grid. Focus states remain visible and reduced-motion preferences disable transitions.

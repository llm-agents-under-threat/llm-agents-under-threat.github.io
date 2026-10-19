---
name: Agents Under Threat
description: A hybrid academic workshop website with a poster-led opening and a restrained reading layout.
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
  max-width: "880px content / 1240px hero"
  navigation-height: "70px"
  hero-columns: "82px / compact copy / flexible artwork"
  tablet-breakpoint: "900px"
  mobile-breakpoint: "760px"
---

# Design System: Agents Under Threat

## Visual thesis

The opening should feel like the cover of an academic proceedings volume, while the rest of the site should return to a familiar, quiet reading flow. The hero combines a narrow navy folio, a pure-white editorial field, a restrained serif title, a vermilion threat path, and a text-free layered systems illustration. Below it, information is presented as clear sections, lists, tables, and people grids rather than an all-page poster composition.

## Palette

- `paper` is a true white primary surface, giving the site the clarity of a conference proceedings page.
- `ink` carries primary type, folios, and the contact band.
- `mineral` is reserved for structural labels, dates, and quiet system annotations.
- `risk` marks deadlines, sequence numbers, active navigation, and adversarial emphasis.
- `rule` separates content without boxes or shadows.
- Do not add gradients, neon glows, glass panels, or multicolor AI effects.

## Typography

The hero title uses the local editorial serif stack beginning with Georgia. Lower-page headings, body copy, controls, and metadata use Geist with Arial/Helvetica fallbacks. The hero title is restrained rather than oversized; lower section headings stay around `1.4–1.55rem`. Supporting copy stays at `16–17px` with generous leading, and kicker labels use compact uppercase sans with tracked letters.

## Hero and artwork

The desktop hero is a three-part grid: the AAAI folio rail, title and event facts, then the threat-surface artwork. The image contains no text and should be treated like a journal-cover plate. Interface labels for inputs, tools, memory, and actions remain HTML so they stay crisp and accessible. The image may be cropped to fill its column but must not receive decorative CSS-generated illustrations.

## Section grammar

Below the hero, every major section follows a simple heading, short rule, and comfortable reading rhythm. Scope topics and dates use plain lists; submission guidance and the schedule use semantic text and table markup. The organizer hierarchy is always Organizers, Advisory Board, then Student Organizers.

Portraits use consistent circular crops without shadows or card chrome. The public contact remains the shared Google Group address.

## Responsive behavior

At `900px`, desktop navigation collapses and portrait grids reduce. At `760px`, the folio becomes a horizontal strip and the hero becomes a single reading flow with the artwork below the title. Lower-page sections remain a simple single reading column without horizontal overflow. At `640px`, event metadata and the deadline panel stack, the schedule receives its own horizontal scrolling region, emails wrap, and people remain in a compact two-column grid. Focus states remain visible and reduced-motion preferences disable transitions.

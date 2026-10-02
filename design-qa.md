# Design QA

## References

- Title-wrap reference: `/var/folders/b0/zf0l3qzj3y57k95gqxcbt5fh0000gn/T/TemporaryItems/NSIRD_screencaptureui_rWNcOI/截屏2026-10-02 15.25.33.png`
- Call-for-papers density reference: `/var/folders/b0/zf0l3qzj3y57k95gqxcbt5fh0000gn/T/TemporaryItems/NSIRD_screencaptureui_KJsbIj/截屏2026-10-02 15.26.36.png`
- Implementation: `http://localhost:4173/` from the generated GitHub Pages build, inspected in the Codex in-app browser.

## Viewports checked

- Desktop: 1320 × 700
- Mobile: 390 × 844

## Comparison notes

- The supplied title screenshot showed the heading forced across three lines. On desktop, the revised heading is one unbroken line (`white-space: nowrap`) and fits inside the 1280 px hero content area without horizontal overflow.
- At the mobile breakpoint, the heading intentionally returns to normal wrapping and occupies three readable lines without clipping or horizontal overflow.
- The supplied call-for-papers screenshot established the requested content density. The revised section now has two substantive introduction paragraphs, a scope lead-in, and ten detailed topic areas.
- The hero, typography, spacing, and restrained monochrome content treatment remain consistent with the existing workshop site.
- The schedule was checked in the rendered page and uses the requested 09:00 start, 10:30–11:00 and 15:30–16:00 breaks, and 12:30–14:00 lunch.
- Browser console check returned no errors or warnings.

## Result

PASS — desktop title, responsive fallback, expanded call-for-papers content, and workshop schedule all match the approved requirements.

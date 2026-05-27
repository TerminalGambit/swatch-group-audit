# Design Audit — Swatch Group Audit Dashboard
**Reviewer:** design-auditor
**Date:** 2026-05-27
**Verdict:** Solid
**Overall design score:** 7.4 / 10

## Executive summary
The dashboard punches above its weight: a confident editorial voice (serif headlines like "The Operating Leverage Crisis" and "Two Segments. One Country Did the Damage."), a disciplined Thariq palette, and a genuinely strong Operating Leverage hero callout make it feel like a publication, not a generic BI tool. The biggest weakness is component drift — three different table treatments (StatementTable, ratio tables, peer tables on Benchmarking) and a Segments page where the four-card row mixes KPI patterns with mini-summary cards, breaking the visual rhythm established on the Dashboard. Priority fix order: (1) unify table styling, (2) tighten the Segments hero card grid, (3) reduce typographic noise on the Ratios page where five separate sub-tables stack without enough hierarchy.

## Findings by pillar

### 1. Visual hierarchy — score 8/10

- Dashboard (`01-dashboard.png`) lands the eye perfectly: eyebrow → serif h1 → 4-card KPI row → 2/3 chart + 1/3 chart pattern. The "5.1×" hero callout (right column, second row) is the strongest single element on the site — large rust numeral against a clay/rust gradient, supported by quantified prose.
- PageHeader (`PageHeader.tsx`) is well-calibrated: `text-4xl sm:text-5xl` serif h1, clay eyebrow at `tracking-[0.18em]`, description capped at `max-w-3xl`. Used consistently across all five non-report pages.
- Financials page (`02-financials-is.png`) has a clean primary focal point ("Operating result −74.5%..." callout under the tabs) but the income statement table itself is the densest block on the entire site and competes with the two PwC callouts below it. The eye doesn't know where to rest after the title.
- Ratios page (`04-ratios.png`) — the DuPont decomposition with four equation-style cards (`3.30% × 0.477× × 1.145× = 1.80%`) is a clever visual; the `×` and `=` separators read well. This is the page's anchor.
- Segments page (`03-segments.png`) hero row is awkward: two "segment summary" cards (Watches & Jewelry, Electronic Systems) sit next to two single-metric KPI cards (Wall Movement Margin, Greater China Revenue). They share grid cells but communicate different things — the first two are mini dashboards, the second two are KPIs. Eye reads it as four equal items and gets confused.
- Benchmarking page (`05-benchmarking.png`) buries the lede: the "Structural vs cyclical — 60/40 diagnosis" callout at the bottom is the most important conclusion on the page but sits below everything else with no visual weight escalation.

- What works
  - Editorial-style serif titles ("Numbers that explain the collapse", "Swatch underperformed — but not in isolation") give each page a thesis.
  - 2/3 + 1/3 chart grids on Dashboard create asymmetry that pulls the eye through the page.
  - 4-up KPI row on Dashboard is the right size — `text-3xl font-serif` value, `text-xs uppercase` label, accent bar.

- Awkward
  - Segments hero row mixes card types (see above).
  - Financials page tab strip (`Income Statement | Balance Sheet | Cash Flow`) is visually identical-weight to body text and gets lost under the dense title block.
  - Report page (`06-report.png`) sidebar TOC is good but the body type ramp is flatter than the other pages — h2 / h3 / h4 / p don't differ enough.

- Broken
  - Benchmarking page conclusion callout (bottom rust strip) lacks the gravity its content deserves.

### 2. Palette discipline — score 8.5/10

- Semantic usage is clean and consistent across screenshots:
  - **Rust (#B04A3F)** = negatives, red flags, severity "High" — net sales delta, operating result delta, operating margin line endpoints, geographic decline bars, 5.1× hero number, China bar, ETR Spike pill.
  - **Olive (#788C5D)** = positives — equity ratio delta, US bar on geographic chart, "+25%" margin on Electronic Systems.
  - **Clay (#D97757)** = accent / interactive — eyebrows, link underlines, operating margin trend line, hover state on CTA cards, severity "Medium".
  - **Oat (#E3DACC)** = neutral surfaces, severity "Low–Med", PwC callout background, prose code blocks.
- The gradient `from-rust/8 to-clay/8` on the Operating Leverage card is the only gradient on the site and it earns its place.

- What works
  - Pie chart on Dashboard uses clay (W&J) / olive (Electronic Systems) / oat (Corporate) — semantically reads as "main / secondary / housekeeping" which mirrors the business reality.
  - Rust used sparingly enough that it carries weight when it appears.

- Awkward
  - Severity scale on red flags uses **rust (High) → clay (Medium) → oat (Low–Med)**. Clay is also the accent color used for eyebrows and links across the site; using it as a severity tier creates double-duty meaning. A reader scanning the dashboard could mis-parse "Medium" pills as "navigational accents."
  - PageHeader description text at `text-slate/70` on ivory is fine, but ChartCard subtitle at `text-muted` (#6B7280) and `text-xs` is the most marginal contrast on the site. On the Geographic chart subtitle ("YoY % change by region — CHF terms") it borders on too quiet.
  - On the Ratios page, the DuPont card row uses oat/clay backgrounds inconsistently — the four equation cards look cleanly tied together but the three "leverage detail" cards below (5.1× / 101× / CHF 1.08B) introduce an olive variant that wasn't justified by content (interest coverage isn't unambiguously "good").

- Broken
  - None — palette is the project's strongest pillar.

### 3. Typography — score 7.5/10

- The three-font system (ui-serif heads / system-ui body / ui-monospace nums) is set up correctly in `index.css` and `tailwind.config.js`, with `font-variant-numeric: 'tnum'` applied to body and `.num` class for tabular monospace.
- KPICard value renders as `text-3xl font-serif text-slate num` — serif + monospace at the same time is an unusual choice but it actually works because `num` overrides the font-family. Numbers are clearly tabular in screenshots (column-aligned digits in the Income Statement and Ratios tables).
- PageHeader scale (`text-4xl sm:text-5xl`) is the right ceiling. The 5.1× hero at `text-7xl` is the only piece above that and it's intentional.

- What works
  - Eyebrow → serif headline → sans description pattern reads as "magazine article", which fits the editorial framing.
  - Statement table indent-by-1.25rem-per-level rule (`paddingLeft: 0.5 + indent * 1.25 rem`) gives the income statement a clean nested rhythm.
  - Mono numerals in tables column-align cleanly.

- Awkward
  - Too many size steps in play: `text-xs` (labels, subtitles, footers, muted notes), `text-sm` (body inside cards, descriptions, callouts), `text-base` (page descriptions, red-flag titles), `text-lg` (ChartCard titles, CTA card titles, prose h4), `text-xl` (prose h3), `text-2xl` (red-flag metrics, prose h2, operating leverage support text), `text-3xl` (KPI values, prose h1), `text-4xl–5xl` (PageHeader), `text-7xl` (5.1×). That's nine steps; a tighter scale of six would feel more rigorous.
  - Report page (`06-report.png`) prose-report style uses serif at every heading level but body at sans — fine — yet h2 (`text-2xl`) and h3 (`text-xl`) are only one step apart and both have `mt-8`/`mt-6`. Visually they collapse.
  - On the Ratios page, ratio sub-table headers ("Profitability", "Liquidity", "Solvency & Leverage", "Efficiency", "Per Share") use the same `text-xs uppercase tracking-wider` treatment as column headers inside the tables. Section title and column title shouldn't share typography.

- Broken
  - None.

### 4. Density & whitespace — score 7/10

- Top-level page padding is `space-y-10` on Dashboard (consistent with what's visible) which gives generous breathing room between sections.
- Card padding is centralized in `.card` (`p-5`) and used everywhere — that consistency is the reason the site reads as coherent despite component drift.

- What works
  - Dashboard has a clear breathing rhythm: KPI row → big chart row → big chart row → red flags grid → callout → CTA row. Each section gets `space-y-10`.
  - `gap-4` on chart grids, `gap-3` on CTA grids — a deliberate density choice (CTAs are smaller, closer; charts are bigger, further apart).

- Awkward
  - Ratios page is the densest of all pages: DuPont row + leverage detail row + five sub-tables stacked vertically + two bottom callouts. The five sub-tables (Profitability, Liquidity, Solvency, Efficiency, Per Share) have no visual divider beyond a section title — they look like one continuous spreadsheet. A 2-column grid for these (or accordion-style cards) would breathe better.
  - Financials page Income Statement table extends nearly to the page width with tight `py-1.5` row padding, making the densest table on the site feel cramped while the KPI row above feels airy. Mismatch.
  - Segments page hero callouts (`CHF 1,833m` Greater China, `+25%` margin) use `font-serif text-3xl/4xl` but sit inside `card` with default `p-5`, making them feel underfilled — they want either bigger numbers or tighter padding.

- Broken
  - Benchmarking peer comparison table ("Peer comparison · FY2024 (or nearest comparable)") and the price-segment elaboration card share a row but have very different heights. The right column has visible empty space at the bottom.

### 5. Component consistency — score 6.5/10

This is the weakest pillar.

- KPICard is consistent across Dashboard, Financials, Segments, Ratios, Benchmarking — same accent bar, same label/value/delta/sub structure, same sizing. Good.
- ChartCard wrapper (`title` + `subtitle` + `children` + optional `footer`) is consistent across all chart embeds. Good.
- PageHeader is consistent across all non-report pages. Good.

- What works
  - The shared `.card` utility (`bg-white border border-[#D1CFC5] rounded-xl p-5 shadow-[...]`) acts as a strong base.
  - Pill component (`pill-pos`, `pill-neg`, `pill-neu`) used uniformly for severity tags and side-notes.

- Awkward
  - **Tables are fragmented.** `StatementTable` is the rigorous one (typed Row interface, indent levels, YoY column, monospace nums, bold rows on subtotals). On the Ratios page, tables use a similar visual style but appear to be inline JSX rather than the shared component — same column header treatment, but no YoY column and notes are inlined in italic prose-style text. On the Benchmarking page, the peer comparison table is yet another visual variant — different header background, different row spacing.
  - Red flags grid on Dashboard uses a `.card` with custom inner layout (title + severity pill + metric + sub) — this is essentially a fifth card variant alongside KPICard, ChartCard, Callout, and CTA-card. It should either become a `RedFlagCard` component or visually subordinate to KPICard.
  - CTA cards at the bottom of the Dashboard (`Financials | Segments | Ratios & DuPont | Benchmarking`) are visually identical to red-flag cards above them (same `.card`, same typography weight). A user could read them as another data row.

- Broken
  - Callout vs in-page bottom callout inconsistency. The Dashboard "Auditor's view (PwC)" uses the `Callout` component with `variant="oat"`. The Ratios page bottom (`DIO of ~2,400 days`, `Payout ratio 120%`) uses two unstyled `.card` divs with bold titles — these should be `Callout` instances. Same on Benchmarking ("Structural vs cyclical — 60/40 diagnosis").

### 6. Mobile responsiveness — score 7.5/10

- `07-mobile-dashboard.png` (390px) shows graceful collapse on the Dashboard. KPI cards stack 1-up. The 5.1× hero callout retains its serif `text-7xl` and still works on mobile — possibly because the rust color carries it.
- Navbar correctly switches to `<select>` on mobile (`md:hidden text-sm border border-border rounded-md`). This is pragmatic but visually downgrades the brand-mark + nav-link header to a generic dropdown. The "SG" mono badge + serif site title are preserved, which keeps the brand legible.

- What works
  - All KPI cards reflow to single column cleanly with the accent bar preserved.
  - Red flags grid collapses 3-cols → 1-col, each card still feels deliberate.
  - The pie chart and bar charts use `ResponsiveContainer` and scale.
  - Charts retain their footer captions which on mobile become the primary explainer (good fallback).

- Awkward
  - The "Segment mix" pie shows percent labels (`<5%`) that may overlap on narrow screens — `labelLine={false}` removes the leader line but the labels themselves can collide.
  - Geographic horizontal bar chart with `left: 80` margin for region labels eats a meaningful chunk of a 390px viewport, leaving narrow bar space.
  - Tables (Income Statement, Ratios, Peers) are not visible in the provided mobile screenshot. `StatementTable` uses `overflow-x-auto` which is correct behavior, but there's no scroll affordance (no fade, no scrollbar styling) — users may not know they can scroll horizontally.
  - The mobile navbar `<select>` reloads the page via `window.location.pathname = e.target.value` rather than using React Router's navigation. This is a UX bug, not a visual one, but causes a flash.

- Broken
  - None visible in the provided mobile screenshot, but the table-overflow affordance is a real concern for the Financials / Ratios / Benchmarking pages on phones.

## Top 5 fixes (prioritized)

| # | Issue | Page | Severity | Effort | Suggested fix |
|---|-------|------|----------|--------|---------------|
| 1 | Three table variants (StatementTable, ratio tables, peer tables) drift in header style, row padding, and column treatment | Financials, Ratios, Benchmarking | High | M | Promote ratio + peer tables to use `StatementTable` (or a sibling `MetricTable`). Standardize header (`text-xs uppercase tracking-wider text-muted border-b border-border`), row padding (`py-1.5 px-2`), and optional YoY/Note columns. |
| 2 | Segments hero row mixes mini-summary cards with single-metric KPI cards in a 4-up grid | Segments | High | S | Restructure as 2-up summary cards (W&J, Electronic Systems) above a 2-up KPI strip (Wall Movement Margin, Greater China Revenue). Don't grid-equal-weight different card archetypes. |
| 3 | Inline `.card` callouts on Ratios + Benchmarking bypass the `Callout` component, breaking variant discipline | Ratios, Benchmarking | Medium | S | Wrap the two Ratios bottom blocks (`DIO`, `Payout ratio`) and the Benchmarking conclusion in `<Callout variant="rust">` or `variant="clay"` for emphasis. Removes a fifth card variant. |
| 4 | Five sub-tables on Ratios stack vertically with weak separation; reads as one long spreadsheet | Ratios | Medium | M | Use a 2-column grid for Profitability/Liquidity, Solvency/Efficiency, with Per Share spanning full width. Add a serif section title (`text-lg`) above each, distinct from the `text-xs uppercase` column headers inside. |
| 5 | Severity scale (rust → clay → oat) overloads `clay`, which is also the eyebrow + link + hover accent across the entire site | Dashboard red flags | Medium | S | Either drop `clay` from the severity scale (use rust → rust/40 → oat) or move accents away from clay (eyebrows → slate uppercase). Pick one role for clay. |

## Top 3 wins (things to keep doing)

- **Editorial-voice headlines.** "The Operating Leverage Crisis", "Two Segments. One Country Did the Damage.", "Numbers that explain the collapse", "Swatch underperformed — but not in isolation". These thesis-driven titles plus the `eyebrow → serif → description` pattern in `PageHeader` make each page feel argued, not just displayed. Almost no audit dashboards do this.
- **The 5.1× operating leverage hero callout.** Single most distinctive element on the site. `text-7xl` rust numeral, supportive serif copy above and below, quantified follow-through ("Fixed costs of CHF 3,945M ... 58.6% of net sales"), and a justified gradient (`from-rust/8 to-clay/8`). This is the design language working at its highest level — replicate the pattern on Ratios and Benchmarking.
- **Disciplined three-font + tabular-numerals system.** `ui-serif` heads, `system-ui` body, `ui-monospace` with `font-variant-numeric: 'tnum'` on all numbers. Column-aligned digits in the Income Statement and Ratios tables. The combination of serif KPI values + monospace digits is unconventional but consistently applied via `text-3xl font-serif text-slate num` and it works — gives the dashboard a "Financial Times print edition" character rather than a SaaS dashboard look.

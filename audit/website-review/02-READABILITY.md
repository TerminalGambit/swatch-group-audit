# Readability Audit
**Reviewer:** readability-auditor
**Verdict:** Good (with a few targeted Friction points)
**Overall readability score:** 7.6 / 10
**Time-to-key-finding** (estimated, per page):
- Dashboard: ~6s
- Financials (IS tab): ~12s
- Segments: ~8s
- Ratios: ~15s
- Benchmarking: ~10s
- Report: ~20s

## Executive summary
The dashboard is genuinely scannable: each page leads with a thesis-shaped serif headline ("The Operating Leverage Crisis", "Two Segments. One Country Did the Damage."), and the KPI strips compress the verdict into four numbers a reader can absorb in under ten seconds. Number formatting is unusually disciplined for a student deliverable — `tabular-nums` is active globally, CHF values follow a clear convention (`CHF 6,735M` for millions, `CHF 1.08B` once values cross the billion threshold), and a two-color sign system (rust = bad, olive = good) does most of the orientation work without forcing the reader into legends. Where it loses points: the bar charts in the screenshots render without visible Y-axis tick *values* (only axis lines), Recharts tooltips are not visible without hover so static-screenshot readers lose the magnitudes, and the /report page is a tall wall of body prose with no in-page anchors beyond the section sidebar.

## Per-page time-to-finding table

| Page | First impression in N seconds | Key finding extractable? | Friction points |
|------|-------------------------------|-------------------------|-----------------|
| Dashboard | 6s — eye lands on "The Operating Leverage Crisis" then the 4 KPI cards | Yes — "−14.6% revenue → −74.5% operating result, equity 87.3%" reads in one pass | Trend chart Y-axis labels (`0`, `2k`, `4k`…) render but bar tops are unlabeled; pie segment for "Corporate" sits at 0.0% but still consumes a legend slot; "5.1×" callout is brilliantly readable but visually fights the trend chart next to it for attention |
| Financials | 12s — headline + tab strip + rust callout box give the verdict before reading the table | Yes for IS ("operating result -75.6%"); BS/CF require tab click | The 4-column table (Line item / 2024 / 2023 / YoY%) is excellent, but inline `• note` annotations in clay color compete with the YoY% column for the eye on the same row (e.g. "Operating result • 4.5% margin (vs 15.1%) … −75.6%"); subtotal rows use the same `bg-oat/30` shade as the row separators, so TOTAL ASSETS doesn't pop as strongly as it should |
| Segments | 8s — two color-striped segment cards put the 95/5 mix on the page immediately | Yes — "W&J −14.6%, ES order book +25%" | The horizontal bar chart of geographies has labels but no value annotations on the bars themselves; reader sees "Greater China extends furthest left" but must read the footer to learn it's −30.4% |
| Ratios | 15s — DuPont chain reads left-to-right but takes a beat to parse "3.30% × 0.477× × 1.145× = 1.80%" | Yes once DuPont chain is decoded, but the five separate ratio tables push the most important finding (DIO ~2,400 days) below the fold | DuPont chain has math-rendering elegance but the three-significant-figure precision (`0.477×`, `1.145×`) overdelivers vs the reader's need; five stacked tables with identical headers create scroll fatigue; the "Note" column is genuinely useful but pinned far-right, easy to miss |
| Benchmarking | 10s — "−11.8pp industry gap" KPI lands the thesis fast | Yes — "Swatch underperformed peers but the watch-only segment of Richemont did too" | The peer table mixes EUR and CHF columns without a column-header unit note; "—" used for the Rolex "Growth" cell could be misread as missing data rather than "~flat"; the price-segment side panel (−15.6% / +1.0%) is the single most powerful number on the page but is tucked into the right rail |
| Report | 20s — sidebar orients fast, but the article column is a continuous prose block | Partial — the Executive Summary's three Findings/three Risks structure is excellent, but other sections likely require full reading | No in-article TOC, no anchor links, no "back to top"; max-width discipline is set by `lg:col-span-3` (≈64–72ch) which is fine but body paragraphs run 5–10 lines without breathing room (see Finding 1 paragraph: 6 sentences, 130+ words); the `prose-report` table style is good but the markdown doesn't add tables to break prose elsewhere |

## Findings by dimension (with scores)

### 1. Scanability — 8/10

**What works:**
- Every page header follows the same pattern: small-caps eyebrow → serif H1 thesis → 2-3 line description. This is the most powerful readability decision in the whole site — a reader who scans only the H1s gets a six-line audit summary: *Operating Leverage Crisis → Three Statements, One Crisis → Two Segments, One Country Did the Damage → Numbers that explain the collapse → Swatch underperformed — but not in isolation → Read the audit.*
- The "Six red flags identified" grid on the Dashboard uses a metric-first layout (`36.5%`, `CHF 7.6B`, `−CHF 216M`) with a severity pill in the top-right and the explanation as small sub-text. A reader who looks only at the big number + pill color extracts the severity ranking in under 5 seconds.
- The Financials page tabs include a sub-label (`P&L · operating leverage`, `Fortress · inventory build`, `Negative FCF · payout > OCF`) — this is the kind of micro-orientation most dashboards skip.

**What hurts:**
- On Dashboard the H2 "Six red flags identified" lives under a `text-clay font-semibold` eyebrow ("Audit Findings") that uses the same 18% letter-spacing as the page header eyebrow. Section eyebrows shouldn't compete with page eyebrows.
- On Ratios, the five tables (Profitability, Liquidity, Solvency & Leverage, Efficiency, Per Share) share identical structure but offer no visual hierarchy cue that "Efficiency" is where the red flag (DIO 2,400 days) hides. A scanning reader will not notice the worst number on the page.

### 2. Number legibility — 9/10

**What works:**
- `font-feature-settings: 'tnum' 1` is set globally in `index.css`, and the `.num` class uses `font-variant-numeric: tabular-nums` plus a monospace stack. Columns in the statement tables actually align — this is the largest contributor to the page-by-page legibility.
- Sign conventions are consistent: negatives carry an explicit `−` (proper Unicode minus, not hyphen), positives carry an explicit `+`, and `deltaClass()` paints them rust/olive. `−14.6% YoY`, `+1.2 pp`, `−CHF 216M` all read at a glance.
- CHF unit conventions are *mostly* consistent: `CHF 6,735M` for the headline KPI, `CHF 304M`, `CHF 1.08B` once values cross 1,000M (via `fmtCHFb`). The mental jump from M to B is small.

**What hurts:**
- Mixed unit casing: `CHF 7.6B` (capital B), `CHF 6,735M` (capital M), but the chart Y-axis ticks read `0`, `2k`, `4k`, `6k`, `8k` (lowercase k for thousands of CHF M = effectively billions of CHF). Three different magnitude conventions on the same page. The bar chart's `tickFormatter={(v) => ${v/1000}k}` would read more naturally as `${v/1000}B`.
- The Ratios "Per Share" table mixes `format: 'raw'` (returns `v.toString()` with no rounding) for EPS / book value / dividend. Screenshots show `3.74`, `8.75`, `236.36`, `124.34`, `8.46` — visually inconsistent decimal precision (two decimals for some, three for others depending on source data). A `.toFixed(2)` would harmonize.
- The Dashboard pie chart label uses `(percent * 100).toFixed(1)` — so the Corporate slice renders as `0.0%` (visible in screenshot 01) which is technically wrong (Corporate is non-zero, just rounds to zero at 1 decimal). Either drop the slice, raise precision, or label `<0.1%`.

### 3. Chart readability — 6/10

This is the weakest dimension and the largest opportunity.

**What works:**
- Color encoding is intuitive without legend: rust = decline, olive = growth, clay = the focal entity (Swatch). On the geography chart and the Big Four chart this works.
- The 6-year revenue-and-margin composed chart is the right format for the data (bars for absolute revenue, line for ratio margin), and the dual Y-axis is appropriately separated by color.
- The Ratios DuPont decomposition rendered as boxes-with-multiplier-symbols is genuinely elegant — far better than a four-bar chart of the same numbers.

**What hurts (significant):**
- **No value labels on bars.** Across screenshots 01, 03, 05, the horizontal bar charts (geography YoY, peer margin, Swiss watch destinations) show bars whose magnitudes are not labeled. The reader sees relative length but must hover (which static screenshots can't do, and which mobile users can't reliably do either). For a dashboard that exists to communicate findings, this is the single biggest fix. Add `<LabelList dataKey="change" position="right" formatter={(v) => `${v.toFixed(1)}%`} />`.
- **Tooltip information is invisible without interaction.** All chart insight beyond shape and color is gated behind a hover state.
- **The 6-year revenue chart's Y-axis renders bars that visually look near-equal** in the screenshot (because 2019–2024 revenue ranges from ~6.7k to ~8.2k — a 23% spread on a 0-baselined axis). The drama in the headline ("CHF 8,243M never recovered") is undersold by the chart. Either annotate the 2019 peak or use a baseline closer to the data range.
- **The 2020 bar uses muted color and the 2024 bar uses rust** — but there's no caption telling the reader why (COVID vs structural decline). The convention is invented in-place and never explained.
- **The pie chart's "Corporate" slice at 0.0% just adds noise** and forces a 3-item legend when 2 would do.

### 4. Table readability — 7/10

**What works:**
- The `StatementTable` component is the strongest table in the site. Four columns (Line item / 2024 / 2023 / YoY %), tabular nums on all numeric cells, prior-year shown in `text-slate/60` (60% opacity) so current year visually dominates, and the YoY column color-coded.
- Indentation is encoded as `style={{ paddingLeft: `${0.5 + (r.indent ?? 0) * 1.25}rem` }}` — so the "Sale of goods" sub-line clearly nests under "Net sales".
- Bold rows (`bg-oat/30 font-semibold`) mark subtotals. "Operating result", "Net result", "TOTAL ASSETS" all stand apart.
- Inline `• note` annotations on key rows (e.g. "Inventories • 54.6% of total assets · Key Audit Matter") move the audit commentary into the row, not a separate column.

**What hurts:**
- The `bg-oat/30` subtotal background is *too subtle*. In screenshot 02 ("Net sales", "Operating result", "Net result") look almost identical to surrounding rows. Bumping to `bg-oat/60` or adding a top border would help.
- No row hover state in the screenshots. A `hover:bg-oat/20` would help readers track across the 4-column row, especially in the long balance sheet table.
- The Ratios tables don't use a shared component — they're inline JSX, so they lack the indentation, subtotal styling, and footer-unit-line of `StatementTable`. The "Note" column on the right is easy to miss because there's no visual anchor pulling the eye there.
- The Benchmarking peer-comparison table mixes currencies (`CHF`, `€`) per row without a header-level unit indicator. A reader who skims the numeric column might compare 6,735 (CHF) to 21,398 (EUR) without noticing the unit switch.
- "YoY %" column in StatementTable shows up to `+9999.9%` for any row where prior year is near zero — visible cases like "Non-operating result" can produce visual spikes. A capped format (`>+999%`) would protect the column width.

### 5. Prose density — 6/10

This dimension carries the lowest score because the /report page is the worst-served by the current layout.

**What works on the dashboard pages:**
- Page descriptions are tight: 2-3 sentence theses, no flab. *"A 14.6% revenue decline produced a 74.5% operating profit collapse. This dashboard audits Swatch Group's FY2024 results — from income statement to segment economics to peer benchmarks — using only data from the audited Swiss GAAP FER statements."* — that's a perfect dashboard intro.
- Chart footers, callout boxes, and segment-card notes are each 1-3 sentences. Density is well-tuned for cards.
- The Segments page "Brand-level commentary" list uses `<strong>` brand names as visual anchors — a reader can scan the 5 brand bolds and decide which to read.

**What hurts on /report:**
- The article column is one continuous markdown render. The `.prose-report` styles do good work on headings (H1/H2/H3 hierarchy with serif font, H2 has `border-b border-border pb-2`), but paragraphs are 4-7 lines each with no pull quotes, no aside boxes, no inline charts. The Executive Summary's "Central Narrative" section is one paragraph that runs ~12 lines on desktop.
- No in-article table of contents. The sidebar shows section titles, but inside (say) the 9-page Red Flags section, there's nothing to jump to.
- No anchor links on H2/H3 headings — a reader can't share or bookmark a specific finding.
- Max-width is implicit via `lg:col-span-3` of a 4-column grid with `gap-6`. On a wide monitor (≥1440px), the prose column can stretch beyond 75 characters per line, which is the upper bound for comfortable reading. Adding `max-w-prose` or `max-w-[72ch]` to the article would help.
- `text-slate/85` (85% black on ivory) is a hair too light for body prose. WCAG contrast against #FAF9F5 likely passes AA but feels washed. Bumping body to `text-slate` and reserving `/85` for secondary text would tighten.
- The "Loading…" state on tab switch is a bare text string — a skeleton or spinner would prevent the layout from collapsing during fetch.

### 6. Information density — 7/10

**What works:**
- Dashboard balances 4 KPI cards + 2 charts + geo chart + leverage callout + 6 red-flag cards + auditor callout + 4 nav cards across ~6 visual rows. Each row has a clear job. Cognitive load is high but bounded — no row makes you reread.
- Segments is the most balanced page: 2 segment cards + 3 KPIs + 1 chart + 2 callouts + 1 brand list. Information arrives in waves rather than blocks.
- Financials uses tabs to limit on-screen rows to one statement at a time. Without tabs this page would be unreadable.

**What hurts:**
- Ratios spikes cognitive load: DuPont (7 boxes) + 3 KPIs + 5 tables (avg 4-5 rows each = ~22 ratio rows) + 2 callouts. That's roughly 50 numeric cells before the reader hits any prose. The page would benefit from collapsing Liquidity / Solvency / Per Share into a single "Other ratios" table with the headline insight pulled into a single sentence above each section.
- Benchmarking front-loads with a 4-KPI strip *and* a peer chart *and* a peer table — three different shapes telling overlapping stories about margin and growth. Pick one as primary and demote the others.
- Dashboard's mobile view (screenshot 07) shows the consequence of high density: the 6 red flags stack vertically (good), but the trend chart compresses to ~280px wide and the X-axis tick years collide. Below ~360px width, charts need either a horizontal scroll, a swap to a simpler representation (sparkline), or graceful hiding.
- Nothing is "skippable" per page, but on /report some sections likely could be — without a TL;DR per section, a reader feels obligated to read every paragraph.

## Top 5 readability blockers

| # | Issue | Page | Severity | Suggested fix |
|---|-------|------|----------|---------------|
| 1 | Bar charts have no value labels on bars | Dashboard, Segments, Benchmarking | High | Add `<LabelList dataKey="change" position="right" formatter={v => `${v.toFixed(1)}%`} fontSize={11} />` to each `<Bar>`. Reader gets the magnitude without hover. |
| 2 | /report has no in-article navigation and long unbroken prose | Report | High | Add an auto-generated TOC sidebar (extract H2s from markdown), add anchor links to each H2/H3, and break paragraphs >80 words. Constrain article width to `max-w-[72ch]`. |
| 3 | Mixed unit conventions (`6,735M` vs `1.08B` vs `2k` on Y-axes) | Dashboard, Ratios, all charts | Medium | Standardize: KPIs and tables in `M`, chart axes in `B` (with axis label `CHF Billion`), drop the `k` notation. One mental model per page. |
| 4 | Pie chart "Corporate" 0.0% slice and 3-item legend | Dashboard | Medium | Either filter slices `<0.5%` from the visualization (keep in tooltip), or use `<0.1%` label. Reduces legend cognitive cost. |
| 5 | Ratios page front-loads 5 identical tables with no visual hierarchy hiding the worst finding (DIO ~2,400 days) below the fold | Ratios | Medium | Pull DIO into a 4th KPI card at top, or add a "Headline ratio" highlight row at the top of the Efficiency table. |

## Top 3 wins

- **Headline-as-thesis pattern.** Every page H1 commits to a finding rather than describing a topic ("The Operating Leverage Crisis" vs the generic "Financial Summary"). A reader can navigate by H1 alone and absorb the audit verdict.
- **The "5.1×" operating leverage callout on the Dashboard.** Single number, serif at `text-7xl`, rust color, framed by `Every 1% of revenue lost became … of operating profit lost`. It is the single most readable element on the entire site and demonstrates that one big number with a sentence around it beats any chart for landing a finding.
- **Tabular-nums + monospace + sign-color discipline across all financial tables.** The Income Statement table (screenshot 02) reads like a polished annual-report exhibit — columns align, negatives are red, positives are green, subtotals are bolded, indented sub-lines nest visibly. This is the kind of quiet detail that separates a credible audit deliverable from a project artifact.

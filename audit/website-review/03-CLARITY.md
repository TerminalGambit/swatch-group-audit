# Clarity Audit
**Reviewer:** clarity-auditor
**Verdict:** Clear (bordering Defensible — held back by source attribution gaps)
**Overall clarity score:** 7.4 / 10

## Executive summary
The dashboard is unusually disciplined for a student audit deliverable: every page leads with a thesis sentence in large type (e.g. "The Operating Leverage Crisis", "Two Segments. One Country Did the Damage.", "Numbers that explain the collapse"), and the central narrative — operating leverage, China concentration, inventory build — is consistent across pages. The work earns its "Clear" rating on language and headline positioning. It falls short of fully "Defensible" because source attribution is uneven (PwC and FH are named, but Morgan Stanley/LuxeConsult, Note 27, and the 60/40 cyclical/structural verdict are asserted without click-through to evidence), and several headline numbers (5.1x leverage, 120% payout, +300 bps Big Four) appear as conclusions on one page but are not re-cited with their provenance on the pages where a reader would test them.

## The "so what?" test — per page

| Page | Single-sentence takeaway you can extract | Strength (1-5) | Where it lands |
|---|---|:-:|---|
| Dashboard | A 14.6% revenue decline produced a 74.5% operating profit collapse — operating leverage of 5.1x is the story. | 5 | H1 title + dedicated "Every 1% of revenue lost became 5.1x of operating profit lost" callout, mid-page right |
| Financials (IS) | One revenue shock cascades through the income statement because fixed costs (personnel, depreciation, fixed overhead) did not flex. | 4 | Subhead "Three Statements, One Crisis" + grey explainer above the IS table |
| Segments | Greater China alone produced ~69% of group revenue decline; this is a geographic problem, not a segment problem. | 5 | H1 "Two Segments. One Country Did the Damage." + "China contribution to the decline" callout |
| Ratios | ROE collapse is exclusively a margin event — the DuPont decomposition isolates net margin as the sole driver; 5.1x operating leverage and 120% payout are the two diagnostic flashpoints. | 4 | H1 "Numbers that explain the collapse" + DuPont strip + Operating Leverage / Interest Coverage / Net Cash KPI row |
| Benchmarking | Swatch underperformed peers (Richemont, LVMH, Big Four), and the diagnosis is 60% cyclical / 40% structural. | 4 | H1 "Swatch underperformed — but not in isolation" + amber "Structural vs cyclical" callout at the bottom |
| Report | Nine-section narrative report with TOC; thesis per section is implied by section title but not foregrounded. | 3 | Section-01 (Executive Summary) lead text — visible only after scroll past the TOC |

## Findings by dimension

### 1. So-what test — 8/10
Five of six pages pass cleanly. Each top-of-page H1 is a conclusion, not a label ("The Operating Leverage Crisis" rather than "Overview"; "Two Segments. One Country Did the Damage." rather than "Segments"). The Dashboard's 5.1x callout in particular is the single best clarity element in the deck — it converts a ratio into an English sentence ("Every 1% of revenue lost became 5.1x of operating profit lost"). The Report page is the weak link: it functions as a TOC + scroll-through PDF rather than a thesis-led summary, so a reader who lands there has to read paragraphs before reaching a conclusion.

### 2. Audit defensibility — 6/10
Mixed. Strong on the audit opinion side: "Auditor's view (PricewaterhouseCoopers AG, Basel)" is called out by name on the Dashboard with the KAM (inventory valuation) named, and "PwC unqualified opinion" reappears as a callout under the Income Statement. The ETR callout on Financials cites "Note 27" inline — exactly the pattern that should be applied everywhere. But several load-bearing numbers float without attribution:
- The 60/40 cyclical/structural split (Benchmarking page) is asserted as a verdict with no methodology link
- "Big Four +300 bps" and Breguet "7,400 units" depend on Morgan Stanley/LuxeConsult — the source is named in the report's prose but not on the Benchmarking page where the numbers appear
- The 5.1x operating leverage figure is given as a conclusion without showing the arithmetic (CHF 887m / CHF 1,153m) inline
- "Market share −200 bps" is a Dashboard red flag with no source badge

A reader asked "where does this come from?" can answer 4 of 8 numbers within the dashboard itself; the other 4 require the markdown report.

### 3. Finding sharpness — 8/10
Strong. The six Dashboard red flags are stated as conclusions with numeric anchors ("ETR Spike 36.5%", "Inventory Build CHF 7.6B", "Negative FCF -CHF 216M", "Lease Commitments CHF 2.1B", "Market Share Loss -200 bps", "Payout > Earnings 120%"). Each is a finding, not a metric, because each carries a directional verdict in the label. The Ratios page DIO callout ("DIO ~2,400 days — context, not panic") is a model of sharp finding language: it states the alarming number AND interprets it in the same breath. The Payout Ratio 120% callout ("confidence or strain?") is the only soft one — it poses a question rather than answering it; given the report concludes "shareholder returns exceed operating cash flow", the callout should resolve the question.

### 4. Cross-page consistency — 8/10
The China narrative is consistent (33% of 2023 sales, CHF 1,833m in 2024, ~CHF 797m decline, 69% of group decline) across Dashboard, Segments, and Benchmarking. Operating leverage 5.1x appears on Dashboard, Financials (in the IS lead text), and Ratios (KPI strip) — three sightings, consistent number. Payout ratio 120% appears on Dashboard (red flag) and Ratios (callout) but is absent from the Cash Flow tab where it would land hardest. The −14.6% net sales / −74.5% operating result numbers are consistent everywhere they appear. One minor inconsistency to check: Dashboard ETR red flag shows "36.5%" while Financials callout shows "22.7% → 36.5%" — the Dashboard version loses the comparison frame.

### 5. Language — 7/10
Tone is institutional and appropriate for a financial audit. Hedging language appears where warranted ("estimate", "proxy basis" — visible in the DIO note). Strong specific phrases dominate ("textbook operating leverage crisis", "Numbers that explain the collapse"). Two weaknesses:
- The Report page renders as a long markdown dump with occasional formatting artifacts (visible heading-character noise in screenshot 06), which undercuts the institutional tone
- A few callout labels ask questions instead of stating findings ("Payout Ratio 120% — confidence or strain?"); for an audit deliverable, declarative is sharper than interrogative

### 6. Headline positioning — 8/10
Five of six pages place their thesis sentence at the top in H1-scale type, in a position where the reader cannot miss it. The Dashboard goes further by adding a same-page secondary headline (the 5.1x callout) that reinforces the H1. The Report page is the exception: its H1 is "Read the audit" — a navigation label, not a thesis — and the actual headline finding ("Swatch Group AG — Financial Audit FY2024") is buried below a TOC sidebar. A reader who lands on /report should see the verdict before they see the table of contents.

## Top 5 clarity gaps (prioritized)

| # | Gap | Page | Severity | Suggested fix |
|---|---|---|:-:|---|
| 1 | Source badges missing on load-bearing numbers (60/40 split, Big Four +300 bps, Breguet 7,400, market share −200 bps) | Benchmarking, Dashboard | High | Add small "Source: MS/LuxeConsult Feb 2025" / "Source: FH Jan 2025" tags under each KPI tile and beside the cyclical/structural callout |
| 2 | Report page leads with "Read the audit" (a nav label) instead of the verdict | Report | High | Replace the H1 with the report's actual thesis sentence ("Unqualified opinion; operating leverage crisis driven by China and fixed-cost structure") and demote the TOC to a sidebar |
| 3 | 5.1x operating leverage stated as a conclusion without inline arithmetic | Dashboard, Ratios | Medium | Add the calculation under the callout: "CHF 887m operating profit lost / CHF 1,153m revenue lost = 5.1x" |
| 4 | Payout 120% callout asks a question instead of answering | Ratios | Medium | Replace "confidence or strain?" with the audit's actual finding ("Shareholder returns exceeded operating cash flow; funded from net liquidity drawdown of CHF 612m") |
| 5 | Cash Flow tab does not surface payout ratio / FCF-vs-distributions narrative | Financials | Medium | Add a callout on the CF tab: "FCF −CHF 216m; dividends + buybacks CHF 408m; net liquidity drawdown CHF 612m — payout 120% of EPS" |

## Top 3 wins
- **The Dashboard 5.1x callout.** "Every 1% of revenue lost became 5.1x of operating profit lost" is the cleanest translation of a financial ratio into a sentence in the whole deck. It converts a coefficient into a thesis.
- **H1-as-conclusion pattern.** Every page (except Report) leads with a verdict, not a label. "Two Segments. One Country Did the Damage." pre-loads the reader for the China story before they touch a chart. This is the single biggest structural strength of the dashboard.
- **PwC / KAM attribution on the Dashboard.** The "Auditor's view (PricewaterhouseCoopers AG, Basel)" callout names the firm, the opinion type, and the sole KAM in one block. This is the gold-standard pattern for audit defensibility and should be replicated for every third-party data source.

## Defensibility audit (specific)
Of these 8 numbers, which can a reader trace to a source within 3 clicks?

| # | Number | Traceable in 3 clicks? | Where |
|---|---|:-:|---|
| 1 | Operating leverage 5.1x | Partial | Stated as conclusion on Dashboard/Ratios; arithmetic (887/1153) is in report markdown but not inline in the UI |
| 2 | China decline 69% of total | Yes | Segments page "China contribution to the decline" callout shows the math (CHF 797m / CHF 1,153m) |
| 3 | ETR spike to 36.5% | Yes | Financials page ETR callout cites "Note 27" inline |
| 4 | Inventory CHF +332m | Yes | Dashboard "Inventory Build" red flag + report Finding 3; PwC KAM linkage visible |
| 5 | Payout ratio 120% | Partial | Appears on Dashboard and Ratios with figure, but no link to dividend/EPS arithmetic in-page |
| 6 | Market share −200 bps | No | Dashboard red flag and Benchmarking KPI both assert the number; neither names Morgan Stanley/LuxeConsult on-page |
| 7 | Big Four +300 bps | No | Benchmarking KPI shows the figure; source attribution lives only in the markdown report |
| 8 | Breguet 7,400 units | No | Benchmarking peer comparison row mentions "20,000 → 7,400"; no source badge |

**Score: 4 of 8 traceable on-page (3 fully, 2 partially, 3 not).** This is the single biggest lever for moving from "Clear" to "Defensible" — adding source badges to the four un-attributed numbers would lift the overall defensibility score from 6 to 8 without touching any other element of the dashboard.

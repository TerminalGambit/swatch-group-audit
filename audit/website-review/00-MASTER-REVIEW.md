# Master Review — Swatch Group Audit Dashboard

**Synthesized from 4 parallel agent reviews · 2026-05-27**

| Audit | Score | Verdict |
|-------|------:|---------|
| Design | 7.4 / 10 | Solid |
| Readability | 7.6 / 10 | Good |
| Clarity | 7.4 / 10 | Clear (bordering Defensible) |
| Story walk-through | 6.5 / 10 | Has structure |
| **Composite** | **7.2 / 10** | **Strong execution with a structural gap** |

## Convergent findings (multiple reviewers agreed)

| Finding | Reviewers who flagged | Significance |
|---------|----------------------|--------------|
| **The 5.1× operating-leverage callout is the single best element** | Design · Clarity · Story · Readability | All four reviewers independently identified the same element as the highest-quality piece of the dashboard. This is the pattern to replicate. |
| **Source attribution is uneven on-page** | Clarity (primary) · Story (analyst persona) | 4 of 8 load-bearing numbers can't be traced to source within 3 clicks |
| **Mobile + table affordances are weak** | Design · Readability | No scroll affordances on mobile tables; mobile nav uses `<select>` with `window.location` |
| **The Dashboard front-loads the punchline** | Story (primary) · Clarity (implicit) | 5.1× is on page 1 — Ratios reads as confirmation, not revelation |

---

## The Strategic Verdict

**Two diagnoses dominate the four reviews:**

### Diagnosis 1 — Tactical (high-leverage low-cost fixes)
Polish-level gaps that, if fixed, would push the composite from 7.2 → ~8.5:
- Add value labels to bar charts (`<LabelList>`)
- Add source badges to 4 unattributed numbers
- Unify the 3 table variants into one component
- Fix mobile nav and scroll affordances
- Fix the red-flag count mismatch (Dashboard says 6, Report has 5)

### Diagnosis 2 — Structural (architectural change)
The story auditor's central finding: **the dashboard has no second act**.
- Move the *derivation* of 5.1× (DuPont, fixed-cost math) from Dashboard to Ratios
- Leave the *observation* on Dashboard as the question/teaser
- Add a 7th `/verdict` page as engineered resolution — one viewport, traffic-light grid, FY2025 watch items
- Add bottom-of-page CTAs so the journey self-propagates

The first diagnosis is mechanical. The second one changes what the dashboard *is*.

---

## Prioritized Master Fix List

Effort: **S** (≤30 min), **M** (1–2h), **L** (half-day+). Severity: **HIGH** (visibly blocks understanding), **MED** (reduces polish), **LOW** (nice-to-have).

### Tier 1 — Ship these (HIGH severity, S–M effort)

| # | Fix | Severity | Effort | Source review | Page(s) |
|---|------|:--------:|:------:|--------------|---------|
| 1 | Add `<LabelList>` to all bar charts so values are visible without hover | HIGH | S | Readability | Dashboard, Segments, Benchmarking |
| 2 | Add source badges to: Big Four +300bps, Breguet 7,400 units, market share −200bps, 60/40 verdict | HIGH | S | Clarity | Dashboard, Benchmarking |
| 3 | Fix red-flag count: Dashboard says 6, Report says 5 — reconcile | HIGH | S | Story | Dashboard, Report |
| 4 | Fix mobile nav `<select>` — use React Router `useNavigate()` instead of `window.location.pathname` | HIGH | S | Design | Navbar |
| 5 | Add scroll affordance (right-edge shadow) to tables on narrow viewports | HIGH | S | Design + Readability | All table pages |
| 6 | Unify the 3 table implementations into `<StatementTable>` reuse on Ratios + Benchmarking | MED | M | Design | Ratios, Benchmarking |

### Tier 2 — Structural improvement (HIGH leverage, M–L effort)

| # | Fix | Severity | Effort | Source review |
|---|------|:--------:|:------:|--------------|
| 7 | Move the **derivation** of 5.1× to Ratios; leave the **observation** on Dashboard. Create a vivid 5.1× explainer block on Ratios with fixed-cost math + DuPont contribution | HIGH | M | Story |
| 8 | Add a `/verdict` route — single-viewport conclusion: 5.1× anchor, 3-color traffic-light grid for FY2025 watch items, audit signal block | HIGH | M | Story |
| 9 | Add bottom-of-page CTAs to Financials, Segments, Ratios, Benchmarking (currently only Dashboard has them) | MED | S | Story |
| 10 | Rewrite Report H1 from "Read the audit" (nav label) to a thesis sentence | MED | S | Clarity |

### Tier 3 — Polish (MED severity, S effort)

| # | Fix | Severity | Effort | Source review |
|---|------|:--------:|:------:|--------------|
| 11 | Make Pie chart drop Corporate (0.0% slice) and the redundant 3rd legend entry | MED | S | Readability |
| 12 | Add in-article TOC + heading anchors + max-width to `/report` markdown render | MED | M | Readability |
| 13 | Unify CHF unit conventions on each page (M vs B vs 2k — pick one per chart) | MED | S | Readability |
| 14 | Pull the DIO ~2,400 days finding above the fold on Ratios; visually separate the 5 sub-tables | MED | S | Readability + Design |
| 15 | Rewrite the Payout 120% callout from a question to an answer | LOW | S | Clarity |
| 16 | Move the Benchmarking conclusion callout from the bottom to top-of-page | MED | S | Design |
| 17 | Disambiguate the 4 jobs of clay (eyebrow + link + hover + Medium severity pill) | LOW | M | Design |
| 18 | Show inline arithmetic for 5.1× on Ratios (e.g. `−74.5% / −14.6% = 5.1×`) | MED | S | Clarity |

---

## What to keep (the wins)

Every reviewer named these — they are the dashboard's signature strengths:

1. **The 5.1× operating-leverage hero callout** — single best element, all 4 reviewers
2. **Editorial H1-as-thesis pattern** — every page leads with a conclusion-shaped headline ("Two Segments. One Country Did the Damage.")
3. **Number-legibility system** — tabular nums, monospace `.num` class, proper Unicode minus, rust/olive sign coloring (Readability auditor: 9/10)
4. **Thariq palette discipline** — rust/olive/clay/oat used semantically with almost no leaks (Design auditor: 8.5/10)
5. **PwC unqualified opinion + KAM attribution block** — sets the gold standard the rest of the dashboard should match

---

## Per-page time-to-key-finding (readability auditor measurement)

| Page | Seconds to extract headline | Working as intended? |
|------|----------------------------:|----------------------|
| Dashboard | 6s | ✅ Yes |
| Segments | 8s | ✅ Yes |
| Benchmarking | 9s | ✅ Yes |
| Financials | 12s | ⚠️ Tables compete |
| Ratios | 15s | ⚠️ Stacked sub-tables |
| Report | 20s | ⚠️ Long-form prose |

---

## Recommended implementation sequence

1. **Spend 1 hour on Tier 1 fixes 1–5** (label lists, source badges, red-flag reconciliation, mobile nav, table scroll). Score moves to ~8.0/10.
2. **Spend 2–3 hours on Tier 2 (#7–10)** — the structural changes. Score moves to ~8.7/10.
3. **Optionally spend 1 hour on Tier 3 polish** (#11–18). Score approaches 9/10.

The 4-hour total path delivers a dashboard that's defensible under cross-examination by a financial-audit professor and compelling enough to present as a 5-minute demo.

---

## Source reviews
- [01-DESIGN.md](./01-DESIGN.md)
- [02-READABILITY.md](./02-READABILITY.md)
- [03-CLARITY.md](./03-CLARITY.md)
- [04-STORY.md](./04-STORY.md)
- Screenshots: [./screenshots/](./screenshots/)

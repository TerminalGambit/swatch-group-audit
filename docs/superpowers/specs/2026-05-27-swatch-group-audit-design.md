# Swatch Group 2024 — Full Financial Audit Design

**Date:** 2026-05-27  
**Source:** Swatch Group Annual Report 2024 — Financial Statements (PDF)  
**Approach:** Parallel swarm → synthesis → React website

## Deliverables

1. **Written audit report** — 9-section Markdown in `report/`
2. **Slide deck** — Marp-compatible Markdown in `slides/`
3. **Structured data** — JSON files in `data/` (consumed by React)
4. **React website** — Dashboard + report portal in `website/`

## Agent Architecture

### Layer 1 — Parallel Research (run simultaneously)

| Agent | Scope | Output |
|-------|-------|--------|
| `pdf-extractor` | All 4 financial statements, 34 notes, segment/geo data | `data/financials.json`, `data/financials-extracted.md` |
| `industry-benchmarker` | Richemont, LVMH W&J, FH export stats, luxury sector | `data/benchmarks.json`, `data/benchmarks.md` |
| `macro-analyst` | China slowdown, HK/Macau, CHF FX, luxury market 2024 | `data/macro-context.md` |
| `valuation-researcher` | UHRN price/cap, P/E, EV/EBITDA, analyst consensus | `data/valuation.json`, `data/valuation.md` |
| `historical-researcher` | Swatch 2019–2023 KPIs for trend analysis | `data/historical.json`, `data/historical.md` |

### Layer 2 — Synthesis

| Agent | Inputs | Output |
|-------|--------|--------|
| `synthesis-writer` | All data/ files | `report/` (9 sections), `data/ratios.json`, `slides/deck.md` |

### Layer 3 — React Build

| Agent | Inputs | Output |
|-------|--------|--------|
| `react-builder` | All data/*.json + report/ | `website/` (Vite + React + Recharts + Tailwind) |

## Audit Report Structure

1. Executive Summary
2. Company Overview & Business Model
3. Income Statement Analysis
4. Balance Sheet Analysis  
5. Cash Flow Analysis
6. Segment Analysis (Watches & Jewelry vs Electronic Systems)
7. Ratio Analysis (DuPont, liquidity, solvency, efficiency)
8. Industry Benchmarking & Competitive Position
9. Red Flags, Risks & Valuation

## Key Numbers Already Identified

| Metric | 2024 | 2023 | Change |
|--------|------|------|--------|
| Net sales (CHF M) | 6,735 | 7,888 | -14.6% |
| Operating result (CHF M) | 304 | 1,191 | -74.5% |
| Operating margin | 4.5% | 15.1% | -1060bps |
| Net result (CHF M) | 219 | 890 | -75.4% |
| Net margin | 3.3% | 11.3% | -800bps |
| Equity (CHF M) | 12,217 | 12,258 | -0.3% |

## React Tech Stack

- Vite + React 18 + TypeScript
- Recharts (financial charts)
- Tailwind CSS
- React Router v6
- shadcn/ui components

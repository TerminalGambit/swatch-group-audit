# Swatch Group 2024 — Full Financial Audit

> Financial audit of The Swatch Group AG, based on the 2024 Annual Report (Financial Statements).
> Produced as part of AlbertSchool S2 — Financial Audit course.

## Overview

This repository contains a comprehensive financial audit of Swatch Group for fiscal year 2024, covering:

- **Consolidated financial statements analysis** (Income Statement, Balance Sheet, Cash Flows)
- **Segment analysis** (Watches & Jewelry vs Electronic Systems)
- **Financial ratio analysis** (DuPont, liquidity, solvency, efficiency)
- **Industry benchmarking** (Richemont, LVMH Watches & Jewelry, Swiss export industry)
- **Macroeconomic context** (China slowdown, CHF headwinds, global luxury market)
- **Valuation analysis** (P/E, EV/EBITDA, dividend yield, analyst consensus)
- **Red flags & risk assessment**

## Key 2024 Headline Numbers

| Metric | 2024 | 2023 | Change |
|--------|------|------|--------|
| Net sales (CHF M) | **6,735** | 7,888 | **-14.6%** |
| Operating result (CHF M) | **304** | 1,191 | **-74.5%** |
| Operating margin | **4.5%** | 15.1% | -1,060 bps |
| Net result (CHF M) | **219** | 890 | **-75.4%** |
| Dividend (bearer share) | **CHF 4.50** | CHF 6.50 | -30.8% |

## Repository Structure

```
swatch-group-audit/
├── data/                   # Structured JSON data (feeds React dashboard)
│   ├── financials.json     # Full financial statements extracted from PDF
│   ├── benchmarks.json     # Peer comparison (Richemont, LVMH, FH)
│   ├── historical.json     # Swatch 2019–2024 trend data
│   ├── valuation.json      # Market cap, multiples, analyst data
│   └── ratios.json         # Computed financial ratios
├── report/                 # 9-section written audit report (Markdown)
│   ├── 01-executive-summary.md
│   ├── 02-company-overview.md
│   ├── 03-income-statement.md
│   ├── 04-balance-sheet.md
│   ├── 05-cash-flows.md
│   ├── 06-segments.md
│   ├── 07-ratios.md
│   ├── 08-benchmarking.md
│   └── 09-red-flags-valuation.md
├── slides/                 # Presentation slide deck (Marp Markdown)
├── website/                # React dashboard + audit portal
│   └── src/pages/
│       ├── Dashboard.tsx   # KPI cards, top-level overview
│       ├── Financials.tsx  # IS / BS / CF drill-down
│       ├── Segments.tsx    # Segment breakdown & charts
│       ├── Ratios.tsx      # Ratio analysis tables
│       ├── Benchmarking.tsx# Peer comparison
│       └── Report.tsx      # Full audit report reader
└── docs/
    └── superpowers/specs/  # Design specification
```

## Source

- **Primary source:** Swatch Group Annual Report 2024 — Financial Statements
- **Benchmarking:** Richemont FY2025, LVMH FY2024, FH Swiss watch export statistics
- **Macro research:** Bain luxury report 2024, China macro data, SNB FX data

## React Dashboard

```bash
cd website
npm install
npm run dev
```

## Tech Stack (website)

- Vite + React 18 + TypeScript
- Recharts (financial charts)
- Tailwind CSS
- React Router v6

---

*Academic work — AlbertSchool Financial Audit, S2 2026*

import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Callout from '../components/Callout';
import KPICard from '../components/KPICard';
import SourceBadge from '../components/SourceBadge';
import { ratios } from '../data';

const r24 = ratios.ratios['2024'];
const r23 = ratios.ratios['2023'];

interface RatioRow {
  label: string;
  v24: number | string | null | undefined;
  v23: number | string | null | undefined;
  format: 'pct' | 'x' | 'days' | 'chf' | 'raw';
  note?: string;
  flag?: 'rust' | 'olive' | 'clay' | null;
}

function fmt(v: number | string | null | undefined, format: RatioRow['format']): string {
  if (v === null || v === undefined) return '—';
  if (typeof v === 'string') return v;
  switch (format) {
    case 'pct': return `${v.toFixed(1)}%`;
    case 'x': return `${v.toFixed(2)}×`;
    case 'days': return `${Math.round(v)} days`;
    case 'chf': return `CHF ${v.toLocaleString()}m`;
    case 'raw': return v.toString();
  }
}

const profit: RatioRow[] = [
  { label: 'Operating margin', v24: r24.profitability.operating_margin_pct, v23: r23.profitability.operating_margin_pct, format: 'pct', flag: 'rust' },
  { label: 'Net margin', v24: r24.profitability.net_margin_pct, v23: r23.profitability.net_margin_pct, format: 'pct', flag: 'rust' },
  { label: 'Return on equity (ROE)', v24: r24.profitability.roe_pct, v23: r23.profitability.roe_pct, format: 'pct', flag: 'rust' },
  { label: 'Return on assets (ROA)', v24: r24.profitability.roa_pct, v23: r23.profitability.roa_pct, format: 'pct' },
  { label: 'Gross margin (proxy)', v24: r24.profitability.gross_margin_pct, v23: r23.profitability.gross_margin_pct, format: 'pct', note: 'Swiss GAAP P&L format — proxy basis' },
];

const liq: RatioRow[] = [
  { label: 'Current ratio', v24: r24.liquidity.current_ratio, v23: r23.liquidity.current_ratio, format: 'x', flag: 'olive', note: 'Industry-leading' },
  { label: 'Quick ratio', v24: r24.liquidity.quick_ratio, v23: r23.liquidity.quick_ratio, format: 'x' },
  { label: 'Cash ratio', v24: r24.liquidity.cash_ratio, v23: r23.liquidity.cash_ratio, format: 'x' },
];

const sol: RatioRow[] = [
  { label: 'Equity ratio', v24: r24.solvency.equity_ratio_pct, v23: r23.solvency.equity_ratio_pct, format: 'pct', flag: 'olive', note: 'Fortress balance sheet' },
  { label: 'Debt-to-equity', v24: r24.solvency.debt_to_equity, v23: r23.solvency.debt_to_equity, format: 'x' },
  { label: 'Total liabilities / equity', v24: r24.solvency.total_liabilities_to_equity, v23: r23.solvency.total_liabilities_to_equity, format: 'x' },
  { label: 'Net debt (negative = net cash)', v24: r24.solvency.net_debt_chf_m, v23: r23.solvency.net_debt_chf_m, format: 'chf' },
];

const eff: RatioRow[] = [
  { label: 'Inventory turnover', v24: r24.efficiency.inventory_turnover, v23: r23.efficiency.inventory_turnover, format: 'x', flag: 'rust', note: 'Materials-only basis · conservative' },
  { label: 'Days inventory outstanding (DIO)', v24: r24.efficiency.dio_days, v23: r23.efficiency.dio_days, format: 'days', flag: 'rust', note: '~2 yrs of production inventory · capacity buffer strategy' },
  { label: 'Asset turnover', v24: r24.efficiency.asset_turnover, v23: r23.efficiency.asset_turnover, format: 'x' },
];

const ps: RatioRow[] = [
  { label: 'EPS bearer (basic)', v24: r24.per_share.eps_bearer_basic, v23: r23.per_share.eps_bearer_basic, format: 'raw' },
  { label: 'EPS registered (basic)', v24: r24.per_share.eps_registered_basic, v23: r23.per_share.eps_registered_basic, format: 'raw' },
  { label: 'Book value / bearer share', v24: r24.per_share.book_value_per_bearer, v23: r23.per_share.book_value_per_bearer, format: 'raw' },
  { label: 'Dividend / bearer (proposed)', v24: r24.per_share.dividend_bearer_proposed, v23: r23.per_share.dividend_bearer_proposed, format: 'raw' },
  { label: 'Dividend payout ratio', v24: r24.per_share.dividend_payout_ratio_pct, v23: r23.per_share.dividend_payout_ratio_pct, format: 'pct', flag: 'rust', note: 'Above 100% — drawn from reserves' },
  { label: 'Operating CF / bearer share', v24: r24.per_share.cfo_per_bearer, v23: r23.per_share.cfo_per_bearer, format: 'raw' },
  { label: 'P/B at year-end 2024', v24: r24.per_share.price_to_book_at_year_end, v23: '—', format: 'x', flag: 'clay', note: 'Below 1.0 — rare for luxury' },
];

type Accent = 'clay' | 'olive' | 'rust';
const accentBar: Record<Accent, string> = {
  clay: 'bg-clay',
  olive: 'bg-olive',
  rust: 'bg-rust',
};

const sections: { title: string; subtitle: string; rows: RatioRow[]; accent: Accent }[] = [
  { title: 'Profitability', subtitle: 'Return Metrics', rows: profit, accent: 'clay' },
  { title: 'Liquidity', subtitle: 'Short-Term Resilience', rows: liq, accent: 'olive' },
  { title: 'Solvency & Leverage', subtitle: 'Balance-Sheet Strength', rows: sol, accent: 'olive' },
  { title: 'Efficiency', subtitle: 'Asset Productivity', rows: eff, accent: 'clay' },
  { title: 'Per Share', subtitle: 'Shareholder Metrics', rows: ps, accent: 'clay' },
];

const dupont = r24.dupont;

export default function Ratios() {
  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Ratio Analysis · DuPont · Operating Leverage"
        title="Numbers that explain the collapse"
        description="The income statement tells you what happened; the ratios tell you why. DuPont reconciles to 1.77% ≈ 1.8% reported ROE. Inventory DIO is the red flag the auditors flagged. The payout ratio above 100% is the capital-allocation question."
      />

      {/* DuPont visual */}
      <section>
        <h2 className="font-serif text-2xl text-slate mb-4">DuPont decomposition of ROE</h2>
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-3 items-stretch">
          <DupontBox
            label="Net margin"
            value={`${dupont.net_margin_pct.toFixed(2)}%`}
            note="219 / 6,735"
            badge={<SourceBadge label="IS" tone="olive" title="Income Statement 2024" />}
          />
          <Multiplier />
          <DupontBox
            label="Asset turnover"
            value={`${dupont.asset_turnover.toFixed(3)}×`}
            note="6,735 / 14,110.5 avg"
            badge={<SourceBadge label="IS + BS avg" tone="olive" title="Income Statement & Balance Sheet (2-yr avg assets)" />}
          />
          <Multiplier />
          <DupontBox
            label="Equity multiplier"
            value={`${dupont.equity_multiplier.toFixed(3)}×`}
            note="13,992 / 12,217"
            badge={<SourceBadge label="BS" tone="olive" title="Balance Sheet 2024 — total assets / equity" />}
          />
          <Multiplier eq />
          <DupontBox
            label="ROE"
            value={`${dupont.roe_pct.toFixed(2)}%`}
            note="3.25 × 0.477 × 1.145 ≈ 1.77%"
            accent="clay"
            badge={<SourceBadge label="Key Figures 2024" tone="olive" title="Reconciles to 1.8% ROE reported in Key Figures table" />}
          />
        </div>
        <p className="text-xs text-muted mt-2 text-center">
          Check passes: 3.25% × 0.477 × 1.145 = 1.78%, rounds to the 1.8% ROE reported in Key Figures.
        </p>
      </section>

      {/* The Climax — 5.1× Derivation */}
      <section className="card bg-gradient-to-br from-rust/5 to-clay/5 border-rust/30">
        <div className="text-xs uppercase tracking-[0.18em] text-rust font-semibold">The Climax</div>
        <h2 className="font-serif text-3xl text-slate mt-2 mb-1">
          How 5.1× Was Computed
          <SourceBadge label="Audit calc" tone="muted" title="Derived from FY2024 Income Statement deltas" />
        </h2>
        <p className="text-sm text-slate/70 mb-6">
          A formal derivation of the operating leverage multiplier — the audit's central diagnostic finding.
        </p>

        {/* Three-step derivation */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="bg-white border border-border rounded-xl p-4">
            <div className="text-xs uppercase tracking-wider text-muted font-medium">Step 1 · The Inputs</div>
            <ul className="mt-3 space-y-1.5 text-sm">
              <li>Revenue decline: <span className="num text-rust font-semibold">−14.6%</span></li>
              <li>Op result decline: <span className="num text-rust font-semibold">−74.5%</span></li>
              <li>CHF: 7,888m → 6,735m</li>
              <li>Op: 1,191m → 304m</li>
            </ul>
          </div>
          <div className="bg-white border border-border rounded-xl p-4">
            <div className="text-xs uppercase tracking-wider text-muted font-medium">Step 2 · The Ratio</div>
            <div className="mt-3 font-mono text-sm bg-oat/30 p-3 rounded">
              leverage = Δ op result %<br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;÷ Δ revenue %<br />
              = −74.5% ÷ −14.6%<br />
              = <span className="text-rust font-semibold">5.1×</span>
            </div>
            <p className="text-xs text-muted mt-3">For every 1% of revenue lost, 5.1% of operating profit was lost.</p>
          </div>
          <div className="bg-white border border-border rounded-xl p-4">
            <div className="text-xs uppercase tracking-wider text-muted font-medium">Step 3 · The Cause</div>
            <ul className="mt-3 space-y-1.5 text-sm">
              <li>Personnel: <span className="num">CHF 2,506m</span></li>
              <li>D&A: <span className="num">CHF 416m</span></li>
              <li>Rents + energy: <span className="num">CHF 1,023m</span></li>
              <li className="pt-1 border-t border-border mt-2 font-semibold">Fixed costs total: <span className="num text-rust">CHF 3,945m</span></li>
              <li className="text-rust font-semibold num">= 58.6% of revenue</li>
            </ul>
          </div>
        </div>

        <p className="mt-5 text-sm text-slate/80 leading-relaxed border-t border-rust/20 pt-4">
          <strong className="text-slate">Implication:</strong> Fixed costs do not fall with revenue. The
          breakeven point appears to be CHF 6.2–6.5B at current cost levels. The CHF 6,735M FY2024
          revenue is ~CHF 200–500M above breakeven. A further 5–10% revenue decline in 2025 would
          push the group toward operating losses for the first time since 2020.
        </p>
      </section>

      {/* DIO red flag — surfaced next to the derivation as part of the visual peak */}
      <Callout variant="rust" title="DIO of ~2,400 days — context, not panic">
        <span>
          On a materials-only COGS basis, DIO computes to ~2,400 days
          <SourceBadge label="Audit calc · Note 7" tone="clay" title="Computed from Note 7 Inventories; materials-only COGS proxy" />
          {' '}— extreme by standard analyst conventions but consistent with Swatch's deliberate strategy
          of maintaining Swiss production capacity and a finished-goods buffer. The risk is realisation:
          if China demand does not recover in 2025, CHF 200–400M of additional write-downs are plausible
          against the CHF 7,641M inventory book.
        </span>
      </Callout>

      {/* Operating leverage callout */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <KPICard
          label="Operating leverage multiplier"
          value="5.1×"
          delta="2024 = −14.6% rev → −74.5% op"
          deltaNum={-74.5}
          sub="Fixed costs ≈ 58.6% of net sales. Breakeven ≈ CHF 6.2–6.5B."
          accent="rust"
        />
        <KPICard
          label="Interest coverage"
          value="101×"
          delta="EBIT / Interest expense"
          deltaNum={101}
          sub="No solvency stress · interest expense ~CHF 3M against operating result of CHF 304M"
          accent="olive"
        />
        <KPICard
          label="Net cash position"
          value="CHF 1.08B"
          delta="No financial debt"
          deltaNum={1.08}
          sub="Liquidity drew down from CHF 1,988M to CHF 1,376M during the year"
          accent="olive"
        />
      </section>

      {/* All ratios in 5 grouped tables — visually separated by accent + subtitle */}
      <section className="space-y-6">
        {sections.map((s) => (
          <div key={s.title} className="card relative overflow-hidden">
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${accentBar[s.accent]}`} />
            <div className="pl-3">
              <div className={`text-[10px] uppercase tracking-[0.18em] font-semibold ${s.accent === 'olive' ? 'text-olive' : s.accent === 'rust' ? 'text-rust' : 'text-clay'}`}>
                {s.subtitle}
              </div>
              <h3 className="font-serif text-lg text-slate mb-3 mt-0.5">
                {s.title}
                {s.title === 'Profitability' && (
                  <SourceBadge label="Key Figures 2024" tone="olive" title="ROE 1.8% reconciles to Key Figures table" />
                )}
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-xs uppercase tracking-wider text-muted border-b border-border">
                      <th className="text-left py-2 px-2 font-medium">Ratio</th>
                      <th className="text-right py-2 px-2 font-medium">2024</th>
                      <th className="text-right py-2 px-2 font-medium">2023</th>
                      <th className="text-left py-2 pl-4 font-medium">Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    {s.rows.map((row, i) => (
                      <tr key={i} className="border-b border-border/40">
                        <td className="py-1.5 px-2 text-slate">{row.label}</td>
                        <td className={`py-1.5 px-2 text-right num font-semibold ${row.flag === 'rust' ? 'text-rust' : row.flag === 'olive' ? 'text-olive' : row.flag === 'clay' ? 'text-clay' : 'text-slate'}`}>
                          {fmt(row.v24, row.format)}
                        </td>
                        <td className="py-1.5 px-2 text-right num text-slate/60">{fmt(row.v23, row.format)}</td>
                        <td className="py-1.5 pl-4 text-xs text-muted">{row.note ?? ''}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Payout callout — stays at the bottom as a governance / capital-allocation aside */}
      <Callout variant="rust" title="Payout ratio 120% — confidence or strain?">
        <span>
          Proposed dividend of CHF 4.50 (bearer) versus EPS of CHF 3.74 = 120.3% payout
          <SourceBadge label="EPS / div proposal" tone="clay" title="2024 EPS and proposed dividend per Key Figures table" />
          . The group can fund this from reserves (book value per bearer share is CHF 236.37, payout
          is 1.9% of book
          <SourceBadge label="Year-end 2024" tone="clay" title="Book value & P/B 0.70× at 31-Dec-2024 close" />
          ), so it is not distressed. But the optics during an earnings trough are a governance
          signal — and the 2025 activist board challenge cited capital allocation as a concern.
        </span>
      </Callout>

      {/* Next-step CTA */}
      <Link
        to="/verdict"
        className="card hover:border-clay/60 hover:shadow-md transition-all block group"
      >
        <div className="text-xs uppercase tracking-wider text-muted font-medium">Next</div>
        <div className="font-serif text-xl text-slate group-hover:text-clay mt-1">The Verdict →</div>
        <div className="text-sm text-muted mt-1">The investment signal that emerges from these ratios</div>
      </Link>
    </div>
  );
}

function DupontBox({
  label,
  value,
  note,
  accent,
  badge,
}: {
  label: string;
  value: string;
  note: string;
  accent?: 'clay';
  badge?: React.ReactNode;
}) {
  return (
    <div className={`card text-center flex flex-col justify-center ${accent === 'clay' ? 'bg-clay/8 border-clay/40' : ''}`}>
      <div className="text-xs uppercase tracking-wider text-muted font-medium">
        {label}
        {badge}
      </div>
      <div className="font-serif text-3xl text-slate num mt-2">{value}</div>
      <div className="text-xs text-muted mt-2 num">{note}</div>
    </div>
  );
}

function Multiplier({ eq }: { eq?: boolean }) {
  return (
    <div className="flex items-center justify-center text-3xl text-clay font-serif">
      {eq ? '=' : '×'}
    </div>
  );
}

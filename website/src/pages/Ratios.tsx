import PageHeader from '../components/PageHeader';
import Callout from '../components/Callout';
import KPICard from '../components/KPICard';
import { ratios } from '../data';
import { fmtPct } from '../lib/format';

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

const sections = [
  { title: 'Profitability', rows: profit },
  { title: 'Liquidity', rows: liq },
  { title: 'Solvency & Leverage', rows: sol },
  { title: 'Efficiency', rows: eff },
  { title: 'Per Share', rows: ps },
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
          <DupontBox label="Net margin" value={`${dupont.net_margin_pct.toFixed(2)}%`} note="219 / 6,735" />
          <Multiplier />
          <DupontBox label="Asset turnover" value={`${dupont.asset_turnover.toFixed(3)}×`} note="6,735 / 14,110.5 avg" />
          <Multiplier />
          <DupontBox label="Equity multiplier" value={`${dupont.equity_multiplier.toFixed(3)}×`} note="13,992 / 12,217" />
          <Multiplier eq />
          <DupontBox label="ROE" value={`${dupont.roe_pct.toFixed(2)}%`} note="3.25 × 0.477 × 1.145 ≈ 1.77%" accent="clay" />
        </div>
        <p className="text-xs text-muted mt-2 text-center">
          Check passes: 3.25% × 0.477 × 1.145 = 1.78%, rounds to the 1.8% ROE reported in Key Figures.
        </p>
      </section>

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

      {/* All ratios in 5 grouped tables */}
      <section className="space-y-6">
        {sections.map((s) => (
          <div key={s.title} className="card">
            <h3 className="font-serif text-lg text-slate mb-3">{s.title}</h3>
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
        ))}
      </section>

      {/* Red flag callouts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Callout variant="rust" title="DIO of ~2,400 days — context, not panic">
          On a materials-only COGS basis, DIO computes to ~2,400 days — extreme by standard
          analyst conventions but consistent with Swatch's deliberate strategy of maintaining
          Swiss production capacity and a finished-goods buffer. The risk is realisation: if
          China demand does not recover in 2025, CHF 200–400M of additional write-downs are
          plausible against the CHF 7,641M inventory book.
        </Callout>
        <Callout variant="rust" title="Payout ratio 120% — confidence or strain?">
          Proposed dividend of CHF 4.50 (bearer) versus EPS of CHF 3.74 = 120.3% payout. The
          group can fund this from reserves (book value per bearer share is CHF 236.37, payout
          is 1.9% of book), so it is not distressed. But the optics during an earnings trough
          are a governance signal — and the 2025 activist board challenge cited capital
          allocation as a concern.
        </Callout>
      </div>
    </div>
  );
}

function DupontBox({ label, value, note, accent }: { label: string; value: string; note: string; accent?: 'clay' }) {
  return (
    <div className={`card text-center flex flex-col justify-center ${accent === 'clay' ? 'bg-clay/8 border-clay/40' : ''}`}>
      <div className="text-xs uppercase tracking-wider text-muted font-medium">{label}</div>
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

import { Link } from 'react-router-dom';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import KPICard from '../components/KPICard';
import ChartCard from '../components/ChartCard';
import PageHeader from '../components/PageHeader';
import Callout from '../components/Callout';
import { financials, historical } from '../data';
import { fmtNum, fmtPct } from '../lib/format';

const PALETTE = {
  ivory: '#FAF9F5',
  slate: '#141413',
  clay: '#D97757',
  oat: '#E3DACC',
  olive: '#788C5D',
  rust: '#B04A3F',
  border: '#D1CFC5',
  muted: '#6B7280',
};

const yearOrder = ['2019', '2020', '2021', '2022', '2023', '2024'];

const trendData = yearOrder.map((y) => {
  const row = historical.annual_data[y];
  return {
    year: y,
    revenue: row.net_sales,
    operatingMargin: row.operating_margin_pct,
    operatingResult: row.operating_result,
  };
});

const segmentData = [
  {
    name: 'Watches & Jewelry',
    value: financials.segments['2024'].watches_jewelry.net_sales,
    color: PALETTE.clay,
  },
  {
    name: 'Electronic Systems',
    value: financials.segments['2024'].electronic_systems.net_sales,
    color: PALETTE.olive,
  },
  {
    name: 'Corporate',
    value: financials.segments['2024'].corporate.net_sales,
    color: PALETTE.oat,
  },
];

// Geographic data: compute YoY % change
const geo2024 = financials.geographic_net_sales['2024'];
const geo2023 = financials.geographic_net_sales['2023'];
const geoData = [
  { region: 'Greater China', v2024: geo2024.greater_china, v2023: geo2023.greater_china },
  { region: 'Other Asia', v2024: geo2024.other_asia, v2023: geo2023.other_asia },
  { region: 'Europe', v2024: geo2024.total_europe, v2023: geo2023.total_europe },
  { region: 'Americas', v2024: geo2024.total_america, v2023: geo2023.total_america },
  { region: 'Oceania', v2024: geo2024.total_oceania, v2023: geo2023.total_oceania },
  { region: 'Africa', v2024: geo2024.total_africa, v2023: geo2023.total_africa },
].map((g) => ({
  ...g,
  change: ((g.v2024 - g.v2023) / g.v2023) * 100,
}));

const redFlags = [
  {
    title: 'ETR Spike',
    metric: '36.5%',
    sub: 'vs 22.7% prior year — non-recognition of CHF 41m tax loss carryforwards',
    severity: 'High',
  },
  {
    title: 'Inventory Build',
    metric: 'CHF 7.6B',
    sub: '54.6% of total assets; +CHF 332m during a -14.6% revenue year',
    severity: 'High',
  },
  {
    title: 'Negative FCF',
    metric: '−CHF 216M',
    sub: 'Shareholder returns (408m) exceed operating cash flow (333m)',
    severity: 'Medium',
  },
  {
    title: 'Lease Commitments',
    metric: 'CHF 2.1B',
    sub: 'Off-balance sheet operating leases +CHF 164m YoY',
    severity: 'Medium',
  },
  {
    title: 'Market Share Loss',
    metric: '−200 bps',
    sub: 'To 18.3% of Swiss watch market; Big Four gained +300 bps to 47%',
    severity: 'Medium',
  },
  {
    title: 'Payout > Earnings',
    metric: '120%',
    sub: 'Proposed dividend CHF 4.50 vs EPS CHF 3.74 — drawn from reserves',
    severity: 'Low–Med',
  },
];

const severityColor: Record<string, string> = {
  High: 'bg-rust/15 text-rust',
  Medium: 'bg-clay/15 text-clay',
  'Low–Med': 'bg-oat text-slate/70',
};

export default function Dashboard() {
  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Financial Year 2024 · Consolidated"
        title="The Operating Leverage Crisis"
        description="A 14.6% revenue decline produced a 74.5% operating profit collapse. This dashboard audits Swatch Group's FY2024 results — from income statement to segment economics to peer benchmarks — using only data from the audited Swiss GAAP FER statements."
      />

      {/* Hero KPI cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          label="Net Sales"
          value="CHF 6,735M"
          delta="−14.6% YoY"
          deltaNum={-14.6}
          sub="vs CHF 7,888M FY2023 · −12.2% constant FX"
          accent="rust"
        />
        <KPICard
          label="Operating Result"
          value="CHF 304M"
          delta="−74.5% YoY"
          deltaNum={-74.5}
          sub="Operating margin 4.5% (−10.6 pp)"
          accent="rust"
        />
        <KPICard
          label="Net Margin"
          value="3.3%"
          delta="−800 bps"
          deltaNum={-8.0}
          sub="Net result CHF 219M · EPS bearer CHF 3.74"
          accent="rust"
        />
        <KPICard
          label="Equity Ratio"
          value="87.3%"
          delta="+1.2 pp"
          deltaNum={1.2}
          sub="Net liquidity CHF 1.38B · fortress balance sheet"
          accent="olive"
        />
      </section>

      {/* Revenue trend + segment pie */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartCard
          title="Revenue & operating margin · 6-year trend"
          subtitle="Bars show net sales (CHF M); line shows operating margin (%)"
          className="lg:col-span-2"
          footer="Pre-COVID peak (2019: CHF 8,243M) never recovered. 2024 marks a structural step-down."
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={trendData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid stroke={PALETTE.border} vertical={false} />
                <XAxis dataKey="year" stroke={PALETTE.muted} fontSize={12} />
                <YAxis
                  yAxisId="left"
                  stroke={PALETTE.muted}
                  fontSize={12}
                  tickFormatter={(v) => `${v / 1000}k`}
                  label={{ value: 'CHF M', position: 'insideLeft', angle: -90, fontSize: 11, fill: PALETTE.muted, dx: 12 }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke={PALETTE.clay}
                  fontSize={12}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip
                  contentStyle={{ background: PALETTE.ivory, border: `1px solid ${PALETTE.border}`, borderRadius: 8 }}
                  formatter={(value: any, name: string) => {
                    if (name === 'Operating margin') return [`${value}%`, name];
                    return [`CHF ${fmtNum(value)}m`, name];
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar
                  yAxisId="left"
                  dataKey="revenue"
                  name="Net sales"
                  fill={PALETTE.slate}
                  radius={[4, 4, 0, 0]}
                >
                  {trendData.map((d, i) => (
                    <Cell key={i} fill={d.year === '2024' ? PALETTE.rust : d.year === '2020' ? PALETTE.muted : PALETTE.slate} />
                  ))}
                </Bar>
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="operatingMargin"
                  name="Operating margin"
                  stroke={PALETTE.clay}
                  strokeWidth={2.5}
                  dot={{ fill: PALETTE.clay, r: 4 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard
          title="Segment mix · FY2024"
          subtitle="Share of consolidated net sales"
          footer="Watches & Jewelry is 95% of revenue and 100% of the variability. The Production / Electronic Systems units provide diversification but minimal scale."
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={segmentData}
                  innerRadius={55}
                  outerRadius={95}
                  dataKey="value"
                  nameKey="name"
                  paddingAngle={2}
                  label={({ name, percent }) => `${(percent * 100).toFixed(1)}%`}
                  labelLine={false}
                  fontSize={11}
                >
                  {segmentData.map((d, i) => (
                    <Cell key={i} fill={d.color} stroke={PALETTE.ivory} strokeWidth={2} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: PALETTE.ivory, border: `1px solid ${PALETTE.border}`, borderRadius: 8 }}
                  formatter={(v: any) => `CHF ${fmtNum(v)}m`}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </section>

      {/* Geographic + Operating leverage callout */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartCard
          title="Geographic revenue change · 2023 → 2024"
          subtitle="YoY % change by region — CHF terms"
          className="lg:col-span-2"
          footer="Greater China collapsed −30.4% (CHF 1.83B vs CHF 2.63B), accounting for ~69% of the group's total revenue decline. The US set a record but contributes only ~18% of mix."
        >
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={geoData} layout="vertical" margin={{ top: 10, right: 30, left: 80, bottom: 0 }}>
                <CartesianGrid stroke={PALETTE.border} horizontal={false} />
                <XAxis type="number" stroke={PALETTE.muted} fontSize={11} tickFormatter={(v) => `${v}%`} />
                <YAxis type="category" dataKey="region" stroke={PALETTE.muted} fontSize={12} width={80} />
                <Tooltip
                  contentStyle={{ background: PALETTE.ivory, border: `1px solid ${PALETTE.border}`, borderRadius: 8 }}
                  formatter={(v: any) => `${v.toFixed(1)}%`}
                />
                <Bar dataKey="change" radius={[0, 4, 4, 0]}>
                  {geoData.map((d, i) => (
                    <Cell key={i} fill={d.change < 0 ? PALETTE.rust : PALETTE.olive} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Operating leverage callout */}
        <div className="card bg-gradient-to-br from-rust/8 to-clay/8 border-rust/30 relative overflow-hidden">
          <div className="text-xs uppercase tracking-wider text-rust font-semibold mb-2">Operating Leverage</div>
          <div className="font-serif text-slate text-2xl leading-tight">Every 1% of revenue lost became</div>
          <div className="font-serif text-7xl text-rust mt-2 mb-1 num">5.1×</div>
          <div className="font-serif text-slate text-2xl leading-tight">of operating profit lost</div>
          <div className="mt-4 text-sm text-slate/80 leading-relaxed border-t border-rust/20 pt-3">
            Fixed costs of <span className="num font-semibold">CHF 3,945M</span> — personnel, depreciation, rents, energy — represent <span className="font-semibold">58.6%</span> of net sales. When revenue falls, these costs do not. The breakeven appears to be CHF 6.2–6.5B at current cost structure.
          </div>
        </div>
      </section>

      {/* Red flags grid */}
      <section>
        <div className="flex items-end justify-between mb-4">
          <div>
            <div className="text-xs uppercase tracking-[0.18em] text-clay font-semibold">Audit Findings</div>
            <h2 className="font-serif text-2xl text-slate">Six red flags identified</h2>
          </div>
          <Link to="/report" className="text-sm text-clay hover:text-rust underline underline-offset-2">
            Read full red flags section →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {redFlags.map((rf, i) => (
            <div key={i} className="card">
              <div className="flex items-start justify-between gap-2">
                <div className="font-serif text-base text-slate">{rf.title}</div>
                <span className={`pill ${severityColor[rf.severity]}`}>{rf.severity}</span>
              </div>
              <div className="mt-2 font-serif text-2xl text-slate num">{rf.metric}</div>
              <div className="mt-1 text-xs text-slate/65 leading-relaxed">{rf.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Auditor's view callout */}
      <Callout variant="oat" title="Auditor's view (PricewaterhouseCoopers AG, Basel)">
        Unqualified opinion: the consolidated financial statements give a true and fair view of the financial position
        as at 31 December 2024. The sole Key Audit Matter raised was the <strong>valuation of inventories</strong> —
        Swatch holds CHF 7,641M of inventory representing 54.6% of total assets. Audit materiality: CHF 40M (consolidated).
      </Callout>

      {/* CTA navigation */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { to: '/financials', title: 'Financials', desc: 'Income statement, balance sheet, cash flows' },
          { to: '/segments', title: 'Segments', desc: 'W&J vs Electronic Systems + geo split' },
          { to: '/ratios', title: 'Ratios & DuPont', desc: '5 categories · operating leverage analysis' },
          { to: '/benchmarking', title: 'Benchmarking', desc: 'Peers, Swiss exports, market share' },
        ].map((c) => (
          <Link
            key={c.to}
            to={c.to}
            className="card hover:border-clay/60 hover:shadow-md transition-all group"
          >
            <div className="font-serif text-lg text-slate group-hover:text-clay">{c.title} →</div>
            <div className="text-xs text-muted mt-1">{c.desc}</div>
          </Link>
        ))}
      </section>
    </div>
  );
}

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import ChartCard from '../components/ChartCard';
import Callout from '../components/Callout';
import KPICard from '../components/KPICard';
import SourceBadge from '../components/SourceBadge';
import { financials } from '../data';
import { fmtNum, fmtPct, yoy } from '../lib/format';

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

const seg24 = financials.segments['2024'];
const seg23 = financials.segments['2023'];

const wj24 = seg24.watches_jewelry;
const wj23 = seg23.watches_jewelry;
const es24 = seg24.electronic_systems;
const es23 = seg23.electronic_systems;

const geo24 = financials.geographic_net_sales['2024'];
const geo23 = financials.geographic_net_sales['2023'];

const geoData = [
  { region: 'Greater China', v24: geo24.greater_china, v23: geo23.greater_china },
  { region: 'Other Asia', v24: geo24.other_asia, v23: geo23.other_asia },
  { region: 'Europe', v24: geo24.total_europe, v23: geo23.total_europe },
  { region: 'Americas', v24: geo24.total_america, v23: geo23.total_america },
  { region: 'Oceania', v24: geo24.total_oceania, v23: geo23.total_oceania },
  { region: 'Africa', v24: geo24.total_africa, v23: geo23.total_africa },
].map((g) => ({
  ...g,
  change: yoy(g.v24, g.v23),
  share24: (g.v24 / geo24.total) * 100,
}));

const segmentCompare = [
  { name: 'Watches & Jewelry', sales: wj24.net_sales, margin: wj24.margin_pct, color: PALETTE.clay },
  { name: 'Electronic Systems', sales: es24.net_sales, margin: es24.margin_pct, color: PALETTE.olive },
];

export default function Segments() {
  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Segments & Geography"
        title="Two Segments. One Country Did the Damage."
        description="The Watches & Jewelry segment carries 95% of revenue and 100% of the volatility. Geography concentrated the shock: Greater China alone explains 69% of the group's total revenue decline."
      />

      {/* Two segment hero cards */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <SegmentCard
          name="Watches & Jewelry"
          accent={PALETTE.clay}
          sales24={wj24.net_sales}
          sales23={wj23.net_sales}
          op24={wj24.operating_result}
          op23={wj23.operating_result}
          margin24={wj24.margin_pct}
          margin23={wj23.margin_pct}
          note="Pure-play watch + jewelry portfolio of 16 brands. Production segment embedded (deliberately maintained at a loss to preserve Swiss manufacturing capacity)."
        />
        <SegmentCard
          name="Electronic Systems"
          accent={PALETTE.olive}
          sales24={es24.net_sales}
          sales23={es23.net_sales}
          op24={es24.operating_result}
          op23={es23.operating_result}
          margin24={es24.margin_pct}
          margin23={es23.margin_pct}
          note="EM Microelectronic, Renata batteries, Micro Crystal. Order book +25% YoY at year-end — leading indicator of 2025 recovery in industrial demand."
        />
      </section>

      {/* Segment KPI strip */}
      <section className="space-y-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <KPICard
            label="W&J segment margin"
            value={fmtPct(wj24.margin_pct)}
            delta={`${wj24.margin_pct - wj23.margin_pct >= 0 ? '+' : ''}${(wj24.margin_pct - wj23.margin_pct).toFixed(1)} pp`}
            deltaNum={wj24.margin_pct - wj23.margin_pct}
            sub="Vs Richemont watch-only 5.3%. Industry pure-play margins compressed."
            accent="rust"
          />
          <KPICard
            label="Greater China revenue"
            value={`CHF ${fmtNum(geo24.greater_china)}m`}
            delta={`${yoy(geo24.greater_china, geo23.greater_china).toFixed(1)}%`}
            deltaNum={yoy(geo24.greater_china, geo23.greater_china)}
            sub={`${geo24.china_incl_hk_macau_pct}% of total · was 33% in 2023`}
            accent="rust"
          />
          <KPICard
            label="ES order book"
            value="+25%"
            delta="YoY"
            deltaNum={25}
            sub="Sole recovery signal in the report — industrial micro-electronics demand rebuilding"
            accent="olive"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[10px] text-muted px-1">
          <div className="flex items-center">
            W&J 6.4% margin
            <SourceBadge label="Note 4" tone="clay" title="Segment information — Note 4" />
          </div>
          <div className="flex items-center flex-wrap gap-y-1">
            CHF & −30.4%
            <SourceBadge label="Group Key Figures" tone="olive" title="2024 Group Key Figures" />
            27% of total
            <SourceBadge label="Note 4" tone="clay" title="Segment information — Note 4" />
          </div>
          <div className="flex items-center">
            ES order book +25%
            <SourceBadge label="Mgmt commentary" tone="clay" title="Management commentary in 2024 annual report" />
          </div>
        </div>
      </section>

      {/* Geographic chart */}
      <ChartCard
        title="Net sales by geography · YoY change (CHF terms)"
        subtitle="Bars sized by absolute % change; sorted by 2024 share of total"
        footer="Greater China contracted CHF 800m. Americas, Japan and India set records but each contributes a smaller share of the mix — the math of the operating leverage collapse falls on the largest single market."
      >
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={geoData} layout="vertical" margin={{ top: 10, right: 30, left: 100, bottom: 0 }}>
              <CartesianGrid stroke={PALETTE.border} horizontal={false} />
              <XAxis type="number" stroke={PALETTE.muted} fontSize={11} tickFormatter={(v) => `${v}%`} />
              <YAxis type="category" dataKey="region" stroke={PALETTE.muted} fontSize={12} width={100} />
              <Tooltip
                contentStyle={{ background: PALETTE.ivory, border: `1px solid ${PALETTE.border}`, borderRadius: 8 }}
                formatter={(v: any, name: string, item: any) => {
                  if (name === 'change') {
                    return [`${v.toFixed(1)}% YoY · CHF ${fmtNum(item.payload.v24)}m (${item.payload.share24.toFixed(1)}% of mix)`, item.payload.region];
                  }
                  return [v, name];
                }}
              />
              <Bar dataKey="change" radius={[0, 4, 4, 0]}>
                {geoData.map((d, i) => (
                  <Cell key={i} fill={d.change < 0 ? PALETTE.rust : PALETTE.olive} />
                ))}
                <LabelList
                  dataKey="change"
                  position="right"
                  fill={PALETTE.slate}
                  fontSize={11}
                  formatter={(v: number) => `${v > 0 ? '+' : v < 0 ? '−' : ''}${Math.abs(v).toFixed(1)}%`}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Callout variant="rust" title="China contribution to the decline">
          Greater China declined from CHF 2,630M to CHF 1,830M (−30.4%) — a CHF 800M reduction
          against the group's total revenue decline of CHF 1,153M. That is 69.4% of the entire
          group decline concentrated in a region that is 27% of revenue. Mid-market exposure
          (below CHF 3,000) made Swatch more sensitive than ultra-luxury peers.
        </Callout>
        <Callout variant="olive" title="Where Swatch over-performed">
          The USA exceeded USD 100M for the first time, with Tissot, Omega, Longines and Harry
          Winston all strong. Japan set records with high double-digit growth (Harry Winston,
          Omega, Longines, Tissot). India also set a record. The retail share of W&J sales
          climbed to 47% (from 33% in 2019) — DTC channel shift is intact.
        </Callout>
      </div>

      {/* Brand narrative */}
      <div className="card">
        <h3 className="font-serif text-lg text-slate mb-3">Brand-level commentary</h3>
        <ul className="space-y-2 text-sm text-slate/85">
          <li>
            <strong className="text-slate">MoonSwatch & Scuba Fifty Fathoms (Swatch brand):</strong>{' '}
            Demand remained high through 2024. <em>Mission to the Super Blue Moonphase</em> and{' '}
            <em>Mission to Earthphase</em> drove H2 sales lift. Innovation playbook intact.
          </li>
          <li>
            <strong className="text-slate">Breguet, Blancpain (prestige):</strong> Worst hit by the
            challenging market environment — Breguet unit shipments collapsed from ~20,000 to
            ~7,400
            <SourceBadge label="MS / LuxeConsult" tone="clay" title="Morgan Stanley / LuxeConsult Top 50 Swiss Watch Brands 2024" />
            according to industry estimates. Structural share loss to Richemont's specialist
            watchmakers.
          </li>
          <li>
            <strong className="text-slate">Omega (prestige):</strong> Performed well; Olympic Games
            Paris timekeeping role provided global visibility. Strengthened position in Japan and
            the USA. Pre-owned Omega prices fell ~1% post-Games while Rolex/Patek/AP/Cartier rose
            (Bloomberg Subdial).
          </li>
          <li>
            <strong className="text-slate">Tissot (mid-market):</strong> Strong year — exceeded
            USD 100M in US sales for the first time. Significantly strengthened position in Japan.
          </li>
          <li>
            <strong className="text-slate">Production segment (embedded in W&J):</strong> Sharp
            drop in third-party and internal orders led to strongly negative operating result.
            Group maintained capacity rather than cut — recovery flagged for 2025 if demand
            returns.
          </li>
        </ul>
      </div>

      <Link to="/verdict" className="card hover:border-clay/60 hover:shadow-md transition-all block group">
        <div className="text-xs uppercase tracking-wider text-muted font-medium">Next</div>
        <div className="font-serif text-xl text-slate group-hover:text-clay mt-1">The Verdict →</div>
        <div className="text-sm text-muted mt-1">What this segment story means for 2025</div>
      </Link>
    </div>
  );
}

interface SegmentCardProps {
  name: string;
  accent: string;
  sales24: number;
  sales23: number;
  op24: number;
  op23: number;
  margin24: number;
  margin23: number;
  note: string;
}

function SegmentCard({ name, accent, sales24, sales23, op24, op23, margin24, margin23, note }: SegmentCardProps) {
  const salesYoY = yoy(sales24, sales23);
  const opYoY = yoy(op24, op23);
  return (
    <div className="card relative overflow-hidden">
      <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: accent }} />
      <div className="pl-2">
        <h3 className="font-serif text-xl text-slate">{name}</h3>
        <div className="grid grid-cols-3 gap-3 mt-4">
          <div>
            <div className="text-xs text-muted uppercase tracking-wide">Net sales</div>
            <div className="font-serif text-2xl text-slate num mt-1">{fmtNum(sales24)}</div>
            <div className={`text-xs num ${salesYoY < 0 ? 'text-rust' : 'text-olive'}`}>
              {salesYoY >= 0 ? '+' : ''}{salesYoY.toFixed(1)}% YoY
            </div>
          </div>
          <div>
            <div className="text-xs text-muted uppercase tracking-wide">Op result</div>
            <div className="font-serif text-2xl text-slate num mt-1">{fmtNum(op24)}</div>
            <div className={`text-xs num ${opYoY < 0 ? 'text-rust' : 'text-olive'}`}>
              {opYoY >= 0 ? '+' : ''}{opYoY.toFixed(1)}% YoY
            </div>
          </div>
          <div>
            <div className="text-xs text-muted uppercase tracking-wide">Margin</div>
            <div className="font-serif text-2xl text-slate num mt-1">{margin24.toFixed(1)}%</div>
            <div className={`text-xs num ${margin24 - margin23 < 0 ? 'text-rust' : 'text-olive'}`}>
              {(margin24 - margin23 >= 0 ? '+' : '') + (margin24 - margin23).toFixed(1)} pp
            </div>
          </div>
        </div>
        <p className="mt-4 text-sm text-slate/70 leading-relaxed">{note}</p>
      </div>
    </div>
  );
}

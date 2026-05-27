import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import PageHeader from '../components/PageHeader';
import ChartCard from '../components/ChartCard';
import Callout from '../components/Callout';
import KPICard from '../components/KPICard';
import { benchmarks } from '../data';
import { fmtNum } from '../lib/format';

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

const cmp = benchmarks.fy2024_comparison;
const exp = benchmarks.swiss_watch_exports_2024;
const mkt = benchmarks.market_share_swiss_watch_industry_2024;

// Operating margin bars (cross-currency, normalized to %)
const marginData = [
  { name: 'Richemont (group)', margin: cmp.richemont.op_margin_pct, type: 'group' },
  { name: 'Rolex (estimate)', margin: 38, type: 'private' },
  { name: 'LVMH W&J', margin: cmp.lvmh_watches_jewelry?.op_margin_pct ?? 14.7, type: 'group' },
  { name: 'Richemont Specialist Watchmakers', margin: cmp.richemont.segments?.specialist_watchmakers?.op_margin_pct ?? 5.3, type: 'segment' },
  { name: 'Swatch Group', margin: cmp.swatch_group.op_margin_pct, type: 'swatch' },
  { name: 'Kering Other Houses', margin: -0.3, type: 'group' },
].sort((a, b) => b.margin - a.margin);

// Geographic destinations
const destData = (exp.top_destinations || [])
  .filter((d: any) => d.market && d.yoy_change_pct !== undefined)
  .slice(0, 10)
  .map((d: any) => ({ market: d.market, change: d.yoy_change_pct }));

// Price segment bifurcation
const priceSeg = [
  {
    name: 'Below CHF 3,000 export price',
    change: -15.6,
    note: '~20% of total · Swatch Group sweet spot',
  },
  {
    name: 'Above CHF 3,000 export price',
    change: 1.0,
    note: '>80% of total · Rolex / Patek / AP territory',
  },
];

// Group shares
const grp = (mkt.group_shares || [])
  .filter((g: any) => g.market_share_pct !== null && g.market_share_pct !== undefined)
  .map((g: any) => ({
    group: g.group,
    share: g.market_share_pct,
    change: g.change_bps ?? null,
  }));

export default function Benchmarking() {
  return (
    <div className="space-y-10">
      <PageHeader
        eyebrow="Peer Comparison · Industry Context"
        title="Swatch underperformed — but not in isolation"
        description="The 14.6% revenue decline looks dramatic until you read Richemont's specialist watchmakers segment also down 13%. Pure-play watch brands had a brutal 2024. The structural concern is market share — Swatch lost 200 bps; the Big Four private brands gained 300 bps."
      />

      {/* Top KPI strip */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KPICard
          label="Industry gap"
          value="−11.8pp"
          delta="Swatch −14.6% vs FH −2.8%"
          deltaNum={-11.8}
          sub="Swiss watch exports declined 2.8%; Swatch underperformed the industry materially"
          accent="rust"
        />
        <KPICard
          label="Market share"
          value="18.3%"
          delta="−200 bps YoY"
          deltaNum={-2}
          sub="Down from 20.3% in 2023 (Morgan Stanley / LuxeConsult Top 50)"
          accent="rust"
        />
        <KPICard
          label="Breguet unit shipments"
          value="~7,400"
          delta="−63% (industry est.)"
          deltaNum={-63}
          sub="Down from ~20,000 units — prestige collapse"
          accent="rust"
        />
        <KPICard
          label="Big Four share gain"
          value="+300 bps"
          delta="Rolex · Patek · AP · Richard Mille"
          deltaNum={3}
          sub="Combined 47% share of Swiss watch industry"
          accent="olive"
        />
      </section>

      {/* Operating margin bar chart */}
      <ChartCard
        title="Operating margin · 2024 peer benchmark"
        subtitle="Sorted high to low · estimates marked accordingly"
        footer="Rolex is private (Morgan Stanley estimate). Richemont group margin includes Jewellery Maisons (Cartier, VCA) at ~32% margin — its Specialist Watchmakers segment alone is 5.3%, close to Swatch."
      >
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={marginData} layout="vertical" margin={{ top: 10, right: 30, left: 220, bottom: 10 }}>
              <CartesianGrid stroke={PALETTE.border} horizontal={false} />
              <XAxis type="number" stroke={PALETTE.muted} fontSize={11} tickFormatter={(v) => `${v}%`} />
              <YAxis type="category" dataKey="name" stroke={PALETTE.muted} fontSize={11} width={220} />
              <Tooltip
                contentStyle={{ background: PALETTE.ivory, border: `1px solid ${PALETTE.border}`, borderRadius: 8 }}
                formatter={(v: any) => `${v.toFixed(1)}%`}
              />
              <Bar dataKey="margin" radius={[0, 4, 4, 0]}>
                {marginData.map((d, i) => (
                  <Cell
                    key={i}
                    fill={
                      d.type === 'swatch' ? PALETTE.clay
                      : d.margin < 0 ? PALETTE.rust
                      : d.margin > 20 ? PALETTE.olive
                      : PALETTE.muted
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {/* Peer comparison table */}
      <div className="card">
        <h3 className="font-serif text-lg text-slate mb-3">Peer comparison · FY2024 (or nearest comparable)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-muted border-b border-border">
                <th className="text-left py-2 px-2 font-medium">Company</th>
                <th className="text-right py-2 px-2 font-medium">Revenue</th>
                <th className="text-right py-2 px-2 font-medium">Growth</th>
                <th className="text-right py-2 px-2 font-medium">Op margin</th>
                <th className="text-left py-2 px-2 font-medium">Note</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/40 bg-clay/8">
                <td className="py-2 px-2 font-semibold text-slate">Swatch Group</td>
                <td className="py-2 px-2 text-right num">CHF {fmtNum(cmp.swatch_group.revenue_chf_m)}m</td>
                <td className="py-2 px-2 text-right num text-rust">−14.6%</td>
                <td className="py-2 px-2 text-right num text-rust">4.5%</td>
                <td className="py-2 px-2 text-xs text-muted">Pure-play watch & jewelry</td>
              </tr>
              <tr className="border-b border-border/40">
                <td className="py-2 px-2 text-slate">Richemont (group)</td>
                <td className="py-2 px-2 text-right num">€{fmtNum(cmp.richemont.revenue_eur_m)}m</td>
                <td className="py-2 px-2 text-right num text-olive">+4%</td>
                <td className="py-2 px-2 text-right num text-olive">20.9%</td>
                <td className="py-2 px-2 text-xs text-muted">FY ending Mar 2025 · cushioned by Cartier/VCA</td>
              </tr>
              <tr className="border-b border-border/40">
                <td className="py-2 px-2 text-slate pl-6">— Specialist Watchmakers</td>
                <td className="py-2 px-2 text-right num">€{fmtNum(cmp.richemont.segments?.specialist_watchmakers?.revenue_eur_m)}m</td>
                <td className="py-2 px-2 text-right num text-rust">−13%</td>
                <td className="py-2 px-2 text-right num text-rust">5.3%</td>
                <td className="py-2 px-2 text-xs text-muted">IWC, Panerai, JLC — close to Swatch pure-play</td>
              </tr>
              <tr className="border-b border-border/40">
                <td className="py-2 px-2 text-slate pl-6">— Jewellery Maisons</td>
                <td className="py-2 px-2 text-right num">€{fmtNum(cmp.richemont.segments?.jewellery_maisons?.revenue_eur_m)}m</td>
                <td className="py-2 px-2 text-right num text-olive">+8%</td>
                <td className="py-2 px-2 text-right num text-olive">31.9%</td>
                <td className="py-2 px-2 text-xs text-muted">Cartier, VCA — Richemont's growth engine</td>
              </tr>
              {cmp.lvmh_watches_jewelry && (
                <tr className="border-b border-border/40">
                  <td className="py-2 px-2 text-slate">LVMH W&J</td>
                  <td className="py-2 px-2 text-right num">€{fmtNum(cmp.lvmh_watches_jewelry.revenue_eur_m)}m</td>
                  <td className="py-2 px-2 text-right num text-rust">−3.6%</td>
                  <td className="py-2 px-2 text-right num text-clay">14.7%</td>
                  <td className="py-2 px-2 text-xs text-muted">Bulgari, Tiffany cushion the watch line</td>
                </tr>
              )}
              <tr className="border-b border-border/40">
                <td className="py-2 px-2 text-slate">Rolex (estimate)</td>
                <td className="py-2 px-2 text-right num">CHF {fmtNum(benchmarks.rolex_2024_estimates?.revenue_chf_m ?? 10583)}m</td>
                <td className="py-2 px-2 text-right num text-muted">~flat</td>
                <td className="py-2 px-2 text-right num text-olive">~38%</td>
                <td className="py-2 px-2 text-xs text-muted">Private · Morgan Stanley estimate · 32% market share</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Swiss exports & price segments */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartCard
          title="Swiss watch exports · top destinations YoY"
          subtitle="Source: Fédération de l'Horlogerie 2024 Annual Statistics"
          className="lg:col-span-2"
          footer="Two-track market: traditional luxury hubs in Asia (China/HK/Singapore) collapsed; the US, Japan, India and Korea grew double-digits. Total exports −2.8% on −9.4% units (i.e. price/mix held)."
        >
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={destData} layout="vertical" margin={{ top: 10, right: 30, left: 130, bottom: 0 }}>
                <CartesianGrid stroke={PALETTE.border} horizontal={false} />
                <XAxis type="number" stroke={PALETTE.muted} fontSize={11} tickFormatter={(v) => `${v}%`} />
                <YAxis type="category" dataKey="market" stroke={PALETTE.muted} fontSize={11} width={130} />
                <Tooltip
                  contentStyle={{ background: PALETTE.ivory, border: `1px solid ${PALETTE.border}`, borderRadius: 8 }}
                  formatter={(v: any) => `${v.toFixed(1)}%`}
                />
                <Bar dataKey="change" radius={[0, 4, 4, 0]}>
                  {destData.map((d: any, i: number) => (
                    <Cell key={i} fill={d.change < 0 ? PALETTE.rust : PALETTE.olive} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <div className="card">
          <h3 className="font-serif text-lg text-slate mb-3">Price-segment bifurcation</h3>
          <div className="space-y-3">
            {priceSeg.map((s, i) => (
              <div key={i} className="border-l-4 border-border pl-3" style={{ borderLeftColor: s.change < 0 ? PALETTE.rust : PALETTE.olive }}>
                <div className="text-sm text-slate font-medium">{s.name}</div>
                <div className={`font-serif text-3xl num ${s.change < 0 ? 'text-rust' : 'text-olive'}`}>
                  {s.change >= 0 ? '+' : ''}{s.change.toFixed(1)}%
                </div>
                <div className="text-xs text-muted">{s.note}</div>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted mt-4 leading-relaxed">
            The Swiss watch market bifurcated. Below CHF 3,000 fell sharply (Swatch's weighting);
            above CHF 3,000 rose (Big Four territory).
          </p>
        </div>
      </div>

      {/* Market share movement */}
      <div className="card">
        <h3 className="font-serif text-lg text-slate mb-3">Swiss watch industry · group market share movement</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-muted border-b border-border">
                <th className="text-left py-2 px-2 font-medium">Group</th>
                <th className="text-right py-2 px-2 font-medium">2024 share</th>
                <th className="text-right py-2 px-2 font-medium">YoY change (bps)</th>
              </tr>
            </thead>
            <tbody>
              {grp.map((g: any, i: number) => (
                <tr key={i} className="border-b border-border/40">
                  <td className="py-1.5 px-2 text-slate">{g.group}</td>
                  <td className="py-1.5 px-2 text-right num font-semibold">{g.share.toFixed(1)}%</td>
                  <td className={`py-1.5 px-2 text-right num ${g.change === null ? 'text-muted' : g.change > 0 ? 'text-olive' : 'text-rust'}`}>
                    {g.change === null ? '—' : (g.change > 0 ? '+' : '') + g.change + ' bps'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Structural verdict */}
      <Callout variant="clay" title="Structural vs cyclical · 60/40 diagnosis">
        Roughly 60% of the FY2024 deterioration is cyclical (China demand will recover as
        property destruction stabilises and consumer confidence returns; FX should normalise;
        Olympic spend reverses in the IOC cycle). The remaining ~40% is structural: mid-market
        watches face secular pressure from a growing pre-owned market, Apple/Huawei smartwatch
        competition at entry level, generational shifts away from status objects, and Big Four
        share consolidation at the ultra-luxury end. A full revenue recovery to the 2023 CHF
        7,888M is not guaranteed even on a strong China cycle.
      </Callout>
    </div>
  );
}

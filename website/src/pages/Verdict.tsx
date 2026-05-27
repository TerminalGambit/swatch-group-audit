import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Callout from '../components/Callout';
import SourceBadge from '../components/SourceBadge';

type Bullet = { text: ReactNode };

const cyclicalSignals: Bullet[] = [
  { text: <>China luxury: any sequential improvement in CN Q1/Q2 2025 prints<SourceBadge label="Bain · FH exports" tone="olive" title="Bain Luxury Study + FH monthly Swiss watch exports" /></> },
  { text: <>Inventory burn: <span className="num font-semibold">CHF 7.6B</span> becomes a competitive advantage if revenue recovers</> },
  { text: <>Electronic Systems order book <span className="num font-semibold">+25%</span> — leading indicator already turning<SourceBadge label="Note 6" tone="clay" /></> },
  { text: <>USA / Japan / India growth markets continue at record run-rates</> },
  { text: <>SNB rate cuts weakening CHF → FX tailwind reverses the 2024 headwind</> },
];

const structuralRisks: Bullet[] = [
  { text: <>Big Four gained <span className="num font-semibold">+300 bps</span> share; mid-market faces structural pressure<SourceBadge label="MS / LuxeConsult" tone="clay" /></> },
  { text: <>Pre-owned watch market <span className="num font-semibold">+10%</span> YoY — projected to equal primary in 10 years</> },
  { text: <>Omega–IOC partnership commitment to <span className="num font-semibold">2032</span> locks in sustained cost burden</> },
  { text: <>Hayek family <span className="num font-semibold">44.1%</span> voting control may delay capital-allocation reform</> },
  { text: <>China secular shift away from ostentatious luxury (common prosperity narrative)</> },
];

const watchItems: Bullet[] = [
  { text: <>Greater China Q1 + Q2 2025 sales (group disclosure)</> },
  { text: <>DIO trend — does inventory stop growing?</> },
  { text: <>FY2025 dividend — does the <span className="num font-semibold">120%</span> payout get sustained or cut?</> },
  { text: <>Activist board challenge outcome at the 2025 AGM</> },
  { text: <>Operating margin Q3 + Q4 — recovery to <span className="num">&ge;7%</span> or stuck at <span className="num">&le;5%</span>?</> },
];

const bearCase: Bullet[] = [
  { text: <>China demand stays soft through 2027 — CHF 200–500m inventory impairment crystallises</> },
  { text: <>ETR persists above <span className="num font-semibold">35%</span> as subsidiary loss carryforwards expand</> },
  { text: <>Stock re-rates toward distressed luxury peers (EV/EBITDA 7–9×) → bearer CHF 100–130</> },
];

const bullCase: Bullet[] = [
  { text: <>China recovers H2 2025 — operating leverage works in reverse, profits inflect 100%+</> },
  { text: <>Below-book entry (<span className="num font-semibold">0.95×</span> P/B) protects downside; tangible Swiss assets back the equity</> },
  { text: <>Buybacks + family purchases provide technical floor; bearer target CHF 200–250 over 2025–2026</> },
];

interface VerdictCardProps {
  eyebrow: string;
  title: string;
  bullets: Bullet[];
  tone: 'olive' | 'rust' | 'clay';
}

const toneStyles: Record<VerdictCardProps['tone'], { border: string; header: string; bullet: string; eyebrow: string }> = {
  olive: {
    border: 'border-olive/50',
    header: 'bg-olive/10 text-olive border-b border-olive/30',
    bullet: 'before:bg-olive',
    eyebrow: 'text-olive',
  },
  rust: {
    border: 'border-rust/50',
    header: 'bg-rust/10 text-rust border-b border-rust/30',
    bullet: 'before:bg-rust',
    eyebrow: 'text-rust',
  },
  clay: {
    border: 'border-clay/50',
    header: 'bg-clay/10 text-clay border-b border-clay/30',
    bullet: 'before:bg-clay',
    eyebrow: 'text-clay',
  },
};

function VerdictCard({ eyebrow, title, bullets, tone }: VerdictCardProps) {
  const s = toneStyles[tone];
  return (
    <div className={`rounded-lg border-2 ${s.border} bg-ivory overflow-hidden flex flex-col`}>
      <div className={`px-5 py-3 ${s.header}`}>
        <div className={`text-[10px] uppercase tracking-[0.2em] font-semibold ${s.eyebrow}`}>{eyebrow}</div>
        <div className="font-serif text-lg text-slate mt-0.5">{title}</div>
      </div>
      <ul className="px-5 py-4 space-y-2.5 text-sm text-slate/85 leading-relaxed flex-1">
        {bullets.map((b, i) => (
          <li
            key={i}
            className={`relative pl-4 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full ${s.bullet}`}
          >
            {b.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

interface CaseCardProps {
  label: string;
  title: string;
  probability: string;
  bullets: Bullet[];
  tone: 'rust' | 'olive';
}

function CaseCard({ label, title, probability, bullets, tone }: CaseCardProps) {
  const isBear = tone === 'rust';
  return (
    <div className={`card relative overflow-hidden ${isBear ? 'border-rust/40' : 'border-olive/40'}`}>
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${isBear ? 'bg-rust' : 'bg-olive'}`} />
      <div className="pl-3">
        <div className="flex items-baseline justify-between gap-2">
          <div>
            <div className={`text-[10px] uppercase tracking-[0.2em] font-semibold ${isBear ? 'text-rust' : 'text-olive'}`}>
              {label}
            </div>
            <div className="font-serif text-lg text-slate mt-0.5">{title}</div>
          </div>
          <div className="num text-sm text-slate/60">{probability}</div>
        </div>
        <ul className="mt-3 space-y-2 text-sm text-slate/85 leading-relaxed">
          {bullets.map((b, i) => (
            <li
              key={i}
              className={`relative pl-4 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:rounded-full ${isBear ? 'before:bg-rust' : 'before:bg-olive'}`}
            >
              {b.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Verdict() {
  return (
    <div className="space-y-12">
      <PageHeader
        eyebrow="The Audit's Investment Signal"
        title="Bearish near-term. Hold long-term. Below book."
        description="The earnings collapse is real, the operating leverage is structural, and the stock now trades below book for the first cycle in a decade. The audit's view: a defensible long-term entry, but only for investors who can price cyclicality, not safety."
      />

      {/* SECTION 1 — The 5.1× anchor */}
      <section className="card bg-gradient-to-br from-rust/8 to-clay/8 border-rust/30 relative overflow-hidden">
        <div className="text-xs uppercase tracking-wider text-rust font-semibold mb-2">
          What we found · Operating Leverage
          <SourceBadge label="Ratios derivation" tone="clay" title="See /ratios for the full DuPont + fixed-cost breakdown" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[auto,1fr] gap-8 items-center">
          <div className="text-center lg:text-left">
            <div className="font-serif text-slate text-xl sm:text-2xl leading-tight">Every 1% of revenue lost became</div>
            <div className="font-serif text-[6rem] sm:text-[8rem] leading-none text-rust mt-2 mb-1 num tracking-tight">5.1×</div>
            <div className="font-serif text-slate text-xl sm:text-2xl leading-tight">of operating profit lost</div>
          </div>
          <div className="text-sm sm:text-base text-slate/85 leading-relaxed border-l-0 lg:border-l border-rust/20 lg:pl-8">
            <div className="font-semibold text-slate mb-2">This is the engineered conclusion of the audit.</div>
            A <span className="num font-semibold">14.6%</span> revenue decline became a <span className="num font-semibold">74.5%</span> operating-profit collapse because
            {' '}<span className="num font-semibold">CHF 3,945M</span><SourceBadge label="Note 11 + 8" tone="clay" title="Personnel + D&A from notes" />
            {' '}of fixed costs (<span className="num font-semibold">58.6%</span> of sales<SourceBadge label="Audit calc" tone="muted" />) do not flex with volume.
            <div className="mt-3">
              The same lever works in reverse. A <span className="num font-semibold">15–20%</span> revenue recovery would translate into a <span className="num font-semibold">100–150%</span> operating-profit recovery — which is why below-book entry is interesting at all.
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — Traffic-light verdict grid */}
      <section>
        <div className="mb-5">
          <div className="text-xs uppercase tracking-[0.18em] text-clay font-semibold">The Verdict Grid</div>
          <h2 className="font-serif text-2xl sm:text-3xl text-slate mt-1">Three columns. One investment thesis.</h2>
          <p className="text-sm text-slate/70 mt-2 max-w-3xl">
            What could go right, what could go wrong, and what to monitor every quarter through FY2025.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <VerdictCard
            eyebrow="Cyclical · Green"
            title="What could go right"
            bullets={cyclicalSignals}
            tone="olive"
          />
          <VerdictCard
            eyebrow="Structural · Red"
            title="What could go wrong"
            bullets={structuralRisks}
            tone="rust"
          />
          <VerdictCard
            eyebrow="FY2025 · Amber"
            title="What to watch"
            bullets={watchItems}
            tone="clay"
          />
        </div>
      </section>

      {/* SECTION 3 — Investment signal block */}
      <section>
        <div className="rounded-lg border-2 border-slate/15 bg-ivory overflow-hidden shadow-sm">
          <div className="px-6 py-3 bg-slate text-ivory">
            <div className="text-[10px] uppercase tracking-[0.25em] font-semibold opacity-80">Audit Output</div>
            <div className="font-serif text-xl mt-0.5">Investment Signal</div>
          </div>
          <dl className="divide-y divide-border">
            <SignalRow
              label="Signal"
              value={
                <span className="font-mono text-sm">
                  <span className="text-rust font-semibold">BEARISH</span>
                  <span className="text-slate/50"> near-term</span>
                  <span className="text-slate/40"> · </span>
                  <span className="text-olive font-semibold">HOLD</span>
                  <span className="text-slate/50"> long-term</span>
                </span>
              }
            />
            <SignalRow
              label="Confidence"
              value={<span className="font-mono text-sm text-clay font-semibold">MEDIUM</span>}
            />
            <SignalRow
              label="Horizon"
              value={
                <span className="font-mono text-sm text-slate/85">
                  SHORT-TERM friction · LONG-TERM attractive entry below book
                </span>
              }
            />
            <SignalRow
              label="Score"
              value={
                <span className="font-mono text-sm text-slate">
                  <span className="num font-semibold">3.8 / 10</span>{' '}
                  <span className="text-slate/55">(near-term)</span>
                </span>
              }
            />
            <SignalRow
              label="Audit quality"
              value={
                <span className="font-mono text-sm text-slate">
                  <span className="num font-semibold">16 / 21</span>{' '}
                  <span className="text-slate/55">— Average</span>
                </span>
              }
            />
            <SignalRow
              label="Valuation"
              value={
                <span className="font-mono text-sm text-slate">
                  P/B <span className="num font-semibold">0.95×</span>
                  <span className="text-slate/55"> · below book </span>
                  <span className="text-slate/40">|</span>
                  <span className="text-slate/55"> consensus </span>
                  <span className="num font-semibold">CHF 163</span>
                </span>
              }
            />
          </dl>
        </div>
      </section>

      {/* SECTION 4 — Bear vs Bull */}
      <section>
        <div className="mb-5">
          <div className="text-xs uppercase tracking-[0.18em] text-clay font-semibold">Scenario Framing</div>
          <h2 className="font-serif text-2xl sm:text-3xl text-slate mt-1">The two paths from here</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <CaseCard
            label="Bear case"
            title="Value trap"
            probability="P ≈ 35%"
            bullets={bearCase}
            tone="rust"
          />
          <CaseCard
            label="Bull case"
            title="Cyclical recovery"
            probability="P ≈ 65%"
            bullets={bullCase}
            tone="olive"
          />
        </div>
        <div className="mt-5">
          <Callout variant="oat" title="The audit's position">
            The cyclical case (<span className="num font-semibold">65%</span>) is more probable than the structural-decline case (<span className="num font-semibold">35%</span>).
            China luxury contractions of this magnitude have historically recovered within 2–4 years; the Hayek family's willingness to absorb short-term pain has historically been vindicated.
            Below-book entry with a <span className="num font-semibold">2.1%</span> yield and optionality on China is a defensible long-term thesis — provided one monitors the inventory, the ETR, and market share every quarter.
            <SourceBadge label="Report §09" tone="olive" title="report/09-red-flags-valuation.md" />
          </Callout>
        </div>
      </section>

      {/* SECTION 5 — Bottom CTAs */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          to="/"
          className="card hover:border-clay/60 hover:shadow-md transition-all group"
        >
          <div className="text-xs uppercase tracking-wider text-muted font-medium">Start again</div>
          <div className="font-serif text-lg text-slate group-hover:text-clay mt-1">
            ← Re-read the dashboard
          </div>
          <div className="text-xs text-muted mt-1">
            Return to the FY2024 overture — operating-leverage crisis, six red flags, segment & geographic split.
          </div>
        </Link>
        <Link
          to="/report"
          className="card hover:border-clay/60 hover:shadow-md transition-all group"
        >
          <div className="text-xs uppercase tracking-wider text-muted font-medium">Go deeper</div>
          <div className="font-serif text-lg text-slate group-hover:text-clay mt-1">
            Read the full 9-section audit →
          </div>
          <div className="text-xs text-muted mt-1">
            Executive summary through red flags & valuation — every derivation, every source, every footnote.
          </div>
        </Link>
      </section>
    </div>
  );
}

function SignalRow({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="grid grid-cols-[120px,1fr] sm:grid-cols-[160px,1fr] items-center px-6 py-3">
      <dt className="text-[11px] uppercase tracking-[0.15em] text-slate/60 font-semibold">{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}

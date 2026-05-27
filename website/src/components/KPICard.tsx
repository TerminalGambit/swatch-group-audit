import { deltaClass } from '../lib/format';

interface KPICardProps {
  label: string;
  value: string;
  delta?: string;
  deltaNum?: number;
  sub?: string;
  accent?: 'clay' | 'olive' | 'rust' | 'oat';
}

const accentBar = {
  clay: 'bg-clay',
  olive: 'bg-olive',
  rust: 'bg-rust',
  oat: 'bg-oat',
};

export default function KPICard({ label, value, delta, deltaNum, sub, accent = 'clay' }: KPICardProps) {
  return (
    <div className="card relative overflow-hidden">
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${accentBar[accent]}`} />
      <div className="pl-2">
        <div className="text-xs uppercase tracking-wider text-muted font-medium">{label}</div>
        <div className="mt-2 text-3xl font-serif text-slate num">{value}</div>
        {delta && (
          <div className={`mt-1 text-sm num ${deltaClass(deltaNum ?? 0)}`}>{delta}</div>
        )}
        {sub && <div className="mt-1 text-xs text-muted">{sub}</div>}
      </div>
    </div>
  );
}

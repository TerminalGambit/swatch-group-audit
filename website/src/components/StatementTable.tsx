import { deltaClass, fmtNum, yoy } from '../lib/format';

export interface Row {
  label: string;
  v2024: number | null;
  v2023: number | null;
  bold?: boolean;
  indent?: number;
  noYoY?: boolean;
  note?: string;
}

interface Props {
  rows: Row[];
  unitLabel?: string;
}

export default function StatementTable({ rows, unitLabel = 'CHF million' }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-xs uppercase tracking-wider text-muted border-b border-border">
            <th className="text-left py-2 px-2 font-medium">Line item</th>
            <th className="text-right py-2 px-2 font-medium">2024</th>
            <th className="text-right py-2 px-2 font-medium">2023</th>
            <th className="text-right py-2 px-2 font-medium">YoY %</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => {
            const yp = r.v2024 !== null && r.v2023 !== null && !r.noYoY ? yoy(r.v2024, r.v2023) : null;
            return (
              <tr key={i} className={`border-b border-border/50 ${r.bold ? 'bg-oat/30 font-semibold' : ''}`}>
                <td
                  className="py-1.5 px-2 text-slate"
                  style={{ paddingLeft: `${0.5 + (r.indent ?? 0) * 1.25}rem` }}
                >
                  {r.label}
                  {r.note && (
                    <span className="ml-2 text-xs text-clay">• {r.note}</span>
                  )}
                </td>
                <td className="py-1.5 px-2 text-right num">{fmtNum(r.v2024 ?? undefined)}</td>
                <td className="py-1.5 px-2 text-right num text-slate/60">{fmtNum(r.v2023 ?? undefined)}</td>
                <td className={`py-1.5 px-2 text-right num text-xs ${deltaClass(yp)}`}>
                  {yp === null ? '—' : (yp > 0 ? '+' : '') + yp.toFixed(1) + '%'}
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4} className="pt-2 text-xs text-muted text-right">All figures in {unitLabel}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

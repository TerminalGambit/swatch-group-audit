import { ReactNode } from 'react';

export type ColumnAlign = 'left' | 'right' | 'center';

export interface DataColumn<T> {
  header: ReactNode;
  /** Accessor or render function */
  cell: (row: T) => ReactNode;
  align?: ColumnAlign;
  /** Apply `.num` (mono + tabular nums) — defaults true when align='right' */
  numeric?: boolean;
  width?: string;
}

export interface DataTableProps<T> {
  rows: T[];
  columns: DataColumn<T>[];
  /** Indices (in rows[]) to visually emphasize (subtle background) */
  highlightRowIndices?: number[];
  /** Indices to mark as totals (heavier weight, top border) */
  totalRowIndices?: number[];
  /** Optional caption footer note */
  caption?: ReactNode;
  /** Compact density (smaller padding) — default false */
  compact?: boolean;
  /** Wrap in .table-scroll for narrow-viewport scroll affordance — default true */
  scrollable?: boolean;
}

const alignClass = (a: ColumnAlign) =>
  a === 'right' ? 'text-right' : a === 'center' ? 'text-center' : 'text-left';

export default function DataTable<T>({
  rows,
  columns,
  highlightRowIndices = [],
  totalRowIndices = [],
  caption,
  compact = false,
  scrollable = true,
}: DataTableProps<T>) {
  const padY = compact ? 'py-1' : 'py-1.5';
  const wrapClass = scrollable ? 'table-scroll' : 'overflow-x-auto';

  return (
    <div className={wrapClass}>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-xs uppercase tracking-wider text-muted border-b border-border">
            {columns.map((c, i) => {
              const a = c.align ?? 'left';
              return (
                <th
                  key={i}
                  className={`${padY} px-2 font-medium ${alignClass(a)}`}
                  style={c.width ? { width: c.width } : undefined}
                >
                  {c.header}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => {
            const isTotal = totalRowIndices.includes(ri);
            const isHighlight = highlightRowIndices.includes(ri);
            const trClass = [
              'border-b border-border/40 hover:bg-oat/30',
              isTotal ? 'bg-oat/60 font-semibold border-t border-border' : '',
              isHighlight && !isTotal ? 'bg-clay/8' : '',
            ].filter(Boolean).join(' ');
            return (
              <tr key={ri} className={trClass}>
                {columns.map((c, ci) => {
                  const a = c.align ?? 'left';
                  const numeric = c.numeric ?? a === 'right';
                  return (
                    <td key={ci} className={`${padY} px-2 ${alignClass(a)} ${numeric ? 'num' : ''}`.trim()}>
                      {c.cell(row)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        {caption && (
          <tfoot>
            <tr>
              <td colSpan={columns.length} className="pt-2 text-xs text-muted text-right">
                {caption}
              </td>
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}

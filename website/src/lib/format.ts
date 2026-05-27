// Number formatting helpers — Swiss/European-style separators, CHF context

export const fmtNum = (n: number | null | undefined, digits = 0): string => {
  if (n === null || n === undefined || Number.isNaN(n)) return '—';
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(n);
};

export const fmtCHF = (n: number | null | undefined, digits = 0): string => {
  if (n === null || n === undefined || Number.isNaN(n)) return '—';
  return `CHF ${fmtNum(n, digits)}m`;
};

export const fmtCHFb = (n: number | null | undefined): string => {
  if (n === null || n === undefined || Number.isNaN(n)) return '—';
  if (Math.abs(n) >= 1000) return `CHF ${(n / 1000).toFixed(2)}B`;
  return `CHF ${fmtNum(n)}M`;
};

export const fmtPct = (n: number | null | undefined, digits = 1): string => {
  if (n === null || n === undefined || Number.isNaN(n)) return '—';
  return `${n.toFixed(digits)}%`;
};

export const fmtDelta = (n: number | null | undefined, digits = 1): string => {
  if (n === null || n === undefined || Number.isNaN(n)) return '—';
  const sign = n > 0 ? '+' : '';
  return `${sign}${n.toFixed(digits)}%`;
};

export const fmtBps = (pp: number): string => {
  const sign = pp > 0 ? '+' : '';
  return `${sign}${(pp * 100).toFixed(0)} bps`;
};

export const deltaClass = (n: number | null | undefined): string => {
  if (n === null || n === undefined || Number.isNaN(n)) return 'text-muted';
  if (n > 0) return 'text-olive';
  if (n < 0) return 'text-rust';
  return 'text-muted';
};

export const yoy = (curr: number, prev: number): number => {
  if (!prev) return 0;
  return ((curr - prev) / Math.abs(prev)) * 100;
};

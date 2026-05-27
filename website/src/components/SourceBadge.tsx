interface SourceBadgeProps {
  /** Short citation label (e.g., "Note 27", "FH 2024", "MS / LuxeConsult"). */
  label: string;
  /** Optional full source description shown on hover. */
  title?: string;
  /** Tone — clay = citation, olive = verified-from-filings, muted = estimate. */
  tone?: 'clay' | 'olive' | 'muted';
}

const toneClass = {
  clay: 'border-clay/40 text-clay bg-clay/8',
  olive: 'border-olive/40 text-olive bg-olive/8',
  muted: 'border-border text-muted bg-oat/40',
};

/**
 * Inline citation pill. Use immediately after a load-bearing number so a reader
 * can trace it without leaving the dashboard.
 */
export default function SourceBadge({ label, title, tone = 'clay' }: SourceBadgeProps) {
  return (
    <span
      title={title ?? label}
      className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded border text-[10px] font-mono font-medium leading-none whitespace-nowrap align-middle ml-1 ${toneClass[tone]}`}
    >
      <span className="opacity-60">§</span>
      {label}
    </span>
  );
}

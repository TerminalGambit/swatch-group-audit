import { ReactNode } from 'react';

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export default function ChartCard({ title, subtitle, children, footer, className = '' }: ChartCardProps) {
  return (
    <div className={`card ${className}`}>
      <div className="mb-3">
        <h3 className="font-serif text-lg text-slate">{title}</h3>
        {subtitle && <div className="text-xs text-muted mt-0.5">{subtitle}</div>}
      </div>
      <div>{children}</div>
      {footer && <div className="mt-3 pt-3 border-t border-border text-xs text-muted">{footer}</div>}
    </div>
  );
}

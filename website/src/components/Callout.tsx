import { ReactNode } from 'react';

interface CalloutProps {
  variant?: 'rust' | 'olive' | 'clay' | 'oat';
  title?: string;
  children: ReactNode;
}

const variants = {
  rust: 'bg-rust/8 border-rust/40 text-slate',
  olive: 'bg-olive/10 border-olive/40 text-slate',
  clay: 'bg-clay/10 border-clay/40 text-slate',
  oat: 'bg-oat/60 border-border text-slate',
};

export default function Callout({ variant = 'oat', title, children }: CalloutProps) {
  return (
    <div className={`border-l-4 rounded-r-md px-4 py-3 ${variants[variant]}`}>
      {title && <div className="font-semibold mb-1">{title}</div>}
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}

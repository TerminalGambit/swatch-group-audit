interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
}

export default function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <div className="mb-8">
      {eyebrow && (
        <div className="text-xs uppercase tracking-[0.18em] text-clay font-semibold mb-2">{eyebrow}</div>
      )}
      <h1 className="font-serif text-4xl sm:text-5xl text-slate leading-tight">{title}</h1>
      {description && (
        <p className="mt-3 text-base text-slate/70 max-w-3xl leading-relaxed">{description}</p>
      )}
    </div>
  );
}

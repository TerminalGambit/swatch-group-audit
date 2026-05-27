import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import PageHeader from '../components/PageHeader';

interface Section {
  slug: string;
  num: string;
  title: string;
  file: string;
}

const SECTIONS: Section[] = [
  { slug: 'exec', num: '01', title: 'Executive Summary', file: '01-executive-summary.md' },
  { slug: 'overview', num: '02', title: 'Company Overview', file: '02-company-overview.md' },
  { slug: 'income', num: '03', title: 'Income Statement', file: '03-income-statement.md' },
  { slug: 'balance', num: '04', title: 'Balance Sheet', file: '04-balance-sheet.md' },
  { slug: 'cash', num: '05', title: 'Cash Flows', file: '05-cash-flows.md' },
  { slug: 'segments', num: '06', title: 'Segments', file: '06-segments.md' },
  { slug: 'ratios', num: '07', title: 'Ratios', file: '07-ratios.md' },
  { slug: 'benchmarking', num: '08', title: 'Benchmarking', file: '08-benchmarking.md' },
  { slug: 'redflags', num: '09', title: 'Red Flags & Valuation', file: '09-red-flags-valuation.md' },
];

export default function Report() {
  const [active, setActive] = useState<Section>(SECTIONS[0]);
  const [content, setContent] = useState<string>('Loading…');

  useEffect(() => {
    setContent('Loading…');
    fetch(`${import.meta.env.BASE_URL}report/${active.file}`)
      .then((r) => (r.ok ? r.text() : Promise.reject(`HTTP ${r.status}`)))
      .then(setContent)
      .catch((e) => setContent(`Error loading section: ${String(e)}`));
    // Scroll top of main area for new section
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [active]);

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Full Audit Report · 9 Sections"
        title="Read the audit"
        description="The narrative version of every finding the dashboard summarises. Use the sidebar to navigate. Each section is self-contained and was written from the same data the charts use."
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <aside className="lg:col-span-1">
          <div className="card sticky top-4">
            <div className="text-xs uppercase tracking-wider text-muted font-medium mb-3">Sections</div>
            <nav className="space-y-1">
              {SECTIONS.map((s) => (
                <button
                  key={s.slug}
                  onClick={() => setActive(s)}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-baseline gap-2 ${
                    active.slug === s.slug
                      ? 'bg-clay/12 text-clay font-semibold'
                      : 'text-slate/80 hover:bg-oat/50'
                  }`}
                >
                  <span className="text-xs num text-muted">{s.num}</span>
                  <span>{s.title}</span>
                </button>
              ))}
            </nav>
            <div className="mt-4 pt-3 border-t border-border text-xs text-muted">
              Approved by Board · 5 March 2025 · PwC unqualified opinion
            </div>
          </div>
        </aside>

        {/* Main reader */}
        <article className="lg:col-span-3 card prose-report">
          <ReactMarkdown>{content}</ReactMarkdown>
        </article>
      </div>
    </div>
  );
}

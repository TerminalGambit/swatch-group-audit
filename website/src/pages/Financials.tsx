import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import StatementTable, { Row } from '../components/StatementTable';
import Callout from '../components/Callout';
import SourceBadge from '../components/SourceBadge';
import { financials } from '../data';

type Tab = 'is' | 'bs' | 'cf';

const TABS: { key: Tab; label: string; sub: string }[] = [
  { key: 'is', label: 'Income Statement', sub: 'P&L · operating leverage' },
  { key: 'bs', label: 'Balance Sheet', sub: 'Fortress · inventory build' },
  { key: 'cf', label: 'Cash Flow Statement', sub: 'Negative FCF · payout > OCF' },
];

function buildISRows(): Row[] {
  const i24 = financials.income_statement['2024'];
  const i23 = financials.income_statement['2023'];
  const pick = (k: string): [number | null, number | null] => [
    (i24[k] ?? null) as number | null,
    (i23[k] ?? null) as number | null,
  ];
  const r = (label: string, k: string, opts: Partial<Row> = {}): Row => {
    const [a, b] = pick(k);
    return { label, v2024: a, v2023: b, ...opts };
  };
  return [
    r('Net sales', 'net_sales', { bold: true }),
    r('— Sale of goods', 'sale_of_goods', { indent: 1 }),
    r('— Rendering of services', 'rendering_of_services', { indent: 1 }),
    r('Other operating income', 'other_operating_income'),
    r('Changes in inventories', 'changes_in_inventories'),
    r('Material purchases', 'material_purchases'),
    r('Personnel expense', 'personnel_expense'),
    r('Depreciation (PPE)', 'depreciation_ppe'),
    r('Amortization (intangibles)', 'amortization_intangibles'),
    r('Other operating expenses', 'other_operating_expenses'),
    r('Operating result', 'operating_result', { bold: true, note: '4.5% margin (vs 15.1%)' }),
    r('Net financial result', 'net_financial_result'),
    r('Share of result of associates/JV', 'share_of_result_associates_jv'),
    r('Ordinary result', 'ordinary_result'),
    r('Non-operating result', 'non_operating_result'),
    r('Result before income taxes', 'result_before_income_taxes', { bold: true }),
    r('Income taxes', 'income_taxes', { note: 'ETR 36.5% vs 22.7% — Note 27' }),
    r('Net result', 'net_result', { bold: true, note: '3.3% margin' }),
    r('— Attributable to shareholders', 'attributable_to_shareholders', { indent: 1 }),
    r('— Attributable to minority interests', 'attributable_to_minority_interests', { indent: 1 }),
  ];
}

function buildBSRows(): Row[] {
  const a24 = financials.balance_sheet['2024'];
  const a23 = financials.balance_sheet['2023'];
  const cell = (path: string[]): [number | null, number | null] => {
    const get = (root: any) => path.reduce((acc, k) => (acc ? acc[k] : null), root);
    return [get(a24) as number | null, get(a23) as number | null];
  };
  const make = (label: string, path: string[], opts: Partial<Row> = {}): Row => {
    const [v24, v23] = cell(path);
    return { label, v2024: v24, v2023: v23, ...opts };
  };
  return [
    // Assets
    { label: 'CURRENT ASSETS', v2024: null, v2023: null, noYoY: true, bold: true },
    make('Cash and equivalents', ['assets', 'current', 'cash_and_equivalents'], { indent: 1 }),
    make('Financial assets / securities / derivatives', ['assets', 'current', 'financial_assets_securities_derivatives'], { indent: 1 }),
    make('Trade receivables (net)', ['assets', 'current', 'trade_receivables_net'], { indent: 1 }),
    make('Inventories', ['assets', 'current', 'inventories'], { indent: 1, note: '54.6% of total assets · Key Audit Matter' }),
    make('Other current assets', ['assets', 'current', 'other_current_assets'], { indent: 1 }),
    make('Prepayments & accrued income', ['assets', 'current', 'prepayments_accrued_income'], { indent: 1 }),
    make('Total current assets', ['assets', 'current', 'total_current'], { bold: true }),
    { label: 'NON-CURRENT ASSETS', v2024: null, v2023: null, noYoY: true, bold: true },
    make('Property, plant & equipment (net)', ['assets', 'non_current', 'property_plant_equipment_net'], { indent: 1 }),
    make('Intangible assets (net)', ['assets', 'non_current', 'intangible_assets_net'], { indent: 1, note: 'Goodwill charged direct to equity under Swiss GAAP FER' }),
    make('Investments in associates/JV', ['assets', 'non_current', 'investments_associates_jv'], { indent: 1 }),
    make('Deferred tax assets', ['assets', 'non_current', 'deferred_tax_assets'], { indent: 1 }),
    make('Other non-current assets', ['assets', 'non_current', 'other_non_current_assets'], { indent: 1 }),
    make('Total non-current assets', ['assets', 'non_current', 'total_non_current'], { bold: true }),
    make('TOTAL ASSETS', ['assets', 'total_assets'], { bold: true }),
    // Liab + Equity
    { label: 'CURRENT LIABILITIES', v2024: null, v2023: null, noYoY: true, bold: true },
    make('Financial debts & derivatives', ['liabilities_and_equity', 'current_liabilities', 'financial_debts_derivatives'], { indent: 1 }),
    make('Trade payables', ['liabilities_and_equity', 'current_liabilities', 'trade_payables'], { indent: 1 }),
    make('Other liabilities', ['liabilities_and_equity', 'current_liabilities', 'other_liabilities'], { indent: 1 }),
    make('Provisions', ['liabilities_and_equity', 'current_liabilities', 'provisions'], { indent: 1 }),
    make('Accrued expenses', ['liabilities_and_equity', 'current_liabilities', 'accrued_expenses'], { indent: 1 }),
    make('Total current liabilities', ['liabilities_and_equity', 'current_liabilities', 'total_current'], { bold: true }),
    { label: 'NON-CURRENT LIABILITIES', v2024: null, v2023: null, noYoY: true, bold: true },
    make('Financial debts', ['liabilities_and_equity', 'non_current_liabilities', 'financial_debts'], { indent: 1 }),
    make('Deferred tax liabilities', ['liabilities_and_equity', 'non_current_liabilities', 'deferred_tax_liabilities'], { indent: 1 }),
    make('Retirement benefit obligations', ['liabilities_and_equity', 'non_current_liabilities', 'retirement_benefit_obligations'], { indent: 1 }),
    make('Provisions', ['liabilities_and_equity', 'non_current_liabilities', 'provisions'], { indent: 1 }),
    make('Accrued expenses', ['liabilities_and_equity', 'non_current_liabilities', 'accrued_expenses'], { indent: 1 }),
    make('Total non-current liabilities', ['liabilities_and_equity', 'non_current_liabilities', 'total_non_current'], { bold: true }),
    make('TOTAL LIABILITIES', ['liabilities_and_equity', 'total_liabilities'], { bold: true }),
    { label: 'EQUITY', v2024: null, v2023: null, noYoY: true, bold: true },
    make('Share capital', ['liabilities_and_equity', 'equity', 'share_capital'], { indent: 1 }),
    make('Capital reserves', ['liabilities_and_equity', 'equity', 'capital_reserves'], { indent: 1 }),
    make('Treasury shares', ['liabilities_and_equity', 'equity', 'treasury_shares'], { indent: 1 }),
    make('Goodwill (charged to equity)', ['liabilities_and_equity', 'equity', 'goodwill_recognized'], { indent: 1, note: 'Swiss GAAP FER' }),
    make('Translation differences', ['liabilities_and_equity', 'equity', 'translation_differences'], { indent: 1 }),
    make('Retained earnings', ['liabilities_and_equity', 'equity', 'retained_earnings'], { indent: 1 }),
    make('Equity attributable to Swatch shareholders', ['liabilities_and_equity', 'equity', 'equity_of_swatch_group_ltd_shareholders'], { bold: true }),
    make('Non-controlling interests', ['liabilities_and_equity', 'equity', 'non_controlling_interests'], { indent: 1 }),
    make('TOTAL EQUITY', ['liabilities_and_equity', 'equity', 'total_equity'], { bold: true, note: 'Equity ratio 87.3%' }),
  ];
}

function buildCFRows(): Row[] {
  const c24 = financials.cash_flows['2024'];
  const c23 = financials.cash_flows['2023'];
  const cell = (path: string[]): [number | null, number | null] => {
    const get = (root: any) => path.reduce((acc, k) => (acc ? acc[k] : null), root);
    return [get(c24) as number | null, get(c23) as number | null];
  };
  const m = (label: string, path: string[], opts: Partial<Row> = {}): Row => {
    const [v24, v23] = cell(path);
    return { label, v2024: v24, v2023: v23, ...opts };
  };
  return [
    { label: 'OPERATING ACTIVITIES', v2024: null, v2023: null, noYoY: true, bold: true },
    m('Net result', ['operating', 'net_result'], { indent: 1 }),
    m('Depreciation & amortization', ['operating', 'depreciation_amortization'], { indent: 1 }),
    m('Income taxes (add-back)', ['operating', 'income_taxes_addback'], { indent: 1 }),
    m('Change in inventories', ['operating', 'change_inventories'], { indent: 1, note: 'Inventory build during demand decline' }),
    m('Change in trade receivables', ['operating', 'change_trade_receivables'], { indent: 1 }),
    m('Change in trade payables', ['operating', 'change_trade_payables'], { indent: 1 }),
    m('Income tax paid', ['operating', 'income_tax_paid'], { indent: 1 }),
    m('Cash flow from operating activities', ['operating', 'total_operating'], { bold: true, note: 'OCF 333 vs returns 408 — gap of 75' }),
    { label: 'INVESTING ACTIVITIES', v2024: null, v2023: null, noYoY: true, bold: true },
    m('Total investing', ['investing', 'total_investing'], { bold: true }),
    { label: 'FINANCING ACTIVITIES', v2024: null, v2023: null, noYoY: true, bold: true },
    m('Total financing', ['financing', 'total_financing'], { bold: true }),
    m('FX impact on cash', ['fx_impact_on_cash']),
    m('Net change in cash', ['net_change_in_cash'], { bold: true }),
    m('Opening cash', ['opening_cash']),
    m('Closing cash', ['closing_cash'], { bold: true }),
  ];
}

export default function Financials() {
  const [tab, setTab] = useState<Tab>('is');
  const rows = tab === 'is' ? buildISRows() : tab === 'bs' ? buildBSRows() : buildCFRows();
  const active = TABS.find((t) => t.key === tab)!;

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Consolidated · Swiss GAAP FER · CHF million"
        title="Three Statements, One Crisis"
        description="The income statement shows the operating leverage collapse. The balance sheet shows the inventory bet. The cash flow statement shows that dividends and buybacks now exceed operating cash flow."
      />

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-border pb-3">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`tab-btn ${tab === t.key ? 'tab-btn-active' : 'tab-btn-inactive'}`}
          >
            {t.label}
            <span className="ml-2 text-xs opacity-60">· {t.sub}</span>
          </button>
        ))}
      </div>

      {/* Context callout for each tab */}
      {tab === 'is' && (
        <Callout variant="rust" title="Operating result fell 74.5% on a 14.6% revenue decline">
          The CHF 887M operating profit drop decomposes as: revenue −1,153M; material savings +519M;
          personnel savings +44M; lower D&A +76M offset by other items. Fixed costs (personnel,
          D&A, rents) of ~CHF 3,945M represent 58.6% of net sales, producing 5.1×
          <SourceBadge label="See /ratios" tone="muted" title="Full operating leverage derivation on /ratios" />
          operating leverage.
        </Callout>
      )}
      {tab === 'bs' && (
        <Callout variant="oat" title="Fortress balance sheet — but inventory is the watch-out">
          Total assets CHF 13,992M with equity ratio 87.3% (industry-leading). Inventories of
          CHF 7,641M represent 54.6% of total assets — PwC's sole Key Audit Matter
          <SourceBadge label="PwC opinion" tone="olive" title="PricewaterhouseCoopers AG, Basel — Independent Auditor's Report, 5 March 2025" />
          . Goodwill is charged directly to equity under Swiss GAAP FER (Note 33) — different from IFRS treatment.
        </Callout>
      )}
      {tab === 'cf' && (
        <Callout variant="rust" title="Negative free cash flow · capital returns exceed OCF">
          Operating cash flow of CHF 333M was insufficient to fund CHF 335M of dividends plus
          CHF 50M of buybacks
          <SourceBadge label="CF stmt" tone="clay" title="Consolidated statement of cash flows — financing activities" />
          plus capex. Net liquidity drew down from CHF 1,988M to CHF 1,376M.
          A sustained gap between distributions and OCF is unusual for a company guiding to
          recovery.
        </Callout>
      )}

      {/* Table */}
      <div className="card table-scroll">
        <div className="mb-3">
          <h3 className="font-serif text-lg text-slate">{active.label}</h3>
          <div className="text-xs text-muted mt-0.5">{active.sub}</div>
        </div>
        <StatementTable rows={rows} />
      </div>

      {/* Audit annotations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Callout variant="clay" title="Effective tax rate · 22.7% → 36.5%">
          CHF 41M extra tax driven by non-recognition of loss carryforwards. The group now holds
          CHF 863M of unrecognized tax loss carryforwards across 37 jurisdictions — a signal that
          multiple subsidiaries (likely Greater China + Europe) booked sizeable local losses.
          Potential tax benefit if utilizable: CHF 152M.
          <SourceBadge label="Note 27" tone="clay" title="Note 27 — Income taxes" />
        </Callout>
        <Callout variant="olive" title="PwC unqualified opinion">
          PricewaterhouseCoopers AG, Basel
          <SourceBadge label="Audit opinion" tone="olive" title="Independent Auditor's Report, 5 March 2025" />
          , issued an unqualified opinion on 5 March 2025.
          Sole Key Audit Matter: valuation of inventories. Audit materiality: CHF 40M consolidated,
          CHF 41M parent. No post-balance sheet events disclosed (Note 3).
        </Callout>
      </div>

      <Link to="/verdict" className="card hover:border-clay/60 hover:shadow-md transition-all block group">
        <div className="text-xs uppercase tracking-wider text-muted font-medium">Next</div>
        <div className="font-serif text-xl text-slate group-hover:text-clay mt-1">The Verdict →</div>
        <div className="text-sm text-muted mt-1">Investment signal and 2025 monitoring metrics</div>
      </Link>
    </div>
  );
}

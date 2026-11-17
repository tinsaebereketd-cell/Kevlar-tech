import { ArrowRight, Calculator } from 'lucide-react';
import { useState } from 'react';
import { useI18n } from '../i18n';
import type { ServiceCategory, TicketUrgency } from '../types';

export type EstimatorDeviceKey = 'laptop' | 'desktop' | 'software' | 'tv' | 'projector';
export type DamageSeverity = 'minor' | 'moderate' | 'severe';

interface PricingTier {
  min: number;
  max: number;
  turnaround: string;
}

interface DevicePricingConfig {
  category: ServiceCategory;
  diagnosticFee: number;
  tiers: Record<DamageSeverity, PricingTier>;
}

const PRICING_MATRIX: Record<EstimatorDeviceKey, DevicePricingConfig> = {
  laptop: {
    category: 'computer_hardware',
    diagnosticFee: 600,
    tiers: {
      minor: { min: 1500, max: 2800, turnaround: '24 hrs' },
      moderate: { min: 4200, max: 8500, turnaround: '24–48 hrs' },
      severe: { min: 7500, max: 14500, turnaround: '2–3 days' },
    },
  },
  desktop: {
    category: 'computer_hardware',
    diagnosticFee: 600,
    tiers: {
      minor: { min: 1400, max: 2500, turnaround: '24 hrs' },
      moderate: { min: 3800, max: 7800, turnaround: '24–48 hrs' },
      severe: { min: 6800, max: 13500, turnaround: '2–3 days' },
    },
  },
  software: {
    category: 'computer_software',
    diagnosticFee: 500,
    tiers: {
      minor: { min: 1200, max: 2200, turnaround: 'Same day' },
      moderate: { min: 2200, max: 4200, turnaround: 'Same day – 24 hrs' },
      severe: { min: 4000, max: 8500, turnaround: '24–48 hrs' },
    },
  },
  tv: {
    category: 'tv_maintenance',
    diagnosticFee: 800,
    tiers: {
      minor: { min: 3200, max: 5000, turnaround: '2 days' },
      moderate: { min: 5500, max: 9800, turnaround: '2–3 days' },
      severe: { min: 8500, max: 15500, turnaround: '3–4 days' },
    },
  },
  projector: {
    category: 'projector_maintenance',
    diagnosticFee: 800,
    tiers: {
      minor: { min: 2800, max: 4800, turnaround: '2 days' },
      moderate: { min: 5200, max: 9500, turnaround: '2–3 days' },
      severe: { min: 8500, max: 15000, turnaround: '3–4 days' },
    },
  },
};

const DEVICE_KEYS: EstimatorDeviceKey[] = ['laptop', 'desktop', 'software', 'tv', 'projector'];
const SEVERITY_KEYS: DamageSeverity[] = ['minor', 'moderate', 'severe'];
const PRIORITY_SURCHARGE = 1500;

interface RepairCostEstimatorProps {
  onBookEstimate: (
    category: ServiceCategory,
    initialIssue: string,
    urgency: TicketUrgency,
  ) => void;
}

export function RepairCostEstimator({ onBookEstimate }: RepairCostEstimatorProps) {
  const { t } = useI18n();
  const [device, setDevice] = useState<EstimatorDeviceKey>('laptop');
  const [severity, setSeverity] = useState<DamageSeverity>('moderate');
  const [urgency, setUrgency] = useState<TicketUrgency>('standard');

  const config = PRICING_MATRIX[device];
  const tier = config.tiers[severity];
  const surcharge = urgency === 'priority' ? PRIORITY_SURCHARGE : 0;
  const minTotal = tier.min + surcharge;
  const maxTotal = tier.max + surcharge;

  function handleBookWithEstimate() {
    const deviceLabel = t.estimator.devices[device].label;
    const severityLabel = t.estimator.severities[severity].label;
    const prefill = `${deviceLabel} — ${severityLabel} (${minTotal.toLocaleString()}–${maxTotal.toLocaleString()} ETB estimate)`;
    onBookEstimate(config.category, prefill, urgency);
  }

  return (
    <div className="mt-12 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left 7 cols: Controls */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-[#14369E] mb-1.5">
              <Calculator className="w-3.5 h-3.5" />
              <span>{t.estimator.kicker}</span>
            </div>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900">
              {t.estimator.heading}
            </h3>
            <p className="mt-1.5 text-sm text-slate-600">
              {t.estimator.subheading}
            </p>
          </div>

          {/* 1. Device Type */}
          <div>
            <div className="text-xs font-semibold text-slate-700 mb-2">
              {t.estimator.deviceTypeLabel}
            </div>
            <div
              role="radiogroup"
              aria-label={t.estimator.deviceTypeLabel}
              className="flex flex-wrap gap-2"
            >
              {DEVICE_KEYS.map((key) => {
                const active = device === key;
                return (
                  <button
                    key={key}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setDevice(key)}
                    className={`px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-[#14369E] text-white border-[#14369E]'
                        : 'bg-[#F4F7FC] text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-white'
                    }`}
                  >
                    {t.estimator.devices[key].label}
                  </button>
                );
              })}
            </div>
            <p className="mt-2 text-xs text-slate-500">
              {t.estimator.devices[device].scopeHint}
            </p>
          </div>

          {/* 2. Damage Severity */}
          <div>
            <div className="text-xs font-semibold text-slate-700 mb-2">
              {t.estimator.severityLabel}
            </div>
            <div
              role="radiogroup"
              aria-label={t.estimator.severityLabel}
              className="grid grid-cols-1 sm:grid-cols-3 gap-2.5"
            >
              {SEVERITY_KEYS.map((sev) => {
                const active = severity === sev;
                return (
                  <button
                    key={sev}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setSeverity(sev)}
                    className={`p-3.5 text-left rounded-lg border transition-colors cursor-pointer ${
                      active
                        ? 'bg-[#EEF3FC] border-[#14369E] text-slate-900'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div
                      className={`text-xs font-semibold ${
                        active ? 'text-[#14369E]' : 'text-slate-900'
                      }`}
                    >
                      {t.estimator.severities[sev].label}
                    </div>
                    <p className="mt-1 text-[11px] text-slate-600 leading-snug">
                      {t.estimator.severities[sev].summary}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Turnaround Speed */}
          <div>
            <div className="text-xs font-semibold text-slate-700 mb-2">
              {t.estimator.priorityLabel}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setUrgency('standard')}
                aria-pressed={urgency === 'standard'}
                className={`py-2.5 px-3.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                  urgency === 'standard'
                    ? 'bg-[#0B1F5B] text-white border-[#0B1F5B]'
                    : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
                }`}
              >
                {t.estimator.standardQueue}
              </button>
              <button
                type="button"
                onClick={() => setUrgency('priority')}
                aria-pressed={urgency === 'priority'}
                className={`py-2.5 px-3.5 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                  urgency === 'priority'
                    ? 'bg-[#0B1F5B] text-white border-[#0B1F5B]'
                    : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
                }`}
              >
                {t.estimator.priorityQueue}
              </button>
            </div>
          </div>
        </div>

        {/* Right 5 cols: Live ETB Quote Output */}
        <div className="lg:col-span-5 bg-kevlar-quote text-slate-100 rounded-xl p-6 sm:p-7 border border-blue-900/60 flex flex-col justify-between">
          <div>
            <div className="text-xs text-amber-300">
              {t.estimator.devices[device].label} · {t.estimator.severities[severity].label}
            </div>
            <div className="mt-1 font-display text-sm font-semibold text-slate-100">
              {t.estimator.quoteTitle}
            </div>

            <div className="mt-4 font-mono text-3xl sm:text-4xl font-bold text-white tabular-nums tracking-tight">
              {minTotal.toLocaleString()} – {maxTotal.toLocaleString()}{' '}
              <span className="text-lg font-semibold text-amber-400">ETB</span>
            </div>
            <p className="mt-1.5 text-xs text-slate-300">
              {t.estimator.quoteSubtitle}
            </p>

            <dl className="mt-6 pt-5 border-t border-white/15 space-y-2.5 text-xs">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-300">{t.estimator.diagnosticCredit}</dt>
                <dd className="font-mono text-white tabular-nums">
                  {config.diagnosticFee.toLocaleString()} ETB
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-300">{t.estimator.turnaroundLabel}</dt>
                <dd className="font-mono text-white">
                  {urgency === 'priority' ? 'Same Day' : tier.turnaround}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-slate-300">{t.estimator.warrantyLabel}</dt>
                <dd className="font-mono text-white">{t.estimator.warrantyValue}</dd>
              </div>
            </dl>
          </div>

          <div className="mt-6 pt-5 border-t border-white/15 space-y-3">
            <p className="text-[11px] text-slate-300 leading-relaxed">
              {t.estimator.partsNote}
            </p>
            <button
              type="button"
              onClick={handleBookWithEstimate}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
            >
              <span>{t.estimator.bookWithEstimate}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

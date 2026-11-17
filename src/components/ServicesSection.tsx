import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { useI18n } from '../i18n';
import type { ServiceCategory, TicketUrgency } from '../types';
import { ImageWithFallback } from './ImageWithFallback';
import { RepairCostEstimator } from './RepairCostEstimator';

interface ServicesSectionProps {
  onSelectServiceForBooking: (
    category: ServiceCategory,
    initialIssue?: string,
    urgency?: TicketUrgency,
  ) => void;
}

export function ServicesSection({ onSelectServiceForBooking }: ServicesSectionProps) {
  const { t } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>('computer_hardware');
  const activePillar =
    t.services.pillars.find((p) => p.category === selectedCategory) ?? t.services.pillars[0];

  return (
    <section id="services" className="py-16 lg:py-24 bg-kevlar-light border-b border-slate-200/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-wide text-[#14369E] mb-2">
            {t.services.kicker}
          </p>
          <h2
            className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-slate-900"
            style={{ textWrap: 'balance' }}
          >
            {t.services.heading}
          </h2>
          <p className="mt-3 text-base text-slate-600 leading-relaxed">
            {t.services.subheading}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {t.services.pillars.map((pillar) => {
              const isSelected = pillar.category === selectedCategory;
              return (
                <div
                  key={pillar.category}
                  className={`flex flex-col justify-between p-6 rounded-xl border transition-colors duration-150 ${
                    isSelected
                      ? 'bg-white border-[#14369E] shadow-sm'
                      : 'bg-white/90 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-3">
                      <span className="font-mono font-semibold text-[#14369E]">
                        {pillar.index}
                      </span>
                      <span>
                        {t.services.turnaroundPrefix} {pillar.turnaround}
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-semibold text-slate-900">
                      {pillar.title}
                    </h3>
                    <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                      {pillar.summary}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setSelectedCategory(pillar.category)}
                      className={`text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                        isSelected
                          ? 'text-[#14369E]'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {isSelected ? t.services.inspectingRates : t.services.inspectRates}
                    </button>
                    <button
                      type="button"
                      onClick={() => onSelectServiceForBooking(pillar.category)}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-slate-900 hover:text-[#14369E] transition-colors cursor-pointer whitespace-nowrap"
                    >
                      {t.services.bookBench}
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col">
            <div className="aspect-[4/3] w-full bg-slate-100 border-b border-slate-200">
              <ImageWithFallback
                src="/src/assets/images/service_tv_projector_1794904025715.jpg"
                alt="Technician calibrating a 4K television alongside a commercial DLP projector optical assembly"
                fallbackLabel="AV & Optics Calibration Bench"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <div className="text-xs text-slate-500 mb-1">
                  {activePillar.index} · {activePillar.diagnosticFee}
                </div>
                <h3 className="font-display text-xl font-bold text-slate-900">
                  {activePillar.title}
                </h3>

                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  {activePillar.capabilities.map((cap) => (
                    <li key={cap} className="flex items-start gap-2.5">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#14369E] shrink-0" />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-4 border-t border-slate-200">
                  <div className="text-xs font-medium text-slate-500 mb-3">
                    {t.services.typicalEstimatesTitle}
                  </div>
                  <div className="space-y-2.5">
                    {activePillar.typicalRepairs.map((item) => (
                      <div
                        key={item.task}
                        className="flex items-center justify-between gap-4 text-sm"
                      >
                        <span className="text-slate-700">{item.task}</span>
                        <span className="font-mono font-medium text-slate-900 tabular-nums shrink-0">
                          {item.priceRange}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onSelectServiceForBooking(activePillar.category)}
                className="mt-6 w-full py-2.5 px-4 text-sm font-semibold text-white bg-[#0B1F5B] hover:bg-[#14369E] rounded-lg transition-colors duration-150 cursor-pointer"
              >
                {t.services.schedulePrefix} {activePillar.title}
              </button>
            </div>
          </div>
        </div>

        <RepairCostEstimator onBookEstimate={onSelectServiceForBooking} />
      </div>
    </section>
  );
}

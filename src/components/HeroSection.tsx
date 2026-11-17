import { ArrowRight, Globe } from 'lucide-react';
import { LOCALE_OPTIONS, useI18n } from '../i18n';
import type { ServiceCategory } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

interface HeroSectionProps {
  onOpenBooking: (category?: ServiceCategory) => void;
}

export function HeroSection({ onOpenBooking }: HeroSectionProps) {
  const { locale, setLocale, t } = useI18n();

  return (
    <section id="top" className="bg-kevlar-hero text-white border-b border-blue-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 lg:pt-12 lg:pb-16">
        {/* Clean Language Switcher Bar */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-white/10">
          <p className="text-xs font-medium tracking-wide text-amber-300">
            {t.hero.kicker}
          </p>

          <div
            role="group"
            aria-label="Select Language"
            className="inline-flex items-center gap-1 p-1 bg-white/10 border border-white/15 rounded-lg"
          >
            <Globe className="w-3.5 h-3.5 text-amber-300 ml-2 mr-1 shrink-0" />
            {LOCALE_OPTIONS.map((opt) => {
              const active = locale === opt.code;
              return (
                <button
                  key={opt.code}
                  type="button"
                  onClick={() => setLocale(opt.code)}
                  aria-pressed={active}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-amber-400 text-slate-950 shadow-sm'
                      : 'text-slate-200 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div>
              <h1
                className="font-display font-bold tracking-tight text-white leading-[1.12] max-w-xl"
                style={{ fontSize: 'clamp(2.15rem, 3.6vw, 3.35rem)', textWrap: 'balance' }}
              >
                {t.hero.headline}
              </h1>
              <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
                {t.hero.description}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <button
                type="button"
                onClick={() => onOpenBooking('computer_hardware')}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060f29]"
              >
                {t.hero.primaryCta}
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#used-pcs"
                className="inline-flex items-center gap-1.5 px-4 py-3 text-sm font-semibold text-slate-100 hover:text-amber-300 underline underline-offset-4 transition-colors duration-150 whitespace-nowrap shrink-0"
              >
                {t.hero.secondaryCta}
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="h-full min-h-[280px] lg:min-h-[420px] rounded-xl overflow-hidden border border-white/15 bg-[#0B1F5B] shadow-2xl shadow-black/40">
              <ImageWithFallback
                src="/assets/aistudio/1794812521013_4d1fc2e1.jpg"
                alt="KEVLAR TECH storefront and repair workshop in Bishoftu, Ethiopia"
                fallbackLabel="KEVLAR TECH Bishoftu Workshop"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>
        </div>

        {/* Full-width 4-column proof strip directly below the hero split */}
        <div className="mt-10 pt-8 border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {t.hero.metrics.map((metric) => (
            <div key={metric.label} className="space-y-1">
              <div className="font-mono text-2xl sm:text-3xl font-semibold text-amber-400 tabular-nums">
                {metric.value}
              </div>
              <div className="text-sm text-slate-300">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

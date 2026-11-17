import { useI18n } from '../i18n';
import type { ServiceCategory } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

interface FounderSectionProps {
  onOpenBooking: (category?: ServiceCategory) => void;
}

export function FounderSection({ onOpenBooking }: FounderSectionProps) {
  const { t } = useI18n();

  return (
    <section id="leadership" className="py-16 lg:py-24 bg-kevlar-surface border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-6">
            <p className="text-xs font-semibold tracking-wide text-[#14369E] mb-2">
              {t.founder.kicker}
            </p>
            <h2
              className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-slate-900"
              style={{ textWrap: 'balance' }}
            >
              {t.founder.heading}
            </h2>
            <p className="mt-4 text-base text-slate-600 leading-relaxed max-w-2xl">
              {t.founder.description}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <button
                type="button"
                onClick={() => onOpenBooking('computer_hardware')}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-[#0B1F5B] hover:bg-[#14369E] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
              >
                {t.founder.bookInspection}
              </button>
              <a
                href="#consulting"
                className="text-sm font-semibold text-slate-800 hover:text-[#14369E] underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
              >
                {t.founder.consultOffice}
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            {t.founder.disciplines.map((item) => (
              <div
                key={item.index}
                className="p-5 rounded-xl border border-blue-950/10 bg-[#F4F7FC] space-y-1.5"
              >
                <div className="font-mono text-xs font-semibold text-[#14369E]">{item.index}</div>
                <h3 className="font-display text-sm font-semibold text-slate-900">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Real Bishoftu Workshop Gallery */}
        <div className="mt-14 pt-12 border-t border-slate-200">
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-6">
            <h3 className="font-display text-lg font-bold text-slate-900">
              {t.founder.galleryHeading}
            </h3>
            <span className="text-xs text-slate-500">
              {t.founder.gallerySubheading}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <figure className="space-y-2">
              <div className="aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                <ImageWithFallback
                  src="/assets/aistudio/1794812664989_fead81bc.jpg"
                  alt="Technician testing motherboard and laptop hardware with multimeter at KEVLAR TECH"
                  fallbackLabel="Board-Level Repair Bench"
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption className="text-xs text-slate-600">
                {t.founder.captions[0]}
              </figcaption>
            </figure>

            <figure className="space-y-2">
              <div className="aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                <ImageWithFallback
                  src="/assets/aistudio/1794812610727_dcb6f74c.jpg"
                  alt="Software recovery, drive diagnostics, and cable station inside KEVLAR TECH"
                  fallbackLabel="Software & Diagnostics Desk"
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption className="text-xs text-slate-600">
                {t.founder.captions[1]}
              </figcaption>
            </figure>

            <figure className="space-y-2">
              <div className="aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                <ImageWithFallback
                  src="/assets/aistudio/1794812521013_4d1fc2e1.jpg"
                  alt="KEVLAR TECH Bishoftu storefront entrance with shop signage"
                  fallbackLabel="KEVLAR TECH Storefront"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <figcaption className="text-xs text-slate-600">
                {t.founder.captions[2]}
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}

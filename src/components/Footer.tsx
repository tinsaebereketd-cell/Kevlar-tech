import { LOCALE_OPTIONS, useI18n } from '../i18n';

interface FooterProps {
  onOpenStaffWorkbench: () => void;
}

export function Footer({ onOpenStaffWorkbench }: FooterProps) {
  const { locale, setLocale, t } = useI18n();

  return (
    <footer className="bg-[#040a1c] text-slate-400 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-white/10">
          <div className="md:col-span-5 space-y-3">
            <div className="w-52 aspect-[16/10] rounded-lg overflow-hidden border border-amber-400/30 bg-[#0B1F5B]">
              <img
                src="/assets/aistudio/1794814611168_f37733fc.jpg"
                alt="KEVLAR TECH shop signboard"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-[58%_43%] scale-125"
              />
            </div>
            <div className="font-display text-lg font-bold text-white">
              KEVLAR TECH
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              {t.footer.description}
            </p>
          </div>

          <div className="md:col-span-4 space-y-1.5 text-sm">
            <div className="font-semibold text-amber-300 mb-2">{t.footer.workshopTitle}</div>
            <div>{t.footer.location}</div>
            <div>{t.footer.hours}</div>
            <div className="pt-1 flex flex-col gap-1 font-mono text-slate-300 tabular-nums">
              <a href="tel:+251994925633" className="hover:text-amber-300 transition-colors w-fit">
                +251 99 492 5633
              </a>
              <a href="tel:+251910757044" className="hover:text-amber-300 transition-colors w-fit">
                +251 91 075 7044
              </a>
              <a href="tel:+251911689630" className="hover:text-amber-300 transition-colors w-fit">
                +251 91 168 9630
              </a>
              <span className="text-slate-400 pt-0.5">desk@kevlartech.et</span>
            </div>
          </div>

          <div className="md:col-span-3 space-y-2 text-sm">
            <div className="font-semibold text-amber-300 mb-2">{t.footer.navigationTitle}</div>
            <div className="flex flex-col gap-1.5">
              <a href="#services" className="hover:text-white transition-colors">
                {t.nav.services}
              </a>
              <a href="#used-pcs" className="hover:text-white transition-colors">
                {t.nav.usedPcs}
              </a>
              <a href="#track-repair" className="hover:text-white transition-colors">
                {t.nav.trackRepair}
              </a>
              <a href="#consulting" className="hover:text-white transition-colors">
                {t.nav.consulting}
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-xs">
          <span>
            &copy; {new Date().getFullYear()} KEVLAR TECH. {t.footer.rights}
          </span>

          <div className="flex flex-wrap items-center gap-5">
            <div className="inline-flex items-center gap-2">
              {LOCALE_OPTIONS.map((opt) => (
                <button
                  key={opt.code}
                  type="button"
                  onClick={() => setLocale(opt.code)}
                  className={`transition-colors cursor-pointer ${
                    locale === opt.code
                      ? 'text-amber-300 font-semibold underline underline-offset-4'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={onOpenStaffWorkbench}
              className="text-slate-300 hover:text-amber-300 underline underline-offset-4 cursor-pointer"
            >
              {t.footer.staffWorkbench}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

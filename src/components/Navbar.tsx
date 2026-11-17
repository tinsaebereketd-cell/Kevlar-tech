import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useI18n } from '../i18n';

interface NavbarProps {
  onOpenBooking: () => void;
}

export function Navbar({ onOpenBooking }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useI18n();

  const navLinks = [
    { label: t.nav.services, href: '#services' },
    { label: t.nav.usedPcs, href: '#used-pcs' },
    { label: t.nav.trackRepair, href: '#track-repair' },
    { label: t.nav.consulting, href: '#consulting' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#060f29]/92 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand logo & single-line wordmark */}
        <a
          href="#top"
          className="inline-flex items-center gap-2.5 font-display text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-sm"
        >
          <span className="h-9 w-14 rounded-md overflow-hidden border border-amber-400/40 bg-[#0B1F5B] shrink-0 block">
            <img
              src="/assets/aistudio/1794814611168_f37733fc.jpg"
              alt="KEVLAR TECH logo"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-[58%_43%] scale-125"
            />
          </span>
          <span>KEVLAR TECH</span>
        </a>

        {/* Zone 2: 4 concise single-line nav links */}
        <nav aria-label="Primary Navigation" className="hidden md:flex items-center gap-7">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate-300 hover:text-amber-300 underline-offset-4 hover:underline transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-sm"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary action + mobile menu toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenBooking}
            className="px-4 py-2 text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060f29]"
          >
            {t.nav.bookService}
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="md:hidden p-2 text-slate-200 hover:text-white rounded-lg border border-white/15 min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="md:hidden border-t border-white/10 bg-[#060f29] px-4 py-3 flex flex-col gap-1"
        >
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="py-2.5 px-3 text-sm font-medium text-slate-200 hover:text-amber-300 hover:bg-white/5 rounded-md"
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

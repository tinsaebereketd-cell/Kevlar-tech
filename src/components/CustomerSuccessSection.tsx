import { Star } from 'lucide-react';
import { useState } from 'react';
import { useI18n } from '../i18n';

type TestimonialFilter = 'all' | 'repair' | 'av' | 'consulting';

export function CustomerSuccessSection() {
  const { t } = useI18n();
  const [filter, setFilter] = useState<TestimonialFilter>('all');

  const visibleItems =
    filter === 'all'
      ? t.testimonials.items
      : t.testimonials.items.filter((item) => item.category === filter);

  const filterOptions: Array<{ key: TestimonialFilter; label: string }> = [
    { key: 'all', label: t.testimonials.filters.all },
    { key: 'repair', label: t.testimonials.filters.repair },
    { key: 'av', label: t.testimonials.filters.av },
    { key: 'consulting', label: t.testimonials.filters.consulting },
  ];

  return (
    <section
      id="customer-success"
      className="py-16 lg:py-24 bg-kevlar-light border-b border-slate-200/90"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wide text-[#14369E] mb-2">
              {t.testimonials.kicker}
            </p>
            <h2
              className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-slate-900"
              style={{ textWrap: 'balance' }}
            >
              {t.testimonials.heading}
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              {t.testimonials.subheading}
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl px-5 py-3.5 shrink-0 self-start lg:self-auto">
            <div
              className="flex items-center gap-1"
              aria-label="5 out of 5 stars"
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="w-4 h-4 text-amber-500 fill-amber-400"
                />
              ))}
            </div>
            <p className="mt-1.5 text-xs font-medium text-slate-700 tabular-nums">
              {t.testimonials.averageLabel}
            </p>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="mt-8 pb-6 border-b border-slate-200">
          <div
            role="tablist"
            aria-label="Filter client testimonials"
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#E5ECF9] rounded-lg"
          >
            {filterOptions.map((opt) => {
              const active = filter === opt.key;
              return (
                <button
                  key={opt.key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(opt.key)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#0B1F5B] text-white shadow-sm'
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Testimonial Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleItems.map((item) => (
            <article
              key={item.id}
              className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7 flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div
                    className="flex items-center gap-1"
                    aria-label="5 out of 5 stars"
                  >
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className="w-4 h-4 text-amber-500 fill-amber-400"
                      />
                    ))}
                  </div>
                  <div className="text-xs text-slate-500">
                    <span>{item.serviceMeta}</span>
                    <span aria-hidden="true"> · </span>
                    <span>{item.location}</span>
                  </div>
                </div>

                <blockquote className="mt-4 text-sm sm:text-base text-slate-800 leading-relaxed">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-end justify-between gap-3">
                <div>
                  <div className="font-display text-sm font-bold text-slate-900">
                    {item.authorName}
                  </div>
                  <div className="text-xs text-slate-600">
                    {item.authorRole} · {item.organization}
                  </div>
                </div>

                <div className="font-mono text-xs font-semibold text-[#14369E] tabular-nums">
                  {item.outcome}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

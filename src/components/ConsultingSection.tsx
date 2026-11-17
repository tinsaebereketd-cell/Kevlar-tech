import { CheckCircle2 } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { useI18n } from '../i18n';
import type { ConsultationFocus, ConsultationRequest } from '../types';

export function ConsultingSection() {
  const { t } = useI18n();
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [teamSize, setTeamSize] = useState<'1-10' | '11-50' | '51-200'>('11-50');
  const [focusArea, setFocusArea] = useState<ConsultationFocus>('Network & Wi-Fi Architecture');
  const [preferredDate, setPreferredDate] = useState('2026-11-24');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState<ConsultationRequest | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!companyName.trim() || !contactName.trim() || !email.trim() || !phone.trim() || !preferredDate) {
      setError('Please complete all required IT consultation fields.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid business email address.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: companyName.trim(),
          contactName: contactName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          teamSize,
          focusArea,
          preferredDate,
          notes: notes.trim(),
        }),
      });
      const data = (await response.json()) as {
        consultation?: ConsultationRequest;
        error?: string;
      };
      if (!response.ok || !data.consultation) {
        setError(data.error ?? 'Could not schedule consultation.');
        return;
      }
      setConfirmed(data.consultation);
      setCompanyName('');
      setContactName('');
      setEmail('');
      setPhone('');
      setNotes('');
    } catch {
      setError('Network error while submitting consultation request.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="consulting" className="py-16 lg:py-24 bg-kevlar-dark text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left 7 cols: Practice areas + Proof */}
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold tracking-wide text-amber-400 mb-2">
              {t.consulting.kicker}
            </p>
            <h2
              className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-white"
              style={{ textWrap: 'balance' }}
            >
              {t.consulting.heading}
            </h2>
            <p className="mt-3 text-base text-slate-300 leading-relaxed max-w-2xl">
              {t.consulting.subheading}
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {t.consulting.practices.map((practice) => (
                <div
                  key={practice.title}
                  className="p-5 rounded-xl bg-white/[0.045] border border-white/12 flex flex-col justify-between"
                >
                  <div>
                    <div className="font-mono text-xs font-semibold text-amber-400 mb-1.5">
                      {practice.num}
                    </div>
                    <h3 className="font-display text-base font-semibold text-white">
                      {practice.localizedTitle}
                    </h3>
                    <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                      {practice.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/10 text-xs text-slate-400">
                    {practice.deliverable}
                  </div>
                </div>
              ))}
            </div>

            {/* Claim-to-Proof Adjacency */}
            <div className="mt-8 p-6 rounded-xl bg-white/[0.045] border border-white/12 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              <div className="sm:col-span-5 space-y-3">
                <div>
                  <div className="font-mono text-2xl font-bold text-amber-400 tabular-nums">
                    {t.consulting.uptimeStat}
                  </div>
                  <div className="text-xs text-slate-300">
                    {t.consulting.uptimeDesc}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-2xl font-bold text-amber-400 tabular-nums">
                    {t.consulting.tcoStat}
                  </div>
                  <div className="text-xs text-slate-300">
                    {t.consulting.tcoDesc}
                  </div>
                </div>
              </div>

              <blockquote className="sm:col-span-7 sm:pl-6 sm:border-l sm:border-white/15">
                <p className="text-sm text-slate-200 leading-relaxed">
                  &ldquo;{t.consulting.quote}&rdquo;
                </p>
                <footer className="mt-3 text-xs text-slate-400">
                  {t.consulting.quoteAuthor}
                </footer>
              </blockquote>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-mono text-slate-300 tabular-nums">
              <a href="tel:+251994925633" className="hover:text-amber-300 transition-colors">
                +251 99 492 5633
              </a>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <a href="tel:+251910757044" className="hover:text-amber-300 transition-colors">
                +251 91 075 7044
              </a>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <a href="tel:+251911689630" className="hover:text-amber-300 transition-colors">
                +251 91 168 9630
              </a>
            </div>
          </div>

          {/* Right 5 cols: Consultation Booking Form */}
          <div className="lg:col-span-5 bg-white text-slate-900 rounded-xl border border-white/20 p-6 sm:p-8 shadow-xl shadow-black/30">
            <h3 className="font-display text-xl font-bold text-slate-900">
              {t.consulting.formTitle}
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              {t.consulting.formSubtitle}
            </p>

            {confirmed ? (
              <div className="mt-6 p-5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-3">
                <div className="flex items-center gap-2 font-semibold text-emerald-900">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                  <span>
                    {confirmed.id} · {t.consulting.confirmedTitle}
                  </span>
                </div>
                <p className="text-sm text-emerald-900 leading-relaxed">
                  {t.consulting.confirmedPrefix} <strong>{confirmed.companyName}</strong> ·{' '}
                  <strong>{confirmed.preferredDate}</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => setConfirmed(null)}
                  className="mt-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg cursor-pointer"
                >
                  {t.consulting.bookAnother}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.consulting.companyName}
                  </label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Bishoftu Commercial & Agro Office"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-blue-700"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.consulting.contactName}
                    </label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="Bona Tadesse"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-blue-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.consulting.teamSize}
                    </label>
                    <select
                      value={teamSize}
                      onChange={(e) =>
                        setTeamSize(e.target.value as '1-10' | '11-50' | '51-200')
                      }
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:border-blue-700"
                    >
                      <option value="1-10">1–10 {t.consulting.workstationsSuffix}</option>
                      <option value="11-50">11–50 {t.consulting.workstationsSuffix}</option>
                      <option value="51-200">51–200 {t.consulting.workstationsSuffix}</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.consulting.businessEmail}
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="office@company.et"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-blue-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.consulting.phoneNumber}
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+251 91 123 4567"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-blue-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.consulting.primaryFocus}
                    </label>
                    <select
                      value={focusArea}
                      onChange={(e) => setFocusArea(e.target.value as ConsultationFocus)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:border-blue-700"
                    >
                      {t.consulting.practices.map((p) => (
                        <option key={p.title} value={p.title}>
                          {p.localizedTitle}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.consulting.preferredDate}
                    </label>
                    <input
                      type="date"
                      required
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-blue-700"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.consulting.projectBrief}
                  </label>
                  <textarea
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={t.consulting.projectPlaceholder}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-blue-700"
                  />
                </div>

                {error && (
                  <p className="text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg p-2.5">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 px-4 text-sm font-semibold text-white bg-[#14369E] hover:bg-[#0B1F5B] disabled:opacity-60 rounded-lg transition-colors cursor-pointer"
                >
                  {submitting ? t.consulting.submittingBtn : t.consulting.submitBtn}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

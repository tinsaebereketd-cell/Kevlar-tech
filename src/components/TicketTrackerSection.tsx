import { CheckCircle2, Clock, Search, Wrench } from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';
import { useI18n } from '../i18n';
import {
  TICKET_STAGES,
  type PublicTicketView,
  type ServiceCategory,
} from '../types';

interface TicketTrackerSectionProps {
  activeTicketId: string | null;
  onOpenBooking: (category?: ServiceCategory) => void;
}

export function TicketTrackerSection({
  activeTicketId,
  onOpenBooking,
}: TicketTrackerSectionProps) {
  const { t } = useI18n();
  const [queryId, setQueryId] = useState(activeTicketId ?? 'KVT-1041');
  const [ticket, setTicket] = useState<PublicTicketView | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function lookupTicket(idToFetch: string) {
    const clean = idToFetch.trim().toUpperCase();
    if (!clean) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/tickets?ticketId=${encodeURIComponent(clean)}`);
      const data = (await response.json()) as { ticket?: PublicTicketView; error?: string };
      if (!response.ok || !data.ticket) {
        setTicket(null);
        setError(data.error ?? `No repair ticket found for ${clean}.`);
        return;
      }
      setTicket(data.ticket);
    } catch {
      setError('Unable to reach repair bench tracker right now.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const id = activeTicketId ?? 'KVT-1041';
    setQueryId(id);
    void lookupTicket(id);
  }, [activeTicketId]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    void lookupTicket(queryId);
  }

  const currentStageIndex = ticket ? TICKET_STAGES.indexOf(ticket.status) : -1;

  return (
    <section id="track-repair" className="py-16 lg:py-24 bg-kevlar-light border-b border-slate-200/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left column: Lookup controls */}
          <div className="lg:col-span-5">
            <p className="text-xs font-semibold tracking-wide text-[#14369E] mb-2">
              {t.tracker.kicker}
            </p>
            <h2
              className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-slate-900"
              style={{ textWrap: 'balance' }}
            >
              {t.tracker.heading}
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              {t.tracker.subheading}
            </p>

            <form onSubmit={handleSubmit} className="mt-6 flex items-center gap-2">
              <label className="relative flex-1">
                <span className="sr-only">Repair Ticket ID</span>
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={queryId}
                  onChange={(e) => setQueryId(e.target.value)}
                  placeholder={t.tracker.placeholder}
                  className="w-full pl-10 pr-3 py-2.5 text-sm font-mono uppercase bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:border-[#14369E] focus:ring-1 focus:ring-[#14369E]"
                />
              </label>
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-[#14369E] hover:bg-[#0B1F5B] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {loading ? t.tracker.checking : t.tracker.checkStatus}
              </button>
            </form>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-500">
              <span>{t.tracker.sampleTickets}</span>
              {['KVT-1041', 'KVT-1042', 'KVT-1043'].map((sampleId) => (
                <button
                  key={sampleId}
                  type="button"
                  onClick={() => {
                    setQueryId(sampleId);
                    void lookupTicket(sampleId);
                  }}
                  className={`px-2.5 py-1 font-mono rounded-md border transition-colors cursor-pointer ${
                    ticket?.id === sampleId
                      ? 'bg-[#0B1F5B] text-white border-[#0B1F5B]'
                      : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
                  }`}
                >
                  {sampleId}
                </button>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between gap-4">
              <span className="text-sm text-slate-600">{t.tracker.needDropoff}</span>
              <button
                type="button"
                onClick={() => onOpenBooking()}
                className="text-sm font-semibold text-[#14369E] hover:text-[#0B1F5B] underline underline-offset-4 cursor-pointer whitespace-nowrap"
              >
                {t.tracker.createTicket}
              </button>
            </div>
          </div>

          {/* Right column: Ticket Progress Card */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-sm">
            {loading ? (
              <div className="h-64 flex items-center justify-center text-sm text-slate-500">
                {t.tracker.loading}
              </div>
            ) : error ? (
              <div className="p-6 rounded-lg bg-red-50 border border-red-200 text-sm text-red-800">
                {error}
              </div>
            ) : ticket ? (
              <div>
                <div className="flex flex-wrap items-start justify-between gap-4 pb-5 border-b border-slate-200">
                  <div>
                    <div className="text-xs text-slate-500">
                      <span className="font-mono font-semibold text-slate-900">{ticket.id}</span>
                      {' · '}
                      <span>{t.tracker.categoryLabels[ticket.category]}</span>
                      {' · '}
                      <span>
                        {t.tracker.clientLabel} {ticket.customerFirstName}
                      </span>
                    </div>
                    <h3 className="mt-1 font-display text-xl font-bold text-slate-900">
                      {ticket.deviceModel}
                    </h3>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-semibold bg-[#EEF3FC] border-blue-950/15 text-[#0B1F5B]">
                    {ticket.status === 'Ready for Pickup' || ticket.status === 'Completed' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    ) : (
                      <Wrench className="w-4 h-4 text-[#14369E]" />
                    )}
                    <span>
                      {t.tracker.statusPrefix} {t.tracker.stages[ticket.status]}
                    </span>
                  </div>
                </div>

                {/* 6-Stage Progress Timeline */}
                <div className="mt-6">
                  <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
                    {TICKET_STAGES.map((stage, idx) => {
                      const reached = idx <= currentStageIndex;
                      const current = idx === currentStageIndex;
                      return (
                        <div key={stage} className="space-y-1.5">
                          <div
                            className={`h-1.5 rounded-full ${
                              current
                                ? 'bg-amber-500'
                                : reached
                                  ? 'bg-[#14369E]'
                                  : 'bg-slate-200'
                            }`}
                          />
                          <div
                            className={`text-[11px] leading-tight ${
                              current
                                ? 'font-semibold text-[#14369E]'
                                : reached
                                  ? 'font-medium text-slate-800'
                                  : 'text-slate-400'
                            }`}
                          >
                            {t.tracker.stages[stage]}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                    <div className="text-xs font-semibold text-slate-500 mb-1">
                      {t.tracker.reportedFault}
                    </div>
                    <p className="text-sm text-slate-800">{ticket.issueSummary}</p>
                  </div>

                  <div className="p-4 rounded-lg bg-white border border-slate-200">
                    <div className="text-xs font-semibold text-slate-500 mb-1">
                      {t.tracker.benchLog}
                    </div>
                    <p className="text-sm text-slate-800 leading-relaxed">
                      {ticket.technicianNotes}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-sm">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span>
                      {t.tracker.lastUpdated}{' '}
                      {new Date(ticket.updatedAt).toLocaleString(undefined, {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs text-slate-500 mr-2">
                      {t.tracker.estimatedTotal}
                    </span>
                    <span className="font-mono text-lg font-bold text-slate-900 tabular-nums">
                      {ticket.estimatedCost.toLocaleString()} ETB
                    </span>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

import { CheckCircle2, X } from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';
import { useI18n } from '../i18n';
import type { PublicTicketView, ServiceCategory, TicketUrgency } from '../types';

interface RepairBookingModalProps {
  open: boolean;
  initialCategory: ServiceCategory;
  initialIssue?: string;
  initialUrgency?: TicketUrgency;
  onClose: () => void;
  onTicketCreated: (ticket: PublicTicketView) => void;
}

const CATEGORY_KEYS: ServiceCategory[] = [
  'computer_hardware',
  'computer_software',
  'tv_maintenance',
  'projector_maintenance',
];

export function RepairBookingModal({
  open,
  initialCategory,
  initialIssue = '',
  initialUrgency = 'standard',
  onClose,
  onTicketCreated,
}: RepairBookingModalProps) {
  const { t } = useI18n();
  const [category, setCategory] = useState<ServiceCategory>(initialCategory);
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [deviceModel, setDeviceModel] = useState('');
  const [issueSummary, setIssueSummary] = useState(initialIssue);
  const [urgency, setUrgency] = useState<TicketUrgency>(initialUrgency);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdTicket, setCreatedTicket] = useState<PublicTicketView | null>(null);

  useEffect(() => {
    if (open) {
      setCategory(initialCategory);
      setIssueSummary(initialIssue);
      setUrgency(initialUrgency);
    }
  }, [open, initialCategory, initialIssue, initialUrgency]);

  if (!open) return null;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (
      !customerName.trim() ||
      !phone.trim() ||
      !email.trim() ||
      !deviceModel.trim() ||
      !issueSummary.trim()
    ) {
      setError('Please fill in all required device and contact fields.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/tickets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category,
          customerName: customerName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          deviceModel: deviceModel.trim(),
          issueSummary: issueSummary.trim(),
          urgency,
        }),
      });
      const data = (await response.json()) as { ticket?: PublicTicketView; error?: string };
      if (!response.ok || !data.ticket) {
        setError(data.error ?? 'Failed to log repair ticket.');
        return;
      }
      setCreatedTicket(data.ticket);
      setCustomerName('');
      setPhone('');
      setEmail('');
      setDeviceModel('');
      setIssueSummary('');
    } catch {
      setError('Network error while submitting repair intake.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="repair-modal-title"
    >
      <div className="bg-white border border-slate-200 rounded-xl max-w-lg w-full overflow-hidden shadow-2xl max-h-[92vh] flex flex-col">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 id="repair-modal-title" className="font-display text-lg font-bold text-slate-900">
              {t.bookingModal.title}
            </h2>
            <p className="text-xs text-slate-500">
              {t.bookingModal.subtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setCreatedTicket(null);
              onClose();
            }}
            aria-label="Close booking modal"
            className="p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          {createdTicket ? (
            <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-3">
              <div className="flex items-center gap-2 font-semibold text-emerald-900">
                <CheckCircle2 className="w-5 h-5 text-emerald-700" />
                <span>
                  {createdTicket.id} · {t.bookingModal.loggedTitle}
                </span>
              </div>
              <p className="text-sm text-emerald-900">
                {t.bookingModal.deviceLabel} <strong>{createdTicket.deviceModel}</strong> (
                {t.tracker.categoryLabels[createdTicket.category]})
              </p>
              <p className="text-xs text-emerald-800">
                {t.bookingModal.estimateLabel}{' '}
                <strong className="font-mono">
                  {createdTicket.estimatedCost.toLocaleString()} ETB
                </strong>{' '}
                · {t.tracker.statusPrefix}{' '}
                <strong>{t.tracker.stages[createdTicket.status]}</strong>
              </p>
              <div className="pt-2 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onTicketCreated(createdTicket);
                    setCreatedTicket(null);
                    onClose();
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#14369E] hover:bg-blue-800 rounded-lg cursor-pointer"
                >
                  {t.bookingModal.viewInTracker}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setCreatedTicket(null);
                    onClose();
                  }}
                  className="px-4 py-2 text-xs font-semibold text-slate-800 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg cursor-pointer"
                >
                  {t.bookingModal.close}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.bookingModal.division}
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ServiceCategory)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:border-[#14369E]"
                >
                  {CATEGORY_KEYS.map((cat) => (
                    <option key={cat} value={cat}>
                      {t.tracker.categoryLabels[cat]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.bookingModal.deviceModel}
                </label>
                <input
                  type="text"
                  required
                  value={deviceModel}
                  onChange={(e) => setDeviceModel(e.target.value)}
                  placeholder={t.bookingModal.devicePlaceholder}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#14369E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.bookingModal.symptoms}
                </label>
                <textarea
                  rows={3}
                  required
                  value={issueSummary}
                  onChange={(e) => setIssueSummary(e.target.value)}
                  placeholder={t.bookingModal.symptomsPlaceholder}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#14369E]"
                />
              </div>

              <div>
                <span className="block text-xs font-semibold text-slate-700 mb-1.5">
                  {t.bookingModal.priorityLabel}
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setUrgency('standard')}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                      urgency === 'standard'
                        ? 'bg-[#14369E] text-white border-[#14369E]'
                        : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
                    }`}
                  >
                    {t.bookingModal.standardQueue}
                  </button>
                  <button
                    type="button"
                    onClick={() => setUrgency('priority')}
                    className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                      urgency === 'priority'
                        ? 'bg-[#14369E] text-white border-[#14369E]'
                        : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
                    }`}
                  >
                    {t.bookingModal.priorityQueue}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.bookingModal.fullName}
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Chaltu Bekele"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#14369E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.bookingModal.phone}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+251 91 123 4567"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#14369E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.bookingModal.email}
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="client@mail.et"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#14369E]"
                  />
                </div>
              </div>

              {error && (
                <p className="text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg p-2.5">
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 px-4 text-sm font-semibold text-white bg-[#14369E] hover:bg-blue-800 disabled:opacity-60 rounded-lg transition-colors cursor-pointer"
              >
                {submitting ? t.bookingModal.submittingBtn : t.bookingModal.submitBtn}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

import { CheckCircle2, Trash2, X } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { useI18n } from '../i18n';
import type { OrderRecord, UsedPcItem } from '../types';

interface CartDrawerProps {
  open: boolean;
  items: UsedPcItem[];
  onClose: () => void;
  onRemoveItem: (id: string) => void;
  onOrderComplete: (order: OrderRecord) => void;
}

export function CartDrawer({
  open,
  items,
  onClose,
  onRemoveItem,
  onOrderComplete,
}: CartDrawerProps) {
  const { t } = useI18n();
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'In-Store Pickup' | 'Local Office Delivery'>(
    'In-Store Pickup',
  );
  const [address, setAddress] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<OrderRecord | null>(null);

  if (!open) return null;

  const subtotal = items.reduce((sum, item) => sum + item.price, 0);

  async function handleCheckout(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!customerName.trim() || !phone.trim() || !email.trim()) {
      setError('Please enter your name, phone number, and email address.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please provide a valid email address.');
      return;
    }
    if (deliveryMethod === 'Local Office Delivery' && !address.trim()) {
      setError('Please enter a local delivery address.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: customerName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          deliveryMethod,
          address: address.trim(),
          itemIds: items.map((i) => i.id),
        }),
      });
      const data = (await response.json()) as { order?: OrderRecord; error?: string };
      if (!response.ok || !data.order) {
        setError(data.error ?? 'Unable to complete reservation.');
        return;
      }
      setConfirmedOrder(data.order);
      onOrderComplete(data.order);
      setCustomerName('');
      setPhone('');
      setEmail('');
      setAddress('');
    } catch {
      setError('Network error while submitting reservation. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex justify-end"
      role="dialog"
      aria-modal="true"
      aria-label={t.cart.title}
    >
      <div className="w-full max-w-md bg-white h-full border-l border-slate-200 flex flex-col shadow-2xl">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="font-display text-lg font-bold text-slate-900">
              {t.cart.title}
            </h2>
            <p className="text-xs text-slate-500">
              {t.cart.subtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setConfirmedOrder(null);
              onClose();
            }}
            aria-label="Close cart drawer"
            className="p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {confirmedOrder ? (
            <div className="p-5 rounded-xl border border-emerald-200 bg-emerald-50 space-y-3">
              <div className="flex items-center gap-2 text-emerald-800 font-semibold">
                <CheckCircle2 className="w-5 h-5" />
                <span>
                  {confirmedOrder.id} · {t.cart.orderConfirmed}
                </span>
              </div>
              <p className="text-sm text-emerald-900">
                {t.cart.reservedUnder} <strong>{confirmedOrder.customerName}</strong> (
                {confirmedOrder.deliveryMethod === 'In-Store Pickup'
                  ? t.cart.pickup
                  : t.cart.delivery}
                ).
              </p>
              <div className="pt-2 border-t border-emerald-200 space-y-1 text-xs text-emerald-900">
                {confirmedOrder.items.map((it) => (
                  <div key={it.id} className="flex justify-between">
                    <span>{it.title}</span>
                    <span className="font-mono tabular-nums">{it.price.toLocaleString()} ETB</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold pt-2 border-t border-emerald-200 text-sm">
                  <span>{t.cart.totalDue}</span>
                  <span className="font-mono tabular-nums">
                    {confirmedOrder.total.toLocaleString()} ETB
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setConfirmedOrder(null);
                  onClose();
                }}
                className="mt-2 w-full py-2.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg cursor-pointer"
              >
                {t.cart.done}
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-14">
              <p className="text-sm font-medium text-slate-900">{t.cart.emptyTitle}</p>
              <p className="mt-1 text-xs text-slate-500">{t.cart.emptyDesc}</p>
            </div>
          ) : (
            <div className="space-y-6">
              <ul className="divide-y divide-slate-200 border border-slate-200 rounded-xl">
                {items.map((item) => (
                  <li key={item.id} className="p-4 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-xs text-slate-500">
                        {t.catalog.categories[item.category]}
                      </div>
                      <div className="text-sm font-semibold text-slate-900 truncate">
                        {item.title}
                      </div>
                      <div className="font-mono text-xs text-slate-700 tabular-nums mt-0.5">
                        {item.price.toLocaleString()} ETB
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.id)}
                      aria-label={`Remove ${item.title}`}
                      className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-slate-50 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </li>
                ))}
              </ul>

              <form onSubmit={handleCheckout} className="space-y-4">
                <div>
                  <span className="block text-xs font-semibold text-slate-700 mb-1.5">
                    {t.cart.fulfillmentMethod}
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {(['In-Store Pickup', 'Local Office Delivery'] as const).map((method) => (
                      <button
                        key={method}
                        type="button"
                        onClick={() => setDeliveryMethod(method)}
                        className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-colors cursor-pointer ${
                          deliveryMethod === method
                            ? 'bg-[#14369E] text-white border-[#14369E]'
                            : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
                        }`}
                      >
                        {method === 'In-Store Pickup' ? t.cart.pickup : t.cart.delivery}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {t.cart.fullName}
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Abebe Bikila"
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#14369E]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.cart.phone}
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
                      {t.cart.email}
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="client@company.et"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#14369E]"
                    />
                  </div>
                </div>

                {deliveryMethod === 'Local Office Delivery' && (
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {t.cart.deliveryAddress}
                    </label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Main Road, Kebele 01, Bishoftu"
                      className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#14369E]"
                    />
                  </div>
                )}

                {error && (
                  <p className="text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg p-2.5">
                    {error}
                  </p>
                )}

                <div className="pt-4 border-t border-slate-200">
                  <div className="flex items-center justify-between text-sm mb-4">
                    <span className="text-slate-600">
                      {t.cart.subtotal} ({items.length} {t.cart.units})
                    </span>
                    <span className="font-mono text-lg font-bold text-slate-900 tabular-nums">
                      {subtotal.toLocaleString()} ETB
                    </span>
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 px-4 text-sm font-semibold text-white bg-[#14369E] hover:bg-blue-800 disabled:opacity-60 rounded-lg transition-colors cursor-pointer"
                  >
                    {submitting ? t.cart.submittingBtn : t.cart.confirmBtn}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

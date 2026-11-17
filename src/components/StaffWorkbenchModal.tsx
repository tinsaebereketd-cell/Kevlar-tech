import { Camera, ImagePlus, Plus, Trash2, X } from 'lucide-react';
import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react';
import {
  SERVICE_CATEGORY_LABELS,
  TICKET_STAGES,
  type ConsultationRequest,
  type ConsultationStatus,
  type OrderRecord,
  type PcCategory,
  type PcStatus,
  type RepairTicket,
  type TicketStatus,
  type UsedPcItem,
} from '../types';
import { uploadPcImage } from '../utils/uploadPcImage';

interface StaffWorkbenchModalProps {
  open: boolean;
  onClose: () => void;
  onInventoryUpdated: () => void;
  onTicketUpdated: (ticketId: string) => void;
}

type WorkbenchTab = 'tickets' | 'inventory' | 'orders' | 'consultations';

export function StaffWorkbenchModal({
  open,
  onClose,
  onInventoryUpdated,
  onTicketUpdated,
}: StaffWorkbenchModalProps) {
  const [activeTab, setActiveTab] = useState<WorkbenchTab>('tickets');
  const [tickets, setTickets] = useState<RepairTicket[]>([]);
  const [inventory, setInventory] = useState<UsedPcItem[]>([]);
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [consultations, setConsultations] = useState<ConsultationRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  // Add Used PC form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<PcCategory>('Business Laptop');
  const [newCpu, setNewCpu] = useState('');
  const [newRam, setNewRam] = useState('');
  const [newStorage, setNewStorage] = useState('');
  const [newGpu, setNewGpu] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  async function loadAllData() {
    setLoading(true);
    try {
      const [tRes, iRes, oRes, cRes] = await Promise.all([
        fetch('/api/tickets?scope=staff'),
        fetch('/api/inventory'),
        fetch('/api/orders'),
        fetch('/api/consultations'),
      ]);
      const tData = (await tRes.json()) as { tickets?: RepairTicket[] };
      const iData = (await iRes.json()) as { items?: UsedPcItem[] };
      const oData = (await oRes.json()) as { orders?: OrderRecord[] };
      const cData = (await cRes.json()) as { consultations?: ConsultationRequest[] };
      setTickets(tData.tickets ?? []);
      setInventory(iData.items ?? []);
      setOrders(oData.orders ?? []);
      setConsultations(cData.consultations ?? []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (open) {
      void loadAllData();
      setFeedback(null);
    }
  }, [open]);

  if (!open) return null;

  async function handleTicketSave(ticket: RepairTicket) {
    setSavingId(ticket.id);
    setFeedback(null);
    try {
      const res = await fetch(`/api/tickets/${encodeURIComponent(ticket.id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: ticket.status,
          technicianNotes: ticket.technicianNotes,
          estimatedCost: ticket.estimatedCost,
        }),
      });
      if (res.ok) {
        setFeedback(`Saved bench update for ${ticket.id}.`);
        onTicketUpdated(ticket.id);
      }
    } finally {
      setSavingId(null);
    }
  }

  async function handleInventoryStatus(id: string, status: PcStatus) {
    setSavingId(id);
    setFeedback(null);
    try {
      const res = await fetch(`/api/inventory/${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setInventory((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)));
        onInventoryUpdated();
        setFeedback(`Updated ${id} status to ${status}.`);
      }
    } finally {
      setSavingId(null);
    }
  }

  async function handleNewPcPhoto(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setFeedback(null);
    setUploadingPhoto(true);
    try {
      const url = await uploadPcImage(file);
      setNewImageUrl(url);
    } catch (err) {
      setFeedback(err instanceof Error ? err.message : 'Failed to upload photo.');
    } finally {
      setUploadingPhoto(false);
    }
  }

  async function handleExistingPcPhoto(pcId: string, e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setSavingId(pcId);
    setFeedback(null);
    try {
      const imageUrl = await uploadPcImage(file);
      const res = await fetch(`/api/inventory/${encodeURIComponent(pcId)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl }),
      });
      if (res.ok) {
        setInventory((prev) => prev.map((item) => (item.id === pcId ? { ...item, imageUrl } : item)));
        onInventoryUpdated();
        setFeedback(`Updated photo for ${pcId}.`);
      }
    } catch (err) {
      setFeedback(err instanceof Error ? err.message : 'Failed to update photo.');
    } finally {
      setSavingId(null);
    }
  }

  async function handleDeletePc(pcId: string) {
    setSavingId(pcId);
    setFeedback(null);
    try {
      const res = await fetch(`/api/inventory/${encodeURIComponent(pcId)}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setInventory((prev) => prev.filter((item) => item.id !== pcId));
        onInventoryUpdated();
        setFeedback(`Removed ${pcId} from Used PC storefront.`);
      }
    } finally {
      setSavingId(null);
    }
  }

  async function handleAddPc(e: FormEvent) {
    e.preventDefault();
    setFeedback(null);
    const priceNum = Number(newPrice);
    if (!newTitle.trim() || !newCpu.trim() || !newRam.trim() || !newStorage.trim() || !priceNum) {
      return;
    }

    setSavingId('NEW-PC');
    try {
      const res = await fetch('/api/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle.trim(),
          category: newCategory,
          cpu: newCpu.trim(),
          ram: newRam.trim(),
          storage: newStorage.trim(),
          gpu: newGpu.trim() || 'Integrated Graphics',
          price: priceNum,
          imageUrl: newImageUrl,
        }),
      });
      const data = (await res.json()) as { item?: UsedPcItem };
      if (res.ok && data.item) {
        setInventory((prev) => [data.item!, ...prev]);
        onInventoryUpdated();
        setNewTitle('');
        setNewCpu('');
        setNewRam('');
        setNewStorage('');
        setNewGpu('');
        setNewPrice('');
        setNewImageUrl('');
        setFeedback(`Added ${data.item.title} (${data.item.id}) to Used PC storefront.`);
      }
    } finally {
      setSavingId(null);
    }
  }

  async function handleOrderStatus(id: string, status: OrderRecord['status']) {
    setSavingId(id);
    setFeedback(null);
    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
        if (status === 'Fulfilled') {
          onInventoryUpdated();
          void loadAllData();
        }
        setFeedback(`Updated PC order ${id} to ${status}.`);
      }
    } finally {
      setSavingId(null);
    }
  }

  async function handleConsultationStatus(id: string, status: ConsultationStatus) {
    setSavingId(id);
    setFeedback(null);
    try {
      const res = await fetch(`/api/consultations/${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setConsultations((prev) =>
          prev.map((c) => (c.id === id ? { ...c, status } : c)),
        );
        setFeedback(`Updated consultation ${id} to ${status}.`);
      }
    } finally {
      setSavingId(null);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Office Staff Workbench"
    >
      <div className="bg-white border border-slate-200 rounded-xl max-w-5xl w-full h-[88vh] flex flex-col overflow-hidden shadow-2xl">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-lg font-bold text-slate-900">
              Office Staff Workbench
            </h2>
            <p className="text-xs text-slate-500">
              Manage repair bench tickets, used PC inventory, and IT consulting queue
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close staff workbench"
            className="p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-1 p-1 bg-slate-200/70 rounded-lg">
            {(
              [
                { id: 'tickets', label: `Repair Tickets (${tickets.length})` },
                { id: 'inventory', label: `Used PC Stock (${inventory.length})` },
                { id: 'orders', label: `PC Orders (${orders.length})` },
                { id: 'consultations', label: `IT Consultations (${consultations.length})` },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {feedback && (
            <span className="text-xs font-medium text-emerald-700">{feedback}</span>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="py-12 text-center text-sm text-slate-500">
              Loading bench records...
            </div>
          ) : activeTab === 'tickets' ? (
            <div className="space-y-4">
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="p-5 rounded-xl border border-slate-200 bg-white space-y-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="text-xs text-slate-500">
                        <span className="font-mono font-semibold text-slate-900">
                          {ticket.id}
                        </span>
                        {' · '}
                        <span>{SERVICE_CATEGORY_LABELS[ticket.category]}</span>
                        {' · '}
                        <span>
                          {ticket.customerName} ({ticket.phone})
                        </span>
                      </div>
                      <h3 className="font-display text-base font-bold text-slate-900 mt-0.5">
                        {ticket.deviceModel}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1">{ticket.issueSummary}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={ticket.status}
                        onChange={(e) => {
                          const status = e.target.value as TicketStatus;
                          setTickets((prev) =>
                            prev.map((t) => (t.id === ticket.id ? { ...t, status } : t)),
                          );
                        }}
                        className="px-3 py-1.5 text-xs font-semibold border border-slate-300 rounded-lg bg-white"
                      >
                        {TICKET_STAGES.map((stage) => (
                          <option key={stage} value={stage}>
                            {stage}
                          </option>
                        ))}
                      </select>

                      <div className="flex items-center border border-slate-300 rounded-lg overflow-hidden">
                        <span className="px-2 text-xs text-slate-500 bg-slate-50">ETB</span>
                        <input
                          type="number"
                          min={0}
                          value={ticket.estimatedCost}
                          onChange={(e) => {
                            const estimatedCost = Number(e.target.value) || 0;
                            setTickets((prev) =>
                              prev.map((t) =>
                                t.id === ticket.id ? { ...t, estimatedCost } : t,
                              ),
                            );
                          }}
                          className="w-20 px-2 py-1.5 text-xs font-mono tabular-nums focus:outline-none"
                        />
                      </div>

                      <button
                        type="button"
                        disabled={savingId === ticket.id}
                        onClick={() => void handleTicketSave(ticket)}
                        className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg cursor-pointer"
                      >
                        {savingId === ticket.id ? 'Saving...' : 'Save'}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                      Technician Bench Notes (Visible in Public Tracker)
                    </label>
                    <input
                      type="text"
                      value={ticket.technicianNotes}
                      onChange={(e) => {
                        const technicianNotes = e.target.value;
                        setTickets((prev) =>
                          prev.map((t) =>
                            t.id === ticket.id ? { ...t, technicianNotes } : t,
                          ),
                        );
                      }}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:border-blue-700"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : activeTab === 'inventory' ? (
            <div className="space-y-6">
              <form
                onSubmit={handleAddPc}
                className="p-5 rounded-xl border border-slate-200 bg-slate-50 space-y-3"
              >
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <Plus className="w-4 h-4 text-blue-700" />
                  <span>Add Certified Used PC to Storefront</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  <input
                    type="text"
                    required
                    placeholder="Model (e.g. ThinkPad X1 Carbon)"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg"
                  />
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as PcCategory)}
                    className="px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg"
                  >
                    <option value="Business Laptop">Business Laptop</option>
                    <option value="Workstation">Workstation</option>
                    <option value="Office Desktop">Office Desktop</option>
                  </select>
                  <input
                    type="text"
                    required
                    placeholder="CPU (e.g. Core i7-1365U)"
                    value={newCpu}
                    onChange={(e) => setNewCpu(e.target.value)}
                    className="px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg"
                  />
                  <input
                    type="text"
                    required
                    placeholder="RAM (e.g. 16GB DDR5)"
                    value={newRam}
                    onChange={(e) => setNewRam(e.target.value)}
                    className="px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Storage (e.g. 512GB NVMe)"
                    value={newStorage}
                    onChange={(e) => setNewStorage(e.target.value)}
                    className="px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="GPU (optional)"
                    value={newGpu}
                    onChange={(e) => setNewGpu(e.target.value)}
                    className="px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg"
                  />
                  <input
                    type="number"
                    required
                    min={50}
                    placeholder="Price ETB (e.g. 65000)"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg font-mono"
                  />
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-3">
                    {newImageUrl ? (
                      <div className="flex items-center gap-2">
                        <img
                          src={newImageUrl}
                          alt="New PC preview"
                          className="w-14 h-10 object-cover rounded-md border border-slate-300"
                        />
                        <button
                          type="button"
                          onClick={() => setNewImageUrl('')}
                          className="text-xs font-medium text-red-700 hover:underline cursor-pointer"
                        >
                          Remove photo
                        </button>
                      </div>
                    ) : (
                      <label className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#14369E] bg-white border border-slate-300 hover:border-[#14369E] rounded-lg cursor-pointer">
                        <ImagePlus className="w-3.5 h-3.5" />
                        <span>{uploadingPhoto ? 'Uploading...' : 'Attach PC Photo'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          disabled={uploadingPhoto}
                          onChange={(e) => void handleNewPcPhoto(e)}
                          className="sr-only"
                        />
                      </label>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={savingId === 'NEW-PC' || uploadingPhoto}
                    className="px-4 py-2 text-xs font-semibold text-white bg-[#14369E] hover:bg-[#0B1F5B] rounded-lg cursor-pointer"
                  >
                    {savingId === 'NEW-PC' ? 'Adding...' : 'Publish Listing'}
                  </button>
                </div>
              </form>

              <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl bg-white">
                {inventory.map((pc) => (
                  <div
                    key={pc.id}
                    className="p-4 flex flex-wrap items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3.5">
                      <label className="relative w-16 h-12 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shrink-0 flex items-center justify-center cursor-pointer group">
                        {pc.imageUrl ? (
                          <img
                            src={pc.imageUrl}
                            alt={pc.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Camera className="w-4 h-4 text-slate-400 group-hover:text-[#14369E]" />
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          disabled={savingId === pc.id}
                          onChange={(e) => void handleExistingPcPhoto(pc.id, e)}
                          className="sr-only"
                        />
                      </label>

                      <div>
                        <div className="text-xs text-slate-500">
                          <span className="font-mono font-semibold text-slate-800">{pc.id}</span>
                          {' · '}
                          <span>{pc.category}</span>
                          {' · '}
                          <span className="font-mono">{pc.price.toLocaleString()} ETB</span>
                        </div>
                        <div className="text-sm font-semibold text-slate-900">{pc.title}</div>
                        <div className="text-xs text-slate-600">
                          {pc.cpu} · {pc.ram} · {pc.storage}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5">
                      {(['Available', 'Reserved', 'Sold'] as PcStatus[]).map((statusOption) => (
                        <button
                          key={statusOption}
                          type="button"
                          disabled={savingId === pc.id}
                          onClick={() => void handleInventoryStatus(pc.id, statusOption)}
                          className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-colors cursor-pointer ${
                            pc.status === statusOption
                              ? 'bg-[#0B1F5B] text-white border-[#0B1F5B]'
                              : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
                          }`}
                        >
                          {statusOption}
                        </button>
                      ))}
                      <button
                        type="button"
                        disabled={savingId === pc.id}
                        onClick={() => void handleDeletePc(pc.id)}
                        aria-label={`Delete ${pc.title}`}
                        className="p-1.5 text-slate-500 hover:text-red-700 border border-slate-200 hover:border-red-300 rounded-md cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : activeTab === 'orders' ? (
            <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl bg-white">
              {orders.length === 0 ? (
                <div className="p-10 text-center text-sm text-slate-500">
                  No PC reservation orders have been placed yet.
                </div>
              ) : (
                orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-5 flex flex-wrap items-start justify-between gap-4"
                  >
                    <div className="max-w-xl space-y-1">
                      <div className="text-xs text-slate-500">
                        <span className="font-mono font-semibold text-slate-900">{order.id}</span>
                        {' · '}
                        <span>{order.deliveryMethod}</span>
                        {' · '}
                        <span className="font-mono font-semibold text-slate-900">
                          {order.total.toLocaleString()} ETB
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-slate-900">
                        {order.customerName} ({order.phone})
                      </h3>
                      <p className="text-xs text-slate-600">
                        {order.email} · {order.address}
                      </p>
                      <p className="text-xs text-slate-700">
                        {order.items.map((it) => `${it.title} (${it.id})`).join(', ')}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {(['Confirmed', 'Ready', 'Fulfilled'] as Array<OrderRecord['status']>).map(
                        (statusOption) => (
                          <button
                            key={statusOption}
                            type="button"
                            disabled={savingId === order.id}
                            onClick={() => void handleOrderStatus(order.id, statusOption)}
                            className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-colors cursor-pointer ${
                              order.status === statusOption
                                ? 'bg-[#14369E] text-white border-[#14369E]'
                                : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
                            }`}
                          >
                            {statusOption}
                          </button>
                        ),
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl bg-white">
              {consultations.map((c) => (
                <div
                  key={c.id}
                  className="p-5 flex flex-wrap items-start justify-between gap-4"
                >
                  <div className="max-w-xl">
                    <div className="text-xs text-slate-500">
                      <span className="font-mono font-semibold text-slate-900">{c.id}</span>
                      {' · '}
                      <span>{c.focusArea}</span>
                      {' · '}
                      <span>Team: {c.teamSize}</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                      {c.companyName} — {c.contactName}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1">
                      {c.email} · {c.phone} · Preferred date: {c.preferredDate}
                    </p>
                    {c.notes && <p className="text-xs text-slate-700 mt-2">{c.notes}</p>}
                  </div>

                  <div className="flex items-center gap-1.5">
                    {(['Requested', 'Scheduled', 'Completed'] as ConsultationStatus[]).map(
                      (statusOption) => (
                        <button
                          key={statusOption}
                          type="button"
                          disabled={savingId === c.id}
                          onClick={() => void handleConsultationStatus(c.id, statusOption)}
                          className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition-colors cursor-pointer ${
                            c.status === statusOption
                              ? 'bg-blue-700 text-white border-blue-700'
                              : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
                          }`}
                        >
                          {statusOption}
                        </button>
                      ),
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

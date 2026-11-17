import { Camera, ImagePlus, Plus, Search, ShoppingBag, SlidersHorizontal, Trash2, X } from 'lucide-react';
import { useMemo, useState, type ChangeEvent } from 'react';
import { useI18n } from '../i18n';
import type { PcCategory, UsedPcItem } from '../types';
import { uploadPcImage } from '../utils/uploadPcImage';
import { AddUsedPcModal } from './AddUsedPcModal';
import { ImageWithFallback } from './ImageWithFallback';

interface UsedPcCatalogProps {
  items: UsedPcItem[];
  loading: boolean;
  error: string | null;
  cartIds: string[];
  onAddToCart: (item: UsedPcItem) => void;
  onOpenCart: () => void;
  onInventoryUpdated: () => void;
}

const CATEGORIES: Array<'All' | PcCategory> = [
  'All',
  'Business Laptop',
  'Workstation',
  'Office Desktop',
];

export function UsedPcCatalog({
  items,
  loading,
  error,
  cartIds,
  onAddToCart,
  onOpenCart,
  onInventoryUpdated,
}: UsedPcCatalogProps) {
  const { t } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState<'All' | PcCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [inspectedPc, setInspectedPc] = useState<UsedPcItem | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return items.filter((item) => {
      if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;
      if (onlyAvailable && item.status !== 'Available') return false;
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.cpu.toLowerCase().includes(q) ||
        item.ram.toLowerCase().includes(q) ||
        item.gpu.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    });
  }, [items, selectedCategory, searchQuery, onlyAvailable]);

  async function handleCardPhotoUpload(pcId: string, e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    setUploadError(null);
    setUploadingId(pcId);
    try {
      const imageUrl = await uploadPcImage(file);
      const res = await fetch(`/api/inventory/${encodeURIComponent(pcId)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl }),
      });
      if (!res.ok) {
        throw new Error('Could not save photo to listing.');
      }
      if (inspectedPc?.id === pcId) {
        setInspectedPc({ ...inspectedPc, imageUrl });
      }
      onInventoryUpdated();
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Failed to upload photo.');
    } finally {
      setUploadingId(null);
    }
  }

  async function handleRemoveCardPhoto(pcId: string) {
    setUploadError(null);
    setUploadingId(pcId);
    try {
      const res = await fetch(`/api/inventory/${encodeURIComponent(pcId)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl: '' }),
      });
      if (!res.ok) {
        throw new Error('Could not remove photo.');
      }
      if (inspectedPc?.id === pcId) {
        setInspectedPc({ ...inspectedPc, imageUrl: '' });
      }
      onInventoryUpdated();
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Failed to remove photo.');
    } finally {
      setUploadingId(null);
    }
  }

  return (
    <section id="used-pcs" className="py-16 lg:py-24 bg-kevlar-surface border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wide text-[#14369E] mb-2">
              {t.catalog.kicker}
            </p>
            <h2
              className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-slate-900"
              style={{ textWrap: 'balance' }}
            >
              {t.catalog.heading}
            </h2>
            <p className="mt-3 text-base text-slate-600 leading-relaxed">
              {t.catalog.subheading}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 self-start lg:self-auto">
            <button
              type="button"
              onClick={() => setAddModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>{t.catalog.addPcBtn}</span>
            </button>

            <button
              type="button"
              onClick={onOpenCart}
              className="inline-flex items-center gap-2.5 px-4 py-2.5 text-sm font-semibold text-slate-900 bg-[#EEF3FC] hover:bg-[#E1EAFA] border border-blue-950/15 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4 text-[#14369E]" />
              <span>{t.catalog.reservationCart}</span>
              <span className="font-mono text-xs font-semibold text-[#14369E] tabular-nums">
                ({cartIds.length})
              </span>
            </button>
          </div>
        </div>

        {/* Storefront Filter Toolbar */}
        <div className="mt-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div
            role="tablist"
            aria-label="Filter used PCs by category"
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#EEF3FC] rounded-lg self-start"
          >
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#0B1F5B] text-white shadow-sm'
                      : 'text-slate-700 hover:text-slate-900'
                  }`}
                >
                  {t.catalog.categories[cat]}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <label className="relative flex-1 sm:flex-initial">
              <span className="sr-only">{t.catalog.searchPlaceholder}</span>
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.catalog.searchPlaceholder}
                className="w-full sm:w-64 pl-9 pr-3 py-2 text-sm bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#14369E] focus:ring-1 focus:ring-[#14369E]"
              />
            </label>

            <button
              type="button"
              onClick={() => setOnlyAvailable((prev) => !prev)}
              aria-pressed={onlyAvailable}
              className={`inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                onlyAvailable
                  ? 'bg-[#14369E] text-white border-[#14369E]'
                  : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>{t.catalog.inStockOnly}</span>
            </button>
          </div>
        </div>

        {uploadError && (
          <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-xs font-medium text-red-800 flex items-center justify-between gap-4">
            <span>{uploadError}</span>
            <button
              type="button"
              onClick={() => setUploadError(null)}
              className="text-red-700 hover:text-red-900 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Inventory Grid */}
        {loading ? (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-96 rounded-xl border border-slate-200 bg-slate-50 animate-pulse"
              />
            ))}
          </div>
        ) : error ? (
          <div className="mt-8 p-6 rounded-xl border border-red-200 bg-red-50 text-sm text-red-800">
            {error}
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="mt-8 p-10 text-center rounded-xl border border-slate-200 bg-slate-50">
            <p className="text-base font-semibold text-slate-900">
              {t.catalog.noMatchesTitle}
            </p>
            <p className="mt-1 text-sm text-slate-600">
              {t.catalog.noMatchesDesc}
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setOnlyAvailable(false);
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-white bg-[#0B1F5B] hover:bg-[#14369E] rounded-lg cursor-pointer"
            >
              {t.catalog.resetFilters}
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((pc) => {
              const inCart = cartIds.includes(pc.id);
              const isAvailable = pc.status === 'Available';
              const isUploading = uploadingId === pc.id;
              const hasPhoto = Boolean(pc.imageUrl && pc.imageUrl.trim());

              return (
                <article
                  key={pc.id}
                  className="group flex flex-col justify-between bg-white border border-slate-200 rounded-xl overflow-hidden transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div>
                    <div className="relative aspect-[4/3] w-full bg-[#EEF3FC] border-b border-slate-200 overflow-hidden">
                      {hasPhoto ? (
                        <>
                          <ImageWithFallback
                            src={pc.imageUrl}
                            alt={`${pc.title} — ${pc.category}`}
                            fallbackLabel={pc.title}
                            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                          />
                          <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5">
                            <label className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-semibold text-white bg-[#060f29]/85 hover:bg-[#14369E] rounded-md backdrop-blur-xs cursor-pointer shadow-sm transition-colors">
                              <Camera className="w-3 h-3" />
                              <span>{isUploading ? t.catalog.uploadingPhoto : t.catalog.changePhoto}</span>
                              <input
                                type="file"
                                accept="image/*"
                                disabled={isUploading}
                                onChange={(e) => void handleCardPhotoUpload(pc.id, e)}
                                className="sr-only"
                              />
                            </label>
                            <button
                              type="button"
                              disabled={isUploading}
                              onClick={() => void handleRemoveCardPhoto(pc.id)}
                              aria-label={`${t.catalog.removePhoto} ${pc.title}`}
                              className="inline-flex items-center p-1.5 text-white bg-[#060f29]/85 hover:bg-red-700 rounded-md backdrop-blur-xs cursor-pointer shadow-sm transition-colors"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </>
                      ) : (
                        <label className="w-full h-full flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:bg-[#E4ECFA] transition-colors">
                          <div className="w-12 h-12 rounded-xl bg-white border border-blue-950/15 flex items-center justify-center mb-3 shadow-xs">
                            <ImagePlus className="w-6 h-6 text-[#14369E]" strokeWidth={1.6} />
                          </div>
                          <span className="text-xs font-medium text-slate-600 mb-2">
                            {t.catalog.noPhotoYet}
                          </span>
                          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#14369E] hover:bg-[#0B1F5B] rounded-lg transition-colors">
                            <Camera className="w-3.5 h-3.5" />
                            <span>{isUploading ? t.catalog.uploadingPhoto : t.catalog.uploadPhoto}</span>
                          </span>
                          <input
                            type="file"
                            accept="image/*"
                            disabled={isUploading}
                            onChange={(e) => void handleCardPhotoUpload(pc.id, e)}
                            className="sr-only"
                          />
                        </label>
                      )}
                    </div>

                    <div className="p-5">
                      <div className="flex items-center justify-between gap-2 text-xs text-slate-500">
                        <span>
                          {t.catalog.categories[pc.category]} · {pc.conditionGrade}
                        </span>
                        <span
                          className={`font-medium ${
                            pc.status === 'Available'
                              ? 'text-emerald-700'
                              : pc.status === 'Reserved'
                                ? 'text-amber-700'
                                : 'text-slate-500'
                          }`}
                        >
                          {t.catalog.statuses[pc.status]}
                        </span>
                      </div>

                      <h3 className="mt-1.5 font-display text-base font-semibold text-slate-900">
                        {pc.title}
                      </h3>

                      <dl className="mt-3 space-y-1 text-xs text-slate-600">
                        <div className="flex justify-between gap-2">
                          <dt className="text-slate-400">{t.catalog.processor}</dt>
                          <dd className="font-mono text-slate-800 text-right truncate">
                            {pc.cpu}
                          </dd>
                        </div>
                        <div className="flex justify-between gap-2">
                          <dt className="text-slate-400">{t.catalog.memorySsd}</dt>
                          <dd className="font-mono text-slate-800 text-right truncate">
                            {pc.ram} · {pc.storage}
                          </dd>
                        </div>
                        <div className="flex justify-between gap-2">
                          <dt className="text-slate-400">{t.catalog.graphics}</dt>
                          <dd className="font-mono text-slate-800 text-right truncate">
                            {pc.gpu}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                    <div>
                      <div className="font-mono text-lg font-semibold text-slate-900 tabular-nums">
                        {pc.price.toLocaleString()} ETB
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {pc.warrantyMonths}{t.catalog.warrantyUnit}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setInspectedPc(pc)}
                        className="px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 border border-slate-200 hover:border-slate-300 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        {t.catalog.fullSpecs}
                      </button>
                      <button
                        type="button"
                        disabled={!isAvailable || inCart}
                        onClick={() => onAddToCart(pc)}
                        className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                          inCart
                            ? 'bg-slate-100 text-slate-700 border border-slate-300 cursor-default'
                            : isAvailable
                              ? 'bg-[#14369E] hover:bg-[#0B1F5B] text-white cursor-pointer'
                              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        {inCart
                          ? t.catalog.inCart
                          : isAvailable
                            ? t.catalog.reserve
                            : t.catalog.statuses[pc.status]}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Product Specification Detail Modal */}
      {inspectedPc && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pc-modal-title"
        >
          <div className="bg-white border border-slate-200 rounded-xl max-w-2xl w-full overflow-hidden shadow-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
              <div>
                <p className="text-xs text-slate-500">
                  {inspectedPc.id} · {t.catalog.categories[inspectedPc.category]} · {inspectedPc.conditionGrade}
                </p>
                <h3
                  id="pc-modal-title"
                  className="font-display text-lg font-bold text-slate-900"
                >
                  {inspectedPc.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setInspectedPc(null)}
                aria-label="Close specifications modal"
                className="p-2 text-slate-500 hover:text-slate-900 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2.5">
                <div className="aspect-[4/3] rounded-lg overflow-hidden bg-[#EEF3FC] border border-slate-200">
                  <ImageWithFallback
                    src={inspectedPc.imageUrl}
                    alt={inspectedPc.title}
                    fallbackLabel={t.catalog.noPhotoYet}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#14369E] hover:bg-[#0B1F5B] rounded-lg cursor-pointer">
                    <Camera className="w-3.5 h-3.5" />
                    <span>
                      {uploadingId === inspectedPc.id
                        ? t.catalog.uploadingPhoto
                        : inspectedPc.imageUrl
                          ? t.catalog.changePhoto
                          : t.catalog.uploadPhoto}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploadingId === inspectedPc.id}
                      onChange={(e) => void handleCardPhotoUpload(inspectedPc.id, e)}
                      className="sr-only"
                    />
                  </label>
                  {inspectedPc.imageUrl && (
                    <button
                      type="button"
                      disabled={uploadingId === inspectedPc.id}
                      onClick={() => void handleRemoveCardPhoto(inspectedPc.id)}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-red-700 border border-slate-300 rounded-lg cursor-pointer"
                    >
                      {t.catalog.removePhoto}
                    </button>
                  )}
                </div>
              </div>

              <div className="flex flex-col justify-between">
                <dl className="space-y-2.5 text-sm">
                  <div className="flex justify-between gap-3 pb-2 border-b border-slate-100">
                    <dt className="text-slate-500">{t.catalog.processor}</dt>
                    <dd className="font-mono text-slate-900 text-right">{inspectedPc.cpu}</dd>
                  </div>
                  <div className="flex justify-between gap-3 pb-2 border-b border-slate-100">
                    <dt className="text-slate-500">{t.catalog.memorySsd}</dt>
                    <dd className="font-mono text-slate-900 text-right">
                      {inspectedPc.ram} · {inspectedPc.storage}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-3 pb-2 border-b border-slate-100">
                    <dt className="text-slate-500">{t.catalog.graphics}</dt>
                    <dd className="font-mono text-slate-900 text-right">{inspectedPc.gpu}</dd>
                  </div>
                  <div className="flex justify-between gap-3 pb-2 border-b border-slate-100">
                    <dt className="text-slate-500">{t.catalog.displayChassis}</dt>
                    <dd className="font-mono text-slate-900 text-right">{inspectedPc.display}</dd>
                  </div>
                </dl>

                <p className="mt-4 text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-200">
                  {inspectedPc.notes}
                </p>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-4">
              <div>
                <span className="font-mono text-2xl font-bold text-slate-900 tabular-nums">
                  {inspectedPc.price.toLocaleString()} ETB
                </span>
                <span className="ml-2 text-xs text-slate-500">
                  {t.catalog.includesWarranty}
                </span>
              </div>

              <button
                type="button"
                disabled={inspectedPc.status !== 'Available' || cartIds.includes(inspectedPc.id)}
                onClick={() => {
                  onAddToCart(inspectedPc);
                  setInspectedPc(null);
                }}
                className="px-5 py-2.5 text-sm font-semibold text-white bg-[#14369E] hover:bg-[#0B1F5B] disabled:bg-slate-300 disabled:text-slate-600 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                {cartIds.includes(inspectedPc.id)
                  ? t.catalog.addedToCart
                  : inspectedPc.status === 'Available'
                    ? t.catalog.addToReservationCart
                    : t.catalog.statuses[inspectedPc.status]}
              </button>
            </div>
          </div>
        </div>
      )}

      <AddUsedPcModal
        open={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onCreated={() => {
          onInventoryUpdated();
        }}
      />
    </section>
  );
}

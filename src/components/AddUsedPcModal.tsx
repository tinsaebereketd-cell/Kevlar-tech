import { ImagePlus, Trash2, Upload, X } from 'lucide-react';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { useI18n } from '../i18n';
import type { PcCategory, UsedPcItem } from '../types';
import { uploadPcImage } from '../utils/uploadPcImage';

interface AddUsedPcModalProps {
  open: boolean;
  onClose: () => void;
  onCreated: (item: UsedPcItem) => void;
}

export function AddUsedPcModal({ open, onClose, onCreated }: AddUsedPcModalProps) {
  const { t } = useI18n();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<PcCategory>('Business Laptop');
  const [conditionGrade, setConditionGrade] = useState<'Grade A+' | 'Grade A'>('Grade A+');
  const [price, setPrice] = useState('');
  const [cpu, setCpu] = useState('');
  const [ram, setRam] = useState('');
  const [storage, setStorage] = useState('');
  const [gpu, setGpu] = useState('');
  const [display, setDisplay] = useState('');
  const [warrantyMonths, setWarrantyMonths] = useState('12');
  const [notes, setNotes] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    setError(null);
    setUploadingPhoto(true);
    try {
      const uploadedUrl = await uploadPcImage(file);
      setImageUrl(uploadedUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload photo.');
    } finally {
      setUploadingPhoto(false);
    }
  }

  function resetAndClose() {
    setError(null);
    onClose();
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    const parsedPrice = Number(price);
    if (!title.trim() || !cpu.trim() || !ram.trim() || !storage.trim() || !Number.isFinite(parsedPrice) || parsedPrice <= 0) {
      setError('Please fill in the model name, CPU, RAM, storage, and a valid ETB price.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          category,
          conditionGrade,
          price: Math.round(parsedPrice),
          cpu: cpu.trim(),
          ram: ram.trim(),
          storage: storage.trim(),
          gpu: gpu.trim() || 'Integrated Graphics',
          display: display.trim() || 'Standard Output',
          warrantyMonths: Number(warrantyMonths) > 0 ? Number(warrantyMonths) : 12,
          notes: notes.trim(),
          imageUrl,
        }),
      });
      const data = (await res.json()) as { item?: UsedPcItem; error?: string };
      if (!res.ok || !data.item) {
        setError(data.error ?? 'Could not publish PC listing.');
        return;
      }

      setTitle('');
      setPrice('');
      setCpu('');
      setRam('');
      setStorage('');
      setGpu('');
      setDisplay('');
      setNotes('');
      setImageUrl('');
      onCreated(data.item);
      onClose();
    } catch {
      setError('Network error while saving PC listing.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-pc-modal-title"
    >
      <div className="bg-white border border-slate-200 rounded-xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        <div className="px-6 py-4 bg-[#060f29] text-white flex items-center justify-between gap-4">
          <div>
            <h3 id="add-pc-modal-title" className="font-display text-lg font-bold">
              {t.catalog.addModalTitle}
            </h3>
            <p className="text-xs text-slate-300">{t.catalog.addModalSubtitle}</p>
          </div>
          <button
            type="button"
            onClick={resetAndClose}
            aria-label="Close add PC modal"
            className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Real Photo Uploader */}
          <div>
            <div className="text-xs font-semibold text-slate-700 mb-2">
              {t.catalog.pcPhotoLabel}
            </div>

            {imageUrl ? (
              <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 aspect-[16/9]">
                <img
                  src={imageUrl}
                  alt={title || 'Uploaded PC preview'}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-3 right-3 flex items-center gap-2">
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#0B1F5B]/90 hover:bg-[#14369E] rounded-lg cursor-pointer shadow-sm">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingPhoto ? t.catalog.uploadingPhoto : t.catalog.changePhoto}</span>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploadingPhoto}
                      onChange={handleFileChange}
                      className="sr-only"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => setImageUrl('')}
                    className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900/85 hover:bg-red-700 rounded-lg cursor-pointer shadow-sm"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>{t.catalog.removePhoto}</span>
                  </button>
                </div>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed border-blue-950/20 bg-[#F4F7FC] hover:border-[#14369E] hover:bg-[#EEF3FC] transition-colors cursor-pointer text-center">
                <ImagePlus className="w-8 h-8 text-[#14369E] mb-2" strokeWidth={1.6} />
                <span className="text-sm font-semibold text-slate-900">
                  {uploadingPhoto ? t.catalog.uploadingPhoto : t.catalog.choosePhotoFile}
                </span>
                <span className="mt-1 text-xs text-slate-500 max-w-sm">
                  {t.catalog.photoHint}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  disabled={uploadingPhoto}
                  onChange={handleFileChange}
                  className="sr-only"
                />
              </label>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.catalog.modelTitleLabel}
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Lenovo ThinkPad X1 Carbon Gen 10"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#14369E]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.catalog.priceEtbLabel}
              </label>
              <input
                type="number"
                required
                min={50}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="65000"
                className="w-full px-3 py-2 text-sm font-mono border border-slate-300 rounded-lg focus:outline-none focus:border-[#14369E]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.catalog.categoryLabel}
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as PcCategory)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:border-[#14369E]"
              >
                <option value="Business Laptop">{t.catalog.categories['Business Laptop']}</option>
                <option value="Workstation">{t.catalog.categories.Workstation}</option>
                <option value="Office Desktop">{t.catalog.categories['Office Desktop']}</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.catalog.gradeLabel}
                </label>
                <select
                  value={conditionGrade}
                  onChange={(e) => setConditionGrade(e.target.value as 'Grade A+' | 'Grade A')}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:border-[#14369E]"
                >
                  <option value="Grade A+">Grade A+</option>
                  <option value="Grade A">Grade A</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  {t.catalog.warrantyMonthsLabel}
                </label>
                <input
                  type="number"
                  min={1}
                  max={36}
                  value={warrantyMonths}
                  onChange={(e) => setWarrantyMonths(e.target.value)}
                  className="w-full px-3 py-2 text-sm font-mono border border-slate-300 rounded-lg focus:outline-none focus:border-[#14369E]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.catalog.processor}
              </label>
              <input
                type="text"
                required
                value={cpu}
                onChange={(e) => setCpu(e.target.value)}
                placeholder="Intel Core i7-1260P"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#14369E]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                RAM
              </label>
              <input
                type="text"
                required
                value={ram}
                onChange={(e) => setRam(e.target.value)}
                placeholder="16GB DDR5"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#14369E]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                SSD / Storage
              </label>
              <input
                type="text"
                required
                value={storage}
                onChange={(e) => setStorage(e.target.value)}
                placeholder="512GB NVMe SSD"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#14369E]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {t.catalog.graphics}
              </label>
              <input
                type="text"
                value={gpu}
                onChange={(e) => setGpu(e.target.value)}
                placeholder="Intel Iris Xe / RTX A2000"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#14369E]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t.catalog.displayLabel}
            </label>
            <input
              type="text"
              value={display}
              onChange={(e) => setDisplay(e.target.value)}
              placeholder='14.0" FHD+ IPS Anti-Glare'
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#14369E]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              {t.catalog.notesLabel}
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={t.catalog.notesPlaceholder}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:border-[#14369E]"
            />
          </div>

          {error && (
            <p className="text-xs font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg p-2.5">
              {error}
            </p>
          )}

          <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-200">
            <button
              type="button"
              onClick={resetAndClose}
              className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 border border-slate-300 rounded-lg cursor-pointer"
            >
              {t.catalog.cancelBtn}
            </button>
            <button
              type="submit"
              disabled={submitting || uploadingPhoto}
              className="px-5 py-2 text-sm font-semibold text-white bg-[#14369E] hover:bg-[#0B1F5B] disabled:opacity-60 rounded-lg cursor-pointer"
            >
              {submitting ? t.catalog.publishingPcBtn : t.catalog.publishPcBtn}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

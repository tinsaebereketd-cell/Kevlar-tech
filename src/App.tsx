import { useCallback, useEffect, useState } from 'react';
import { CartDrawer } from './components/CartDrawer';
import { ConsultingSection } from './components/ConsultingSection';
import { CustomerSuccessSection } from './components/CustomerSuccessSection';
import { Footer } from './components/Footer';
import { FounderSection } from './components/FounderSection';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { RepairBookingModal } from './components/RepairBookingModal';
import { ServicesSection } from './components/ServicesSection';
import { StaffWorkbenchModal } from './components/StaffWorkbenchModal';
import { TicketTrackerSection } from './components/TicketTrackerSection';
import { UsedPcCatalog } from './components/UsedPcCatalog';
import { LanguageProvider } from './i18n';
import type { PublicTicketView, ServiceCategory, TicketUrgency, UsedPcItem } from './types';

function AppContent() {
  const [inventory, setInventory] = useState<UsedPcItem[]>([]);
  const [inventoryLoading, setInventoryLoading] = useState(true);
  const [inventoryError, setInventoryError] = useState<string | null>(null);

  const [cartIds, setCartIds] = useState<string[]>(() => {
    try {
      const raw = window.localStorage.getItem('kevlar_cart_ids');
      if (raw) {
        const parsed = JSON.parse(raw) as unknown;
        if (Array.isArray(parsed)) {
          return parsed.filter((id): id is string => typeof id === 'string');
        }
      }
    } catch {
      // Ignore storage access errors
    }
    return [];
  });
  const [cartOpen, setCartOpen] = useState(false);

  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingCategory, setBookingCategory] = useState<ServiceCategory>('computer_hardware');
  const [bookingInitialIssue, setBookingInitialIssue] = useState('');
  const [bookingInitialUrgency, setBookingInitialUrgency] = useState<TicketUrgency>('standard');

  const [activeTrackedTicketId, setActiveTrackedTicketId] = useState<string | null>(() => {
    try {
      const param = new URLSearchParams(window.location.search).get('ticket');
      return param ? param.trim().toUpperCase() : null;
    } catch {
      return null;
    }
  });
  const [staffWorkbenchOpen, setStaffWorkbenchOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem('kevlar_cart_ids', JSON.stringify(cartIds));
    } catch {
      // Ignore storage access errors
    }
  }, [cartIds]);

  useEffect(() => {
    const canonicalUrl = `${window.location.origin}${window.location.pathname}`;
    let canonicalEl = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.rel = 'canonical';
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.href = canonicalUrl;

    const ogUrl = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    if (ogUrl) ogUrl.content = canonicalUrl;

    const absImage = `${window.location.origin}/assets/aistudio/1794814611168_f37733fc.jpg`;
    const ogImg = document.querySelector<HTMLMetaElement>('meta[property="og:image"]');
    if (ogImg) ogImg.content = absImage;
    const twImg = document.querySelector<HTMLMetaElement>('meta[name="twitter:image"]');
    if (twImg) twImg.content = absImage;

    if (new URLSearchParams(window.location.search).get('ticket')) {
      const el = document.getElementById('track-repair');
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const fetchInventory = useCallback(async () => {
    setInventoryLoading(true);
    setInventoryError(null);
    try {
      const response = await fetch('/api/inventory');
      if (!response.ok) {
        throw new Error('Failed to load used PC catalog.');
      }
      const data = (await response.json()) as { items?: UsedPcItem[] };
      setInventory(data.items ?? []);
    } catch {
      setInventoryError('Unable to load used PC catalog right now. Please refresh.');
    } finally {
      setInventoryLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchInventory();
  }, [fetchInventory]);

  function handleOpenBooking(
    category: ServiceCategory = 'computer_hardware',
    initialIssue = '',
    initialUrgency: TicketUrgency = 'standard',
  ) {
    setBookingCategory(category);
    setBookingInitialIssue(initialIssue);
    setBookingInitialUrgency(initialUrgency);
    setBookingOpen(true);
  }

  function handleAddToCart(item: UsedPcItem) {
    setCartIds((prev) => (prev.includes(item.id) ? prev : [...prev, item.id]));
    setCartOpen(true);
  }

  function handleRemoveFromCart(id: string) {
    setCartIds((prev) => prev.filter((itemId) => itemId !== id));
  }

  function handleOrderComplete() {
    setCartIds([]);
    void fetchInventory();
  }

  function handleTicketCreated(ticket: PublicTicketView) {
    setActiveTrackedTicketId(ticket.id);
    const el = document.getElementById('track-repair');
    el?.scrollIntoView({ behavior: 'smooth' });
  }

  const cartItems = inventory.filter((pc) => cartIds.includes(pc.id) && pc.status === 'Available');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar onOpenBooking={() => handleOpenBooking('computer_hardware')} />

      <main className="flex-1">
        <HeroSection onOpenBooking={handleOpenBooking} />
        <ServicesSection onSelectServiceForBooking={handleOpenBooking} />
        <UsedPcCatalog
          items={inventory}
          loading={inventoryLoading}
          error={inventoryError}
          cartIds={cartIds}
          onAddToCart={handleAddToCart}
          onOpenCart={() => setCartOpen(true)}
          onInventoryUpdated={() => void fetchInventory()}
        />
        <TicketTrackerSection
          activeTicketId={activeTrackedTicketId}
          onOpenBooking={handleOpenBooking}
        />
        <FounderSection onOpenBooking={handleOpenBooking} />
        <CustomerSuccessSection />
        <ConsultingSection />
      </main>

      <Footer onOpenStaffWorkbench={() => setStaffWorkbenchOpen(true)} />

      <RepairBookingModal
        open={bookingOpen}
        initialCategory={bookingCategory}
        initialIssue={bookingInitialIssue}
        initialUrgency={bookingInitialUrgency}
        onClose={() => setBookingOpen(false)}
        onTicketCreated={handleTicketCreated}
      />

      <CartDrawer
        open={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onRemoveItem={handleRemoveFromCart}
        onOrderComplete={handleOrderComplete}
      />

      <StaffWorkbenchModal
        open={staffWorkbenchOpen}
        onClose={() => setStaffWorkbenchOpen(false)}
        onInventoryUpdated={() => void fetchInventory()}
        onTicketUpdated={(id) => setActiveTrackedTicketId(id)}
      />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

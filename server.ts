import express from 'express';
import fs from 'fs';
import path from 'path';
import type {
  ConsultationFocus,
  ConsultationRequest,
  ConsultationStatus,
  OrderRecord,
  PcCategory,
  PcStatus,
  RepairTicket,
  ServiceCategory,
  TicketStatus,
  TicketUrgency,
  UsedPcItem,
} from './src/types.ts';

interface StoreData {
  tickets: RepairTicket[];
  inventory: UsedPcItem[];
  orders: OrderRecord[];
  consultations: ConsultationRequest[];
}

const DATA_DIR = path.resolve(process.cwd(), 'data');
const STORE_PATH = path.join(DATA_DIR, 'store.json');
const UPLOADS_DIR = path.join(DATA_DIR, 'uploads', 'pcs');

const SEED_DATA: StoreData = {
  tickets: [
    {
      id: 'KVT-1041',
      customerName: 'Daniel Okafor',
      phone: '(555) 234-8910',
      email: 'd.okafor@northbridge.example',
      category: 'tv_maintenance',
      deviceModel: 'LG C2 65-Inch 4K OLED TV',
      issueSummary: 'No standby light and clicking relay on power-on after voltage surge.',
      urgency: 'standard',
      status: 'Testing',
      technicianNotes:
        'Replaced primary PFC MOSFETs and bridged fuse on power supply board. Running 4-hour thermal & color uniformity soak test.',
      estimatedCost: 6800,
      createdAt: '2026-11-15T09:30:00.000Z',
      updatedAt: '2026-11-16T16:15:00.000Z',
    },
    {
      id: 'KVT-1042',
      customerName: 'Rachel Lin',
      phone: '(555) 890-4412',
      email: 'rachel@linarchitects.example',
      category: 'projector_maintenance',
      deviceModel: 'Epson PowerLite L530U Laser Projector',
      issueSummary: 'Dim yellow tint in upper quadrant and thermal shutdown after 20 minutes.',
      urgency: 'priority',
      status: 'Ready for Pickup',
      technicianNotes:
        'Ultrasonic cleaning of optical polarizer array, cleared exhaust intake turbine, replaced thermal sensor harness. Luminance restored to 98% spec.',
      estimatedCost: 8200,
      createdAt: '2026-11-14T13:10:00.000Z',
      updatedAt: '2026-11-16T18:00:00.000Z',
    },
    {
      id: 'KVT-1043',
      customerName: 'Marcus Vance',
      phone: '(555) 412-7721',
      email: 'mvance@civicstudio.example',
      category: 'computer_hardware',
      deviceModel: 'Dell XPS 15 9520 Laptop',
      issueSummary: 'USB-C charging port intermittent and severe CPU throttling under load.',
      urgency: 'standard',
      status: 'Diagnosing',
      technicianNotes:
        'Micro-soldering inspection shows fractured CC-line pins on Type-C controller. Replacing port assembly and renewing PTM7950 thermal interface.',
      estimatedCost: 4500,
      createdAt: '2026-11-16T11:20:00.000Z',
      updatedAt: '2026-11-16T14:40:00.000Z',
    },
  ],
  inventory: [
    {
      id: 'PC-201',
      title: 'Lenovo ThinkPad T14 Gen 3',
      category: 'Business Laptop',
      cpu: 'Intel Core i7-1260P (12-Core)',
      ram: '16GB DDR4-3200',
      storage: '512GB Gen4 NVMe SSD',
      gpu: 'Intel Iris Xe Graphics',
      display: '14.0" FHD+ IPS Anti-Glare',
      conditionGrade: 'Grade A+',
      warrantyMonths: 12,
      price: 68000,
      status: 'Available',
      imageUrl: '',
      notes: 'Battery health tested at 94%, fresh thermal paste, licensed Windows 11 Pro clean image.',
    },
    {
      id: 'PC-202',
      title: 'Dell Precision 3660 Tower',
      category: 'Workstation',
      cpu: 'Intel Core i7-13700K (16-Core)',
      ram: '32GB DDR5 ECC',
      storage: '1TB NVMe + 2TB SATA',
      gpu: 'NVIDIA RTX A2000 12GB',
      display: 'Dual DisplayPort 1.4 Ready',
      conditionGrade: 'Grade A+',
      warrantyMonths: 12,
      price: 135000,
      status: 'Available',
      imageUrl: '',
      notes: 'Stress-tested for CAD, Revit, and multi-stream 4K editing. Zero acoustic coil whine.',
    },
    {
      id: 'PC-203',
      title: 'ThinkCentre M80q Tiny Gen 3',
      category: 'Office Desktop',
      cpu: 'Intel Core i5-12500T (6-Core)',
      ram: '16GB DDR4-3200',
      storage: '512GB NVMe SSD',
      gpu: 'Intel UHD 770 (Triple 4K Out)',
      display: 'Ultra-Compact 1L Chassis',
      conditionGrade: 'Grade A+',
      warrantyMonths: 12,
      price: 46000,
      status: 'Available',
      imageUrl: '',
      notes: 'Silent office deployment unit with Wi-Fi 6E, Gigabit LAN, and VESA mount bracket included.',
    },
    {
      id: 'PC-204',
      title: 'HP EliteBook 840 G9',
      category: 'Business Laptop',
      cpu: 'Intel Core i5-1245U (10-Core)',
      ram: '16GB DDR5-4800',
      storage: '512GB NVMe SSD',
      gpu: 'Intel Iris Xe Graphics',
      display: '14.0" 1920x1200 Matte IPS',
      conditionGrade: 'Grade A',
      warrantyMonths: 12,
      price: 62000,
      status: 'Available',
      imageUrl: '',
      notes: 'CNC aluminum chassis, Bang & Olufsen audio checked, dual Thunderbolt 4 ports verified.',
    },
    {
      id: 'PC-205',
      title: 'Lenovo ThinkStation P360',
      category: 'Workstation',
      cpu: 'Intel Core i9-12900 (16-Core)',
      ram: '64GB DDR5-4400',
      storage: '2TB Gen4 NVMe RAID',
      gpu: 'NVIDIA RTX 3070 8GB',
      display: 'Quad Display Output',
      conditionGrade: 'Grade A+',
      warrantyMonths: 12,
      price: 168000,
      status: 'Available',
      imageUrl: '',
      notes: 'ISV-certified tower rebuilt with 750W Platinum PSU and 24-hour MemTest86 certification.',
    },
    {
      id: 'PC-206',
      title: 'Dell OptiPlex 7000 Micro',
      category: 'Office Desktop',
      cpu: 'Intel Core i5-12500T',
      ram: '16GB DDR4',
      storage: '256GB NVMe + 500GB SSD',
      gpu: 'Intel UHD 770',
      display: 'Compact 1.2L Desktop',
      conditionGrade: 'Grade A',
      warrantyMonths: 12,
      price: 42000,
      status: 'Available',
      imageUrl: '',
      notes: 'Ideal for reception desks, POS terminals, and accounting workstations. Fresh OS deploy.',
    },
  ],
  orders: [],
  consultations: [
    {
      id: 'CON-501',
      companyName: 'Harborview Dental Clinic',
      contactName: 'Dr. Hannah Cho',
      email: 'hcho@harborview.example',
      phone: '(555) 602-1190',
      teamSize: '11-50',
      focusArea: 'Network & Wi-Fi Architecture',
      preferredDate: '2026-11-20',
      notes: 'Upgrading 14 operatory workstations and segmenting patient Wi-Fi onto a separate VLAN.',
      status: 'Scheduled',
      createdAt: '2026-11-15T15:00:00.000Z',
    },
  ],
};

function ensureStore(): StoreData {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(STORE_PATH)) {
    fs.writeFileSync(STORE_PATH, JSON.stringify(SEED_DATA, null, 2), 'utf-8');
    return structuredClone(SEED_DATA);
  }
  try {
    const raw = fs.readFileSync(STORE_PATH, 'utf-8');
    return JSON.parse(raw) as StoreData;
  } catch {
    fs.writeFileSync(STORE_PATH, JSON.stringify(SEED_DATA, null, 2), 'utf-8');
    return structuredClone(SEED_DATA);
  }
}

function saveStore(data: StoreData): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(STORE_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

function nextId(prefix: string, existingIds: string[], startNum: number): string {
  const nums = existingIds
    .map((id) => Number.parseInt(id.replace(`${prefix}-`, ''), 10))
    .filter((n) => !Number.isNaN(n));
  const max = nums.length > 0 ? Math.max(...nums) : startNum - 1;
  return `${prefix}-${max + 1}`;
}

async function startServer(): Promise<void> {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '12mb' }));

  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
  }
  app.use('/uploads/pcs', express.static(UPLOADS_DIR));

  function getRequestOrigin(req: express.Request): string {
    const configured = process.env.APP_URL?.trim();
    if (configured && configured !== 'MY_APP_URL') {
      return configured.replace(/\/+$/, '');
    }
    const protoHeader = req.headers['x-forwarded-proto'];
    const proto =
      typeof protoHeader === 'string' ? protoHeader.split(',')[0].trim() : req.protocol || 'https';
    const host = req.get('host') || `localhost:${PORT}`;
    return `${proto}://${host}`;
  }

  app.get('/robots.txt', (req, res) => {
    const origin = getRequestOrigin(req);
    res.type('text/plain').send(
      [
        'User-agent: *',
        'Allow: /',
        'Disallow: /api/',
        '',
        `Sitemap: ${origin}/sitemap.xml`,
      ].join('\n'),
    );
  });

  app.get('/sitemap.xml', (req, res) => {
    const origin = getRequestOrigin(req);
    const lastmod = new Date().toISOString().split('T')[0];
    const urls = [
      { loc: `${origin}/`, priority: '1.0', changefreq: 'weekly' },
      { loc: `${origin}/?lang=en`, priority: '0.9', changefreq: 'weekly' },
      { loc: `${origin}/?lang=am`, priority: '0.9', changefreq: 'weekly' },
      { loc: `${origin}/?lang=om`, priority: '0.9', changefreq: 'weekly' },
    ];
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>`;
    res.type('application/xml').send(xml);
  });

  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'KEVLAR TECH' });
  });

  // Repair Tickets: Public lookup by ID OR full staff listing
  app.get('/api/tickets', (req, res) => {
    const store = ensureStore();
    const ticketId = typeof req.query.ticketId === 'string' ? req.query.ticketId.trim().toUpperCase() : '';
    const scope = typeof req.query.scope === 'string' ? req.query.scope : '';

    if (ticketId) {
      const found = store.tickets.find((t) => t.id.toUpperCase() === ticketId);
      if (!found) {
        res.status(404).json({ error: `Ticket ${ticketId} was not found.` });
        return;
      }
      const firstName = found.customerName.split(' ')[0] || 'Client';
      res.json({
        ticket: {
          id: found.id,
          customerFirstName: firstName,
          category: found.category,
          deviceModel: found.deviceModel,
          issueSummary: found.issueSummary,
          urgency: found.urgency,
          status: found.status,
          technicianNotes: found.technicianNotes,
          estimatedCost: found.estimatedCost,
          createdAt: found.createdAt,
          updatedAt: found.updatedAt,
        },
      });
      return;
    }

    if (scope === 'staff') {
      res.json({ tickets: store.tickets });
      return;
    }

    // Default: return non-PII public summary list of recent tickets for quick-reference IDs
    const summaries = store.tickets.map((t) => ({
      id: t.id,
      category: t.category,
      deviceModel: t.deviceModel,
      status: t.status,
      updatedAt: t.updatedAt,
    }));
    res.json({ tickets: summaries });
  });

  app.post('/api/tickets', (req, res) => {
    const body = req.body as Partial<RepairTicket>;
    const customerName = String(body.customerName ?? '').trim();
    const phone = String(body.phone ?? '').trim();
    const email = String(body.email ?? '').trim();
    const deviceModel = String(body.deviceModel ?? '').trim();
    const issueSummary = String(body.issueSummary ?? '').trim();
    const category = body.category as ServiceCategory | undefined;
    const urgency: TicketUrgency = body.urgency === 'priority' ? 'priority' : 'standard';

    const validCategories: ServiceCategory[] = [
      'computer_hardware',
      'computer_software',
      'tv_maintenance',
      'projector_maintenance',
    ];

    if (!customerName || !phone || !email || !deviceModel || !issueSummary || !category || !validCategories.includes(category)) {
      res.status(400).json({ error: 'Please complete all required repair intake fields.' });
      return;
    }

    const baseEstimates: Record<ServiceCategory, number> = {
      computer_hardware: 2500,
      computer_software: 1500,
      tv_maintenance: 4000,
      projector_maintenance: 4500,
    };

    const store = ensureStore();
    const now = new Date().toISOString();
    const newTicket: RepairTicket = {
      id: nextId('KVT', store.tickets.map((t) => t.id), 1041),
      customerName,
      phone,
      email,
      category,
      deviceModel,
      issueSummary,
      urgency,
      status: 'Intake',
      technicianNotes: 'Logged into bench queue. Initial visual & electrical diagnostic scheduled.',
      estimatedCost: baseEstimates[category] + (urgency === 'priority' ? 1500 : 0),
      createdAt: now,
      updatedAt: now,
    };

    store.tickets.unshift(newTicket);
    saveStore(store);

    res.status(201).json({
      ticket: {
        id: newTicket.id,
        customerFirstName: newTicket.customerName.split(' ')[0] || 'Client',
        category: newTicket.category,
        deviceModel: newTicket.deviceModel,
        issueSummary: newTicket.issueSummary,
        urgency: newTicket.urgency,
        status: newTicket.status,
        technicianNotes: newTicket.technicianNotes,
        estimatedCost: newTicket.estimatedCost,
        createdAt: newTicket.createdAt,
        updatedAt: newTicket.updatedAt,
      },
    });
  });

  app.patch('/api/tickets/:id', (req, res) => {
    const id = req.params.id.toUpperCase();
    const body = req.body as Partial<{ status: TicketStatus; technicianNotes: string; estimatedCost: number }>;
    const store = ensureStore();
    const idx = store.tickets.findIndex((t) => t.id.toUpperCase() === id);

    if (idx === -1) {
      res.status(404).json({ error: 'Ticket not found.' });
      return;
    }

    const validStatuses: TicketStatus[] = [
      'Intake',
      'Diagnosing',
      'Parts Ordered',
      'Testing',
      'Ready for Pickup',
      'Completed',
    ];

    if (body.status && validStatuses.includes(body.status)) {
      store.tickets[idx].status = body.status;
    }
    if (typeof body.technicianNotes === 'string') {
      store.tickets[idx].technicianNotes = body.technicianNotes.trim();
    }
    if (typeof body.estimatedCost === 'number' && Number.isFinite(body.estimatedCost) && body.estimatedCost >= 0) {
      store.tickets[idx].estimatedCost = Math.round(body.estimatedCost);
    }
    store.tickets[idx].updatedAt = new Date().toISOString();

    saveStore(store);
    res.json({ ticket: store.tickets[idx] });
  });

  // Used PC Inventory
  app.get('/api/inventory', (req, res) => {
    const store = ensureStore();
    const category = typeof req.query.category === 'string' ? req.query.category : '';
    let items = store.inventory;
    if (category && category !== 'All') {
      items = items.filter((item) => item.category === category);
    }
    res.json({ items });
  });

  app.post('/api/inventory/upload-image', (req, res) => {
    const body = req.body as Partial<{ dataUrl: string }>;
    const dataUrl = String(body.dataUrl ?? '');
    const match = /^data:image\/(png|jpeg|jpg|webp);base64,([A-Za-z0-9+/=]+)$/i.exec(dataUrl);
    if (!match) {
      res.status(400).json({ error: 'Please upload a valid PNG, JPG, or WebP image file.' });
      return;
    }

    const rawExt = match[1].toLowerCase();
    const ext = rawExt === 'jpeg' ? 'jpg' : rawExt;
    const buffer = Buffer.from(match[2], 'base64');
    if (buffer.byteLength === 0 || buffer.byteLength > 10 * 1024 * 1024) {
      res.status(400).json({ error: 'Image file must be under 10 MB.' });
      return;
    }

    if (!fs.existsSync(UPLOADS_DIR)) {
      fs.mkdirSync(UPLOADS_DIR, { recursive: true });
    }
    const filename = `pc-${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    fs.writeFileSync(path.join(UPLOADS_DIR, filename), buffer);

    res.status(201).json({ imageUrl: `/uploads/pcs/${filename}` });
  });

  app.post('/api/inventory', (req, res) => {
    const body = req.body as Partial<UsedPcItem>;
    const title = String(body.title ?? '').trim();
    const category = body.category as PcCategory | undefined;
    const cpu = String(body.cpu ?? '').trim();
    const ram = String(body.ram ?? '').trim();
    const storage = String(body.storage ?? '').trim();
    const gpu = String(body.gpu ?? '').trim() || 'Integrated Graphics';
    const display = String(body.display ?? '').trim() || 'Standard Output';
    const imageUrl = typeof body.imageUrl === 'string' ? body.imageUrl.trim() : '';
    const price = Number(body.price);

    const validCats: PcCategory[] = ['Business Laptop', 'Workstation', 'Office Desktop'];
    if (!title || !category || !validCats.includes(category) || !cpu || !ram || !storage || !Number.isFinite(price) || price <= 0) {
      res.status(400).json({ error: 'Invalid hardware specification or price.' });
      return;
    }

    const store = ensureStore();
    const newItem: UsedPcItem = {
      id: nextId('PC', store.inventory.map((i) => i.id), 201),
      title,
      category,
      cpu,
      ram,
      storage,
      gpu,
      display,
      conditionGrade: body.conditionGrade === 'Grade A' ? 'Grade A' : 'Grade A+',
      warrantyMonths: Number(body.warrantyMonths) > 0 ? Number(body.warrantyMonths) : 12,
      price: Math.round(price),
      status: 'Available',
      imageUrl,
      notes: String(body.notes ?? '').trim() || '42-point hardware bench inspection passed with 12-month warranty.',
    };

    store.inventory.unshift(newItem);
    saveStore(store);
    res.status(201).json({ item: newItem });
  });

  app.patch('/api/inventory/:id', (req, res) => {
    const id = req.params.id.toUpperCase();
    const body = req.body as Partial<{ status: PcStatus; price: number; imageUrl: string }>;
    const store = ensureStore();
    const idx = store.inventory.findIndex((i) => i.id.toUpperCase() === id);
    if (idx === -1) {
      res.status(404).json({ error: 'Inventory item not found.' });
      return;
    }
    const validStatuses: PcStatus[] = ['Available', 'Reserved', 'Sold'];
    if (body.status && validStatuses.includes(body.status)) {
      store.inventory[idx].status = body.status;
    }
    if (typeof body.price === 'number' && Number.isFinite(body.price) && body.price > 0) {
      store.inventory[idx].price = Math.round(body.price);
    }
    if (typeof body.imageUrl === 'string') {
      store.inventory[idx].imageUrl = body.imageUrl.trim();
    }
    saveStore(store);
    res.json({ item: store.inventory[idx] });
  });

  app.delete('/api/inventory/:id', (req, res) => {
    const id = req.params.id.toUpperCase();
    const store = ensureStore();
    const idx = store.inventory.findIndex((i) => i.id.toUpperCase() === id);
    if (idx === -1) {
      res.status(404).json({ error: 'Inventory item not found.' });
      return;
    }
    store.inventory.splice(idx, 1);
    saveStore(store);
    res.json({ deleted: true, id });
  });

  // Used PC Reservation / Checkout Orders
  app.post('/api/orders', (req, res) => {
    const body = req.body as Partial<{
      customerName: string;
      phone: string;
      email: string;
      deliveryMethod: 'In-Store Pickup' | 'Local Office Delivery';
      address: string;
      itemIds: string[];
    }>;

    const customerName = String(body.customerName ?? '').trim();
    const phone = String(body.phone ?? '').trim();
    const email = String(body.email ?? '').trim();
    const deliveryMethod =
      body.deliveryMethod === 'Local Office Delivery' ? 'Local Office Delivery' : 'In-Store Pickup';
    const address = String(body.address ?? '').trim();
    const itemIds = Array.isArray(body.itemIds) ? body.itemIds : [];

    if (!customerName || !phone || !email || itemIds.length === 0) {
      res.status(400).json({ error: 'Customer contact details and at least one PC are required.' });
      return;
    }
    if (deliveryMethod === 'Local Office Delivery' && !address) {
      res.status(400).json({ error: 'Delivery address is required for local office delivery.' });
      return;
    }

    const store = ensureStore();
    const matchedItems: UsedPcItem[] = [];
    for (const id of itemIds) {
      const found = store.inventory.find((i) => i.id === id && i.status === 'Available');
      if (!found) {
        res.status(409).json({ error: `Item ${id} is no longer available.` });
        return;
      }
      matchedItems.push(found);
    }

    const total = matchedItems.reduce((sum, item) => sum + item.price, 0);
    const order: OrderRecord = {
      id: nextId('ORD', store.orders.map((o) => o.id), 301),
      customerName,
      phone,
      email,
      deliveryMethod,
      address:
        deliveryMethod === 'In-Store Pickup'
          ? 'KEVLAR TECH Office Desk, Bishoftu, Ethiopia'
          : address,
      items: matchedItems.map((i) => ({ id: i.id, title: i.title, price: i.price })),
      total,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
    };

    for (const item of matchedItems) {
      item.status = 'Reserved';
    }
    store.orders.unshift(order);
    saveStore(store);

    res.status(201).json({ order });
  });

  app.get('/api/orders', (_req, res) => {
    const store = ensureStore();
    res.json({ orders: store.orders });
  });

  app.patch('/api/orders/:id', (req, res) => {
    const id = req.params.id.toUpperCase();
    const body = req.body as Partial<{ status: OrderRecord['status'] }>;
    const store = ensureStore();
    const idx = store.orders.findIndex((o) => o.id.toUpperCase() === id);
    if (idx === -1) {
      res.status(404).json({ error: 'Order record not found.' });
      return;
    }
    const valid: Array<OrderRecord['status']> = ['Confirmed', 'Ready', 'Fulfilled'];
    if (body.status && valid.includes(body.status)) {
      store.orders[idx].status = body.status;
      if (body.status === 'Fulfilled') {
        for (const orderedItem of store.orders[idx].items) {
          const inv = store.inventory.find((i) => i.id === orderedItem.id);
          if (inv) {
            inv.status = 'Sold';
          }
        }
      }
    }
    saveStore(store);
    res.json({ order: store.orders[idx] });
  });

  // IT Consultations
  app.get('/api/consultations', (_req, res) => {
    const store = ensureStore();
    res.json({ consultations: store.consultations });
  });

  app.post('/api/consultations', (req, res) => {
    const body = req.body as Partial<ConsultationRequest>;
    const companyName = String(body.companyName ?? '').trim();
    const contactName = String(body.contactName ?? '').trim();
    const email = String(body.email ?? '').trim();
    const phone = String(body.phone ?? '').trim();
    const preferredDate = String(body.preferredDate ?? '').trim();
    const notes = String(body.notes ?? '').trim();
    const teamSize = body.teamSize === '11-50' || body.teamSize === '51-200' ? body.teamSize : '1-10';
    const validFocus: ConsultationFocus[] = [
      'Network & Wi-Fi Architecture',
      'Workstation Fleet & Procurement',
      'Server & Cloud Backup',
      'Security & Audit',
    ];
    const focusArea = body.focusArea && validFocus.includes(body.focusArea) ? body.focusArea : 'Network & Wi-Fi Architecture';

    if (!companyName || !contactName || !email || !phone || !preferredDate) {
      res.status(400).json({ error: 'Please complete all required IT consultation fields.' });
      return;
    }

    const store = ensureStore();
    const consultation: ConsultationRequest = {
      id: nextId('CON', store.consultations.map((c) => c.id), 501),
      companyName,
      contactName,
      email,
      phone,
      teamSize,
      focusArea,
      preferredDate,
      notes,
      status: 'Requested',
      createdAt: new Date().toISOString(),
    };

    store.consultations.unshift(consultation);
    saveStore(store);
    res.status(201).json({ consultation });
  });

  app.patch('/api/consultations/:id', (req, res) => {
    const id = req.params.id.toUpperCase();
    const body = req.body as Partial<{ status: ConsultationStatus }>;
    const store = ensureStore();
    const idx = store.consultations.findIndex((c) => c.id.toUpperCase() === id);
    if (idx === -1) {
      res.status(404).json({ error: 'Consultation record not found.' });
      return;
    }
    const valid: ConsultationStatus[] = ['Requested', 'Scheduled', 'Completed'];
    if (body.status && valid.includes(body.status)) {
      store.consultations[idx].status = body.status;
    }
    saveStore(store);
    res.json({ consultation: store.consultations[idx] });
  });

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    const distIndexPath = path.join(distPath, 'index.html');
    app.use(express.static(distPath, { index: false }));
    app.get('*', (req, res) => {
      const origin = getRequestOrigin(req);
      const rawHtml = fs.readFileSync(distIndexPath, 'utf-8');
      const renderedHtml = rawHtml
        .replace(/https:\/\/kevlartech\.et\//g, `${origin}/`)
        .replace(
          /(["'])\/assets\/aistudio\/1794814611168_f37733fc\.jpg\1/g,
          `$1${origin}/assets/aistudio/1794814611168_f37733fc.jpg$1`,
        )
        .replace('</head>', `  <link rel="canonical" href="${origin}/" />\n  </head>`);
      res.type('html').send(renderedHtml);
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`KEVLAR TECH server listening on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

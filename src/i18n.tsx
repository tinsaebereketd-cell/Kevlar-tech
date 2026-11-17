import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type {
  ConsultationFocus,
  PcCategory,
  PcStatus,
  ServiceCategory,
  TicketStatus,
} from './types';

export type Locale = 'en' | 'am' | 'om';

export const LOCALE_OPTIONS: Array<{ code: Locale; label: string }> = [
  { code: 'en', label: 'English' },
  { code: 'am', label: 'አማርኛ' },
  { code: 'om', label: 'Afaan Oromoo' },
];

export interface Translations {
  nav: {
    services: string;
    usedPcs: string;
    trackRepair: string;
    consulting: string;
    bookService: string;
  };
  hero: {
    kicker: string;
    headline: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
    metrics: Array<{ value: string; label: string }>;
  };
  services: {
    kicker: string;
    heading: string;
    subheading: string;
    turnaroundPrefix: string;
    inspectRates: string;
    inspectingRates: string;
    bookBench: string;
    typicalEstimatesTitle: string;
    schedulePrefix: string;
    pillars: Array<{
      index: string;
      category: ServiceCategory;
      title: string;
      turnaround: string;
      diagnosticFee: string;
      summary: string;
      capabilities: string[];
      typicalRepairs: Array<{ task: string; priceRange: string }>;
    }>;
  };
  catalog: {
    kicker: string;
    heading: string;
    subheading: string;
    reservationCart: string;
    searchPlaceholder: string;
    inStockOnly: string;
    noMatchesTitle: string;
    noMatchesDesc: string;
    resetFilters: string;
    processor: string;
    memorySsd: string;
    graphics: string;
    displayChassis: string;
    warrantyUnit: string;
    fullSpecs: string;
    reserve: string;
    inCart: string;
    addedToCart: string;
    addToReservationCart: string;
    includesWarranty: string;
    inStock: string;
    addPcBtn: string;
    uploadPhoto: string;
    changePhoto: string;
    removePhoto: string;
    uploadingPhoto: string;
    noPhotoYet: string;
    addModalTitle: string;
    addModalSubtitle: string;
    pcPhotoLabel: string;
    choosePhotoFile: string;
    photoHint: string;
    modelTitleLabel: string;
    categoryLabel: string;
    gradeLabel: string;
    priceEtbLabel: string;
    displayLabel: string;
    warrantyMonthsLabel: string;
    notesLabel: string;
    notesPlaceholder: string;
    publishPcBtn: string;
    publishingPcBtn: string;
    cancelBtn: string;
    categories: Record<'All' | PcCategory, string>;
    statuses: Record<PcStatus, string>;
  };
  cart: {
    title: string;
    subtitle: string;
    emptyTitle: string;
    emptyDesc: string;
    fulfillmentMethod: string;
    pickup: string;
    delivery: string;
    fullName: string;
    phone: string;
    email: string;
    deliveryAddress: string;
    subtotal: string;
    units: string;
    confirmBtn: string;
    submittingBtn: string;
    orderConfirmed: string;
    reservedUnder: string;
    totalDue: string;
    done: string;
  };
  tracker: {
    kicker: string;
    heading: string;
    subheading: string;
    placeholder: string;
    checkStatus: string;
    checking: string;
    sampleTickets: string;
    needDropoff: string;
    createTicket: string;
    loading: string;
    clientLabel: string;
    statusPrefix: string;
    reportedFault: string;
    benchLog: string;
    lastUpdated: string;
    estimatedTotal: string;
    stages: Record<TicketStatus, string>;
    categoryLabels: Record<ServiceCategory, string>;
  };
  founder: {
    kicker: string;
    heading: string;
    description: string;
    disciplines: Array<{ index: string; title: string; detail: string }>;
    bookInspection: string;
    consultOffice: string;
    galleryHeading: string;
    gallerySubheading: string;
    captions: [string, string, string];
  };
  consulting: {
    kicker: string;
    heading: string;
    subheading: string;
    practices: Array<{
      num: string;
      title: ConsultationFocus;
      localizedTitle: string;
      deliverable: string;
      description: string;
    }>;
    uptimeStat: string;
    uptimeDesc: string;
    tcoStat: string;
    tcoDesc: string;
    quote: string;
    quoteAuthor: string;
    formTitle: string;
    formSubtitle: string;
    companyName: string;
    contactName: string;
    teamSize: string;
    workstationsSuffix: string;
    businessEmail: string;
    phoneNumber: string;
    primaryFocus: string;
    preferredDate: string;
    projectBrief: string;
    projectPlaceholder: string;
    submitBtn: string;
    submittingBtn: string;
    confirmedTitle: string;
    confirmedPrefix: string;
    bookAnother: string;
  };
  bookingModal: {
    title: string;
    subtitle: string;
    division: string;
    deviceModel: string;
    devicePlaceholder: string;
    symptoms: string;
    symptomsPlaceholder: string;
    priorityLabel: string;
    standardQueue: string;
    priorityQueue: string;
    fullName: string;
    phone: string;
    email: string;
    submitBtn: string;
    submittingBtn: string;
    loggedTitle: string;
    deviceLabel: string;
    estimateLabel: string;
    viewInTracker: string;
    close: string;
  };
  footer: {
    description: string;
    workshopTitle: string;
    location: string;
    hours: string;
    navigationTitle: string;
    rights: string;
    staffWorkbench: string;
  };
  estimator: {
    kicker: string;
    heading: string;
    subheading: string;
    deviceTypeLabel: string;
    severityLabel: string;
    priorityLabel: string;
    standardQueue: string;
    priorityQueue: string;
    quoteTitle: string;
    quoteSubtitle: string;
    diagnosticCredit: string;
    turnaroundLabel: string;
    warrantyLabel: string;
    warrantyValue: string;
    partsNote: string;
    bookWithEstimate: string;
    devices: Record<'laptop' | 'desktop' | 'software' | 'tv' | 'projector', { label: string; scopeHint: string }>;
    severities: Record<'minor' | 'moderate' | 'severe', { label: string; summary: string }>;
  };
  testimonials: {
    kicker: string;
    heading: string;
    subheading: string;
    averageLabel: string;
    filters: {
      all: string;
      repair: string;
      av: string;
      consulting: string;
    };
    items: Array<{
      id: string;
      category: 'repair' | 'av' | 'consulting';
      serviceMeta: string;
      location: string;
      quote: string;
      outcome: string;
      authorName: string;
      authorRole: string;
      organization: string;
    }>;
  };
}

const DICTIONARY: Record<Locale, Translations> = {
  en: {
    nav: {
      services: 'Services',
      usedPcs: 'Used PCs',
      trackRepair: 'Track Repair',
      consulting: 'IT Consulting',
      bookService: 'Book Service',
    },
    hero: {
      kicker: 'Hardware Lab · TV & Projector Bench · Used PCs · Bishoftu, Ethiopia',
      headline: 'Precision maintenance for computers, displays, and business IT.',
      description:
        'Board-level computer repair, 4K TV and commercial projector calibration, bench-certified pre-owned workstations, and managed IT consulting under one engineering roof in Bishoftu, Ethiopia.',
      primaryCta: 'Book a Repair',
      secondaryCta: 'Browse Certified Used PCs',
      metrics: [
        { value: '24–48 hr', label: 'Average Bench Turnaround' },
        { value: '12-Month', label: 'Parts & Labor Warranty' },
        { value: '42-Point', label: 'Used PC Diagnostic Audit' },
        { value: '99.4%', label: 'First-Visit Fix Rate' },
      ],
    },
    services: {
      kicker: 'Maintenance & Repair Divisions',
      heading: 'Four specialized benches, transparent rate ranges.',
      subheading:
        'Every repair includes a written diagnostic before work begins, OEM-grade replacement components, and a 12-month workmanship warranty.',
      turnaroundPrefix: 'Turnaround:',
      inspectRates: 'Inspect Rates',
      inspectingRates: 'Inspecting Rates',
      bookBench: 'Book Bench',
      typicalEstimatesTitle: 'Typical Bench Estimate Ranges',
      schedulePrefix: 'Schedule',
      pillars: [
        {
          index: '01',
          category: 'computer_hardware',
          title: 'Computer Hardware Maintenance',
          turnaround: '24–48 hrs',
          diagnosticFee: '600 ETB Bench Diagnostic (credited toward repair)',
          summary:
            'Component-level laptop and desktop repair from power-rail micro-soldering to liquid-spill logic board ultrasonic recovery and thermal rebuilds.',
          capabilities: [
            'Motherboard & USB-C / DC power jack micro-soldering',
            'NVMe SSD, DDR4/DDR5 RAM & GPU workstation upgrades',
            'Screen assembly, hinge, battery & keyboard replacement',
            'Thermal paste/PTM7950 renewal & cooling fan rebuilds',
          ],
          typicalRepairs: [
            { task: 'Logic board / USB-C charging repair', priceRange: '3,500 – 7,500 ETB' },
            { task: 'Thermal rebuild & dust extraction', priceRange: '1,500 – 2,500 ETB' },
            { task: 'Laptop display or battery swap', priceRange: '4,500 – 12,000 ETB' },
          ],
        },
        {
          index: '02',
          category: 'computer_software',
          title: 'Software, OS & Data Recovery',
          turnaround: 'Same Day – 24 hrs',
          diagnosticFee: '500 ETB Software Audit',
          summary:
            'Clean operating system builds, zero-data-loss Windows & macOS migrations, stubborn malware eradication, and encrypted drive recovery.',
          capabilities: [
            'Windows 11 / Linux / macOS clean deployment & driver tuning',
            'Ransomware, adware & rootkit quarantine without wiping files',
            'Corrupted partition, RAID & failing SSD data extraction',
            'BIOS/UEFI firmware recovery & BitLocker key restoration',
          ],
          typicalRepairs: [
            { task: 'OS recovery + performance optimization', priceRange: '1,200 – 2,200 ETB' },
            { task: 'Malware eradication & browser hardening', priceRange: '1,500 – 2,800 ETB' },
            { task: 'Logical drive & file system recovery', priceRange: '3,000 – 8,500 ETB' },
          ],
        },
        {
          index: '03',
          category: 'tv_maintenance',
          title: '4K OLED, QLED & LED TV Maintenance',
          turnaround: '2–4 Days',
          diagnosticFee: '800 ETB Bench Assessment',
          summary:
            'Precision large-format display repair for residential and commercial monitors. We diagnose power boards, T-Con timing boards, and LED backlight arrays.',
          capabilities: [
            'Full LED backlight strip array replacement & diffuser alignment',
            'Power supply unit (PSU) capacitor, MOSFET & PFC stage rebuild',
            'T-Con timing board & LVDS ribbon fault resolution',
            'HDMI 2.1 port replacement & BT.2020 color calibration',
          ],
          typicalRepairs: [
            { task: 'Power supply / no-power board repair', priceRange: '4,000 – 8,500 ETB' },
            { task: 'LED backlight array replacement (50"–75")', priceRange: '5,500 – 12,500 ETB' },
            { task: 'HDMI port micro-soldering', priceRange: '3,200 – 5,000 ETB' },
          ],
        },
        {
          index: '04',
          category: 'projector_maintenance',
          title: 'Projector Optical & Lamp Lab',
          turnaround: '2–3 Days',
          diagnosticFee: '800 ETB Optical Inspection',
          summary:
            'Commercial, classroom, and home-cinema projector servicing covering laser modules, UHP lamps, DLP DMD chips, color wheels, and cooling paths.',
          capabilities: [
            'OEM UHP lamp & phosphor wheel replacement with ballast test',
            'Optical prism, LCD polarizer & lens assembly dust cleaning',
            'DLP DMD chip replacement (eliminating dead white/black pixels)',
            'Thermal sensor, intake blower & color wheel bearing service',
          ],
          typicalRepairs: [
            { task: 'Optical path cleaning + thermal service', priceRange: '2,800 – 4,800 ETB' },
            { task: 'Color wheel or ballast replacement', priceRange: '5,000 – 9,500 ETB' },
            { task: 'DMD chip replacement (1080p / 4K DLP)', priceRange: '7,500 – 14,000 ETB' },
          ],
        },
      ],
    },
    catalog: {
      kicker: 'Certified Pre-Owned Hardware',
      heading: 'Bench-tested used PCs ready for work.',
      subheading:
        'Every machine passes a 42-point thermal, memory, storage, and battery stress test with fresh OS imaging and a 12-month hardware warranty.',
      reservationCart: 'Reservation Cart',
      searchPlaceholder: 'Search CPU, RAM, or model...',
      inStockOnly: 'In Stock Only',
      noMatchesTitle: 'No matching systems in current inventory.',
      noMatchesDesc:
        'Try clearing your search filter or request custom fleet sourcing through our IT office.',
      resetFilters: 'Reset Filters',
      processor: 'Processor',
      memorySsd: 'Memory / SSD',
      graphics: 'Graphics',
      displayChassis: 'Display / Chassis',
      warrantyUnit: '-mo warranty',
      fullSpecs: 'Full Specs',
      reserve: 'Reserve',
      inCart: 'In Cart',
      addedToCart: 'Added to Cart',
      addToReservationCart: 'Add to Reservation Cart',
      includesWarranty: 'Includes 12-month KEVLAR TECH warranty',
      inStock: 'In Stock',
      addPcBtn: 'Add PC for Sale',
      uploadPhoto: 'Upload PC Photo',
      changePhoto: 'Change Photo',
      removePhoto: 'Remove',
      uploadingPhoto: 'Uploading...',
      noPhotoYet: 'Upload your own photo of this PC',
      addModalTitle: 'Add Used PC for Sale',
      addModalSubtitle: 'Upload your real machine photo and publish it to the catalog in ETB.',
      pcPhotoLabel: 'PC Photo (JPG, PNG, or WebP)',
      choosePhotoFile: 'Choose Photo from Device',
      photoHint: 'Upload a clear photo of the laptop, tower, or desktop you are selling.',
      modelTitleLabel: 'Model Name',
      categoryLabel: 'Category',
      gradeLabel: 'Condition Grade',
      priceEtbLabel: 'Price (ETB)',
      displayLabel: 'Display / Chassis',
      warrantyMonthsLabel: 'Warranty (Months)',
      notesLabel: 'Bench Inspection Notes',
      notesPlaceholder: 'Battery health, thermal test, ports verified, OS installed...',
      publishPcBtn: 'Publish PC to Storefront',
      publishingPcBtn: 'Publishing...',
      cancelBtn: 'Cancel',
      categories: {
        All: 'All',
        'Business Laptop': 'Business Laptop',
        Workstation: 'Workstation',
        'Office Desktop': 'Office Desktop',
      },
      statuses: {
        Available: 'In Stock',
        Reserved: 'Reserved',
        Sold: 'Sold',
      },
    },
    cart: {
      title: 'Hardware Reservation Cart',
      subtitle: 'Pay on pickup or invoice upon delivery inspection',
      emptyTitle: 'Your reservation cart is empty.',
      emptyDesc: 'Select any certified laptop, workstation, or office desktop from the catalog.',
      fulfillmentMethod: 'Fulfillment Method',
      pickup: 'In-Store Pickup',
      delivery: 'Local Office Delivery',
      fullName: 'Full Name',
      phone: 'Phone Number',
      email: 'Email',
      deliveryAddress: 'Delivery Street Address',
      subtotal: 'Subtotal',
      units: 'units',
      confirmBtn: 'Confirm Hardware Reservation',
      submittingBtn: 'Confirming Reservation...',
      orderConfirmed: 'Confirmed',
      reservedUnder: 'Your selected hardware is reserved under',
      totalDue: 'Total Due',
      done: 'Done',
    },
    tracker: {
      kicker: 'Live Bench Status',
      heading: 'Track your repair ticket in real time.',
      subheading:
        'Enter your bench ticket number to review diagnostic notes, parts status, estimated cost, and pickup readiness across computer, TV, or projector repairs.',
      placeholder: 'Enter ticket ID (e.g. KVT-1041)',
      checkStatus: 'Check Status',
      checking: 'Checking...',
      sampleTickets: 'Sample active tickets:',
      needDropoff: 'Need to drop off a device?',
      createTicket: 'Create New Repair Ticket',
      loading: 'Loading bench status...',
      clientLabel: 'Client:',
      statusPrefix: 'Status:',
      reportedFault: 'Reported Fault',
      benchLog: 'Technician Bench Log',
      lastUpdated: 'Last updated',
      estimatedTotal: 'Estimated Total',
      stages: {
        Intake: 'Intake',
        Diagnosing: 'Diagnosing',
        'Parts Ordered': 'Parts Ordered',
        Testing: 'Testing',
        'Ready for Pickup': 'Ready for Pickup',
        Completed: 'Completed',
      },
      categoryLabels: {
        computer_hardware: 'Computer Hardware Maintenance',
        computer_software: 'Software & OS Systems',
        tv_maintenance: 'TV Maintenance & Calibration',
        projector_maintenance: 'Projector Optical & Lamp Lab',
      },
    },
    founder: {
      kicker: 'Shop Founder · Materials Engineer · Bishoftu, Ethiopia',
      heading: 'Materials-science rigor behind every repair and workstation.',
      description:
        'Founded and led by a practicing Materials Engineer, KEVLAR TECH approaches electronics maintenance from the substrate up—diagnosing why thermal interfaces degrade, solder joints fatigue, and optical coatings drift rather than swapping parts blindly.',
      disciplines: [
        {
          index: '01.',
          title: 'Solder Metallurgy & PCB Integrity',
          detail:
            'Controlled reflow profiles, lead-free & eutectic joint inspection, and ultrasonic flux neutralization on logic boards and TV power supplies.',
        },
        {
          index: '02.',
          title: 'Thermal Interface & Cooling Physics',
          detail:
            'Phase-change PTM7950 thermal pads and high-conductivity compounds that prevent pump-out and extend processor and GPU lifespan.',
        },
        {
          index: '03.',
          title: 'Optical & Dielectric Longevity',
          detail:
            'Precision cleaning of projector dichroic prisms, heat-resistant polarizers, and high-ripple electrolytic capacitor replacement.',
        },
      ],
      bookInspection: 'Book a Bench Inspection',
      consultOffice: 'Consult with our IT Office',
      galleryHeading: 'Inside Our Bishoftu Workshop',
      gallerySubheading:
        'Board-level diagnostic bench · Software & data desk · Client intake storefront',
      captions: [
        'Multimeter, hot-air & motherboard micro-diagnostic bench',
        'Software imaging, drive diagnostics & organized cable wall',
        'KEVLAR TECH client reception & intake storefront in Bishoftu',
      ],
    },
    consulting: {
      kicker: 'IT Consultant Office',
      heading: 'Practical IT architecture for offices across Bishoftu and Oromia.',
      subheading:
        'From clinic networks to multi-room AV conference setups and workstation fleet procurement, our consultants design systems you own without bloated enterprise retainers.',
      practices: [
        {
          num: '01.',
          title: 'Network & Wi-Fi Architecture',
          localizedTitle: 'Network & Wi-Fi Architecture',
          deliverable: 'Managed VLANs, dual-WAN failover & RF heatmapping',
          description:
            'Eliminate conference room dropouts and isolate guest traffic with enterprise UniFi/Cisco routing, structured Cat6A cabling, and VPN remote access.',
        },
        {
          num: '02.',
          title: 'Workstation Fleet & Procurement',
          localizedTitle: 'Workstation Fleet & Procurement',
          deliverable: 'Standardized imaging, MDM enrollment & lifecycle planning',
          description:
            'Deploy uniform certified workstations and laptops pre-configured with company software, encryption, and spare-unit swaps to cut downtime to minutes.',
        },
        {
          num: '03.',
          title: 'Server & Cloud Backup',
          localizedTitle: 'Server & Cloud Backup',
          deliverable: 'Local NAS + immutable off-site 3-2-1 backup architecture',
          description:
            'On-premise Synology/TrueNAS file servers paired with Microsoft 365 or Google Workspace migrations and tested bare-metal disaster recovery.',
        },
        {
          num: '04.',
          title: 'Security & Audit',
          localizedTitle: 'Security & Audit',
          deliverable: 'Endpoint EDR, patch automation & hardware compliance checks',
          description:
            'Quarterly vulnerability reviews, hardware firewall tuning, multi-factor enforcement, and staff workstation security hardening for clinics and offices.',
        },
      ],
      uptimeStat: '99.94%',
      uptimeDesc: 'Measured network uptime across 18 client offices in Bishoftu & surrounding corridor',
      tcoStat: '38% Lower TCO',
      tcoDesc: 'Hardware fleet cost reduction pairing refurbished workstations with SLA support',
      quote:
        'KEVLAR TECH rebuilt our 14-workstation clinic network, replaced aging towers with certified ThinkCentres, and cut support interruptions to zero in under a week.',
      quoteAuthor: 'Dr. Hannah Cho · Managing Partner, Harborview Dental Clinic',
      formTitle: 'Schedule an IT Site Audit',
      formSubtitle: 'Book a 45-minute on-site or office review with our lead systems consultant.',
      companyName: 'Company or Office Name',
      contactName: 'Contact Name',
      teamSize: 'Team Size',
      workstationsSuffix: 'workstations',
      businessEmail: 'Business Email',
      phoneNumber: 'Phone Number',
      primaryFocus: 'Primary Focus',
      preferredDate: 'Preferred Date',
      projectBrief: 'Project Brief (Optional)',
      projectPlaceholder:
        'Describe current network, projector/AV rooms, or workstation replacement goals...',
      submitBtn: 'Request IT Consultation',
      submittingBtn: 'Submitting Request...',
      confirmedTitle: 'Requested',
      confirmedPrefix: 'Confirmed for',
      bookAnother: 'Book Another Session',
    },
    bookingModal: {
      title: 'Bench Repair Intake',
      subtitle: 'Receive an instant Ticket ID to track bench diagnostics live',
      division: 'Maintenance Division',
      deviceModel: 'Device Brand & Model',
      devicePlaceholder: 'e.g. Samsung QN65Q80B 4K TV, Epson EB-L520U, or Lenovo T14',
      symptoms: 'Fault Symptoms / Work Requested',
      symptomsPlaceholder:
        'Describe symptoms (no power, dim lamp, overheating, OS crash, SSD upgrade)...',
      priorityLabel: 'Bench Priority',
      standardQueue: 'Standard Queue (24–48h)',
      priorityQueue: 'Same-Day Priority (+1,500 ETB)',
      fullName: 'Full Name',
      phone: 'Phone',
      email: 'Email',
      submitBtn: 'Submit Repair Intake',
      submittingBtn: 'Logging Repair Ticket...',
      loggedTitle: 'Logged',
      deviceLabel: 'Device:',
      estimateLabel: 'Initial Bench Estimate:',
      viewInTracker: 'View in Live Tracker',
      close: 'Close',
    },
    footer: {
      description:
        'Computer hardware & software laboratory, 4K TV and projector calibration bench, certified pre-owned PCs, and IT consulting office.',
      workshopTitle: 'Workshop & Office',
      location: 'Bishoftu, Oromia, Ethiopia',
      hours: 'Mon–Sat: 08:30 – 18:30 EAT',
      navigationTitle: 'Navigation',
      rights: 'All rights reserved.',
      staffWorkbench: 'Office Staff Workbench',
    },
    estimator: {
      kicker: 'Instant ETB Quote Calculator',
      heading: 'Estimate your repair cost before visiting.',
      subheading:
        'Select your device type and damage severity for a transparent ETB labor and parts estimate.',
      deviceTypeLabel: '1. Select Device Type',
      severityLabel: '2. Select Damage Severity',
      priorityLabel: '3. Bench Turnaround Speed',
      standardQueue: 'Standard Queue (24–48 hrs)',
      priorityQueue: 'Same-Day Priority (+1,500 ETB)',
      quoteTitle: 'Estimated Repair Quote',
      quoteSubtitle: 'Diagnostic fee credited toward final invoice',
      diagnosticCredit: 'Bench Diagnostic Fee',
      turnaroundLabel: 'Estimated Turnaround',
      warrantyLabel: 'Workmanship Warranty',
      warrantyValue: '12 Months',
      partsNote: 'Final quote is confirmed after written bench testing before any repair begins.',
      bookWithEstimate: 'Book With This Estimate',
      devices: {
        laptop: { label: 'Laptop', scopeHint: 'Screen, battery, hinge, keyboard, or logic board' },
        desktop: { label: 'Desktop PC', scopeHint: 'PSU, motherboard, GPU, thermal rebuild, or RAM/SSD' },
        software: { label: 'Software & Data', scopeHint: 'OS recovery, virus removal, or drive data extraction' },
        tv: { label: '4K / LED TV', scopeHint: 'Power board, LED backlight strips, T-Con, or HDMI port' },
        projector: { label: 'Projector', scopeHint: 'Lamp/laser, optical prism cleaning, color wheel, or DMD chip' },
      },
      severities: {
        minor: {
          label: 'Minor',
          summary: 'Cleaning, thermal paste, OS tune-up, or single port/cable fault',
        },
        moderate: {
          label: 'Moderate',
          summary: 'Single module swap (PSU, backlight, screen, battery, or color wheel)',
        },
        severe: {
          label: 'Severe',
          summary: 'Board-level micro-soldering, liquid spill, DMD chip, or multi-part repair',
        },
      },
    },
    testimonials: {
      kicker: 'Customer Success',
      heading: 'Verified feedback from Bishoftu repair & IT clients.',
      subheading:
        'Real outcomes across board-level laptop recovery, conference hall AV calibration, pre-owned workstation fleets, and local office networks.',
      averageLabel: '4.9 / 5.0 client rating across 380+ bench repairs & IT audits',
      filters: {
        all: 'All Clients',
        repair: 'PC & Hardware Repair',
        av: 'TV & Projector',
        consulting: 'IT Consulting',
      },
      items: [
        {
          id: 'cs-1',
          category: 'repair',
          serviceMeta: 'Laptop Motherboard & Data Recovery',
          location: 'Bishoftu, Kebele 01',
          quote:
            'Our engineering laptop shorted out two days before a municipal tender deadline. KEVLAR TECH diagnosed the fractured charging IC under the microscope, rebuilt the power rail, and recovered every CAD drawing intact.',
          outcome: 'Returned in 28 hrs · 100% CAD data saved',
          authorName: 'Dawit Mekonnen',
          authorRole: 'Lead Site Engineer',
          organization: 'Rift Valley Civil Works',
        },
        {
          id: 'cs-2',
          category: 'av',
          serviceMeta: 'Projector Optics & 4K TV Repair',
          location: 'Hora Lake District, Bishoftu',
          quote:
            'Both our training hall Epson projector and lobby 65-inch 4K display went dim after a power fluctuation. Instead of replacing the units, their bench cleaned the optical prism array and replaced the failed PSU boards.',
          outcome: 'Saved 75,000+ ETB vs. replacement',
          authorName: 'Tigist Hailemariam',
          authorRole: 'Operations Manager',
          organization: 'Hora Conference & Lodge',
        },
        {
          id: 'cs-3',
          category: 'repair',
          serviceMeta: 'Certified Used PC Fleet',
          location: 'Bishoftu Central Market',
          quote:
            'We purchased six bench-tested ThinkPad laptops and two compact office desktops for our accounting team. Every machine arrived with verified battery health, clean OS setup, and zero hardware faults all year.',
          outcome: '8 workstations · 12 months zero downtime',
          authorName: 'Abebe Bekele',
          authorRole: 'Finance Coordinator',
          organization: 'Adaa Micro-Enterprise Office',
        },
        {
          id: 'cs-4',
          category: 'consulting',
          serviceMeta: 'IT Consulting & Network Architecture',
          location: 'Bishoftu Industrial Corridor',
          quote:
            'Before working with KEVLAR TECH, our billing desks dropped offline every afternoon. Their team structured dual-ISP failover, separated staff and guest Wi-Fi, and automated nightly backups across 18 computers.',
          outcome: '99.8% office network uptime',
          authorName: 'Bona Tadesse',
          authorRole: 'Clinic Administrator',
          organization: 'Bishoftu Specialized Health Center',
        },
      ],
    },
  },

  am: {
    nav: {
      services: 'አገልግሎቶች',
      usedPcs: 'ያገለገሉ ፒሲዎች',
      trackRepair: 'ጥገና ይከታተሉ',
      consulting: 'የአይቲ ምክር',
      bookService: 'አገልግሎት ያስይዙ',
    },
    hero: {
      kicker: 'የሃርድዌር ላብ · የቲቪ እና ፕሮጀክተር ጥገና · ያገለገሉ ፒሲዎች · ቢሾፍቱ፣ ኢትዮጵያ',
      headline: 'ለኮምፒውተሮች፣ ስክሪኖች እና የቢሮ አይቲ ትክክለኛ ጥገና።',
      description:
        'በቦርድ ደረጃ የኮምፒውተር ጥገና፣ የ4K ቲቪ እና ፕሮጀክተር ማስተካከያ፣ በላብራቶሪ የተፈተሹ ያገለገሉ ኮምፒውተሮች ሽያጭ እና የአይቲ አማካሪ አገልግሎት በቢሾፍቱ፣ ኢትዮጵያ።',
      primaryCta: 'ጥገና ያስይዙ',
      secondaryCta: 'ያገለገሉ ፒሲዎችን ይመልከቱ',
      metrics: [
        { value: '24–48 ሰዓት', label: 'አማካይ የጥገና ጊዜ' },
        { value: '12-ወር', label: 'የዕቃ እና የእጅ ዋስትና' },
        { value: '42-ነጥብ', label: 'ያገለገሉ ፒሲ ፍተሻ' },
        { value: '99.4%', label: 'የመጀመሪያ ጉብኝት መፍትሄ' },
      ],
    },
    services: {
      kicker: 'የጥገና እና የአገልግሎት ክፍሎች',
      heading: 'አራት ልዩ የጥገና ክፍሎች እና ግልጽ የዋጋ ክልሎች።',
      subheading:
        'እያንዳንዱ ጥገና ሥራ ከመጀመሩ በፊት የጽሁፍ ምርመራ፣ ጥራት ያላቸው መለዋወጫዎች እና የ12 ወር ዋስትና ያካትታል።',
      turnaroundPrefix: 'የጥገና ጊዜ:',
      inspectRates: 'ዋጋ ይመልከቱ',
      inspectingRates: 'ዋጋ እየታየ ነው',
      bookBench: 'ቦታ ያስይዙ',
      typicalEstimatesTitle: 'የተለመዱ የጥገና ግምት ዋጋዎች',
      schedulePrefix: 'ቀጠሮ ያስይዙ —',
      pillars: [
        {
          index: '01',
          category: 'computer_hardware',
          title: 'የኮምፒውተር ሃርድዌር ጥገና',
          turnaround: '24–48 ሰዓት',
          diagnosticFee: '600 ETB የመጀመሪያ ምርመራ (ለጥገና የሚታሰብ)',
          summary:
            'የላፕቶፕ እና ዴስክቶፕ ማዘርቦርድ ማይክሮ-ሶልደሪንግ፣ የኃይል መስመር ጥገና፣ ፈሳሽ የፈሰሰበት ቦርድ ማጽዳት እና የሙቀት ማቀዝቀዣ ጥገና።',
          capabilities: [
            'ማዘርቦርድ እና USB-C / የኃይል መሰኪያ ማይክሮ-ሶልደሪንግ',
            'NVMe SSD፣ DDR4/DDR5 RAM እና ግራፊክስ ማሻሻያ',
            'ስክሪን፣ ማጠፊያ፣ ባትሪ እና ኪቦርድ መቀየር',
            'የPTM7950 ተርማል ፓድ እና የአየር ማቀዝቀዣ ጥገና',
          ],
          typicalRepairs: [
            { task: 'ሎጂክ ቦርድ / USB-C ቻርጅ ጥገና', priceRange: '3,500 – 7,500 ETB' },
            { task: 'የሙቀት ማቀዝቀዣ እና አቧራ ማጽዳት', priceRange: '1,500 – 2,500 ETB' },
            { task: 'የላፕቶፕ ስክሪን ወይም ባትሪ መቀየር', priceRange: '4,500 – 12,000 ETB' },
          ],
        },
        {
          index: '02',
          category: 'computer_software',
          title: 'ሶፍትዌር፣ ኦፕሬቲንግ ሲስተም እና ዳታ መመለስ',
          turnaround: 'በዕለቱ – 24 ሰዓት',
          diagnosticFee: '500 ETB የሶፍትዌር ምርመራ',
          summary:
            'ንጹህ የኦፕሬቲንግ ሲስተም ጭነት፣ ያለ ዳታ መጥፋት ዊንዶውስ እና ማክ ሽግግር፣ ቫይረስ ማጥፋት እና ከተበላሹ ድራይቮች መረጃ ማውጣት።',
          capabilities: [
            'Windows 11 / Linux / macOS ጭነት እና ድራይቨር ማስተካከል',
            'ፋይል ሳይጠፋ ቫይረስ እና ማልዌር ማጽዳት',
            'ከተበላሹ ፓርቲሽኖች እና SSD ዳታ መመለስ',
            'BIOS/UEFI ፈርምዌር እና BitLocker መመለስ',
          ],
          typicalRepairs: [
            { task: 'የOS ማደስ እና ፍጥነት ማሻሻያ', priceRange: '1,200 – 2,200 ETB' },
            { task: 'ማልዌር ማጥፋት እና ደህንነት ማጠናከር', priceRange: '1,500 – 2,800 ETB' },
            { task: 'የጠፋ ፋይል እና ድራይቭ መረጃ መመለስ', priceRange: '3,000 – 8,500 ETB' },
          ],
        },
        {
          index: '03',
          category: 'tv_maintenance',
          title: '4K OLED፣ QLED እና LED ቲቪ ጥገና',
          turnaround: '2–4 ቀናት',
          diagnosticFee: '800 ETB የቲቪ ምርመራ',
          summary:
            'ለቤት እና ለቢሮ ትላልቅ ቲቪዎች ትክክለኛ ጥገና። የኃይል ቦርድ፣ T-Con ቦርድ እና የLED የኋላ መብራት ጥገና እንሰራለን።',
          capabilities: [
            'ሙሉ የLED የኋላ መብራት መቀየር እና ስክሪን ማስተካከል',
            'የኃይል ቦርድ (PSU) ካፓሲተር እና MOSFET ጥገና',
            'T-Con ቦርድ እና የምስል መስመር ችግር መፍታት',
            'HDMI 2.1 መሰኪያ መቀየር እና የቀለም ካሊብሬሽን',
          ],
          typicalRepairs: [
            { task: 'የኃይል ቦርድ / የማይበራ ቲቪ ጥገና', priceRange: '4,000 – 8,500 ETB' },
            { task: 'የLED የኋላ መብራት መቀየር (50"–75")', priceRange: '5,500 – 12,500 ETB' },
            { task: 'HDMI ፖርት ማይክሮ-ሶልደሪንግ', priceRange: '3,200 – 5,000 ETB' },
          ],
        },
        {
          index: '04',
          category: 'projector_maintenance',
          title: 'የፕሮጀክተር ኦፕቲካል እና ላምፕ ጥገና',
          turnaround: '2–3 ቀናት',
          diagnosticFee: '800 ETB የኦፕቲካል ምርመራ',
          summary:
            'ለንግድ፣ ትምህርት ቤት እና ሲኒማ ፕሮጀክተሮች የሌዘር እና UHP ላምፕ መቀየር፣ DLP DMD ቺፕ፣ ቀለም ዊል እና የሌንስ ማጽዳት።',
          capabilities: [
            'OEM UHP ላምፕ መቀየር እና የባላስት ፍተሻ',
            'የኦፕቲካል ፕሪዝም፣ ፖላራይዘር እና ሌንስ ማጽዳት',
            'የDLP DMD ቺፕ መቀየር (ነጭ/ጥቁር ነጠብጣቦችን ማስወገድ)',
            'የሙቀት ሴንሰር፣ የአየር ሞተር እና ቀለም ዊል ጥገና',
          ],
          typicalRepairs: [
            { task: 'ኦፕቲካል ማጽዳት እና የሙቀት አገልግሎት', priceRange: '2,800 – 4,800 ETB' },
            { task: 'ቀለም ዊል ወይም ባላስት መቀየር', priceRange: '5,000 – 9,500 ETB' },
            { task: 'DMD ቺፕ መቀየር (1080p / 4K DLP)', priceRange: '7,500 – 14,000 ETB' },
          ],
        },
      ],
    },
    catalog: {
      kicker: 'በላብራቶሪ የተፈተሹ ኮምፒውተሮች',
      heading: 'ለሥራ ዝግጁ የሆኑ ጥራት ያላቸው ያገለገሉ ፒሲዎች።',
      subheading:
        'እያንዳንዱ ኮምፒውተር 42-ነጥብ የሙቀት፣ ሚሞሪ፣ ስቶሬጅ እና ባትሪ ፍተሻ አልፎ በ12-ወር ዋስትና ይሸጣል።',
      reservationCart: 'የግዢ ቅርጫት',
      searchPlaceholder: 'CPU፣ RAM ወይም ሞዴል ይፈልጉ...',
      inStockOnly: 'በመጋዘን ያሉ ብቻ',
      noMatchesTitle: 'ከፍለጋዎ ጋር የሚመሳሰል ኮምፒውተር አልተገኘም።',
      noMatchesDesc: 'ፍለጋዎን ያጽዱ ወይም ለቢሮዎ ብዛት ያለው ትዕዛዝ ከአይቲ ቢሯችን ይጠይቁ።',
      resetFilters: 'ፍለጋ አጽዳ',
      processor: 'ፕሮሰሰር',
      memorySsd: 'ሚሞሪ / SSD',
      graphics: 'ግራፊክስ',
      displayChassis: 'ስክሪን / ቻሲስ',
      warrantyUnit: '-ወር ዋስትና',
      fullSpecs: 'ሙሉ መግለጫ',
      reserve: 'ያስይዙ',
      inCart: 'ቅርጫት ውስጥ',
      addedToCart: 'ቅርጫት ውስጥ ገብቷል',
      addToReservationCart: 'ወደ ቅርጫት ያስገቡ',
      includesWarranty: 'የ12-ወር KEVLAR TECH ዋስትና ያካትታል',
      inStock: 'ይገኛል',
      addPcBtn: 'የሚሸጥ ፒሲ ያክሉ',
      uploadPhoto: 'የፒሲ ፎቶ ይጫኑ',
      changePhoto: 'ፎቶ ቀይር',
      removePhoto: 'አስወግድ',
      uploadingPhoto: 'በመጫን ላይ...',
      noPhotoYet: 'የዚህን ፒሲ የራስዎን ፎቶ ያስገቡ',
      addModalTitle: 'ለሽያጭ የቀረበ ፒሲ ያክሉ',
      addModalSubtitle: 'የኮምፒውተሩን ትክክለኛ ፎቶ ይጫኑ እና በብር ዋጋ ያሳትሙ።',
      pcPhotoLabel: 'የፒሲ ፎቶ (JPG, PNG, WebP)',
      choosePhotoFile: 'ከመሳሪያዎ ፎቶ ይምረጡ',
      photoHint: 'ለሽያጭ የቀረበውን ላፕቶፕ ወይም ዴስክቶፕ ግልጽ ፎቶ ይጫኑ።',
      modelTitleLabel: 'የሞዴል ስም',
      categoryLabel: 'ምድብ',
      gradeLabel: 'የጥራት ደረጃ',
      priceEtbLabel: 'ዋጋ (ETB)',
      displayLabel: 'ስክሪን / ቻሲስ',
      warrantyMonthsLabel: 'ዋስትና (በወር)',
      notesLabel: 'የላብራቶሪ ፍተሻ ማስታወሻ',
      notesPlaceholder: 'የባትሪ ሁኔታ፣ የሙቀት ፍተሻ፣ ፖርቶች እና ሲስተም...',
      publishPcBtn: 'ፒሲውን ለሽያጭ ያውጡ',
      publishingPcBtn: 'በመለጠፍ ላይ...',
      cancelBtn: 'ተወው',
      categories: {
        All: 'ሁሉም',
        'Business Laptop': 'የቢሮ ላፕቶፕ',
        Workstation: 'ወርክስቴሽን',
        'Office Desktop': 'የቢሮ ዴስክቶፕ',
      },
      statuses: {
        Available: 'ይገኛል',
        Reserved: 'ተይዟል',
        Sold: 'ተሽጧል',
      },
    },
    cart: {
      title: 'የሃርድዌር ማስያዣ ቅርጫት',
      subtitle: 'ሲረከቡ ወይም በቢሮ ርክክብ ወቅት ይክፈሉ',
      emptyTitle: 'የማስያዣ ቅርጫትዎ ባዶ ነው።',
      emptyDesc: 'ከዝርዝሩ ውስጥ ማንኛውንም ላፕቶፕ፣ ወርክስቴሽን ወይም ዴስክቶፕ ይምረጡ።',
      fulfillmentMethod: 'የርክክብ መንገድ',
      pickup: 'ሱቅ መጥቶ መውሰድ',
      delivery: 'ቢሾፍቱ ቢሮ ድረስ ማድረስ',
      fullName: 'ሙሉ ስም',
      phone: 'ስልክ ቁጥር',
      email: 'ኢሜይል',
      deliveryAddress: 'የማድረሻ አድራሻ',
      subtotal: 'ጠቅላላ ድምር',
      units: 'ዕቃዎች',
      confirmBtn: 'ትዕዛዙን ያረጋግጡ',
      submittingBtn: 'በማረጋገጥ ላይ...',
      orderConfirmed: 'ተረጋግጧል',
      reservedUnder: 'የመረጡት ኮምፒውተር በስምዎ ተይዟል፦',
      totalDue: 'ጠቅላላ ክፍያ',
      done: 'ጨርስ',
    },
    tracker: {
      kicker: 'ቀጥታ የጥገና ሁኔታ',
      heading: 'የጥገና ቲኬትዎን በቀጥታ ይከታተሉ።',
      subheading:
        'የኮምፒውተር፣ የቲቪ ወይም የፕሮጀክተር ጥገናዎን የምርመራ ማስታወሻ፣ የመለዋወጫ ሁኔታ እና የዋጋ ግምት ለማየት የቲኬት ቁጥርዎን ያስገቡ።',
      placeholder: 'የቲኬት ቁጥር ያስገቡ (ለምሳሌ KVT-1041)',
      checkStatus: 'ሁኔታ ይመልከቱ',
      checking: 'በመፈለግ ላይ...',
      sampleTickets: 'የናሙና ቲኬቶች:',
      needDropoff: 'መሣሪያ ለመስጠት ይፈልጋሉ?',
      createTicket: 'አዲስ የጥገና ቲኬት ይክፈቱ',
      loading: 'የጥገና ሁኔታ በመጫን ላይ...',
      clientLabel: 'ደንበኛ:',
      statusPrefix: 'ሁኔታ:',
      reportedFault: 'የተመዘገበ ችግር',
      benchLog: 'የቴክኒሻን ማስታወሻ',
      lastUpdated: 'መጨረሻ የታደሰው',
      estimatedTotal: 'የተገመተ ዋጋ',
      stages: {
        Intake: 'ገብቷል',
        Diagnosing: 'በምርመራ ላይ',
        'Parts Ordered': 'መለዋወጫ ታዟል',
        Testing: 'በሙከራ ላይ',
        'Ready for Pickup': 'ለመውሰድ ዝግጁ',
        Completed: 'ተጠናቋል',
      },
      categoryLabels: {
        computer_hardware: 'የኮምፒውተር ሃርድዌር ጥገና',
        computer_software: 'ሶፍትዌር እና OS አገልግሎት',
        tv_maintenance: 'የቲቪ ጥገና እና ማስተካከያ',
        projector_maintenance: 'የፕሮጀክተር ኦፕቲካል ጥገና',
      },
    },
    founder: {
      kicker: 'የሱቁ መስራች · የማቴሪያልስ መሐንዲስ · ቢሾፍቱ፣ ኢትዮጵያ',
      heading: 'በእያንዳንዱ ጥገና እና ኮምፒውተር ጀርባ የማቴሪያልስ ሳይንስ ጥራት።',
      description:
        'በማቴሪያልስ መሐንዲስ የተመሰረተው KEVLAR TECH የኤሌክትሮኒክስ ጥገናን ከመሠረቱ ይመለከታል—ክፍሎችን በግምት ከመቀየር ይልቅ የተርማል ማቀዝቀዣዎች፣ የሶልደር መገጣጠሚያዎች እና የኦፕቲካል ሌንሶች ለምን እንደሚበላሹ በሳይንሳዊ መንገድ ይመረምራል።',
      disciplines: [
        {
          index: '01.',
          title: 'የሶልደር ሜታለርጂ እና PCB ጥራት',
          detail:
            'ትክክለኛ የሙቀት ሪፍሎው፣ የቦርድ መገጣጠሚያ ፍተሻ እና የማዘርቦርድና የቲቪ ኃይል ቦርድ ንጽህና።',
        },
        {
          index: '02.',
          title: 'ተርማል እና የማቀዝቀዝ ፊዚክስ',
          detail:
            'የፕሮሰሰር እና GPU ዕድሜን የሚያራዝሙ ከፍተኛ ጥራት ያላቸው PTM7950 ተርማል ፓዶች።',
        },
        {
          index: '03.',
          title: 'የኦፕቲካል እና ኤሌክትሪክ ጽናት',
          detail:
            'የፕሮጀክተር ፕሪዝም እና ፖላራይዘር ጽዳት እንዲሁም ከፍተኛ ጥራት ያላቸው ካፓሲተሮች መቀየር።',
        },
      ],
      bookInspection: 'የላብራቶሪ ፍተሻ ያስይዙ',
      consultOffice: 'የአይቲ ቢሯችንን ያማክሩ',
      galleryHeading: 'በቢሾፍቱ ሱቃችን ውስጥ',
      gallerySubheading: 'የቦርድ ምርመራ ጠረጴዛ · የሶፍትዌርና ዳታ ክፍል · የደንበኞች መቀበያ',
      captions: [
        'መልቲሜትር፣ ሆት-ኤር እና የማዘርቦርድ ምርመራ ጠረጴዛ',
        'የሶፍትዌር ጭነት፣ ድራይቭ ፍተሻ እና የተደራጀ የኬብል ክፍል',
        'በቢሾፍቱ የሚገኘው የKEVLAR TECH የደንበኞች መቀበያ መግቢያ',
      ],
    },
    consulting: {
      kicker: 'የአይቲ አማካሪ ቢሮ',
      heading: 'በቢሾፍቱ እና በኦሮሚያ ላሉ ቢሮዎች ተግባራዊ የአይቲ መሠረተ ልማት።',
      subheading:
        'ከክሊኒክ ኔትወርኮች እስከ የስብሰባ አዳራሽ ፕሮጀክተር እና የቢሮ ኮምፒውተር አቅርቦት፣ አላስፈላጊ ወጪ ሳይኖር ሙሉ ቁጥጥር የሚሰጥ ሲስተም እንገነባለን።',
      practices: [
        {
          num: '01.',
          title: 'Network & Wi-Fi Architecture',
          localizedTitle: 'የኔትወርክ እና ዋይፋይ አርክቴክቸር',
          deliverable: 'VLAN፣ Dual-WAN እና የCat6A መስመር ዝርጋታ',
          description:
            'በአስተማማኝ UniFi/Cisco ራውተሮች፣ VLAN ክፍፍል እና VPN የርቀት መዳረሻ የቢሮ እና የስብሰባ ክፍል ኢንተርኔት መቆራረጥን ያስወግዱ።',
        },
        {
          num: '02.',
          title: 'Workstation Fleet & Procurement',
          localizedTitle: 'የቢሮ ኮምፒውተር አቅርቦት እና ዝግጅት',
          deliverable: 'ወጥ የሆነ OS ጭነት፣ MDM እና የመሳሪያ ዕቅድ',
          description:
            'በድርጅትዎ ሶፍትዌሮች እና ሴኩሪቲ የተዘጋጁ ወጥ የሆኑ ላፕቶፖች እና ዴስክቶፖችን በፍጥነት ያሰራጩ።',
        },
        {
          num: '03.',
          title: 'Server & Cloud Backup',
          localizedTitle: 'ሰርቨር እና ክላውድ ባክአፕ',
          deliverable: 'የቢሮ NAS ሰርቨር + 3-2-1 ደህንነቱ የተጠበቀ ባክአፕ',
          description:
            'Synology/TrueNAS የፋይል ሰርቨሮች ከMicrosoft 365 ወይም Google Workspace እና ከአደጋ መልሶ ማግኛ ጋር።',
        },
        {
          num: '04.',
          title: 'Security & Audit',
          localizedTitle: 'የሴኩሪቲ ፍተሻ እና ጥበቃ',
          deliverable: 'Endpoint ጥበቃ፣ አውቶማቲክ አፕዴት እና ፋየርዎል',
          description:
            'ለክሊኒኮች እና ቢሮዎች ወቅታዊ የደህንነት ፍተሻ፣ የሃርድዌር ፋየርዎል ማስተካከያ እና የመረጃ ጥበቃ።',
        },
      ],
      uptimeStat: '99.94%',
      uptimeDesc: 'በቢሾፍቱ እና አካባቢው ባሉ 18 የደንበኛ ቢሮዎች የተመዘገበ የኔትወርክ አስተማማኝነት',
      tcoStat: '38% ቅናሽ',
      tcoDesc: 'በተፈተሹ ያገለገሉ ኮምፒውተሮች እና የጥገና ውል የተገኘ የቢሮ ወጪ ቅናሽ',
      quote:
        'KEVLAR TECH የ14 ኮምፒውተሮች ክሊኒክ ኔትወርካችንን እንደገና ገንብቶልናል፣ አሮጌ ኮምፒውተሮችን በተፈተሹ ThinkCentres ቀይሮ መቆራረጥን በሳምንት ውስጥ አጥፍቷል።',
      quoteAuthor: 'ዶ/ር ሃና ቾ · Harborview Dental Clinic',
      formTitle: 'የአይቲ ቢሮ ፍተሻ ቀጠሮ ያስይዙ',
      formSubtitle: 'ከዋናው የሲስተም አማካሪያችን ጋር የ45 ደቂቃ የቢሮ ወይም የሳይት ምርመራ ያስይዙ።',
      companyName: 'የድርጅት ወይም የቢሮ ስም',
      contactName: 'የኃላፊ ስም',
      teamSize: 'የሰራተኞች ብዛት',
      workstationsSuffix: 'ኮምፒውተሮች',
      businessEmail: 'የቢሮ ኢሜይል',
      phoneNumber: 'ስልክ ቁጥር',
      primaryFocus: 'ዋና የትኩረት መስክ',
      preferredDate: 'የተመረጠ ቀን',
      projectBrief: 'የፕሮጀክት መግለጫ (አማራጭ)',
      projectPlaceholder: 'ስለ ቢሮዎ ኔትወርክ፣ ፕሮጀክተር ወይም የኮምፒውተር ፍላጎት ይግለጹ...',
      submitBtn: 'የአይቲ ምክር ይጠይቁ',
      submittingBtn: 'በመላክ ላይ...',
      confirmedTitle: 'ተጠይቋል',
      confirmedPrefix: 'ቀጠሮው ተይዟል ለ',
      bookAnother: 'ሌላ ቀጠሮ ያስይዙ',
    },
    bookingModal: {
      title: 'የጥገና መመዝገቢያ',
      subtitle: 'ጥገናዎን በቀጥታ ለመከታተል ወዲያውኑ የቲኬት ቁጥር ያግኙ',
      division: 'የጥገና ክፍል',
      deviceModel: 'የመሣሪያው ብራንድ እና ሞዴል',
      devicePlaceholder: 'ለምሳሌ Samsung 4K TV, Epson Projector, ወይም Lenovo T14',
      symptoms: 'የችግሩ መግለጫ / የሚፈለገው ሥራ',
      symptomsPlaceholder: 'ምልክቱን ይግለጹ (አይበራም፣ ብርሃን ቀንሷል፣ ይሞቃል፣ SSD ማሻሻያ)...',
      priorityLabel: 'የጥገና ቅድሚያ',
      standardQueue: 'መደበኛ ወረፋ (24–48 ሰዓት)',
      priorityQueue: 'የዕለቱ ቅድሚያ (+1,500 ETB)',
      fullName: 'ሙሉ ስም',
      phone: 'ስልክ',
      email: 'ኢሜይል',
      submitBtn: 'የጥገና ቲኬት ያስገቡ',
      submittingBtn: 'በመመዝገብ ላይ...',
      loggedTitle: 'ተመዝግቧል',
      deviceLabel: 'መሣሪያ:',
      estimateLabel: 'የመጀመሪያ ግምት:',
      viewInTracker: 'በቀጥታ መከታተያ ይመልከቱ',
      close: 'ዝጋ',
    },
    footer: {
      description:
        'የኮምፒውተር ሃርድዌርና ሶፍትዌር ላብራቶሪ፣ የ4K ቲቪና ፕሮጀክተር ጥገና፣ የተፈተሹ ያገለገሉ ፒሲዎች ሽያጭ እና የአይቲ አማካሪ ቢሮ።',
      workshopTitle: 'ሱቅ እና ቢሮ',
      location: 'ቢሾፍቱ፣ ኦሮሚያ፣ ኢትዮጵያ',
      hours: 'ሰኞ–ቅዳሜ: 08:30 – 18:30 (2:30 – 12:30)',
      navigationTitle: 'ገጾች',
      rights: 'መብቱ በህግ የተጠበቀ ነው።',
      staffWorkbench: 'የቢሮ ሰራተኞች መቆጣጠሪያ',
    },
    estimator: {
      kicker: 'ፈጣን የETB ዋጋ ማስያ',
      heading: 'ወደ ሱቅ ከመምጣትዎ በፊት የጥገና ዋጋውን ይገምቱ።',
      subheading:
        'ግልጽ የሆነ የETB የጥገና እና የመለዋወጫ ግምት ለማግኘት የመሣሪያውን ዓይነት እና የጉዳቱን ደረጃ ይምረጡ።',
      deviceTypeLabel: '1. የመሣሪያውን ዓይነት ይምረጡ',
      severityLabel: '2. የጉዳቱን ደረጃ ይምረጡ',
      priorityLabel: '3. የጥገና ፍጥነት',
      standardQueue: 'መደበኛ ወረፋ (24–48 ሰዓት)',
      priorityQueue: 'የዕለቱ ቅድሚያ (+1,500 ETB)',
      quoteTitle: 'የተገመተ የጥገና ዋጋ',
      quoteSubtitle: 'የምርመራ ክፍያ ወደ ዋናው ሂሳብ ይታሰባል',
      diagnosticCredit: 'የላብራቶሪ ምርመራ ክፍያ',
      turnaroundLabel: 'የሚፈጀው ጊዜ',
      warrantyLabel: 'የጥገና ዋስትና',
      warrantyValue: '12 ወራት',
      partsNote: 'ማንኛውም ጥገና ከመጀመሩ በፊት የመጨረሻው ዋጋ በጽሁፍ ምርመራ ይረጋገጣል።',
      bookWithEstimate: 'በዚህ ግምት ጥገና ያስይዙ',
      devices: {
        laptop: { label: 'ላፕቶፕ', scopeHint: 'ስክሪን፣ ባትሪ፣ ማጠፊያ፣ ኪቦርድ ወይም ማዘርቦርድ' },
        desktop: { label: 'ዴስክቶፕ ፒሲ', scopeHint: 'PSU፣ ማዘርቦርድ፣ GPU፣ ማቀዝቀዣ ወይም RAM/SSD' },
        software: { label: 'ሶፍትዌር እና ዳታ', scopeHint: 'OS ማደስ፣ ቫይረስ ማጥፋት ወይም ዳታ መመለስ' },
        tv: { label: '4K / LED ቲቪ', scopeHint: 'የኃይል ቦርድ፣ LED መብራት፣ T-Con ወይም HDMI' },
        projector: { label: 'ፕሮጀክተር', scopeHint: 'ላምፕ/ሌዘር፣ ፕሪዝም ማጽዳት፣ ቀለም ዊል ወይም DMD' },
      },
      severities: {
        minor: {
          label: 'ቀላል',
          summary: 'ማጽዳት፣ ተርማል ፓስታ፣ OS ማስተካከል ወይም አንድ ፖርት/ገመድ ጥገና',
        },
        moderate: {
          label: 'መካከለኛ',
          summary: 'የአንድ ክፍል መቀየር (PSU፣ የኋላ መብራት፣ ስክሪን፣ ባትሪ ወይም ቀለም ዊል)',
        },
        severe: {
          label: 'ከባድ',
          summary: 'የቦርድ ማይክሮ-ሶልደሪንግ፣ ፈሳሽ ጉዳት፣ DMD ቺፕ ወይም ብዙ ክፍሎች ጥገና',
        },
      },
    },
    testimonials: {
      kicker: 'የደንበኞች እርካታ',
      heading: 'በቢሾፍቱ የጥገና እና የአይቲ ደንበኞቻችን የተረጋገጡ ምስክርነቶች።',
      subheading:
        'በማዘርቦርድ ጥገና፣ በፕሮጀክተር እና ቲቪ ካሊብሬሽን፣ በተመረመሩ ያገለገሉ ፒሲዎች እና በቢሮ ኔትወርክ ምክር አገልግሎት የተመዘገቡ ውጤቶች።',
      averageLabel: '4.9 / 5.0 አማካይ ደረጃ ከ380+ የጥገና እና የአይቲ ፕሮጀክቶች',
      filters: {
        all: 'ሁሉም ደንበኞች',
        repair: 'የፒሲ እና ሃርድዌር ጥገና',
        av: 'ቲቪ እና ፕሮጀክተር',
        consulting: 'የአይቲ ምክር',
      },
      items: [
        {
          id: 'cs-1',
          category: 'repair',
          serviceMeta: 'የላፕቶፕ ማዘርቦርድ እና ዳታ መመለስ',
          location: 'ቢሾፍቱ፣ ቀበሌ 01',
          quote:
            'የጨረታ ማስረከቢያ ቀን ሁለት ቀን ሲቀረው የምህንድስና ላፕቶፓችን በድንገት ተቃጥሎ ነበር። KEVLAR TECH በማይክሮስኮፕ የቻርጂንግ አይሲውን ቀይሮ ሁሉንም የCAD ፋይሎች በሰላም መልሶልናል።',
          outcome: 'በ28 ሰዓት ተጠግኗል · 100% ዳታ ተርፏል',
          authorName: 'ዳዊት መኮንን',
          authorRole: 'ዋና የሳይት መሐንዲስ',
          organization: 'ሪፍት ቫሊ ሲቪል ዎርክስ',
        },
        {
          id: 'cs-2',
          category: 'av',
          serviceMeta: 'የፕሮጀክተር ኦፕቲክስ እና 4K ቲቪ ጥገና',
          location: 'ሆራ ሐይቅ አካባቢ፣ ቢሾፍቱ',
          quote:
            'የመሰብሰቢያ አዳራሻችን ፕሮጀክተር እና 65 ኢንች 4K ቲቪ በኤሌክትሪክ መዋዠቅ ደብዝዘው ነበር። አዲስ ከመግዛት ይልቅ ፕሪዝሙን አጽድተው የኃይል ቦርዱን በጥራት ቀይረውልናል።',
          outcome: 'ከ75,000+ ETB በላይ ወጪ ቀንሷል',
          authorName: 'ትዕግስት ኃይለማርያም',
          authorRole: 'የኦፕሬሽን ሥራ አስኪያጅ',
          organization: 'ሆራ ኮንፈረንስ እና ሎጅ',
        },
        {
          id: 'cs-3',
          category: 'repair',
          serviceMeta: 'የተመረመሩ ያገለገሉ ፒሲዎች',
          location: 'ቢሾፍቱ ማዕከላዊ ገበያ',
          quote:
            'ለሂሳብ ክፍላችን ስድስት የተፈተሹ ThinkPad ላፕቶፖችን እና ሁለት ዴስክቶፖችን ገዝተናል። ሁሉም በጥሩ ባትሪ፣ በተስተካከለ ሲስተም እና ያለምንም ብልሽት አንድ ዓመት ሙሉ ሰርተዋል።',
          outcome: '8 ኮምፒውተሮች · 12 ወር ያለ መቋረጥ',
          authorName: 'አበበ በቀለ',
          authorRole: 'የፋይናንስ አስተባባሪ',
          organization: 'አዳዓ ማይክሮ-ኢንተርፕራይዝ ቢሮ',
        },
        {
          id: 'cs-4',
          category: 'consulting',
          serviceMeta: 'የአይቲ ምክር እና ኔትወርክ አርክቴክቸር',
          location: 'ቢሾፍቱ ኢንዱስትሪ መስመር',
          quote:
            'ከKEVLAR TECH ጋር ከመሥራታችን በፊት የክፍያ ኮምፒውተሮቻችን በየቀኑ ኔትወርክ ያቋርጡ ነበር። ባለሁለት ኢንተርኔት ፌይልኦቨር እና አውቶማቲክ ባካፕ ዘርግተው ችግሩን ሙሉ በሙሉ ፈትተውታል።',
          outcome: '99.8% የቢሮ ኔትወርክ አስተማማኝነት',
          authorName: 'ቦና ታደሰ',
          authorRole: 'የክሊኒክ አስተዳዳሪ',
          organization: 'ቢሾፍቱ ልዩ የጤና ማዕከል',
        },
      ],
    },
  },

  om: {
    nav: {
      services: 'Tajaajiloota',
      usedPcs: 'PC Tajaajilaman',
      trackRepair: 'Suphaa Hordofi',
      consulting: 'Gorsa IT',
      bookService: 'Tajaajila Qabadhu',
    },
    hero: {
      kicker: 'Laabii Haardweerii · Suphaa TV & Piroojektaraa · PC Tajaajilaman · Bishooftuu, Itoophiyaa',
      headline: 'Suphaa sirrii kompiitaraa, iskirinii fi sirna IT waajjiraa.',
      description:
        'Suphaa boordii kompiitaraa, sirreessa TV 4K fi piroojektaraa, gurgurtaa kompiitaroota laabii keessatti mirkanaa’anii fi tajaajila gorsa IT bakka tokkotti Bishooftuu, Itoophiyaa keessatti.',
      primaryCta: 'Suphaa Qabadhu',
      secondaryCta: 'PC Mirkanaa’an Ilaali',
      metrics: [
        { value: 'Sa’aatii 24–48', label: 'Yeroo Suphaa Giddugaleessaa' },
        { value: 'Ji’a 12', label: 'Wabiin Meeshaa fi Hojii' },
        { value: 'Qabxii 42', label: 'Sakatta’iinsa PC Tajaajilamee' },
        { value: '99.4%', label: 'Milkaa’ina Daaw’annaa Duraa' },
      ],
    },
    services: {
      kicker: 'Kutaalee Suphaa fi Tajaajilaa',
      heading: 'Kutaalee suphaa addaa afurii fi gatii ifa ta’e.',
      subheading:
        'Suphaan kamiyyuu hojiin osoo hin jalqabin dura qorannoo barreeffamaa, meeshaalee qulqullina qabanii fi wabii ji’a 12 of keessaa qaba.',
      turnaroundPrefix: 'Yeroo:',
      inspectRates: 'Gatii Ilaali',
      inspectingRates: 'Gatiin Mul’ataa Jira',
      bookBench: 'Bakka Qabadhu',
      typicalEstimatesTitle: 'Tilmaama Gatii Suphaa Idilee',
      schedulePrefix: 'Beellama Qabadhu —',
      pillars: [
        {
          index: '01',
          category: 'computer_hardware',
          title: 'Suphaa Haardweerii Kompiitaraa',
          turnaround: 'Sa’aatii 24–48',
          diagnosticFee: 'Qorannoo Duraa 600 ETB (suphaaf kan qabamu)',
          summary:
            'Suphaa laaptooppii fi deeskitooppii sadarkaa maazarboordii, maaykiroo-sooldaringii, qulqulleessa boordii dhangala’aa fi haaromsa qabbaneessituu.',
          capabilities: [
            'Maazarboordii fi suphaa USB-C / sokkeettii humnaa',
            'Fooyya’iinsa NVMe SSD, DDR4/DDR5 RAM fi GPU',
            'Jijjiirraa iskirinii, baatrii fi kiiboordii',
            'Haaromsa teermaal paadii PTM7950 fi fannii qabbaneessituu',
          ],
          typicalRepairs: [
            { task: 'Suphaa loojik boordii / USB-C chaarjii', priceRange: '3,500 – 7,500 ETB' },
            { task: 'Haaromsa ho’aa fi qulqulleessa dhukkee', priceRange: '1,500 – 2,500 ETB' },
            { task: 'Jijjiirraa iskirinii ykn baatrii laaptooppii', priceRange: '4,500 – 12,000 ETB' },
          ],
        },
        {
          index: '02',
          category: 'computer_software',
          title: 'Sooftiweerii, OS fi Deebisa Daataa',
          turnaround: 'Guyyaa Sana – Sa’aatii 24',
          diagnosticFee: 'Sakatta’iinsa Sooftiweerii 500 ETB',
          summary:
            'Fe’insa sirna hojii qulqulluu, ce’umsa Windows fi macOS daataa osoo hin balleessin, qulqulleessa vaayirasii fi baasiinsa daataa diraayivii miidhamee.',
          capabilities: [
            'Fe’insa Windows 11 / Linux / macOS fi sirreessa diraayivaraa',
            'Faayilii osoo hin haqin vaayirasii fi maaliweerii balleessuu',
            'Deebisa daataa paartishinii fi SSD miidhame irraa',
            'Deebisa BIOS/UEFI fi furtuu BitLocker',
          ],
          typicalRepairs: [
            { task: 'Haaromsa OS fi saffisa dabaluu', priceRange: '1,200 – 2,200 ETB' },
            { task: 'Maaliweerii balleessuu fi nageenya jabessuu', priceRange: '1,500 – 2,800 ETB' },
            { task: 'Deebisa faayilii fi diraayivii badee', priceRange: '3,000 – 8,500 ETB' },
          ],
        },
        {
          index: '03',
          category: 'tv_maintenance',
          title: 'Suphaa TV 4K OLED, QLED fi LED',
          turnaround: 'Guyyaa 2–4',
          diagnosticFee: 'Qorannoo TV 800 ETB',
          summary:
            'Suphaa sirrii TV gurguddaa manaa fi waajjiraa. Boordii humnaa (PSU), T-Con boordii fi sarara ifa duubaa LED ni suphina.',
          capabilities: [
            'Jijjiirraa guutuu sarara ifa duubaa LED fi sirreessa iskirinii',
            'Suphaa boordii humnaa (PSU), kaappaasitara fi MOSFET',
            'Furmaata rakkoo T-Con fi sarara fakkii LVDS',
            'Jijjiirraa poortii HDMI 2.1 fi sirreessa halluu BT.2020',
          ],
          typicalRepairs: [
            { task: 'Suphaa boordii humnaa / TV hin banamnee', priceRange: '4,000 – 8,500 ETB' },
            { task: 'Jijjiirraa ifa duubaa LED (50"–75")', priceRange: '5,500 – 12,500 ETB' },
            { task: 'Maaykiroo-sooldaringii poortii HDMI', priceRange: '3,200 – 5,000 ETB' },
          ],
        },
        {
          index: '04',
          category: 'projector_maintenance',
          title: 'Laabii Ooptikaalii fi Laampii Piroojektaraa',
          turnaround: 'Guyyaa 2–3',
          diagnosticFee: 'Sakatta’iinsa Ooptikaalii 800 ETB',
          summary:
            'Tajaajila piroojektara daldalaa, mana barumsaa fi siinimaa kan moojulii leezarii, laampii UHP, chiippii DLP DMD fi wiilii halluu hammatu.',
          capabilities: [
            'Jijjiirraa laampii OEM UHP fi qorannoo baalaastii',
            'Qulqulleessa piriizimii ooptikaalii fi leensii',
            'Jijjiirraa chiippii DLP DMD (tuqaa adii/gurraacha balleessuu)',
            'Tajaajila seensara ho’aa, fannii qilleensaa fi wiilii halluu',
          ],
          typicalRepairs: [
            { task: 'Qulqulleessa ooptikaalii fi tajaajila ho’aa', priceRange: '2,800 – 4,800 ETB' },
            { task: 'Jijjiirraa wiilii halluu ykn baalaastii', priceRange: '5,000 – 9,500 ETB' },
            { task: 'Jijjiirraa chiippii DMD (1080p / 4K DLP)', priceRange: '7,500 – 14,000 ETB' },
          ],
        },
      ],
    },
    catalog: {
      kicker: 'Haardweerii Mirkanaa’e',
      heading: 'Kompiitaroota tajaajilaman kan hojiif qophaa’an.',
      subheading:
        'Kompiitarri hundi qorannoo ho’aa, miimoorii, kuusaa fi baatrii qabxii-42 darbee OS haaraa fi wabii ji’a 12 waliin dhiyaata.',
      reservationCart: 'Qarxala Qabannaa',
      searchPlaceholder: 'CPU, RAM ykn moodeela barbaadi...',
      inStockOnly: 'Kan Jiran Qofa',
      noMatchesTitle: 'Kompiitarri barbaaddan kuusaa ammaa keessatti hin argamne.',
      noMatchesDesc:
        'Barbaacha keessan haqaa ykn baay’inaan ajajuuf waajjira IT keenya gaafadhaa.',
      resetFilters: 'Barbaacha Haqi',
      processor: 'Pirosessara',
      memorySsd: 'Miimoorii / SSD',
      graphics: 'Giraafiksii',
      displayChassis: 'Iskirinii / Qaama',
      warrantyUnit: ' ji’a wabii',
      fullSpecs: 'Ibsa Guutuu',
      reserve: 'Qabadhu',
      inCart: 'Qarxala Keessa',
      addedToCart: 'Qarxala Keessa Seeneera',
      addToReservationCart: 'Gara Qarxalaatti Dabali',
      includesWarranty: 'Wabii KEVLAR TECH ji’a 12 of keessaa qaba',
      inStock: 'Ni Argama',
      addPcBtn: 'PC Gurguramu Dabali',
      uploadPhoto: 'Suuraa PC Olkaa’i',
      changePhoto: 'Suuraa Jijjiiri',
      removePhoto: 'Haqi',
      uploadingPhoto: 'Olkaa’aa jira...',
      noPhotoYet: 'Suuraa keessan PC kanaaf dabalaa',
      addModalTitle: 'PC Tajaajilame Gurgurtaaf Dabali',
      addModalSubtitle: 'Suuraa kompiitara keessanii fe’aa gatii ETB tiin maxxansaa.',
      pcPhotoLabel: 'Suuraa PC (JPG, PNG, ykn WebP)',
      choosePhotoFile: 'Meeshaa Irraa Suuraa Filadhu',
      photoHint: 'Suuraa ifaa laaptooppii ykn deeskitooppii gurgurtanii dabalaa.',
      modelTitleLabel: 'Maqaa Moodeelaa',
      categoryLabel: 'Ramaddii',
      gradeLabel: 'Sadarkaa Qulqullinaa',
      priceEtbLabel: 'Gatii (ETB)',
      displayLabel: 'Iskirinii / Qaama',
      warrantyMonthsLabel: 'Wabii (Ji’aan)',
      notesLabel: 'Yaadannoo Qorannoo',
      notesPlaceholder: 'Haala baatrii, qorannoo ho’aa, poortii fi OS...',
      publishPcBtn: 'PC Gurgurtaaf Maxxansi',
      publishingPcBtn: 'Maxxansaa jira...',
      cancelBtn: 'Haqi',
      categories: {
        All: 'Hunda',
        'Business Laptop': 'Laaptooppii Hojii',
        Workstation: 'Workstation',
        'Office Desktop': 'Deeskitooppii Waajjiraa',
      },
      statuses: {
        Available: 'Ni Argama',
        Reserved: 'Qabameera',
        Sold: 'Gurgurameera',
      },
    },
    cart: {
      title: 'Qarxala Qabannaa Haardweerii',
      subtitle: 'Yeroo fudhattan ykn waajjira keessanitti kaffalaa',
      emptyTitle: 'Qarxalli qabannaa keessan duwwaa dha.',
      emptyDesc: 'Tarree keessaa laaptooppii, workstation ykn deeskitooppii filadhaa.',
      fulfillmentMethod: 'Haala Fudhannaa',
      pickup: 'Suuqii Irraa Fudhachuu',
      delivery: 'Waajjira Bishooftuutti Geessuu',
      fullName: 'Maqaa Guutuu',
      phone: 'Lakkoofsa Bilbilaa',
      email: 'Imeelii',
      deliveryAddress: 'Teessoo Geessumsaa',
      subtotal: 'Ida’ama',
      units: 'meeshaalee',
      confirmBtn: 'Qabannaa Mirkaneessi',
      submittingBtn: 'Mirkaneessaa jira...',
      orderConfirmed: 'Mirkanaa’eera',
      reservedUnder: 'Meeshaan filattan maqaa keessaniin qabameera:',
      totalDue: 'Kaffaltii Waliigalaa',
      done: 'Xumuri',
    },
    tracker: {
      kicker: 'Haala Suphaa Kallattii',
      heading: 'Tiikeettii suphaa keessanii kallattiin hordofaa.',
      subheading:
        'Yaada ogeessaa, haala meeshaa jijjiirraa fi tilmaama gatii suphaa kompiitaraa, TV ykn piroojektaraa ilaaluuf lakkoofsa tiikeettii galchaa.',
      placeholder: 'Lakkoofsa tiikeettii galchi (fkn KVT-1041)',
      checkStatus: 'Haala Ilaali',
      checking: 'Barbaadaa jira...',
      sampleTickets: 'Tiikeettota fakkeenyaa:',
      needDropoff: 'Meeshaa suphaaf kennuu barbaadduu?',
      createTicket: 'Tiikeettii Haaraa Bani',
      loading: 'Haalli suphaa fe’amaa jira...',
      clientLabel: 'Maamila:',
      statusPrefix: 'Haala:',
      reportedFault: 'Rakkoo Galmaa’e',
      benchLog: 'Galmee Ogeessa Suphaa',
      lastUpdated: 'Yeroo dhumaa kan haaromfame',
      estimatedTotal: 'Tilmaama Waliigalaa',
      stages: {
        Intake: 'Galmaa’eera',
        Diagnosing: 'Qoratamaa Jira',
        'Parts Ordered': 'Meeshaan Ajajameera',
        Testing: 'Yaalamaa Jira',
        'Ready for Pickup': 'Fudhachuuf Qophii',
        Completed: 'Xumurameera',
      },
      categoryLabels: {
        computer_hardware: 'Suphaa Haardweerii Kompiitaraa',
        computer_software: 'Sooftiweerii fi Sirna OS',
        tv_maintenance: 'Suphaa TV fi Sirreessa',
        projector_maintenance: 'Laabii Ooptikaalii Piroojektaraa',
      },
    },
    founder: {
      kicker: 'Hundeessaa Suuqii · Injiinara Maateeriyaalii · Bishooftuu, Itoophiyaa',
      heading: 'Qulqullina saayinsii maateeriyaalii suphaa fi kompiitara hunda duuba jiru.',
      description:
        'Injiinara Maateeriyaalii hojii irra jiruun kan hundeeffame KEVLAR TECH, suphaa elektirooniksii bu’uura irraa ilaala—osoo kutaalee tilmaamaan hin jijjiirin sababa teermaal paadiin, sooldariin fi leensiin ooptikaalii itti miidhaman qorata.',
      disciplines: [
        {
          index: '01.',
          title: 'Metaalarjii Sooldarii fi Qulqullina PCB',
          detail:
            'To’annoo ho’aa sirrii, sakatta’iinsa boordii fi qulqulleessa maazarboordii fi boordii humnaa TV.',
        },
        {
          index: '02.',
          title: 'Fiiziksii Ho’aa fi Qabbaneessuu',
          detail:
            'Teermaal paadii PTM7950 qulqullina olaanaa qabuu fi umurii pirosessaraa fi GPU dheeressu.',
        },
        {
          index: '03.',
          title: 'Cimina Ooptikaalii fi Elektirikii',
          detail:
            'Qulqulleessa piriizimii piroojektaraa fi jijjiirraa kaappaasitaraa qulqullina olaanaa qaban.',
        },
      ],
      bookInspection: 'Qorannoo Laabii Qabadhu',
      consultOffice: 'Waajjira IT Keenya Mari’achiisi',
      galleryHeading: 'Keessa Suuqii Keenyaa Bishooftuu',
      gallerySubheading:
        'Bakka qorannoo boordii · Minjaala sooftiweerii fi daataa · Fuula duraa suuqii',
      captions: [
        'Minjaala qorannoo maltiimeetaraa, ho’aa fi maazarboordii',
        'Fe’insa sooftiweerii, qorannoo diraayivii fi kutaa keebilii',
        'Fuula duraa fi simannaa maamiltootaa KEVLAR TECH Bishooftuu',
      ],
    },
    consulting: {
      kicker: 'Waajjira Gorsa IT',
      heading: 'Caasaa IT hojii irra oolu waajjiraalee Bishooftuu fi Oromiyaaf.',
      subheading:
        'Neetwoorkii kilinikaa irraa hanga kutaa walga’ii piroojektaraa fi dhiyeessii kompiitara waajjiraatti, sirna baasii hin barbaachisne hir’isu ijaarra.',
      practices: [
        {
          num: '01.',
          title: 'Network & Wi-Fi Architecture',
          localizedTitle: 'Caasaa Neetwoorkii fi Wi-Fi',
          deliverable: 'VLAN to’atamaa, Dual-WAN fi keebilii Cat6A',
          description:
            'Cituu interneetii kutaa walga’ii raawwachiisuuf raawutara UniFi/Cisco, qoodinsa VLAN fi VPN fayyadamaa.',
        },
        {
          num: '02.',
          title: 'Workstation Fleet & Procurement',
          localizedTitle: 'Dhiyeessii fi Qophii Kompiitara Waajjiraa',
          deliverable: 'Fe’insa OS walfakkaataa, MDM fi karoora meeshaa',
          description:
            'Laaptooppii fi deeskitooppii mirkanaa’an sooftiweerii waajjiraa fi nageenyaan qophaa’an dhiyeessuu.',
        },
        {
          num: '03.',
          title: 'Server & Cloud Backup',
          localizedTitle: 'Sarvara fi Baakappii Kilaawudii',
          deliverable: 'NAS waajjiraa + baakappii 3-2-1 nageenya qabu',
          description:
            'Sarvara faayilii Synology/TrueNAS waliin Microsoft 365 ykn Google Workspace fi deebisa balaa.',
        },
        {
          num: '04.',
          title: 'Security & Audit',
          localizedTitle: 'Nageenyaa fi Odiitii Sirnaa',
          deliverable: 'Eegumsa Endpoint EDR, haaromsa fi faayarwoolii',
          description:
            'Sakatta’iinsa nageenyaa yeroo yeroo, sirreessa faayarwoolii haardweerii fi eegumsa daataa waajjiraa.',
        },
      ],
      uptimeStat: '99.94%',
      uptimeDesc: 'Amanamummaa neetwoorkii waajjiraalee 18 Bishooftuu fi naannoo isheetti safarame',
      tcoStat: '38% Hir’ina Baasii',
      tcoDesc: 'Hir’ina baasii meeshaalee waajjiraa kompiitaroota mirkanaa’an fayyadamuun argame',
      quote:
        'KEVLAR TECH neetwoorkii kilinika keenyaa kompiitara 14 haaressee, deeskitooppii moofaa ThinkCentres mirkanaa’aniin jijjiiree cituu interneetii torban tokko keessatti balleesse.',
      quoteAuthor: 'Dr. Hannah Cho · Harborview Dental Clinic',
      formTitle: 'Sakatta’iinsa IT Waajjiraa Beellami',
      formSubtitle: 'Ogeessa sirna IT keenya waliin daaw’annaa daqiiqaa 45 qabadhu.',
      companyName: 'Maqaa Dhaabbataa ykn Waajjiraa',
      contactName: 'Maqaa Nama Quunnamtii',
      teamSize: 'Baay’ina Hojjettootaa',
      workstationsSuffix: 'kompiitaroota',
      businessEmail: 'Imeelii Waajjiraa',
      phoneNumber: 'Lakkoofsa Bilbilaa',
      primaryFocus: 'Xiyyeeffannoo Ijoo',
      preferredDate: 'Guyyaa Filatame',
      projectBrief: 'Ibsa Piroojektii (Dirqama Miti)',
      projectPlaceholder: 'Waa’ee neetwoorkii, piroojektaraa ykn fedhii kompiitaraa ibsaa...',
      submitBtn: 'Gorsa IT Gaafadhu',
      submittingBtn: 'Ergaa jira...',
      confirmedTitle: 'Gaafatameera',
      confirmedPrefix: 'Beellamni qabameeraaf:',
      bookAnother: 'Beellama Biraa Qabadhu',
    },
    bookingModal: {
      title: 'Galmee Suphaa Laabii',
      subtitle: 'Suphaa keessan kallattiin hordofuuf battalumatti lakkoofsa tiikeettii argadhaa',
      division: 'Kutaa Suphaa',
      deviceModel: 'Maqaa fi Moodeela Meeshaa',
      devicePlaceholder: 'fkn Samsung 4K TV, Epson Projector, ykn Lenovo T14',
      symptoms: 'Mallattoo Rakkoo / Hojii Barbaadamu',
      symptomsPlaceholder: 'Rakkoo isaa ibsaa (hin banamu, ifni hir’ateera, ni ho’a, SSD dabaluu)...',
      priorityLabel: 'Sadarkaa Ariifannaa',
      standardQueue: 'Tartiiba Idilee (Sa’aatii 24–48)',
      priorityQueue: 'Ariifannaa Guyyaa Sanaa (+1,500 ETB)',
      fullName: 'Maqaa Guutuu',
      phone: 'Bilbila',
      email: 'Imeelii',
      submitBtn: 'Galmee Suphaa Ergi',
      submittingBtn: 'Galmeessaa jira...',
      loggedTitle: 'Galmaa’eera',
      deviceLabel: 'Meeshaa:',
      estimateLabel: 'Tilmaama Jalqabaa:',
      viewInTracker: 'Hordoffii Kallattiitti Ilaali',
      close: 'Cufi',
    },
    footer: {
      description:
        'Laabii haardweerii fi sooftiweerii kompiitaraa, suphaa TV 4K fi piroojektaraa, gurgurtaa PC mirkanaa’an fi waajjira gorsa IT.',
      workshopTitle: 'Suuqii fi Waajjira',
      location: 'Bishooftuu, Oromiyaa, Itoophiyaa',
      hours: 'Wiixata–Sanbata: 08:30 – 18:30 EAT',
      navigationTitle: 'Fuulota',
      rights: 'Mirgi hundi kan eegame dha.',
      staffWorkbench: 'Bakka Hojii Ogeessotaa',
    },
    estimator: {
      kicker: 'Herreegduu Tilmaama Gatii ETB',
      heading: 'Osoo hin dhufin dura gatii suphaa tilmaamadhaa.',
      subheading:
        'Tilmaama gatii hojii fi meeshaa jijjiirraa ETB ifa ta’e argachuuf gosa meeshaa fi sadarkaa miidhaa filadhaa.',
      deviceTypeLabel: '1. Gosa Meeshaa Filadhu',
      severityLabel: '2. Sadarkaa Miidhaa Filadhu',
      priorityLabel: '3. Saffisa Suphaa',
      standardQueue: 'Tartiiba Idilee (Sa’aatii 24–48)',
      priorityQueue: 'Ariifannaa Guyyaa Sanaa (+1,500 ETB)',
      quoteTitle: 'Tilmaama Gatii Suphaa',
      quoteSubtitle: 'Kaffaltiin qorannoo gatii waliigalaa irraa hir’ifama',
      diagnosticCredit: 'Kaffaltii Qorannoo Laabii',
      turnaroundLabel: 'Yeroo Tilmaamame',
      warrantyLabel: 'Wabii Hojii',
      warrantyValue: 'Ji’a 12',
      partsNote: 'Suphaan kamiyyuu jalqabuu dura gatiin dhumaa qorannoo barreeffamaan mirkanaa’a.',
      bookWithEstimate: 'Tilmaama Kanaan Qabadhu',
      devices: {
        laptop: { label: 'Laaptooppii', scopeHint: 'Iskirinii, baatrii, kiiboordii ykn maazarboordii' },
        desktop: { label: 'Deeskitooppii PC', scopeHint: 'PSU, maazarboordii, GPU, qabbaneessituu ykn RAM/SSD' },
        software: { label: 'Sooftiweerii fi Daataa', scopeHint: 'Haaromsa OS, vaayirasii balleessuu ykn deebisa daataa' },
        tv: { label: 'TV 4K / LED', scopeHint: 'Boordii humnaa, ifa duubaa LED, T-Con ykn poortii HDMI' },
        projector: { label: 'Piroojektara', scopeHint: 'Laampii/leezarii, qulqulleessa piriizimii ykn chiippii DMD' },
      },
      severities: {
        minor: {
          label: 'Salphaa',
          summary: 'Qulqulleessa, teermaal paastaa, sirreessa OS ykn rakkoo poortii tokkoo',
        },
        moderate: {
          label: 'Giddugaleessa',
          summary: 'Jijjiirraa kutaa tokkoo (PSU, ifa duubaa, iskirinii, baatrii ykn wiilii halluu)',
        },
        severe: {
          label: 'Cimaa',
          summary: 'Maaykiroo-sooldaringii boordii, dhangala’aa, chiippii DMD ykn suphaa kutaalee hedduu',
        },
      },
    },
    testimonials: {
      kicker: 'Milkaa’ina Maamiltootaa',
      heading: 'Yaada mirkanaa’aa maamiltoota suphaa fi gorsa IT Bishooftuu irraa.',
      subheading:
        'Bu’aa qabatamaa suphaa maazarboordii, qorannoo piroojektaraa fi TV, gurgurtaa PC tajaajilamanii fi ijaarsa neetworkii waajjiraa.',
      averageLabel: '4.9 / 5.0 sadarkaa maamiltootaa hojii suphaa fi IT 380+ irratti',
      filters: {
        all: 'Maamiltoota Hunda',
        repair: 'Suphaa PC & Haardweerii',
        av: 'TV & Piroojektara',
        consulting: 'Gorsa IT',
      },
      items: [
        {
          id: 'cs-1',
          category: 'repair',
          serviceMeta: 'Maazarboordii Laaptooppii & Deebisa Daataa',
          location: 'Bishooftuu, Qabalee 01',
          quote:
            'Laaptooppiin injiinaringii keenya guyyaa lama dorgommii caalbaasii dura caccabee ture. KEVLAR TECH maaykirooskoopiin IC chaarjii jijjiiree faayiloota CAD hunda guutummaatti nuuf baraare.',
          outcome: 'Sa’aatii 28 keessatti deebi’e · Daataan 100% baraarame',
          authorName: 'Daawit Makonnin',
          authorRole: 'Injiinara Iddoo Hojii',
          organization: 'Rift Valley Civil Works',
        },
        {
          id: 'cs-2',
          category: 'av',
          serviceMeta: 'Optiksii Piroojektaraa & Suphaa TV 4K',
          location: 'Naannoo Hara Hooraa, Bishooftuu',
          quote:
            'Piroojektarri galma leenjii fi TV 4K 65-inch keenya sababa jijjiirama humna ibsaatiin dukkanaa’anii turan. Haaraa bituu mannaa piriizimii qulqulleessanii boordii humnaa sirreessan.',
          outcome: 'Bittaa haaraa irraa 75,000+ ETB qusate',
          authorName: 'Tigist Haayilamaariyaam',
          authorRole: 'Hoogganaa Opareeshinii',
          organization: 'Hora Conference & Lodge',
        },
        {
          id: 'cs-3',
          category: 'repair',
          serviceMeta: 'PC Tajaajilaman Mirkanaa’an',
          location: 'Gabaa Giddugaleessaa Bishooftuu',
          quote:
            'Garee herregaa keenyaaf laaptooppii ThinkPad jaha fi deeskitooppii lama binnee jirra. Hundi fayyaa baatrii mirkanaa’aa, OS qulqulluu fi waggaa guutuu rakkoo malee hojjechaa jiru.',
          outcome: 'Kompiitara 8 · Ji’a 12 addaan citinsa malee',
          authorName: 'Ababaa Baqqalaa',
          authorRole: 'Qindeessaa Faayinaansii',
          organization: 'Waajjira Interpiraayizii Ada’aa',
        },
        {
          id: 'cs-4',
          category: 'consulting',
          serviceMeta: 'Gorsa IT & Neetworkii Waajjiraa',
          location: 'Daandii Indaastirii Bishooftuu',
          quote:
            'KEVLAR TECH waliin hojjechuun dura kompiitaroonni kaffaltii keenya guyyaa guyyaan ni addaan citu turan. Neetworkii ISP lamaa fi baakaappii ofummaan hojjetu kompiitara 18 irratti nuuf dhaaban.',
          outcome: '99.8% itti fufinsa neetworkii waajjiraa',
          authorName: 'Boonaa Taaddasaa',
          authorRole: 'Bulchaa Kiliinikaa',
          organization: 'Giddugala Fayyaa Addaa Bishooftuu',
        },
      ],
    },
  },
};

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    try {
      const paramLang = new URLSearchParams(window.location.search).get('lang');
      if (paramLang === 'en' || paramLang === 'am' || paramLang === 'om') {
        window.localStorage.setItem('kevlar_locale', paramLang);
        return paramLang;
      }
      const saved = window.localStorage.getItem('kevlar_locale');
      if (saved === 'en' || saved === 'am' || saved === 'om') return saved;
    } catch {
      // Ignore storage access errors
    }
    return 'en';
  });

  function setLocale(next: Locale) {
    setLocaleState(next);
    try {
      window.localStorage.setItem('kevlar_locale', next);
    } catch {
      // Ignore storage access errors
    }
  }

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t: DICTIONARY[locale] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useI18n(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useI18n must be used within LanguageProvider');
  }
  return ctx;
}

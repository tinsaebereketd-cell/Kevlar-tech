export type ServiceCategory =
  | 'computer_hardware'
  | 'computer_software'
  | 'tv_maintenance'
  | 'projector_maintenance';

export type TicketStatus =
  | 'Intake'
  | 'Diagnosing'
  | 'Parts Ordered'
  | 'Testing'
  | 'Ready for Pickup'
  | 'Completed';

export type TicketUrgency = 'standard' | 'priority';

export interface RepairTicket {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  category: ServiceCategory;
  deviceModel: string;
  issueSummary: string;
  urgency: TicketUrgency;
  status: TicketStatus;
  technicianNotes: string;
  estimatedCost: number;
  createdAt: string;
  updatedAt: string;
}

export interface PublicTicketView {
  id: string;
  customerFirstName: string;
  category: ServiceCategory;
  deviceModel: string;
  issueSummary: string;
  urgency: TicketUrgency;
  status: TicketStatus;
  technicianNotes: string;
  estimatedCost: number;
  createdAt: string;
  updatedAt: string;
}

export type PcCategory = 'Business Laptop' | 'Workstation' | 'Office Desktop';
export type PcStatus = 'Available' | 'Reserved' | 'Sold';

export interface UsedPcItem {
  id: string;
  title: string;
  category: PcCategory;
  cpu: string;
  ram: string;
  storage: string;
  gpu: string;
  display: string;
  conditionGrade: 'Grade A+' | 'Grade A';
  warrantyMonths: number;
  price: number;
  status: PcStatus;
  imageUrl: string;
  notes: string;
}

export interface OrderRecord {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  deliveryMethod: 'In-Store Pickup' | 'Local Office Delivery';
  address: string;
  items: Array<{ id: string; title: string; price: number }>;
  total: number;
  status: 'Confirmed' | 'Ready' | 'Fulfilled';
  createdAt: string;
}

export type ConsultationFocus =
  | 'Network & Wi-Fi Architecture'
  | 'Workstation Fleet & Procurement'
  | 'Server & Cloud Backup'
  | 'Security & Audit';

export type ConsultationStatus = 'Requested' | 'Scheduled' | 'Completed';

export interface ConsultationRequest {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  teamSize: '1-10' | '11-50' | '51-200';
  focusArea: ConsultationFocus;
  preferredDate: string;
  notes: string;
  status: ConsultationStatus;
  createdAt: string;
}

export const TICKET_STAGES: TicketStatus[] = [
  'Intake',
  'Diagnosing',
  'Parts Ordered',
  'Testing',
  'Ready for Pickup',
  'Completed',
];

export const SERVICE_CATEGORY_LABELS: Record<ServiceCategory, string> = {
  computer_hardware: 'Computer Hardware Maintenance',
  computer_software: 'Software & OS Systems',
  tv_maintenance: 'TV Maintenance & Calibration',
  projector_maintenance: 'Projector Optical & Lamp Lab',
};

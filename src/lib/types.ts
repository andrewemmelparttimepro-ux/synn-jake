// ===== Core Types for SYNN - Sandpro Operations =====

export type AppMode = 'synn' | 'riger' | 'tessa' | 'kpa';

export type EquipmentStatus = 'Available' | 'Deployed' | 'Maintenance' | 'Retired';
export type RentalStatus = 'Active' | 'Completed' | 'Pending' | 'Cancelled';
export type TicketStatus = 'Pending' | 'Approved' | 'Invoiced';
export type InvoiceStatus = 'Draft' | 'Sent' | 'Paid' | 'Overdue';
export type InspectionResult = 'Pass' | 'Fail' | 'Conditional' | '';
export type InspectionStatus = 'Complete' | 'Overdue' | 'Scheduled' | 'In Progress';
export type IncidentStatus = 'Open' | 'Under Review' | 'Closed' | 'Corrective Action Pending';
export type IncidentSeverity = 'Low' | 'Medium' | 'High' | 'Critical';
export type TrainingStatus = 'Current' | 'Expiring' | 'Expired';
export type CertStatus = 'Current' | 'Expiring Soon' | 'Expired' | 'Failed' | 'No Records';
export type JSAStatus = 'Active' | 'Draft';
export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical';
export type CrewStatus = 'On Site' | 'In Transit' | 'Off Duty';

export interface Company {
  name: string;
  addr: string;
  city: string;
  st: string;
  zip: string;
  phone: string;
  email: string;
}

export interface Client {
  id: string;
  name: string;
  contact: string;
  phone: string;
}

export interface Equipment {
  id: string;
  name: string;
  type: string;
  serial: string;
  make: string;
  model: string;
  year: number;
  status: EquipmentStatus;
  client: string;
  location: string;
  deployDate: string;
  purchaseDate: string;
  specs: string;
  utilization: number;
  lastInspection: string;
}

export interface Rental {
  id: string;
  client: string;
  equipId: string;
  location: string;
  startDate: string;
  endDate: string;
  rate: number;
  status: RentalStatus;
  po: string;
  notes: string;
}

export interface TicketMaterial {
  item: string;
  qty: string;
  cost: number;
}

export interface FieldTicket {
  id: string;
  rentalId: string;
  client: string;
  date: string;
  crew: string;
  equipId: string;
  hours: number;
  services: string;
  materials: TicketMaterial[];
  status: TicketStatus;
  approvedBy: string;
  approvedAt: string;
  po: string;
}

export interface InvoiceItem {
  desc: string;
  amount: number;
}

export interface Invoice {
  id: string;
  client: string;
  rentalIds: string[];
  period: string;
  items: InvoiceItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: InvoiceStatus;
  dueDate: string;
  paidDate: string;
  paidMethod: string;
  paidAmount: number;
}

export interface InspectionValue {
  k: string;
  v: string;
}

export interface Inspection {
  id: string;
  assetId: string;
  type: string;
  inspector: string;
  cert: string;
  date: string;
  result: InspectionResult;
  nextDue: string;
  status: InspectionStatus;
  values: InspectionValue[];
  notes: string;
  corrective: string;
}

export interface CorrectiveAction {
  action: string;
  assignee: string;
  due: string;
  done: boolean;
}

export interface Incident {
  id: string;
  date: string;
  time: string;
  type: string;
  severity: IncidentSeverity;
  location: string;
  reportedBy: string;
  status: IncidentStatus;
  desc: string;
  personnel: string;
  equipId: string;
  rootCause: string;
  corrective: CorrectiveAction[];
}

export interface JSAStep {
  step: string;
  hazards: string;
  likelihood: number;
  consequence: number;
  risk: RiskLevel;
  controls: string;
  responsible: string;
}

export interface JSA {
  id: string;
  title: string;
  opType: string;
  lastReviewed: string;
  status: JSAStatus;
  author: string;
  steps: JSAStep[];
}

export interface TrainingRecord {
  id: string;
  employee: string;
  crew: string;
  certification: string;
  provider: string;
  issueDate: string;
  expiryDate: string;
  status: TrainingStatus;
  certNum: string;
}

export interface DispatchAssignment {
  crew: string;
  equip: string[];
  client: string;
  loc: string;
  start: string;
  end: string;
  crewStatus: CrewStatus;
}

export interface FeedItem {
  time: string;
  text: string;
  color: string;
}

export interface Audit {
  id: string;
  type: string;
  date: string;
  auditor: string;
  loc: string;
  score: string;
  status: string;
}

export interface SDSEntry {
  p: string;
  m: string;
  h: string;
  g: string;
  d: string;
}

export interface NavItem {
  id: string;
  l: string;
  i: string;
}

export interface TopModule {
  id: AppMode;
  l: string;
  i: string;
  tip: string;
}

export interface AppState {
  mode: AppMode;
  view: string;
  sel: string | null;
  sub: string | null;
}

import { Rental } from '../types';

export const rentalsData: Rental[] = [
  { id: 'RNT-1001', client: 'Continental Resources', equipId: 'CT-001', location: 'Bakken Pad 7A, McKenzie County', startDate: '2026-02-15', endDate: '', rate: 2800, status: 'Active', po: 'PO-CR-2026-0445', notes: '24/7 operations, wellbore cleanout program' },
  { id: 'RNT-1002', client: 'Hess Corporation', equipId: 'FP-001', location: 'McKenzie County Well 42', startDate: '2026-02-10', endDate: '', rate: 3200, status: 'Active', po: 'PO-HESS-2026-1102', notes: 'Frac support for 3-well pad completion' },
  { id: 'RNT-1003', client: 'Whiting Petroleum', equipId: 'HO-001', location: 'Dunn County Pad 19', startDate: '2026-01-28', endDate: '', rate: 1800, status: 'Active', po: 'PO-WP-2026-0087', notes: 'Hot oil treatment, paraffin removal' },
  { id: 'RNT-1004', client: 'Marathon Oil', equipId: 'N2-001', location: 'Williams County Sec 8', startDate: '2026-02-05', endDate: '', rate: 1400, status: 'Active', po: 'PO-MO-2026-0221', notes: 'Nitrogen purge, pipeline displacement' },
  { id: 'RNT-1005', client: 'Oasis Petroleum', equipId: 'WL-001', location: 'Mountrail County Sec 22', startDate: '2026-02-08', endDate: '', rate: 2200, status: 'Active', po: 'PO-OP-2026-0330', notes: 'Production logging, bridge plug setting' },
  { id: 'RNT-1006', client: 'Continental Resources', equipId: 'VT-001', location: 'Bakken Pad 7A, McKenzie County', startDate: '2026-02-15', endDate: '', rate: 950, status: 'Active', po: 'PO-CR-2026-0446', notes: 'Vacuum services supporting CT operations' },
  { id: 'RNT-1007', client: 'Hess Corporation', equipId: 'CT-003', location: 'McKenzie County Sec 15', startDate: '2026-02-22', endDate: '', rate: 2800, status: 'Active', po: 'PO-HESS-2026-1105', notes: 'CT milling and cleanout' },
  { id: 'RNT-1008', client: 'Emerald Oil', equipId: 'FP-003', location: 'Williams County Pad 6C', startDate: '2026-02-28', endDate: '', rate: 3000, status: 'Active', po: 'PO-EO-2026-0015', notes: 'Frac pump support' },
  { id: 'RNT-1009', client: 'Marathon Oil', equipId: 'HO-003', location: 'Williams County Sec 33', startDate: '2026-02-18', endDate: '', rate: 1800, status: 'Active', po: 'PO-MO-2026-0225', notes: 'Hot oil circulation' },
  { id: 'RNT-1010', client: 'Continental Resources', equipId: 'N2-003', location: 'McKenzie County Pad 9D', startDate: '2026-02-25', endDate: '', rate: 1400, status: 'Active', po: 'PO-CR-2026-0450', notes: 'N2 assist for flowback' },
  { id: 'RNT-1011', client: 'Whiting Petroleum', equipId: 'VT-003', location: 'Dunn County Sec 12', startDate: '2026-03-01', endDate: '', rate: 950, status: 'Active', po: 'PO-WP-2026-0092', notes: 'Vacuum support' },
  { id: 'RNT-1012', client: 'Oasis Petroleum', equipId: 'CR-002', location: 'Mountrail County Pad 4A', startDate: '2026-02-20', endDate: '', rate: 2400, status: 'Active', po: 'PO-OP-2026-0335', notes: 'Crane support for wellhead installation' },
  { id: 'RNT-1013', client: 'Continental Resources', equipId: 'FP-004', location: 'Bakken Pad 12B, Williams County', startDate: '2026-01-05', endDate: '2026-02-04', rate: 3200, status: 'Completed', po: 'PO-CR-2026-0401', notes: 'Completion frac support' },
  { id: 'RNT-1014', client: 'Whiting Oil & Gas', equipId: 'HO-002', location: 'Dunn County Well 31', startDate: '2026-01-10', endDate: '2026-02-09', rate: 1800, status: 'Completed', po: 'PO-WOG-2026-0012', notes: 'Winter hot oil program' },
  { id: 'RNT-1015', client: 'Hess Corporation', equipId: 'WL-002', location: 'McKenzie County Well 55', startDate: '2026-01-20', endDate: '2026-02-18', rate: 2200, status: 'Completed', po: 'PO-HESS-2026-1090', notes: 'Wireline logging program' },
  { id: 'RNT-1016', client: 'Marathon Oil', equipId: 'CR-001', location: 'Williams County Sec 8', startDate: '2026-01-15', endDate: '2026-01-17', rate: 2400, status: 'Completed', po: 'PO-MO-2026-0200', notes: 'Crane lift for wellhead swap' },
];

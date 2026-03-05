import { DispatchAssignment, FeedItem, Audit, SDSEntry } from '../types';

export const dispatchData: DispatchAssignment[] = [
  { crew: 'Alpha Crew', equip: ['CT-001', 'VT-001'], client: 'Continental Resources', loc: 'Bakken Pad 7A', start: '2026-02-15', end: '2026-03-15', crewStatus: 'On Site' },
  { crew: 'Bravo Crew', equip: ['FP-001'], client: 'Hess Corporation', loc: 'McKenzie Co. Well 42', start: '2026-02-10', end: '2026-03-20', crewStatus: 'On Site' },
  { crew: 'Delta Crew', equip: ['HO-001', 'CT-003'], client: 'Whiting / Hess', loc: 'Dunn / McKenzie County', start: '2026-02-22', end: '2026-03-10', crewStatus: 'On Site' },
  { crew: 'Echo Crew', equip: ['N2-001', 'FP-003', 'N2-003'], client: 'Marathon / Emerald / Continental', loc: 'Williams County', start: '2026-02-05', end: '2026-03-15', crewStatus: 'On Site' },
  { crew: 'Foxtrot Crew', equip: ['WL-001', 'CR-002', 'HO-003'], client: 'Oasis / Marathon', loc: 'Mountrail / Williams Co.', start: '2026-02-08', end: '2026-03-12', crewStatus: 'In Transit' },
];

export const feedData: FeedItem[] = [
  { time: 'Mar 3, 10:15', text: 'Field Ticket FT-2014 created - HO-001, Whiting Petroleum', color: '#3b82f6' },
  { time: 'Mar 3, 08:30', text: 'Incident INC-4012 reported - Dropped wrench, Williams Co.', color: '#f97316' },
  { time: 'Mar 2, 16:00', text: 'Rental RNT-1011 activated - VT-003, Whiting Petroleum', color: '#3b82f6' },
  { time: 'Mar 1, 10:15', text: 'Field Ticket FT-2001 approved - CT-001, Continental Resources', color: '#22c55e' },
  { time: 'Mar 1, 06:00', text: 'Incident INC-4006 reported - Unsecured load strap', color: '#eab308' },
  { time: 'Feb 28, 14:00', text: 'Invoice INV-5001 paid - Continental Resources, $110,636', color: '#22c55e' },
  { time: 'Feb 28, 12:00', text: 'Inspection INS-3026 complete - FP-004 DOT, Pass', color: '#22c55e' },
  { time: 'Feb 25, 11:00', text: 'Hydraulic fluid spill - N2-001, Williams County Sec 8', color: '#ef4444' },
  { time: 'Feb 22, 07:15', text: 'Near miss - Pinch point at McKenzie County Well 42', color: '#eab308' },
  { time: 'Feb 20, 10:00', text: 'Inspection INS-3023 complete - N2-003 Cylinder, Pass', color: '#22c55e' },
];

export const auditsData: Audit[] = [
  { id: 'AUD-201', type: 'Field Safety Audit', date: '2026-02-15', auditor: 'Joshua Blackaby', loc: 'Bakken Pad 7A', score: '92%', status: 'Complete' },
  { id: 'AUD-202', type: 'Equipment Inspection Audit', date: '2026-02-01', auditor: 'Drew Anderson', loc: 'Sandpro Yard', score: '88%', status: 'Complete' },
  { id: 'AUD-203', type: 'H2S Response Drill', date: '2026-01-28', auditor: 'Joshua Blackaby', loc: 'Dunn County Pad 19', score: '95%', status: 'Complete' },
  { id: 'AUD-204', type: 'Quarterly Safety Audit', date: '2026-03-15', auditor: 'Joshua Blackaby', loc: 'All Locations', score: '--', status: 'Scheduled' },
  { id: 'AUD-205', type: 'Environmental Compliance', date: '2026-02-20', auditor: 'Kelby Kraft', loc: 'Williams County', score: '90%', status: 'Complete' },
];

export const sdsData: SDSEntry[] = [
  { p: 'KCl Fluid (Potassium Chloride)', m: 'Halliburton', h: 'Irritant', g: 'GHS07', d: '2025-11-01' },
  { p: 'Paraffin Solvent (Xylene-based)', m: 'ChemTech Solutions', h: 'Flammable, Health Hazard', g: 'GHS02, GHS08', d: '2025-10-15' },
  { p: 'Hydraulic Fluid (AW-46)', m: 'Shell Lubricants', h: 'Environmental', g: 'GHS09', d: '2025-09-20' },
  { p: 'Diesel Fuel #2', m: 'Various', h: 'Flammable, Health Hazard', g: 'GHS02, GHS07, GHS08', d: '2025-08-01' },
  { p: 'Nitrogen (compressed)', m: 'Linde Gas', h: 'Gas Under Pressure', g: 'GHS04', d: '2025-12-01' },
  { p: 'Hydrogen Sulfide (H2S)', m: 'Reference', h: 'Acute Toxicity, Flammable', g: 'GHS02, GHS06', d: '2025-07-15' },
  { p: 'Methanol', m: 'ChemTech Solutions', h: 'Flammable, Toxic', g: 'GHS02, GHS06', d: '2025-11-20' },
  { p: 'Corrosion Inhibitor (CI-205)', m: 'Baker Hughes', h: 'Irritant, Environmental', g: 'GHS07, GHS09', d: '2025-10-01' },
];

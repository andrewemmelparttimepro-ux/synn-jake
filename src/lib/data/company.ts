import { Company, Client } from '../types';

export const CO: Company = {
  name: 'Sandpro LLC',
  addr: '8702 282nd St NW',
  city: 'Berthold',
  st: 'ND',
  zip: '58718',
  phone: '(701) 453-3443',
  email: 'jfeil@sandpro.com',
};

export const CLIENTS: Client[] = [
  { id: 'CLI-001', name: 'Continental Resources', contact: 'Mike Reynolds', phone: '(701) 555-0101' },
  { id: 'CLI-002', name: 'Hess Corporation', contact: 'Sarah Chen', phone: '(701) 555-0102' },
  { id: 'CLI-003', name: 'Whiting Petroleum', contact: 'Tom Bradley', phone: '(701) 555-0103' },
  { id: 'CLI-004', name: 'Marathon Oil', contact: 'Dave Wilson', phone: '(701) 555-0104' },
  { id: 'CLI-005', name: 'Oasis Petroleum', contact: 'Lisa Park', phone: '(701) 555-0105' },
  { id: 'CLI-006', name: 'Whiting Oil & Gas', contact: 'James Hoover', phone: '(701) 555-0106' },
  { id: 'CLI-007', name: 'Emerald Oil', contact: 'Karen Mills', phone: '(701) 555-0107' },
];

export const CREWS = ['Alpha Crew', 'Bravo Crew', 'Delta Crew', 'Echo Crew', 'Foxtrot Crew'];

export const CREW_MEMBERS: Record<string, string[]> = {
  'Alpha Crew': ['Tyler Haugen', 'Marcus Lund', 'Brandon Kjos', 'Jake Olson'],
  'Bravo Crew': ['Ryan Erickson', 'Derek Strand', 'Chris Bakken', 'Matt Nyquist'],
  'Delta Crew': ['Kyle Strand', 'Travis Moen', 'Jordan Berg', 'Nick Olstad'],
  'Echo Crew': ['Seth Hedahl', 'Adam Volk', 'Cody Stenberg', 'Ethan Knutson'],
  'Foxtrot Crew': ['Zach Redding', 'Luke Thompson', 'Dylan Skaar', 'Isaac Brekke'],
};

export const ETYPES = ['CT Unit', 'Frac Pump', 'Hot Oil Unit', 'N2 Unit', 'Vac Truck', 'Wireline Unit', 'Crane', 'Other'];

export const CERT_MAP: Record<string, string[]> = {
  'CT Unit': ['BOP Certification', 'Pressure Test', 'NDT Ultrasonic', 'Annual Inspection'],
  'Frac Pump': ['Pressure Cert', 'Pump Certification', 'DOT Inspection'],
  'Hot Oil Unit': ['Vessel Inspection', 'DOT', 'Safety Valve Test'],
  'N2 Unit': ['Pressure Vessel Cert', 'DOT', 'Cylinder Inspection'],
  'Vac Truck': ['DOT Annual', 'Tank Certification', 'Brake Inspection'],
  'Wireline Unit': ['Pressure Cert', 'Calibration Cert'],
  'Crane': ['Annual ASME Inspection', 'Operator Cert'],
  'Other': ['Annual Inspection'],
};

export const TCERTS = [
  'Well Control (IWCF/IADC)',
  'H2S Alive',
  'First Aid/CPR',
  'WHMIS',
  'TDG',
  'Fall Arrest',
  'Confined Space Entry',
  'Rigging/Slinging',
];

export const LOCS = [
  'Bakken Pad 7A, McKenzie County',
  'McKenzie County Well 42',
  'Dunn County Pad 19',
  'Williams County Sec 8',
  'Mountrail County Sec 22',
  'Bakken Pad 12B, Williams County',
  'McKenzie County Sec 15',
  'Dunn County Well 31',
  'Williams County Pad 6C',
  'Mountrail County Pad 4A',
  'McKenzie County Pad 9D',
  'Williams County Sec 33',
  'Dunn County Sec 12',
  'Mountrail County Well 17',
];

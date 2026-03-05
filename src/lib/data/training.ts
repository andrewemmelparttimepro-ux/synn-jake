import { TrainingRecord, TrainingStatus } from '../types';
import { CREWS, CREW_MEMBERS, TCERTS } from './company';

function fmt(d: Date): string {
  return d.toISOString().split('T')[0];
}

const providers = ['Enform', 'Safety Boss', 'St. John Ambulance', 'OSSA', 'Roper Resources', 'CSTS', 'PEC Safety', 'NATT Safety'];

function generateTraining(): TrainingRecord[] {
  const records: TrainingRecord[] = [];
  let id = 200;
  const allMembers: { name: string; crew: string }[] = [];
  CREWS.forEach((c) => CREW_MEMBERS[c].forEach((m) => allMembers.push({ name: m, crew: c })));

  allMembers.forEach((mem) => {
    TCERTS.forEach((cert, ci) => {
      id++;
      const bd = new Date(2025, 2 + Math.floor(Math.random() * 6), 1 + Math.floor(Math.random() * 28));
      const exp = new Date(bd);
      exp.setDate(exp.getDate() + (cert.includes('First Aid') || cert.includes('WHMIS') ? 1095 : 365));
      const now = new Date(2026, 2, 3);
      const dTe = (exp.getTime() - now.getTime()) / (864e5);
      const st: TrainingStatus = dTe < 0 ? 'Expired' : dTe < 60 ? 'Expiring' : 'Current';
      records.push({
        id: 'TRN-' + id,
        employee: mem.name,
        crew: mem.crew,
        certification: cert,
        provider: providers[ci % providers.length],
        issueDate: fmt(bd),
        expiryDate: fmt(exp),
        status: st,
        certNum: 'CERT-' + id,
      });
    });
  });
  return records;
}

// Use a seeded approach — generate once
export const trainingData: TrainingRecord[] = generateTraining();

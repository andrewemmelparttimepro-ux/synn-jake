import { CertStatus, Inspection } from './types';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function fmtD(s: string): string {
  if (!s) return '—';
  const [y, m, d] = s.split('-');
  return MONTHS[+m - 1] + ' ' + parseInt(d) + ', ' + y;
}

export function fmtM(n: number): string {
  return '$' + n.toLocaleString('en-US');
}

export function daysBtw(a: string, b?: string): number {
  if (!a) return 0;
  const d1 = new Date(a);
  const d2 = b ? new Date(b) : new Date('2026-03-03');
  return Math.max(1, Math.ceil((d2.getTime() - d1.getTime()) / 864e5));
}

export function certSt(assetId: string, inspections: Inspection[]): CertStatus {
  const ai = inspections.filter((i) => i.assetId === assetId);
  if (!ai.length) return 'No Records';
  if (ai.some((i) => i.result === 'Fail')) return 'Failed';
  if (ai.some((i) => i.status === 'Overdue')) return 'Expired';
  if (ai.some((i) => i.nextDue && daysBtw('2026-03-03', i.nextDue) <= 30 && daysBtw('2026-03-03', i.nextDue) > 0)) return 'Expiring Soon';
  return 'Current';
}

export function badgeClass(s: string): string {
  const m: Record<string, string> = {
    'Available': 'badge-green', 'Deployed': 'badge-blue', 'Maintenance': 'badge-yellow', 'Retired': 'badge-grey',
    'Active': 'badge-green', 'Completed': 'badge-blue', 'Pending': 'badge-yellow', 'Cancelled': 'badge-grey',
    'Approved': 'badge-green', 'Invoiced': 'badge-cyan', 'Draft': 'badge-grey', 'Sent': 'badge-blue',
    'Paid': 'badge-green', 'Overdue': 'badge-red', 'Pass': 'badge-green', 'Fail': 'badge-red',
    'Conditional': 'badge-yellow', 'Scheduled': 'badge-blue', 'In Progress': 'badge-yellow', 'Complete': 'badge-green',
    'Open': 'badge-orange', 'Under Review': 'badge-yellow', 'Closed': 'badge-green', 'Corrective Action Pending': 'badge-red',
    'Current': 'badge-green', 'Expiring': 'badge-yellow', 'Expired': 'badge-red', 'Expiring Soon': 'badge-yellow',
    'Failed': 'badge-red', 'No Records': 'badge-grey', 'On Site': 'badge-green', 'In Transit': 'badge-blue', 'Off Duty': 'badge-grey',
  };
  return m[s] || 'badge-grey';
}

export function sevBadgeClass(s: string): string {
  const m: Record<string, string> = { 'Low': 'badge-grey', 'Medium': 'badge-yellow', 'High': 'badge-orange', 'Critical': 'badge-red' };
  return m[s] || 'badge-grey';
}

export function riskBadgeClass(r: string): string {
  const m: Record<string, string> = { 'Low': 'badge-green', 'Medium': 'badge-yellow', 'High': 'badge-orange', 'Critical': 'badge-red' };
  return m[r] || 'badge-grey';
}

export function getWeekDates(off: number): Date[] {
  const d = new Date('2026-03-03');
  d.setDate(d.getDate() + off * 7);
  const day = d.getDay();
  const mon = new Date(d);
  mon.setDate(d.getDate() - (day === 0 ? 6 : day - 1));
  const dates: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const dd = new Date(mon);
    dd.setDate(mon.getDate() + i);
    dates.push(dd);
  }
  return dates;
}

export function fmtShort(d: Date): string {
  return (d.getMonth() + 1) + '/' + d.getDate();
}

export function fmtDateISO(d: Date): string {
  return d.toISOString().split('T')[0];
}

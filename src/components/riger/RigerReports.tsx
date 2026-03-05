'use client';

import { equipmentData, rentalsData, fieldTicketsData, invoicesData } from '@/lib/data';
import { fmtM } from '@/lib/helpers';
import { StatCard, ChartBar } from '../ui';

export function RigerReports() {
  const activeEquip = equipmentData.filter((e) => e.status !== 'Retired');
  const avgUtil = Math.round(activeEquip.reduce((s, e) => s + e.utilization, 0) / activeEquip.length);

  // Revenue by client
  const clientRevenue: Record<string, number> = {};
  rentalsData.filter((r) => r.status === 'Active').forEach((r) => {
    clientRevenue[r.client] = (clientRevenue[r.client] || 0) + r.rate;
  });
  const maxClientRev = Math.max(...Object.values(clientRevenue), 1);

  // Utilization by type
  const typeUtil: Record<string, { sum: number; count: number }> = {};
  activeEquip.forEach((e) => {
    if (!typeUtil[e.type]) typeUtil[e.type] = { sum: 0, count: 0 };
    typeUtil[e.type].sum += e.utilization;
    typeUtil[e.type].count++;
  });

  // Hours by crew
  const crewHours: Record<string, number> = {};
  fieldTicketsData.forEach((t) => {
    crewHours[t.crew] = (crewHours[t.crew] || 0) + t.hours;
  });
  const maxCrewHours = Math.max(...Object.values(crewHours), 1);

  const totalInvoiced = invoicesData.reduce((s, i) => s + i.total, 0);
  const totalPaid = invoicesData.filter((i) => i.status === 'Paid').reduce((s, i) => s + i.total, 0);

  return (
    <>
      <div className="page-header">
        <h2>RigER Reports</h2>
      </div>

      <div className="stats-row">
        <StatCard label="Avg Fleet Utilization" value={`${avgUtil}%`} />
        <StatCard label="Active Revenue/Day" value={fmtM(Object.values(clientRevenue).reduce((a, b) => a + b, 0))} valueClass="text-green" />
        <StatCard label="Total Invoiced" value={fmtM(totalInvoiced)} />
        <StatCard label="Total Collected" value={fmtM(totalPaid)} valueClass="text-green" />
        <StatCard label="Collection Rate" value={`${Math.round((totalPaid / totalInvoiced) * 100)}%`} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="detail-panel">
          <div className="detail-section">
            <h4>Daily Revenue by Client</h4>
            {Object.entries(clientRevenue).sort((a, b) => b[1] - a[1]).map(([client, rev]) => (
              <ChartBar key={client} label={client.split(' ')[0]} value={fmtM(rev)} pct={(rev / maxClientRev) * 100} color="var(--blue)" />
            ))}
          </div>
        </div>

        <div className="detail-panel">
          <div className="detail-section">
            <h4>Utilization by Equipment Type</h4>
            {Object.entries(typeUtil).map(([type, data]) => {
              const avg = Math.round(data.sum / data.count);
              return (
                <ChartBar key={type} label={type} value={`${avg}%`} pct={avg} color={avg > 75 ? 'var(--green)' : avg > 50 ? 'var(--blue)' : 'var(--yellow)'} />
              );
            })}
          </div>
        </div>

        <div className="detail-panel">
          <div className="detail-section">
            <h4>Field Hours by Crew</h4>
            {Object.entries(crewHours).sort((a, b) => b[1] - a[1]).map(([crew, hours]) => (
              <ChartBar key={crew} label={crew} value={`${hours}h`} pct={(hours / maxCrewHours) * 100} color="var(--cyan)" />
            ))}
          </div>
        </div>

        <div className="detail-panel">
          <div className="detail-section">
            <h4>Equipment by Status</h4>
            {['Deployed', 'Available', 'Maintenance', 'Retired'].map((status) => {
              const count = equipmentData.filter((e) => e.status === status).length;
              return (
                <ChartBar key={status} label={status} value={String(count)} pct={(count / equipmentData.length) * 100} color={status === 'Deployed' ? 'var(--blue)' : status === 'Available' ? 'var(--green)' : status === 'Maintenance' ? 'var(--yellow)' : 'var(--text3)'} />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

'use client';

import { equipmentData, rentalsData, fieldTicketsData, invoicesData, feedData } from '@/lib/data';
import { fmtM } from '@/lib/helpers';
import { StatCard } from '../ui';

export function RigerDashboard() {
  const dep = equipmentData.filter((e) => e.status === 'Deployed').length;
  const avail = equipmentData.filter((e) => e.status === 'Available').length;
  const maint = equipmentData.filter((e) => e.status === 'Maintenance').length;
  const actR = rentalsData.filter((r) => r.status === 'Active');
  const pendT = fieldTicketsData.filter((t) => t.status === 'Pending').length;
  const overdueI = invoicesData.filter((i) => i.status === 'Overdue');
  const avgUtil = Math.round(equipmentData.filter((e) => e.status !== 'Retired').reduce((s, e) => s + e.utilization, 0) / equipmentData.filter((e) => e.status !== 'Retired').length);

  return (
    <>
      <div className="page-header"><h2>RigER Dashboard</h2></div>
      <div className="stats-row">
        <StatCard label="Equipment Deployed" value={dep} sub={`${avail} available, ${maint} maintenance`} valueClass="text-blue" />
        <StatCard label="Active Rentals" value={actR.length} sub={`${fmtM(actR.reduce((s, r) => s + r.rate, 0))}/day combined`} valueClass="text-green" />
        <StatCard label="Avg Utilization" value={`${avgUtil}%`} sub="Across all active equipment" />
        <StatCard label="Pending Tickets" value={pendT} sub="Awaiting approval" valueClass={pendT > 0 ? 'text-yellow' : ''} />
        <StatCard label="Overdue Invoices" value={fmtM(overdueI.reduce((s, i) => s + i.total, 0))} sub={`${overdueI.length} invoice(s)`} valueClass={overdueI.length > 0 ? 'text-red' : ''} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 4 }}>
        <div className="activity-feed">
          <h3>Recent Activity</h3>
          {feedData.map((a, i) => (
            <div key={i} className="feed-item">
              <div className="feed-dot" style={{ background: a.color }} />
              <div className="feed-time">{a.time}</div>
              <div>{a.text}</div>
            </div>
          ))}
        </div>
        <div className="activity-feed">
          <h3>Active Rentals</h3>
          {actR.slice(0, 8).map((r) => {
            const eq = equipmentData.find((e) => e.id === r.equipId);
            return (
              <div key={r.id} className="feed-item">
                <div className="feed-dot" style={{ background: 'var(--green)' }} />
                <div className="feed-time">{r.id}</div>
                <div>
                  <strong style={{ color: 'var(--text)' }}>{eq?.name || r.equipId}</strong><br />
                  <span style={{ fontSize: 11, color: 'var(--text3)' }}>{r.client} — {fmtM(r.rate)}/day</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

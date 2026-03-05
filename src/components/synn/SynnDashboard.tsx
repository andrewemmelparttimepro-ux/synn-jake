'use client';

import { equipmentData, rentalsData, fieldTicketsData, invoicesData, inspectionsData, incidentsData, trainingData, feedData, CO } from '@/lib/data';
import { fmtM, daysBtw, certSt } from '@/lib/helpers';

export function SynnDashboard() {
  const dep = equipmentData.filter((e) => e.status === 'Deployed').length;
  const tot = equipmentData.filter((e) => e.status !== 'Retired').length;
  const actR = rentalsData.filter((r) => r.status === 'Active');
  const mtd = actR.reduce((s, r) => {
    const d = daysBtw(r.startDate > '2026-03-01' ? r.startDate : '2026-03-01', '2026-03-03');
    return s + d * r.rate;
  }, 0);
  const pendT = fieldTicketsData.filter((t) => t.status === 'Pending').length;
  const overdueI = invoicesData.filter((i) => i.status === 'Overdue');
  const expC = equipmentData.filter((e) => { const s = certSt(e.id, inspectionsData); return s === 'Expired' || s === 'Failed'; }).length;
  const expSoon = equipmentData.filter((e) => certSt(e.id, inspectionsData) === 'Expiring Soon').length;
  const overdueInsp = inspectionsData.filter((i) => i.status === 'Overdue').length;
  const openInc = incidentsData.filter((i) => i.status !== 'Closed');
  const crit = openInc.filter((i) => i.severity === 'Critical').length;
  const high = openInc.filter((i) => i.severity === 'High').length;
  const med = openInc.filter((i) => i.severity === 'Medium').length;
  const low = openInc.filter((i) => i.severity === 'Low').length;
  const expTrn = trainingData.filter((t) => t.status === 'Expiring').length;
  const openCA = incidentsData.reduce((s, i) => s + i.corrective.filter((c) => !c.done).length, 0);

  return (
    <>
      <div className="page-header">
        <h2>SYNN — Sandpro Operations</h2>
        <div style={{ fontSize: 12, color: 'var(--text3)' }}>
          {CO.name} | {CO.city}, {CO.st} | {CO.phone}
        </div>
      </div>

      <div className="dash-grid">
        <div className="dash-panel">
          <h3 style={{ color: 'var(--blue)' }}>RIGER - Equipment &amp; Rentals</h3>
          <div className="dash-stat"><span>Equipment Deployed</span><span className="dash-val text-blue">{dep} of {tot}</span></div>
          <div className="dash-stat"><span>Active Rentals</span><span className="dash-val">{actR.length}</span></div>
          <div className="dash-stat"><span>MTD Rental Revenue</span><span className="dash-val text-green">{fmtM(mtd)}</span></div>
          <div className="dash-stat"><span>Field Tickets Pending</span><span className={`dash-val ${pendT > 0 ? 'text-yellow' : ''}`}>{pendT}</span></div>
          <div className="dash-stat"><span>Invoices Overdue</span><span className={`dash-val ${overdueI.length > 0 ? 'text-red' : ''}`}>{overdueI.length} ({fmtM(overdueI.reduce((s, i) => s + i.total, 0))})</span></div>
        </div>

        <div className="dash-panel">
          <h3 style={{ color: 'var(--cyan)' }}>TESSALINK - Inspections &amp; Certs</h3>
          <div className="dash-stat"><span>Expired Certifications</span><span className={`dash-val ${expC > 0 ? 'text-red' : ''}`}>{expC}</span></div>
          <div className="dash-stat"><span>Expiring Soon (30 days)</span><span className={`dash-val ${expSoon > 0 ? 'text-yellow' : ''}`}>{expSoon}</span></div>
          <div className="dash-stat"><span>Overdue Inspections</span><span className={`dash-val ${overdueInsp > 0 ? 'text-red' : ''}`}>{overdueInsp}</span></div>
          <div className="dash-stat"><span>Total Inspections</span><span className="dash-val">{inspectionsData.length}</span></div>
          <div className="dash-stat"><span>Last Inspection</span><span className="dash-val">Feb 28, 2026</span></div>
        </div>

        <div className="dash-panel">
          <h3 style={{ color: 'var(--orange)' }}>KPA EHS - Safety &amp; Compliance</h3>
          <div className="dash-stat">
            <span>Open Incidents</span>
            <span className="dash-val">
              {crit > 0 && <span className="text-red">{crit} Critical</span>}
              {crit > 0 && ' / '}{high} High / {med} Med / {low} Low
            </span>
          </div>
          <div className="dash-stat"><span>Training Expiring (60 days)</span><span className={`dash-val ${expTrn > 0 ? 'text-yellow' : ''}`}>{expTrn}</span></div>
          <div className="dash-stat"><span>Open Corrective Actions</span><span className={`dash-val ${openCA > 0 ? 'text-orange' : ''}`}>{openCA}</span></div>
          <div className="dash-stat"><span>Last Safety Audit</span><span className="dash-val">Feb 15, 2026</span></div>
          <div className="dash-stat"><span>Near-Miss to Recordable</span><span className="dash-val text-green">4 : 1</span></div>
        </div>
      </div>

      <div className="activity-feed">
        <h3>Recent Activity</h3>
        {feedData.map((f, i) => (
          <div key={i} className="feed-item">
            <div className="feed-dot" style={{ background: f.color }} />
            <span className="feed-time">{f.time}</span>
            <span>{f.text}</span>
          </div>
        ))}
      </div>
    </>
  );
}

'use client';

import { equipmentData, inspectionsData } from '@/lib/data';
import { certSt } from '@/lib/helpers';
import { StatCard, Badge, ChartBar } from '../ui';

export function TessaDashboard() {
  const activeEquip = equipmentData.filter((e) => e.status !== 'Retired');
  const certStatuses = activeEquip.map((e) => ({ id: e.id, name: e.name, type: e.type, status: certSt(e.id, inspectionsData) }));

  const current = certStatuses.filter((c) => c.status === 'Current').length;
  const expiring = certStatuses.filter((c) => c.status === 'Expiring Soon').length;
  const expired = certStatuses.filter((c) => c.status === 'Expired' || c.status === 'Failed').length;
  const noRecords = certStatuses.filter((c) => c.status === 'No Records').length;

  const overdueInsp = inspectionsData.filter((i) => i.status === 'Overdue');
  const failedInsp = inspectionsData.filter((i) => i.result === 'Fail');
  const conditionalInsp = inspectionsData.filter((i) => i.result === 'Conditional');

  return (
    <>
      <div className="page-header">
        <h2>TESSALink Dashboard</h2>
        <div style={{ fontSize: 12, color: 'var(--text3)' }}>Pipeline &amp; Facility Asset Management</div>
      </div>

      <div className="stats-row">
        <StatCard label="Total Assets" value={activeEquip.length} sub="Active equipment tracked" />
        <StatCard label="Current Certs" value={current} valueClass="text-green" sub={`${Math.round((current / activeEquip.length) * 100)}% compliant`} />
        <StatCard label="Expiring Soon" value={expiring} valueClass={expiring > 0 ? 'text-yellow' : ''} sub="Within 30 days" />
        <StatCard label="Expired / Failed" value={expired} valueClass={expired > 0 ? 'text-red' : ''} />
        <StatCard label="Overdue Inspections" value={overdueInsp.length} valueClass={overdueInsp.length > 0 ? 'text-red' : ''} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="detail-panel">
          <div className="detail-section">
            <h4>Certification Status Overview</h4>
            <ChartBar label="Current" value={String(current)} pct={(current / activeEquip.length) * 100} color="var(--green)" />
            <ChartBar label="Expiring Soon" value={String(expiring)} pct={(expiring / activeEquip.length) * 100} color="var(--yellow)" />
            <ChartBar label="Expired/Failed" value={String(expired)} pct={(expired / activeEquip.length) * 100} color="var(--red)" />
            <ChartBar label="No Records" value={String(noRecords)} pct={(noRecords / activeEquip.length) * 100} color="var(--text3)" />
          </div>
        </div>

        <div className="detail-panel">
          <div className="detail-section">
            <h4>Inspection Summary</h4>
            <div className="detail-grid">
              <div className="detail-field">
                <div className="field-label">Total Inspections</div>
                <div className="field-value">{inspectionsData.length}</div>
              </div>
              <div className="detail-field">
                <div className="field-label">Passed</div>
                <div className="field-value text-green">{inspectionsData.filter((i) => i.result === 'Pass').length}</div>
              </div>
              <div className="detail-field">
                <div className="field-label">Failed</div>
                <div className="field-value text-red">{failedInsp.length}</div>
              </div>
              <div className="detail-field">
                <div className="field-label">Conditional</div>
                <div className="field-value text-yellow">{conditionalInsp.length}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="detail-panel" style={{ gridColumn: '1 / -1' }}>
          <div className="detail-section">
            <h4>Assets Requiring Attention</h4>
            {certStatuses.filter((c) => c.status !== 'Current').length === 0 ? (
              <p style={{ fontSize: 13, color: 'var(--green)' }}>✓ All assets fully certified</p>
            ) : (
              <ul className="detail-list">
                {certStatuses.filter((c) => c.status !== 'Current').map((c) => (
                  <li key={c.id}>
                    <span><strong style={{ color: 'var(--text)' }}>{c.id}</strong> — {c.name} ({c.type})</span>
                    <Badge status={c.status} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

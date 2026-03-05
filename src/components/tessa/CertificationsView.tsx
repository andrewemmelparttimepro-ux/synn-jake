'use client';

import { equipmentData, inspectionsData } from '@/lib/data';
import { CERT_MAP } from '@/lib/data';
import { certSt, fmtD } from '@/lib/helpers';
import { Badge, StatCard } from '../ui';

export function CertificationsView() {
  const activeEquip = equipmentData.filter((e) => e.status !== 'Retired');
  const certStatuses = activeEquip.map((e) => ({
    ...e,
    certStatus: certSt(e.id, inspectionsData),
  }));

  const current = certStatuses.filter((c) => c.certStatus === 'Current').length;
  const expiring = certStatuses.filter((c) => c.certStatus === 'Expiring Soon').length;
  const expired = certStatuses.filter((c) => c.certStatus === 'Expired' || c.certStatus === 'Failed').length;

  return (
    <>
      <div className="page-header">
        <h2>Certification Status</h2>
      </div>

      <div className="stats-row">
        <StatCard label="Current" value={current} valueClass="text-green" sub={`${Math.round((current / activeEquip.length) * 100)}% fleet`} />
        <StatCard label="Expiring Soon" value={expiring} valueClass="text-yellow" />
        <StatCard label="Expired / Failed" value={expired} valueClass={expired > 0 ? 'text-red' : ''} />
        <StatCard label="Total Assets Tracked" value={activeEquip.length} />
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Asset</th>
              <th>Type</th>
              <th>Overall</th>
              {['Cert 1', 'Cert 2', 'Cert 3', 'Cert 4'].map((_, i) => (
                <th key={i}>Certification {i + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {certStatuses.map((equip) => {
              const requiredCerts = CERT_MAP[equip.type] || [];
              return (
                <tr key={equip.id}>
                  <td>
                    <div style={{ fontWeight: 700, color: 'var(--accent)' }}>{equip.id}</div>
                    <div style={{ fontSize: 11, color: 'var(--text3)' }}>{equip.name}</div>
                  </td>
                  <td>{equip.type}</td>
                  <td><Badge status={equip.certStatus} /></td>
                  {[0, 1, 2, 3].map((ci) => {
                    const certName = requiredCerts[ci];
                    if (!certName) return <td key={ci}>—</td>;
                    const latest = inspectionsData
                      .filter((i) => i.assetId === equip.id && i.type === certName)
                      .sort((a, b) => b.date.localeCompare(a.date))[0];
                    return (
                      <td key={ci}>
                        <div style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 2 }}>{certName}</div>
                        {latest ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <Badge status={latest.result || latest.status} />
                            <span style={{ fontSize: 10, color: 'var(--text3)' }}>{fmtD(latest.date)}</span>
                          </div>
                        ) : (
                          <Badge status="No Records" />
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

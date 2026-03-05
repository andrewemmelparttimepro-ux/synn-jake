'use client';

import { incidentsData, trainingData } from '@/lib/data';
import { auditsData } from '@/lib/data';
import { StatCard, ChartBar, Badge } from '../ui';

export function KpaDashboard() {
  const openInc = incidentsData.filter((i) => i.status !== 'Closed');
  const crit = openInc.filter((i) => i.severity === 'Critical').length;
  const high = openInc.filter((i) => i.severity === 'High').length;
  const med = openInc.filter((i) => i.severity === 'Medium').length;
  const low = openInc.filter((i) => i.severity === 'Low').length;

  const openCA = incidentsData.reduce((s, i) => s + i.corrective.filter((c) => !c.done).length, 0);
  const totalCA = incidentsData.reduce((s, i) => s + i.corrective.length, 0);
  const doneCA = totalCA - openCA;

  const expTrn = trainingData.filter((t) => t.status === 'Expiring').length;
  const expiredTrn = trainingData.filter((t) => t.status === 'Expired').length;
  const currentTrn = trainingData.filter((t) => t.status === 'Current').length;

  const nearMiss = incidentsData.filter((i) => i.type === 'Near Miss').length;
  const recordable = incidentsData.filter((i) => i.type === 'Recordable').length;

  // Incidents by type
  const incByType: Record<string, number> = {};
  incidentsData.forEach((i) => {
    incByType[i.type] = (incByType[i.type] || 0) + 1;
  });
  const maxType = Math.max(...Object.values(incByType), 1);

  return (
    <>
      <div className="page-header">
        <h2>KPA EHS Dashboard</h2>
        <div style={{ fontSize: 12, color: 'var(--text3)' }}>Safety &amp; Environmental Compliance</div>
      </div>

      <div className="stats-row">
        <StatCard label="Open Incidents" value={openInc.length} valueClass={openInc.length > 0 ? 'text-orange' : 'text-green'} sub={`${crit} Critical, ${high} High, ${med} Med, ${low} Low`} />
        <StatCard label="Open Corrective Actions" value={openCA} valueClass={openCA > 0 ? 'text-orange' : 'text-green'} sub={`${doneCA} of ${totalCA} complete`} />
        <StatCard label="Training Expiring" value={expTrn} valueClass={expTrn > 0 ? 'text-yellow' : ''} sub="Within 60 days" />
        <StatCard label="Training Expired" value={expiredTrn} valueClass={expiredTrn > 0 ? 'text-red' : ''} />
        <StatCard label="Near-Miss Ratio" value={`${nearMiss}:${recordable}`} valueClass="text-green" sub="Near-miss to recordable" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="detail-panel">
          <div className="detail-section">
            <h4>Incidents by Type</h4>
            {Object.entries(incByType).sort((a, b) => b[1] - a[1]).map(([type, count]) => (
              <ChartBar key={type} label={type} value={String(count)} pct={(count / maxType) * 100} color={type === 'H2S Alarm' ? 'var(--red)' : type === 'Near Miss' ? 'var(--yellow)' : type === 'Environmental' ? 'var(--green)' : 'var(--orange)'} />
            ))}
          </div>
        </div>

        <div className="detail-panel">
          <div className="detail-section">
            <h4>Training Compliance</h4>
            <ChartBar label="Current" value={String(currentTrn)} pct={(currentTrn / trainingData.length) * 100} color="var(--green)" />
            <ChartBar label="Expiring" value={String(expTrn)} pct={(expTrn / trainingData.length) * 100} color="var(--yellow)" />
            <ChartBar label="Expired" value={String(expiredTrn)} pct={(expiredTrn / trainingData.length) * 100} color="var(--red)" />
          </div>
        </div>

        <div className="detail-panel">
          <div className="detail-section">
            <h4>Open Incidents</h4>
            {openInc.length === 0 ? (
              <p style={{ fontSize: 13, color: 'var(--green)' }}>✓ No open incidents</p>
            ) : (
              <ul className="detail-list">
                {openInc.map((i) => (
                  <li key={i.id}>
                    <span>
                      <strong style={{ color: 'var(--text)' }}>{i.id}</strong> — {i.type}: {i.desc.substring(0, 60)}...
                    </span>
                    <Badge status={i.status} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="detail-panel">
          <div className="detail-section">
            <h4>Recent Audits</h4>
            <ul className="detail-list">
              {auditsData.map((a) => (
                <li key={a.id}>
                  <span>
                    <strong style={{ color: 'var(--text)' }}>{a.type}</strong>
                    <span style={{ fontSize: 11, color: 'var(--text3)', marginLeft: 8 }}>{a.date} — {a.auditor}</span>
                  </span>
                  <span style={{ fontWeight: 700, color: a.score === '--' ? 'var(--text3)' : 'var(--green)' }}>{a.score}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

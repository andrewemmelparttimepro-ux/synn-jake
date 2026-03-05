'use client';

import { equipmentData, inspectionsData } from '@/lib/data';
// cert/type helpers used below
import { certSt } from '@/lib/helpers';
import { StatCard, ChartBar } from '../ui';

export function TessaReports() {
  const activeEquip = equipmentData.filter((e) => e.status !== 'Retired');

  // Inspections by type
  const inspByType: Record<string, number> = {};
  inspectionsData.forEach((i) => {
    inspByType[i.type] = (inspByType[i.type] || 0) + 1;
  });
  const maxInspType = Math.max(...Object.values(inspByType), 1);

  // Inspections by result
  const results = { Pass: 0, Fail: 0, Conditional: 0 };
  inspectionsData.forEach((i) => {
    if (i.result === 'Pass') results.Pass++;
    else if (i.result === 'Fail') results.Fail++;
    else if (i.result === 'Conditional') results.Conditional++;
  });

  // Cert status by equipment type
  const certByType: Record<string, { current: number; issues: number }> = {};
  activeEquip.forEach((e) => {
    const cs = certSt(e.id, inspectionsData);
    if (!certByType[e.type]) certByType[e.type] = { current: 0, issues: 0 };
    if (cs === 'Current') certByType[e.type].current++;
    else certByType[e.type].issues++;
  });

  // Inspector workload
  const inspByInspector: Record<string, number> = {};
  inspectionsData.forEach((i) => {
    inspByInspector[i.inspector] = (inspByInspector[i.inspector] || 0) + 1;
  });
  const maxInspector = Math.max(...Object.values(inspByInspector), 1);

  const passRate = Math.round((results.Pass / inspectionsData.length) * 100);

  return (
    <>
      <div className="page-header">
        <h2>TESSALink Reports</h2>
      </div>

      <div className="stats-row">
        <StatCard label="Total Inspections" value={inspectionsData.length} />
        <StatCard label="Pass Rate" value={`${passRate}%`} valueClass="text-green" />
        <StatCard label="Failures" value={results.Fail} valueClass={results.Fail > 0 ? 'text-red' : ''} />
        <StatCard label="Unique Inspectors" value={Object.keys(inspByInspector).length} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="detail-panel">
          <div className="detail-section">
            <h4>Inspections by Type</h4>
            {Object.entries(inspByType).sort((a, b) => b[1] - a[1]).map(([type, count]) => (
              <ChartBar key={type} label={type} value={String(count)} pct={(count / maxInspType) * 100} color="var(--cyan)" />
            ))}
          </div>
        </div>

        <div className="detail-panel">
          <div className="detail-section">
            <h4>Results Distribution</h4>
            <ChartBar label="Pass" value={String(results.Pass)} pct={(results.Pass / inspectionsData.length) * 100} color="var(--green)" />
            <ChartBar label="Fail" value={String(results.Fail)} pct={(results.Fail / inspectionsData.length) * 100} color="var(--red)" />
            <ChartBar label="Conditional" value={String(results.Conditional)} pct={(results.Conditional / inspectionsData.length) * 100} color="var(--yellow)" />
          </div>
        </div>

        <div className="detail-panel">
          <div className="detail-section">
            <h4>Inspector Workload</h4>
            {Object.entries(inspByInspector).sort((a, b) => b[1] - a[1]).map(([inspector, count]) => (
              <ChartBar key={inspector} label={inspector.split(' ').pop() || inspector} value={String(count)} pct={(count / maxInspector) * 100} color="var(--blue)" />
            ))}
          </div>
        </div>

        <div className="detail-panel">
          <div className="detail-section">
            <h4>Compliance by Equipment Type</h4>
            {Object.entries(certByType).map(([type, data]) => {
              const total = data.current + data.issues;
              const pct = Math.round((data.current / total) * 100);
              return (
                <ChartBar key={type} label={type} value={`${pct}%`} pct={pct} color={pct === 100 ? 'var(--green)' : pct > 80 ? 'var(--yellow)' : 'var(--red)'} />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

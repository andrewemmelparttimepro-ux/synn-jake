'use client';

import { incidentsData, trainingData } from '@/lib/data';
import { CREWS } from '@/lib/data';
import { StatCard, ChartBar } from '../ui';

export function KpaReports() {
  // Incidents by severity
  const sevCounts = { Critical: 0, High: 0, Medium: 0, Low: 0 };
  incidentsData.forEach((i) => {
    if (i.severity in sevCounts) sevCounts[i.severity as keyof typeof sevCounts]++;
  });

  // Incidents by location
  const locCounts: Record<string, number> = {};
  incidentsData.forEach((i) => {
    const loc = i.location.split(',')[0];
    locCounts[loc] = (locCounts[loc] || 0) + 1;
  });
  const maxLoc = Math.max(...Object.values(locCounts), 1);

  // Training compliance by crew
  const crewCompliance: Record<string, { current: number; total: number }> = {};
  CREWS.forEach((c) => {
    const crewRecs = trainingData.filter((t) => t.crew === c);
    crewCompliance[c] = {
      current: crewRecs.filter((t) => t.status === 'Current').length,
      total: crewRecs.length,
    };
  });

  // Corrective action stats
  const totalCA = incidentsData.reduce((s, i) => s + i.corrective.length, 0);
  const doneCA = incidentsData.reduce((s, i) => s + i.corrective.filter((c) => c.done).length, 0);
  const caRate = totalCA > 0 ? Math.round((doneCA / totalCA) * 100) : 100;

  const totalInc = incidentsData.length;
  const daysNoInc = 1; // Mar 3 to Mar 3 (latest incident was Mar 2)

  return (
    <>
      <div className="page-header">
        <h2>KPA EHS Reports</h2>
      </div>

      <div className="stats-row">
        <StatCard label="Total Incidents (YTD)" value={totalInc} />
        <StatCard label="Days Since Last Incident" value={daysNoInc} valueClass={daysNoInc > 7 ? 'text-green' : 'text-yellow'} />
        <StatCard label="CA Completion Rate" value={`${caRate}%`} valueClass={caRate > 80 ? 'text-green' : 'text-yellow'} />
        <StatCard label="TRIR" value="1.2" sub="Total Recordable Incident Rate" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div className="detail-panel">
          <div className="detail-section">
            <h4>Incidents by Severity</h4>
            <ChartBar label="Critical" value={String(sevCounts.Critical)} pct={(sevCounts.Critical / totalInc) * 100} color="var(--red)" />
            <ChartBar label="High" value={String(sevCounts.High)} pct={(sevCounts.High / totalInc) * 100} color="var(--orange)" />
            <ChartBar label="Medium" value={String(sevCounts.Medium)} pct={(sevCounts.Medium / totalInc) * 100} color="var(--yellow)" />
            <ChartBar label="Low" value={String(sevCounts.Low)} pct={(sevCounts.Low / totalInc) * 100} color="var(--text3)" />
          </div>
        </div>

        <div className="detail-panel">
          <div className="detail-section">
            <h4>Incidents by Location</h4>
            {Object.entries(locCounts).sort((a, b) => b[1] - a[1]).map(([loc, count]) => (
              <ChartBar key={loc} label={loc.substring(0, 16)} value={String(count)} pct={(count / maxLoc) * 100} color="var(--orange)" />
            ))}
          </div>
        </div>

        <div className="detail-panel">
          <div className="detail-section">
            <h4>Training Compliance by Crew</h4>
            {Object.entries(crewCompliance).map(([crew, data]) => {
              const pct = data.total > 0 ? Math.round((data.current / data.total) * 100) : 0;
              return (
                <ChartBar key={crew} label={crew} value={`${pct}%`} pct={pct} color={pct > 80 ? 'var(--green)' : pct > 60 ? 'var(--yellow)' : 'var(--red)'} />
              );
            })}
          </div>
        </div>

        <div className="detail-panel">
          <div className="detail-section">
            <h4>Corrective Actions</h4>
            <ChartBar label="Complete" value={String(doneCA)} pct={(doneCA / totalCA) * 100} color="var(--green)" />
            <ChartBar label="Pending" value={String(totalCA - doneCA)} pct={((totalCA - doneCA) / totalCA) * 100} color="var(--orange)" />
          </div>
        </div>
      </div>
    </>
  );
}

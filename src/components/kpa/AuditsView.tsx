'use client';

import { auditsData } from '@/lib/data';
import { Badge, DataTable, StatCard } from '../ui';

export function AuditsView() {
  const complete = auditsData.filter((a) => a.status === 'Complete');
  const scheduled = auditsData.filter((a) => a.status === 'Scheduled');
  const avgScore = complete.filter((a) => a.score !== '--').length > 0
    ? Math.round(complete.filter((a) => a.score !== '--').reduce((s, a) => s + parseInt(a.score), 0) / complete.filter((a) => a.score !== '--').length)
    : 0;

  return (
    <>
      <div className="page-header">
        <h2>Safety Audits</h2>
      </div>

      <div className="stats-row">
        <StatCard label="Total Audits" value={auditsData.length} />
        <StatCard label="Completed" value={complete.length} valueClass="text-green" />
        <StatCard label="Scheduled" value={scheduled.length} valueClass="text-blue" />
        <StatCard label="Average Score" value={`${avgScore}%`} valueClass={avgScore >= 90 ? 'text-green' : avgScore >= 80 ? 'text-yellow' : 'text-red'} />
      </div>

      <DataTable headers={['ID', 'Type', 'Date', 'Auditor', 'Location', 'Score', 'Status']}>
        {auditsData.map((a) => (
          <tr key={a.id}>
            <td style={{ fontWeight: 700, color: 'var(--accent)' }}>{a.id}</td>
            <td>{a.type}</td>
            <td>{a.date}</td>
            <td>{a.auditor}</td>
            <td>{a.loc}</td>
            <td style={{ fontWeight: 700, color: a.score === '--' ? 'var(--text3)' : parseInt(a.score) >= 90 ? 'var(--green)' : 'var(--yellow)' }}>{a.score}</td>
            <td><Badge status={a.status === 'Complete' ? 'Complete' : 'Scheduled'} /></td>
          </tr>
        ))}
      </DataTable>
    </>
  );
}

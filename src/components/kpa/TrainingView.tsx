'use client';

import { useState } from 'react';
import { trainingData } from '@/lib/data';
import { CREWS, CREW_MEMBERS, TCERTS } from '@/lib/data';
import { fmtD } from '@/lib/helpers';
import { Badge, StatCard } from '../ui';

export function TrainingView() {
  const [crewFilter, setCrewFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = trainingData.filter((t) => {
    if (crewFilter !== 'All' && t.crew !== crewFilter) return false;
    if (statusFilter !== 'All' && t.status !== statusFilter) return false;
    if (search && !t.employee.toLowerCase().includes(search.toLowerCase()) && !t.certification.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const current = filtered.filter((t) => t.status === 'Current').length;
  const expiring = filtered.filter((t) => t.status === 'Expiring').length;
  const expired = filtered.filter((t) => t.status === 'Expired').length;
  const complianceRate = filtered.length > 0 ? Math.round((current / filtered.length) * 100) : 0;

  // Build matrix: employee rows x certification columns
  const allMembers: { name: string; crew: string }[] = [];
  CREWS.forEach((c) => CREW_MEMBERS[c].forEach((m) => allMembers.push({ name: m, crew: c })));

  const filteredMembers = crewFilter === 'All' ? allMembers : allMembers.filter((m) => m.crew === crewFilter);

  return (
    <>
      <div className="page-header">
        <h2>Training Matrix</h2>
      </div>

      <div className="stats-row">
        <StatCard label="Total Records" value={trainingData.length} />
        <StatCard label="Current" value={current} valueClass="text-green" />
        <StatCard label="Expiring" value={expiring} valueClass={expiring > 0 ? 'text-yellow' : ''} sub="Within 60 days" />
        <StatCard label="Expired" value={expired} valueClass={expired > 0 ? 'text-red' : ''} />
        <StatCard label="Compliance Rate" value={`${complianceRate}%`} valueClass={complianceRate > 80 ? 'text-green' : 'text-yellow'} />
      </div>

      <div className="filters">
        <select className="filter-select" value={crewFilter} onChange={(e) => setCrewFilter(e.target.value)}>
          <option value="All">All Crews</option>
          {CREWS.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All Status</option>
          <option value="Current">Current</option>
          <option value="Expiring">Expiring</option>
          <option value="Expired">Expired</option>
        </select>
        <input className="filter-input" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="data-table">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Crew</th>
              {TCERTS.map((c) => <th key={c} style={{ fontSize: 9, maxWidth: 100 }}>{c}</th>)}
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((mem) => (
              <tr key={mem.name}>
                <td style={{ fontWeight: 700, whiteSpace: 'nowrap' }}>{mem.name}</td>
                <td style={{ fontSize: 11, color: 'var(--text3)' }}>{mem.crew}</td>
                {TCERTS.map((cert) => {
                  const rec = trainingData.find((t) => t.employee === mem.name && t.certification === cert);
                  if (!rec) return <td key={cert}><span className="badge badge-grey">—</span></td>;
                  return (
                    <td key={cert}>
                      <Badge status={rec.status} />
                      <div style={{ fontSize: 9, color: 'var(--text3)', marginTop: 2 }}>{fmtD(rec.expiryDate)}</div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

'use client';

import { useState } from 'react';
import { incidentsData, equipmentData } from '@/lib/data';
import { fmtD } from '@/lib/helpers';
import { Badge, SevBadge, DataTable, DetailField, StatCard } from '../ui';

interface Props {
  sel: string | null;
  onSelect: (id: string | null) => void;
}

export function IncidentsView({ sel, onSelect }: Props) {
  const [statusFilter, setStatusFilter] = useState('All');
  const [sevFilter, setSevFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = incidentsData.filter((i) => {
    if (statusFilter !== 'All' && i.status !== statusFilter) return false;
    if (sevFilter !== 'All' && i.severity !== sevFilter) return false;
    if (search && !i.id.toLowerCase().includes(search.toLowerCase()) && !i.type.toLowerCase().includes(search.toLowerCase()) && !i.desc.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const selected = sel ? incidentsData.find((i) => i.id === sel) : null;
  const open = incidentsData.filter((i) => i.status !== 'Closed');

  return (
    <>
      <div className="page-header">
        <h2>Incident Management</h2>
      </div>

      <div className="stats-row">
        <StatCard label="Total Incidents" value={incidentsData.length} />
        <StatCard label="Open" value={open.length} valueClass={open.length > 0 ? 'text-orange' : 'text-green'} />
        <StatCard label="Critical/High" value={incidentsData.filter((i) => i.severity === 'Critical' || i.severity === 'High').length} valueClass="text-red" />
        <StatCard label="Near Misses" value={incidentsData.filter((i) => i.type === 'Near Miss').length} valueClass="text-yellow" />
        <StatCard label="Corrective Actions Open" value={incidentsData.reduce((s, i) => s + i.corrective.filter((c) => !c.done).length, 0)} valueClass="text-orange" />
      </div>

      <div className="filters">
        <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All Status</option>
          <option value="Open">Open</option>
          <option value="Under Review">Under Review</option>
          <option value="Closed">Closed</option>
          <option value="Corrective Action Pending">Corrective Action Pending</option>
        </select>
        <select className="filter-select" value={sevFilter} onChange={(e) => setSevFilter(e.target.value)}>
          <option value="All">All Severity</option>
          <option value="Critical">Critical</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <input className="filter-input" placeholder="Search incidents..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <DataTable headers={['ID', 'Date', 'Type', 'Severity', 'Location', 'Reported By', 'Status']}>
        {filtered.map((i) => (
          <tr key={i.id} onClick={() => onSelect(i.id)} style={sel === i.id ? { background: 'var(--card2)' } : undefined}>
            <td style={{ fontWeight: 700, color: 'var(--accent)' }}>{i.id}</td>
            <td>{fmtD(i.date)}</td>
            <td>{i.type}</td>
            <td><SevBadge severity={i.severity} /></td>
            <td>{i.location}</td>
            <td>{i.reportedBy}</td>
            <td><Badge status={i.status} /></td>
          </tr>
        ))}
      </DataTable>

      {selected && (
        <div className="detail-panel">
          <div className="detail-header">
            <h3>Incident {selected.id}</h3>
            <div style={{ display: 'flex', gap: 8 }}>
              <SevBadge severity={selected.severity} />
              <Badge status={selected.status} />
            </div>
          </div>

          <div className="detail-section">
            <h4>Incident Details</h4>
            <div className="detail-grid">
              <DetailField label="Date / Time" value={`${fmtD(selected.date)} at ${selected.time}`} />
              <DetailField label="Type" value={selected.type} />
              <DetailField label="Location" value={selected.location} />
              <DetailField label="Reported By" value={selected.reportedBy} />
              <DetailField label="Equipment" value={equipmentData.find((e) => e.id === selected.equipId)?.name || selected.equipId} />
              <DetailField label="Personnel Involved" value={selected.personnel} />
            </div>
          </div>

          <div className="detail-section">
            <h4>Description</h4>
            <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>{selected.desc}</p>
          </div>

          {selected.rootCause && (
            <div className="detail-section">
              <h4>Root Cause</h4>
              <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>{selected.rootCause}</p>
            </div>
          )}

          <div className="detail-section">
            <h4>Corrective Actions ({selected.corrective.filter((c) => c.done).length}/{selected.corrective.length} complete)</h4>
            {selected.corrective.map((ca, i) => (
              <div key={i} className="check-item">
                <input type="checkbox" checked={ca.done} readOnly />
                <div style={{ flex: 1 }} className={ca.done ? 'check-done' : ''}>
                  <div>{ca.action}</div>
                  <div style={{ fontSize: 11, color: 'var(--text3)' }}>
                    Assigned: {ca.assignee} — Due: {fmtD(ca.due)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

'use client';

import { useState } from 'react';
import { inspectionsData, equipmentData } from '@/lib/data';
import { fmtD } from '@/lib/helpers';
import { Badge, DataTable, DetailField, StatCard } from '../ui';

interface Props {
  sel: string | null;
  onSelect: (id: string | null) => void;
}

export function InspectionsView({ sel, onSelect }: Props) {
  const [resultFilter, setResultFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = inspectionsData.filter((i) => {
    if (resultFilter !== 'All' && i.result !== resultFilter && i.status !== resultFilter) return false;
    if (search && !i.assetId.toLowerCase().includes(search.toLowerCase()) && !i.id.toLowerCase().includes(search.toLowerCase()) && !i.type.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const selected = sel ? inspectionsData.find((i) => i.id === sel) : null;

  return (
    <>
      <div className="page-header">
        <h2>Inspections</h2>
      </div>

      <div className="stats-row">
        <StatCard label="Total Inspections" value={inspectionsData.length} />
        <StatCard label="Passed" value={inspectionsData.filter((i) => i.result === 'Pass').length} valueClass="text-green" />
        <StatCard label="Failed" value={inspectionsData.filter((i) => i.result === 'Fail').length} valueClass="text-red" />
        <StatCard label="Conditional" value={inspectionsData.filter((i) => i.result === 'Conditional').length} valueClass="text-yellow" />
        <StatCard label="Overdue" value={inspectionsData.filter((i) => i.status === 'Overdue').length} valueClass="text-red" />
      </div>

      <div className="filters">
        <select className="filter-select" value={resultFilter} onChange={(e) => setResultFilter(e.target.value)}>
          <option value="All">All Results</option>
          <option value="Pass">Pass</option>
          <option value="Fail">Fail</option>
          <option value="Conditional">Conditional</option>
          <option value="Overdue">Overdue</option>
        </select>
        <input className="filter-input" placeholder="Search inspections..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <DataTable headers={['ID', 'Asset', 'Type', 'Inspector', 'Date', 'Result', 'Next Due', 'Status']}>
        {filtered.map((i) => {
          const eq = equipmentData.find((e) => e.id === i.assetId);
          return (
            <tr key={i.id} onClick={() => onSelect(i.id)} style={sel === i.id ? { background: 'var(--card2)' } : undefined}>
              <td style={{ fontWeight: 700, color: 'var(--accent)' }}>{i.id}</td>
              <td>{eq?.name || i.assetId}</td>
              <td>{i.type}</td>
              <td>{i.inspector}</td>
              <td>{fmtD(i.date)}</td>
              <td>{i.result ? <Badge status={i.result} /> : '—'}</td>
              <td>{fmtD(i.nextDue)}</td>
              <td><Badge status={i.status} /></td>
            </tr>
          );
        })}
      </DataTable>

      {selected && (
        <div className="detail-panel">
          <div className="detail-header">
            <h3>Inspection {selected.id}</h3>
            <div style={{ display: 'flex', gap: 8 }}>
              {selected.result && <Badge status={selected.result} />}
              <Badge status={selected.status} />
            </div>
          </div>

          <div className="detail-section">
            <h4>Inspection Details</h4>
            <div className="detail-grid">
              <DetailField label="Asset" value={`${selected.assetId} — ${equipmentData.find((e) => e.id === selected.assetId)?.name || ''}`} />
              <DetailField label="Type" value={selected.type} />
              <DetailField label="Inspector" value={selected.inspector} />
              <DetailField label="Cert Number" value={selected.cert} />
              <DetailField label="Date" value={fmtD(selected.date)} />
              <DetailField label="Next Due" value={fmtD(selected.nextDue)} />
            </div>
          </div>

          {selected.values.length > 0 && (
            <div className="detail-section">
              <h4>Test Values</h4>
              <ul className="detail-list">
                {selected.values.map((v, i) => (
                  <li key={i}>
                    <span>{v.k}</span>
                    <span style={{ fontWeight: 700 }}>{v.v}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {selected.notes && (
            <div className="detail-section">
              <h4>Notes</h4>
              <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>{selected.notes}</p>
            </div>
          )}

          {selected.corrective && (
            <div className="detail-section">
              <h4>Corrective Actions Required</h4>
              <p style={{ fontSize: 13, color: 'var(--red)', lineHeight: 1.6 }}>{selected.corrective}</p>
            </div>
          )}
        </div>
      )}
    </>
  );
}

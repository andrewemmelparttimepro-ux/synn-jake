'use client';

import { useState } from 'react';
import { jsasData } from '@/lib/data';
import { fmtD } from '@/lib/helpers';
import { Badge, RiskBadge, DataTable, DetailField, StatCard } from '../ui';

interface Props {
  sel: string | null;
  onSelect: (id: string | null) => void;
}

export function JSAView({ sel, onSelect }: Props) {
  const [search, setSearch] = useState('');

  const filtered = jsasData.filter((j) => {
    if (search && !j.title.toLowerCase().includes(search.toLowerCase()) && !j.id.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const selected = sel ? jsasData.find((j) => j.id === sel) : null;
  const totalSteps = jsasData.reduce((s, j) => s + j.steps.length, 0);
  const critSteps = jsasData.reduce((s, j) => s + j.steps.filter((st) => st.risk === 'Critical').length, 0);
  const highSteps = jsasData.reduce((s, j) => s + j.steps.filter((st) => st.risk === 'High').length, 0);

  return (
    <>
      <div className="page-header">
        <h2>JSA Library</h2>
      </div>

      <div className="stats-row">
        <StatCard label="Total JSAs" value={jsasData.length} />
        <StatCard label="Active" value={jsasData.filter((j) => j.status === 'Active').length} valueClass="text-green" />
        <StatCard label="Total Steps" value={totalSteps} />
        <StatCard label="Critical Risk Steps" value={critSteps} valueClass={critSteps > 0 ? 'text-red' : ''} />
        <StatCard label="High Risk Steps" value={highSteps} valueClass="text-orange" />
      </div>

      <div className="filters">
        <input className="filter-input" placeholder="Search JSAs..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <DataTable headers={['ID', 'Title', 'Operation Type', 'Author', 'Last Reviewed', 'Status', 'Steps']}>
        {filtered.map((j) => (
          <tr key={j.id} onClick={() => onSelect(j.id)} style={sel === j.id ? { background: 'var(--card2)' } : undefined}>
            <td style={{ fontWeight: 700, color: 'var(--accent)' }}>{j.id}</td>
            <td>{j.title}</td>
            <td>{j.opType}</td>
            <td>{j.author}</td>
            <td>{fmtD(j.lastReviewed)}</td>
            <td><Badge status={j.status} /></td>
            <td>{j.steps.length}</td>
          </tr>
        ))}
      </DataTable>

      {selected && (
        <div className="detail-panel">
          <div className="detail-header">
            <h3>{selected.title}</h3>
            <Badge status={selected.status} />
          </div>

          <div className="detail-section">
            <h4>JSA Details</h4>
            <div className="detail-grid">
              <DetailField label="JSA ID" value={selected.id} />
              <DetailField label="Operation Type" value={selected.opType} />
              <DetailField label="Author" value={selected.author} />
              <DetailField label="Last Reviewed" value={fmtD(selected.lastReviewed)} />
              <DetailField label="Steps" value={selected.steps.length} />
            </div>
          </div>

          <div className="detail-section">
            <h4>Risk Assessment Matrix</h4>
            <div style={{ overflowX: 'auto' }}>
              <table className="jsa-step-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Step</th>
                    <th>Hazards</th>
                    <th>L</th>
                    <th>C</th>
                    <th>Risk</th>
                    <th>Controls</th>
                    <th>Responsible</th>
                  </tr>
                </thead>
                <tbody>
                  {selected.steps.map((st, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td style={{ fontWeight: 600, color: 'var(--text)' }}>{st.step}</td>
                      <td>{st.hazards}</td>
                      <td>{st.likelihood}</td>
                      <td>{st.consequence}</td>
                      <td><RiskBadge risk={st.risk} /></td>
                      <td>{st.controls}</td>
                      <td>{st.responsible}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

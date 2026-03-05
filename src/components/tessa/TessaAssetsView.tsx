'use client';

import { useState } from 'react';
import { equipmentData, inspectionsData } from '@/lib/data';
import { ETYPES, CERT_MAP } from '@/lib/data';
import { fmtD, certSt } from '@/lib/helpers';
import { Badge, DataTable, DetailField } from '../ui';

interface Props {
  sel: string | null;
  onSelect: (id: string | null) => void;
}

export function TessaAssetsView({ sel, onSelect }: Props) {
  const [typeFilter, setTypeFilter] = useState('All');
  const [search, setSearch] = useState('');

  const activeEquip = equipmentData.filter((e) => e.status !== 'Retired');
  const filtered = activeEquip.filter((e) => {
    if (typeFilter !== 'All' && e.type !== typeFilter) return false;
    if (search && !e.name.toLowerCase().includes(search.toLowerCase()) && !e.id.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const selected = sel ? equipmentData.find((e) => e.id === sel) : null;

  return (
    <>
      <div className="page-header">
        <h2>Asset Registry</h2>
      </div>

      <div className="filters">
        <select className="filter-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="All">All Types</option>
          {ETYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <input className="filter-input" placeholder="Search assets..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <DataTable headers={['ID', 'Name', 'Type', 'Serial', 'Status', 'Last Inspection', 'Cert Status', 'Inspections']}>
        {filtered.map((e) => {
          const cs = certSt(e.id, inspectionsData);
          const inspCount = inspectionsData.filter((i) => i.assetId === e.id).length;
          return (
            <tr key={e.id} onClick={() => onSelect(e.id)} style={sel === e.id ? { background: 'var(--card2)' } : undefined}>
              <td style={{ fontWeight: 700, color: 'var(--accent)' }}>{e.id}</td>
              <td>{e.name}</td>
              <td>{e.type}</td>
              <td style={{ fontSize: 11, color: 'var(--text3)' }}>{e.serial}</td>
              <td><Badge status={e.status} /></td>
              <td>{fmtD(e.lastInspection)}</td>
              <td><Badge status={cs} /></td>
              <td>{inspCount}</td>
            </tr>
          );
        })}
      </DataTable>

      {selected && (
        <div className="detail-panel">
          <div className="detail-header">
            <h3>{selected.name}</h3>
            <Badge status={certSt(selected.id, inspectionsData)} />
          </div>

          <div className="detail-section">
            <h4>Asset Details</h4>
            <div className="detail-grid">
              <DetailField label="Asset ID" value={selected.id} />
              <DetailField label="Serial" value={selected.serial} />
              <DetailField label="Make / Model" value={`${selected.make} ${selected.model}`} />
              <DetailField label="Year" value={selected.year} />
              <DetailField label="Type" value={selected.type} />
              <DetailField label="Current Status" value={selected.status} />
              <DetailField label="Location" value={selected.location} />
              <DetailField label="Specs" value={selected.specs} />
            </div>
          </div>

          <div className="detail-section">
            <h4>Required Certifications</h4>
            <ul className="detail-list">
              {(CERT_MAP[selected.type] || []).map((cert) => {
                const insp = inspectionsData.filter((i) => i.assetId === selected.id && i.type === cert).sort((a, b) => b.date.localeCompare(a.date))[0];
                return (
                  <li key={cert}>
                    <span>{cert}</span>
                    <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                      {insp ? (
                        <>
                          <span style={{ fontSize: 11, color: 'var(--text3)' }}>Last: {fmtD(insp.date)}</span>
                          <Badge status={insp.result || insp.status} />
                        </>
                      ) : (
                        <Badge status="No Records" />
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="detail-section">
            <h4>Full Inspection History</h4>
            <ul className="detail-list">
              {inspectionsData.filter((i) => i.assetId === selected.id).sort((a, b) => b.date.localeCompare(a.date)).map((i) => (
                <li key={i.id}>
                  <span>
                    <strong style={{ color: 'var(--text)' }}>{i.id}</strong> — {i.type} by {i.inspector} ({fmtD(i.date)})
                  </span>
                  <Badge status={i.result || i.status} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

'use client';

import { useState } from 'react';
import { equipmentData, rentalsData, inspectionsData } from '@/lib/data';
import { fmtD, certSt } from '@/lib/helpers';
import { Badge, DataTable, DetailField, StatCard } from '../ui';
import { ETYPES } from '@/lib/data';

interface Props {
  sel: string | null;
  onSelect: (id: string | null) => void;
}

export function EquipmentView({ sel, onSelect }: Props) {
  const [typeFilter, setTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = equipmentData.filter((e) => {
    if (typeFilter !== 'All' && e.type !== typeFilter) return false;
    if (statusFilter !== 'All' && e.status !== statusFilter) return false;
    if (search && !e.name.toLowerCase().includes(search.toLowerCase()) && !e.id.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const selected = sel ? equipmentData.find((e) => e.id === sel) : null;
  const activeEquip = equipmentData.filter((e) => e.status !== 'Retired');
  const avgUtil = Math.round(activeEquip.reduce((s, e) => s + e.utilization, 0) / activeEquip.length);

  return (
    <>
      <div className="page-header">
        <h2>Equipment Fleet</h2>
      </div>

      <div className="stats-row">
        <StatCard label="Total Equipment" value={equipmentData.length} sub={`${activeEquip.length} active`} />
        <StatCard label="Deployed" value={equipmentData.filter((e) => e.status === 'Deployed').length} valueClass="text-blue" />
        <StatCard label="Available" value={equipmentData.filter((e) => e.status === 'Available').length} valueClass="text-green" />
        <StatCard label="Maintenance" value={equipmentData.filter((e) => e.status === 'Maintenance').length} valueClass="text-yellow" />
        <StatCard label="Avg Utilization" value={`${avgUtil}%`} />
      </div>

      <div className="filters">
        <select className="filter-select" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
          <option value="All">All Types</option>
          {ETYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All Status</option>
          <option value="Available">Available</option>
          <option value="Deployed">Deployed</option>
          <option value="Maintenance">Maintenance</option>
          <option value="Retired">Retired</option>
        </select>
        <input className="filter-input" placeholder="Search equipment..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <DataTable headers={['ID', 'Name', 'Type', 'Status', 'Client', 'Location', 'Utilization', 'Cert Status']}>
        {filtered.map((e) => (
          <tr key={e.id} onClick={() => onSelect(e.id)} style={sel === e.id ? { background: 'var(--card2)' } : undefined}>
            <td style={{ fontWeight: 700, color: 'var(--accent)' }}>{e.id}</td>
            <td>{e.name}</td>
            <td>{e.type}</td>
            <td><Badge status={e.status} /></td>
            <td>{e.client || '—'}</td>
            <td>{e.location}</td>
            <td>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ flex: 1, height: 6, background: 'var(--card2)', maxWidth: 80 }}>
                  <div style={{ width: `${e.utilization}%`, height: '100%', background: e.utilization > 75 ? 'var(--green)' : e.utilization > 40 ? 'var(--blue)' : 'var(--yellow)' }} />
                </div>
                <span>{e.utilization}%</span>
              </div>
            </td>
            <td><Badge status={certSt(e.id, inspectionsData)} /></td>
          </tr>
        ))}
      </DataTable>

      {selected && (
        <div className="detail-panel">
          <div className="detail-header">
            <h3>{selected.name}</h3>
            <div style={{ display: 'flex', gap: 8 }}>
              <Badge status={selected.status} />
              <Badge status={certSt(selected.id, inspectionsData)} />
            </div>
          </div>

          <div className="detail-section">
            <h4>Equipment Details</h4>
            <div className="detail-grid">
              <DetailField label="Equipment ID" value={selected.id} />
              <DetailField label="Serial Number" value={selected.serial} />
              <DetailField label="Make" value={selected.make} />
              <DetailField label="Model" value={selected.model} />
              <DetailField label="Year" value={selected.year} />
              <DetailField label="Type" value={selected.type} />
              <DetailField label="Purchase Date" value={fmtD(selected.purchaseDate)} />
              <DetailField label="Utilization" value={`${selected.utilization}%`} />
            </div>
          </div>

          <div className="detail-section">
            <h4>Specifications</h4>
            <p style={{ fontSize: 13, color: 'var(--text2)' }}>{selected.specs}</p>
          </div>

          {selected.status === 'Deployed' && (
            <div className="detail-section">
              <h4>Current Deployment</h4>
              <div className="detail-grid">
                <DetailField label="Client" value={selected.client} />
                <DetailField label="Location" value={selected.location} />
                <DetailField label="Deploy Date" value={fmtD(selected.deployDate)} />
              </div>
            </div>
          )}

          <div className="detail-section">
            <h4>Inspection History</h4>
            <ul className="detail-list">
              {inspectionsData.filter((i) => i.assetId === selected.id).map((i) => (
                <li key={i.id}>
                  <span>{i.type} — {fmtD(i.date)}</span>
                  <Badge status={i.result || i.status} />
                </li>
              ))}
            </ul>
          </div>

          <div className="detail-section">
            <h4>Rental History</h4>
            <ul className="detail-list">
              {rentalsData.filter((r) => r.equipId === selected.id).map((r) => (
                <li key={r.id}>
                  <span>{r.id} — {r.client}</span>
                  <Badge status={r.status} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

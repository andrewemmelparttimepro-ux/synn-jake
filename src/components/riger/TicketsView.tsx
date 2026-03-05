'use client';

import { useState } from 'react';
import { fieldTicketsData, equipmentData } from '@/lib/data';
import { fmtD, fmtM } from '@/lib/helpers';
import { Badge, DataTable, DetailField, StatCard } from '../ui';

interface Props {
  sel: string | null;
  onSelect: (id: string | null) => void;
}

export function TicketsView({ sel, onSelect }: Props) {
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = fieldTicketsData.filter((t) => {
    if (statusFilter !== 'All' && t.status !== statusFilter) return false;
    if (search && !t.client.toLowerCase().includes(search.toLowerCase()) && !t.id.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const selected = sel ? fieldTicketsData.find((t) => t.id === sel) : null;
  const pending = fieldTicketsData.filter((t) => t.status === 'Pending').length;
  const totalHours = fieldTicketsData.reduce((s, t) => s + t.hours, 0);
  const totalMaterials = fieldTicketsData.reduce((s, t) => s + t.materials.reduce((ms, m) => ms + m.cost, 0), 0);

  return (
    <>
      <div className="page-header">
        <h2>Field Tickets</h2>
      </div>

      <div className="stats-row">
        <StatCard label="Total Tickets" value={fieldTicketsData.length} />
        <StatCard label="Pending Approval" value={pending} valueClass={pending > 0 ? 'text-yellow' : ''} />
        <StatCard label="Approved" value={fieldTicketsData.filter((t) => t.status === 'Approved').length} valueClass="text-green" />
        <StatCard label="Total Hours" value={totalHours} sub="Field service hours" />
        <StatCard label="Materials Cost" value={fmtM(totalMaterials)} />
      </div>

      <div className="filters">
        <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Invoiced">Invoiced</option>
        </select>
        <input className="filter-input" placeholder="Search tickets..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <DataTable headers={['ID', 'Date', 'Client', 'Equipment', 'Crew', 'Hours', 'Materials', 'Status']}>
        {filtered.map((t) => {
          const eq = equipmentData.find((e) => e.id === t.equipId);
          const matCost = t.materials.reduce((s, m) => s + m.cost, 0);
          return (
            <tr key={t.id} onClick={() => onSelect(t.id)} style={sel === t.id ? { background: 'var(--card2)' } : undefined}>
              <td style={{ fontWeight: 700, color: 'var(--accent)' }}>{t.id}</td>
              <td>{fmtD(t.date)}</td>
              <td>{t.client}</td>
              <td>{eq?.name || t.equipId}</td>
              <td>{t.crew}</td>
              <td>{t.hours}h</td>
              <td>{fmtM(matCost)}</td>
              <td><Badge status={t.status} /></td>
            </tr>
          );
        })}
      </DataTable>

      {selected && (
        <div className="detail-panel">
          <div className="detail-header">
            <h3>Field Ticket {selected.id}</h3>
            <Badge status={selected.status} />
          </div>

          <div className="detail-section">
            <h4>Ticket Details</h4>
            <div className="detail-grid">
              <DetailField label="Date" value={fmtD(selected.date)} />
              <DetailField label="Client" value={selected.client} />
              <DetailField label="Equipment" value={equipmentData.find((e) => e.id === selected.equipId)?.name || selected.equipId} />
              <DetailField label="Crew" value={selected.crew} />
              <DetailField label="Hours" value={selected.hours} />
              <DetailField label="Rental ID" value={selected.rentalId} />
              <DetailField label="PO" value={selected.po} />
            </div>
          </div>

          <div className="detail-section">
            <h4>Services Performed</h4>
            <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>{selected.services}</p>
          </div>

          <div className="detail-section">
            <h4>Materials</h4>
            <ul className="detail-list">
              {selected.materials.map((m, i) => (
                <li key={i}>
                  <span>{m.item} — {m.qty}</span>
                  <span style={{ fontWeight: 700 }}>{fmtM(m.cost)}</span>
                </li>
              ))}
              <li style={{ fontWeight: 700, color: 'var(--text)' }}>
                <span>Total Materials</span>
                <span>{fmtM(selected.materials.reduce((s, m) => s + m.cost, 0))}</span>
              </li>
            </ul>
          </div>

          {selected.approvedBy && (
            <div className="detail-section">
              <h4>Approval</h4>
              <div className="detail-grid">
                <DetailField label="Approved By" value={selected.approvedBy} />
                <DetailField label="Approved At" value={selected.approvedAt} />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

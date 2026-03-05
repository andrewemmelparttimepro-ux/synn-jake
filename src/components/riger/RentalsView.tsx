'use client';

import { useState } from 'react';
import { rentalsData, equipmentData } from '@/lib/data';
import { fmtD, fmtM, daysBtw } from '@/lib/helpers';
import { Badge, DataTable, DetailField, StatCard } from '../ui';

interface Props {
  sel: string | null;
  onSelect: (id: string | null) => void;
}

export function RentalsView({ sel, onSelect }: Props) {
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = rentalsData.filter((r) => {
    if (statusFilter !== 'All' && r.status !== statusFilter) return false;
    if (search && !r.client.toLowerCase().includes(search.toLowerCase()) && !r.id.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const selected = sel ? rentalsData.find((r) => r.id === sel) : null;
  const active = rentalsData.filter((r) => r.status === 'Active');
  const dailyRev = active.reduce((s, r) => s + r.rate, 0);

  return (
    <>
      <div className="page-header">
        <h2>Rental Contracts</h2>
      </div>

      <div className="stats-row">
        <StatCard label="Active Rentals" value={active.length} valueClass="text-green" />
        <StatCard label="Daily Revenue" value={fmtM(dailyRev)} sub="All active rentals" valueClass="text-green" />
        <StatCard label="Completed" value={rentalsData.filter((r) => r.status === 'Completed').length} valueClass="text-blue" />
        <StatCard label="Total Contracts" value={rentalsData.length} />
      </div>

      <div className="filters">
        <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
        </select>
        <input className="filter-input" placeholder="Search rentals..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <DataTable headers={['ID', 'Client', 'Equipment', 'Location', 'Start', 'End', 'Rate/Day', 'Status', 'PO']}>
        {filtered.map((r) => {
          const eq = equipmentData.find((e) => e.id === r.equipId);
          return (
            <tr key={r.id} onClick={() => onSelect(r.id)} style={sel === r.id ? { background: 'var(--card2)' } : undefined}>
              <td style={{ fontWeight: 700, color: 'var(--accent)' }}>{r.id}</td>
              <td>{r.client}</td>
              <td>{eq?.name || r.equipId}</td>
              <td>{r.location}</td>
              <td>{fmtD(r.startDate)}</td>
              <td>{fmtD(r.endDate)}</td>
              <td style={{ fontWeight: 700 }}>{fmtM(r.rate)}</td>
              <td><Badge status={r.status} /></td>
              <td style={{ fontSize: 11, color: 'var(--text3)' }}>{r.po}</td>
            </tr>
          );
        })}
      </DataTable>

      {selected && (
        <div className="detail-panel">
          <div className="detail-header">
            <h3>Rental {selected.id}</h3>
            <Badge status={selected.status} />
          </div>

          <div className="detail-section">
            <h4>Rental Details</h4>
            <div className="detail-grid">
              <DetailField label="Client" value={selected.client} />
              <DetailField label="Equipment" value={equipmentData.find((e) => e.id === selected.equipId)?.name || selected.equipId} />
              <DetailField label="Location" value={selected.location} />
              <DetailField label="Start Date" value={fmtD(selected.startDate)} />
              <DetailField label="End Date" value={fmtD(selected.endDate)} />
              <DetailField label="Rate/Day" value={fmtM(selected.rate)} />
              <DetailField label="PO Number" value={selected.po} />
              {selected.status === 'Active' && (
                <DetailField label="Days Active" value={daysBtw(selected.startDate)} />
              )}
            </div>
          </div>

          {selected.notes && (
            <div className="detail-section">
              <h4>Notes</h4>
              <p style={{ fontSize: 13, color: 'var(--text2)' }}>{selected.notes}</p>
            </div>
          )}

          {selected.status === 'Active' && (
            <div className="detail-section">
              <h4>Revenue Summary</h4>
              <div className="detail-grid">
                <DetailField label="Total to Date" value={fmtM(daysBtw(selected.startDate) * selected.rate)} />
                <DetailField label="Days Active" value={daysBtw(selected.startDate)} />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

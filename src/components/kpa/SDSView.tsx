'use client';

import { useState } from 'react';
import { sdsData } from '@/lib/data';
import { DataTable, StatCard } from '../ui';

export function SDSView() {
  const [search, setSearch] = useState('');

  const filtered = sdsData.filter((s) => {
    if (search && !s.p.toLowerCase().includes(search.toLowerCase()) && !s.m.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <>
      <div className="page-header">
        <h2>SDS Library</h2>
      </div>

      <div className="stats-row">
        <StatCard label="Total SDS Records" value={sdsData.length} />
        <StatCard label="Unique Manufacturers" value={new Set(sdsData.map((s) => s.m)).size} />
        <StatCard label="Hazardous Materials" value={sdsData.filter((s) => s.h.includes('Flammable') || s.h.includes('Toxic')).length} valueClass="text-red" />
      </div>

      <div className="filters">
        <input className="filter-input" placeholder="Search chemicals..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <DataTable headers={['Product', 'Manufacturer', 'Hazard Classification', 'GHS Pictograms', 'SDS Date']}>
        {filtered.map((s, i) => (
          <tr key={i}>
            <td style={{ fontWeight: 700 }}>{s.p}</td>
            <td>{s.m}</td>
            <td>
              <span style={{
                color: s.h.includes('Toxic') || s.h.includes('Acute') ? 'var(--red)' :
                  s.h.includes('Flammable') ? 'var(--orange)' :
                    s.h.includes('Environmental') ? 'var(--green)' : 'var(--yellow)',
                fontWeight: 600
              }}>
                {s.h}
              </span>
            </td>
            <td style={{ fontSize: 11, color: 'var(--text3)' }}>{s.g}</td>
            <td>{s.d}</td>
          </tr>
        ))}
      </DataTable>
    </>
  );
}

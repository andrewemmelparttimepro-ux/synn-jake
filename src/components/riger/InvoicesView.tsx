'use client';

import { useState } from 'react';
import { invoicesData } from '@/lib/data';
import { fmtD, fmtM } from '@/lib/helpers';
import { Badge, DataTable, DetailField, StatCard } from '../ui';
import { CO } from '@/lib/data';

interface Props {
  sel: string | null;
  onSelect: (id: string | null) => void;
}

export function InvoicesView({ sel, onSelect }: Props) {
  const [statusFilter, setStatusFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [viewInvoice, setViewInvoice] = useState(false);

  const filtered = invoicesData.filter((inv) => {
    if (statusFilter !== 'All' && inv.status !== statusFilter) return false;
    if (search && !inv.client.toLowerCase().includes(search.toLowerCase()) && !inv.id.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const selected = sel ? invoicesData.find((i) => i.id === sel) : null;
  const totalOutstanding = invoicesData.filter((i) => i.status === 'Sent' || i.status === 'Overdue').reduce((s, i) => s + i.total, 0);
  const totalPaid = invoicesData.filter((i) => i.status === 'Paid').reduce((s, i) => s + i.total, 0);

  return (
    <>
      <div className="page-header">
        <h2>Invoicing</h2>
      </div>

      <div className="stats-row">
        <StatCard label="Total Invoices" value={invoicesData.length} />
        <StatCard label="Outstanding" value={fmtM(totalOutstanding)} valueClass="text-yellow" sub={`${invoicesData.filter((i) => i.status === 'Sent' || i.status === 'Overdue').length} invoices`} />
        <StatCard label="Paid" value={fmtM(totalPaid)} valueClass="text-green" />
        <StatCard label="Overdue" value={fmtM(invoicesData.filter((i) => i.status === 'Overdue').reduce((s, i) => s + i.total, 0))} valueClass="text-red" sub={`${invoicesData.filter((i) => i.status === 'Overdue').length} invoice(s)`} />
        <StatCard label="Draft" value={invoicesData.filter((i) => i.status === 'Draft').length} valueClass="text-grey" />
      </div>

      <div className="filters">
        <select className="filter-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="All">All Status</option>
          <option value="Draft">Draft</option>
          <option value="Sent">Sent</option>
          <option value="Paid">Paid</option>
          <option value="Overdue">Overdue</option>
        </select>
        <input className="filter-input" placeholder="Search invoices..." value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <DataTable headers={['ID', 'Client', 'Period', 'Subtotal', 'Tax', 'Total', 'Due Date', 'Status']}>
        {filtered.map((inv) => (
          <tr key={inv.id} onClick={() => onSelect(inv.id)} style={sel === inv.id ? { background: 'var(--card2)' } : undefined}>
            <td style={{ fontWeight: 700, color: 'var(--accent)' }}>{inv.id}</td>
            <td>{inv.client}</td>
            <td>{inv.period}</td>
            <td>{fmtM(inv.subtotal)}</td>
            <td>{fmtM(inv.tax)}</td>
            <td style={{ fontWeight: 700 }}>{fmtM(inv.total)}</td>
            <td>{fmtD(inv.dueDate)}</td>
            <td><Badge status={inv.status} /></td>
          </tr>
        ))}
      </DataTable>

      {selected && !viewInvoice && (
        <div className="detail-panel">
          <div className="detail-header">
            <h3>Invoice {selected.id}</h3>
            <div style={{ display: 'flex', gap: 8 }}>
              <Badge status={selected.status} />
              <button className="btn btn-secondary btn-sm" onClick={() => setViewInvoice(true)}>View Invoice</button>
            </div>
          </div>

          <div className="detail-section">
            <h4>Invoice Details</h4>
            <div className="detail-grid">
              <DetailField label="Client" value={selected.client} />
              <DetailField label="Period" value={selected.period} />
              <DetailField label="Due Date" value={fmtD(selected.dueDate)} />
              <DetailField label="Rental IDs" value={selected.rentalIds.join(', ')} />
            </div>
          </div>

          <div className="detail-section">
            <h4>Line Items</h4>
            <ul className="detail-list">
              {selected.items.map((item, i) => (
                <li key={i}>
                  <span>{item.desc}</span>
                  <span style={{ fontWeight: 700 }}>{fmtM(item.amount)}</span>
                </li>
              ))}
              <li style={{ fontWeight: 700, color: 'var(--text)', borderTop: '2px solid var(--border)' }}>
                <span>Total</span>
                <span>{fmtM(selected.total)}</span>
              </li>
            </ul>
          </div>

          {selected.status === 'Paid' && (
            <div className="detail-section">
              <h4>Payment</h4>
              <div className="detail-grid">
                <DetailField label="Paid Date" value={fmtD(selected.paidDate)} />
                <DetailField label="Method" value={selected.paidMethod} />
                <DetailField label="Amount" value={fmtM(selected.paidAmount)} />
              </div>
            </div>
          )}
        </div>
      )}

      {selected && viewInvoice && (
        <div style={{ marginTop: 16 }}>
          <button className="btn btn-secondary btn-sm" onClick={() => setViewInvoice(false)} style={{ marginBottom: 16 }}>← Back to Details</button>
          <div className="invoice-doc">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 30 }}>
              <div>
                <h2 style={{ fontSize: 24, fontWeight: 800 }}>{CO.name}</h2>
                <div style={{ fontSize: 12, color: '#666' }}>
                  {CO.addr}<br />{CO.city}, {CO.st} {CO.zip}<br />{CO.phone}<br />{CO.email}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <h2 style={{ fontSize: 28, fontWeight: 800, color: '#333' }}>INVOICE</h2>
                <div style={{ fontSize: 14, color: '#666' }}>{selected.id}</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <div><strong>Bill To:</strong><br />{selected.client}</div>
              <div style={{ textAlign: 'right' }}>
                <div>Period: {selected.period}</div>
                <div>Due: {fmtD(selected.dueDate)}</div>
              </div>
            </div>

            <table>
              <thead>
                <tr><th>Description</th><th style={{ textAlign: 'right' }}>Amount</th></tr>
              </thead>
              <tbody>
                {selected.items.map((item, i) => (
                  <tr key={i}><td>{item.desc}</td><td style={{ textAlign: 'right' }}>{fmtM(item.amount)}</td></tr>
                ))}
              </tbody>
              <tfoot>
                <tr style={{ fontWeight: 700 }}><td>Subtotal</td><td style={{ textAlign: 'right' }}>{fmtM(selected.subtotal)}</td></tr>
                <tr><td>Tax</td><td style={{ textAlign: 'right' }}>{fmtM(selected.tax)}</td></tr>
                <tr style={{ fontWeight: 700, fontSize: 16 }}><td>TOTAL DUE</td><td style={{ textAlign: 'right' }}>{fmtM(selected.total)}</td></tr>
              </tfoot>
            </table>
          </div>
        </div>
      )}
    </>
  );
}

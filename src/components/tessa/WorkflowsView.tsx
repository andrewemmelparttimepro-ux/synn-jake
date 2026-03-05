'use client';

import { Badge, StatCard } from '../ui';

interface Workflow {
  id: string;
  title: string;
  type: string;
  assignee: string;
  status: string;
  priority: string;
  created: string;
  due: string;
}

const workflows: Workflow[] = [
  { id: 'WF-301', title: 'FP-002 Fluid End Replacement', type: 'Maintenance', assignee: 'Drew Anderson', status: 'In Progress', priority: 'High', created: '2026-02-28', due: '2026-03-10' },
  { id: 'WF-302', title: 'HO-001 Safety Valve Test — OVERDUE', type: 'Inspection', assignee: 'Mike Stelter', status: 'Overdue', priority: 'Critical', created: '2026-01-15', due: '2026-01-15' },
  { id: 'WF-303', title: 'N2-002 Vessel Repair & Re-weld', type: 'Repair', assignee: 'Kelby Kraft', status: 'In Progress', priority: 'High', created: '2025-09-15', due: '2026-03-15' },
  { id: 'WF-304', title: 'Annual DOT Inspection — FP-001', type: 'Inspection', assignee: 'Mike Stelter', status: 'Scheduled', priority: 'Medium', created: '2026-03-01', due: '2026-04-18' },
  { id: 'WF-305', title: 'CT-001 BOP Re-certification', type: 'Certification', assignee: 'James Halvorson', status: 'Scheduled', priority: 'Medium', created: '2026-03-01', due: '2026-07-10' },
  { id: 'WF-306', title: 'VT-001 Annual Tank Cert', type: 'Certification', assignee: 'James Halvorson', status: 'Scheduled', priority: 'Low', created: '2026-03-01', due: '2026-12-05' },
  { id: 'WF-307', title: 'Williams County Pad Remediation', type: 'Environmental', assignee: 'Seth Hedahl', status: 'In Progress', priority: 'High', created: '2026-02-25', due: '2026-03-10' },
  { id: 'WF-308', title: 'FP-001 Pump Barrier Install', type: 'Safety', assignee: 'Drew Anderson', status: 'Open', priority: 'Medium', created: '2026-02-22', due: '2026-03-15' },
];

export function WorkflowsView() {
  const inProgress = workflows.filter((w) => w.status === 'In Progress').length;
  const overdue = workflows.filter((w) => w.status === 'Overdue').length;
  const scheduled = workflows.filter((w) => w.status === 'Scheduled').length;

  return (
    <>
      <div className="page-header">
        <h2>Workflow Tracker</h2>
      </div>

      <div className="stats-row">
        <StatCard label="Total Workflows" value={workflows.length} />
        <StatCard label="In Progress" value={inProgress} valueClass="text-blue" />
        <StatCard label="Overdue" value={overdue} valueClass={overdue > 0 ? 'text-red' : ''} />
        <StatCard label="Scheduled" value={scheduled} valueClass="text-cyan" />
        <StatCard label="Open" value={workflows.filter((w) => w.status === 'Open').length} valueClass="text-yellow" />
      </div>

      <div className="table-wrap">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Type</th>
              <th>Assignee</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Due Date</th>
            </tr>
          </thead>
          <tbody>
            {workflows.map((w) => (
              <tr key={w.id}>
                <td style={{ fontWeight: 700, color: 'var(--accent)' }}>{w.id}</td>
                <td>{w.title}</td>
                <td><span className={`badge badge-${w.type === 'Inspection' ? 'cyan' : w.type === 'Maintenance' ? 'blue' : w.type === 'Repair' ? 'orange' : w.type === 'Environmental' ? 'green' : w.type === 'Safety' ? 'yellow' : 'purple'}`}>{w.type}</span></td>
                <td>{w.assignee}</td>
                <td><Badge status={w.priority === 'Critical' ? 'Overdue' : w.priority === 'High' ? 'Corrective Action Pending' : w.priority === 'Medium' ? 'Pending' : 'Available'} /></td>
                <td><Badge status={w.status} /></td>
                <td>{w.due}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

'use client';

interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  valueClass?: string;
}

export function StatCard({ label, value, sub, valueClass }: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="stat-label">{label}</div>
      <div className={`stat-value ${valueClass || ''}`}>{value}</div>
      {sub && <div className="stat-sub">{sub}</div>}
    </div>
  );
}

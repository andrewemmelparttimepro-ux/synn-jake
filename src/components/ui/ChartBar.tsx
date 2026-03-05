'use client';

interface ChartBarProps {
  label: string;
  value: string;
  pct: number;
  color: string;
}

export function ChartBar({ label, value, pct, color }: ChartBarProps) {
  return (
    <div className="chart-bar">
      <div className="chart-bar-label">{label}</div>
      <div className="chart-bar-track">
        <div className="chart-bar-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
      <div className="chart-bar-value">{value}</div>
    </div>
  );
}

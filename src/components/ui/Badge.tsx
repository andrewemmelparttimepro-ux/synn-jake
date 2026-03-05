'use client';

import { badgeClass, sevBadgeClass, riskBadgeClass } from '@/lib/helpers';

export function Badge({ status }: { status: string }) {
  return <span className={`badge ${badgeClass(status)}`}>{status}</span>;
}

export function SevBadge({ severity }: { severity: string }) {
  return <span className={`badge ${sevBadgeClass(severity)}`}>{severity}</span>;
}

export function RiskBadge({ risk }: { risk: string }) {
  return <span className={`badge ${riskBadgeClass(risk)}`}>{risk}</span>;
}

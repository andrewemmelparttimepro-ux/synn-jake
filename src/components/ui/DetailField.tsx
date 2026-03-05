'use client';

export function DetailField({ label, value }: { label: string; value: string | number | undefined }) {
  return (
    <div className="detail-field">
      <div className="field-label">{label}</div>
      <div className="field-value">{value || '—'}</div>
    </div>
  );
}

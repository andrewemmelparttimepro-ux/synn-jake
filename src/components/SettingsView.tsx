'use client';

import { CO } from '@/lib/data';
import { DetailField } from './ui';

export function SettingsView() {
  return (
    <>
      <div className="page-header">
        <h2>Settings</h2>
      </div>

      <div className="detail-panel">
        <div className="detail-section">
          <h4>Company Information</h4>
          <div className="detail-grid">
            <DetailField label="Company Name" value={CO.name} />
            <DetailField label="Address" value={`${CO.addr}, ${CO.city}, ${CO.st} ${CO.zip}`} />
            <DetailField label="Phone" value={CO.phone} />
            <DetailField label="Email" value={CO.email} />
          </div>
        </div>
      </div>

      <div className="detail-panel" style={{ marginTop: 16 }}>
        <div className="detail-section">
          <h4>User Profile</h4>
          <div className="detail-grid">
            <DetailField label="Name" value="Jake Feil" />
            <DetailField label="Role" value="Operations Manager" />
            <DetailField label="Email" value={CO.email} />
          </div>
        </div>
      </div>

      <div className="detail-panel" style={{ marginTop: 16 }}>
        <div className="detail-section">
          <h4>System</h4>
          <div className="detail-grid">
            <DetailField label="Version" value="SYNN v1.0.0" />
            <DetailField label="Modules" value="RigER, TESSALink, KPA EHS" />
            <DetailField label="Database" value="Supabase (Connected)" />
            <DetailField label="Theme" value="Dark" />
          </div>
        </div>
      </div>
    </>
  );
}

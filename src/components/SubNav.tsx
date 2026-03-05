'use client';

import { AppMode, NavItem } from '@/lib/types';

const NAV: Record<AppMode, NavItem[]> = {
  synn: [{ id: 'dashboard', l: 'Dashboard', i: 'dash' }],
  riger: [
    { id: 'dashboard', l: 'Dashboard', i: 'dash' },
    { id: 'equipment', l: 'Equipment', i: 'equip' },
    { id: 'rentals', l: 'Rentals', i: 'rental' },
    { id: 'tickets', l: 'Field Tickets', i: 'ticket' },
    { id: 'dispatch', l: 'Dispatch', i: 'disp' },
    { id: 'invoicing', l: 'Invoicing', i: 'inv' },
    { id: 'reports', l: 'Reports', i: 'rpt' },
    { id: 'settings', l: 'Settings', i: 'gear' },
  ],
  tessa: [
    { id: 'dashboard', l: 'Dashboard', i: 'dash' },
    { id: 'assets', l: 'Assets', i: 'box' },
    { id: 'inspections', l: 'Inspections', i: 'insp' },
    { id: 'certifications', l: 'Certifications', i: 'cert' },
    { id: 'workflows', l: 'Workflows', i: 'wf' },
    { id: 'reports', l: 'Reports', i: 'rpt' },
    { id: 'settings', l: 'Settings', i: 'gear' },
  ],
  kpa: [
    { id: 'dashboard', l: 'Dashboard', i: 'dash' },
    { id: 'incidents', l: 'Incidents', i: 'inc' },
    { id: 'jsa', l: 'JSA Library', i: 'jsa' },
    { id: 'training', l: 'Training', i: 'train' },
    { id: 'audits', l: 'Audits', i: 'shield' },
    { id: 'sds', l: 'SDS Library', i: 'book' },
    { id: 'reports', l: 'Reports', i: 'rpt' },
    { id: 'settings', l: 'Settings', i: 'gear' },
  ],
};

interface SubNavProps {
  mode: AppMode;
  view: string;
  onSetView: (v: string) => void;
}

export function SubNav({ mode, view, onSetView }: SubNavProps) {
  const items = NAV[mode] || NAV.synn;
  return (
    <div id="subnav">
      <div id="subnavTabs">
        {items.map((item) => (
          <button
            key={item.id}
            className={`snav-btn ${view === item.id ? 'active' : ''}`}
            onClick={() => onSetView(item.id)}
          >
            {item.l}
          </button>
        ))}
      </div>
      <div id="subnav-right" />
    </div>
  );
}

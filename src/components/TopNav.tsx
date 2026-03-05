'use client';

import { AppMode } from '@/lib/types';
import { Icons } from './Icons';

const TOP_MODULES: { id: AppMode; l: string; i: string; tip: string }[] = [
  { id: 'synn', l: 'SYNN', i: 'dash', tip: 'Unified Dashboard' },
  { id: 'riger', l: 'Oilfield', i: 'equip', tip: 'Oilfield Rentals' },
  { id: 'tessa', l: 'TESSALink', i: 'cert', tip: 'Inspections & Certs' },
  { id: 'kpa', l: 'KPA EHS', i: 'shield', tip: 'Safety & Compliance' },
];

interface TopNavProps {
  mode: AppMode;
  onSetMode: (m: AppMode) => void;
}

export function TopNav({ mode, onSetMode }: TopNavProps) {
  return (
    <div id="topnav">
      <div id="topnavLeft">
        {TOP_MODULES.map((mod, idx) => (
          <div key={mod.id} style={{ display: 'contents' }}>
            {idx > 0 && <div className="tnav-divider" />}
            <button
              className={`tnav-btn ${mode === mod.id ? 'active' : ''}`}
              onClick={() => onSetMode(mod.id)}
              title={mod.tip}
            >
              <Icons name={mod.i} />
              <span>{mod.l}</span>
            </button>
          </div>
        ))}
      </div>
      <div id="topnav-right">
        <div className="mode-toggle">
          {(['synn', 'riger', 'tessa', 'kpa'] as AppMode[]).map((m) => (
            <button
              key={m}
              className={mode === m ? 'active' : ''}
              onClick={() => onSetMode(m)}
            >
              {m === 'synn' ? 'SYNN' : m === 'riger' ? 'RIGER' : m === 'tessa' ? 'TESSALINK' : 'KPA EHS'}
            </button>
          ))}
        </div>
        <div className="user-badge">Jake Feil — Sandpro LLC</div>
      </div>
    </div>
  );
}

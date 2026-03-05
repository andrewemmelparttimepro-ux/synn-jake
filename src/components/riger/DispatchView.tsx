'use client';

import { useState } from 'react';
import { dispatchData } from '@/lib/data';
import { CREWS } from '@/lib/data';
import { getWeekDates, fmtShort, fmtDateISO } from '@/lib/helpers';
import { Badge } from '../ui';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function DispatchView() {
  const [weekOff, setWeekOff] = useState(0);
  const weekDates = getWeekDates(weekOff);

  return (
    <>
      <div className="page-header">
        <h2>Dispatch Board</h2>
        <div className="page-actions">
          <button className="btn btn-secondary btn-sm" onClick={() => setWeekOff(weekOff - 1)}>← Prev</button>
          <button className="btn btn-secondary btn-sm" onClick={() => setWeekOff(0)}>Today</button>
          <button className="btn btn-secondary btn-sm" onClick={() => setWeekOff(weekOff + 1)}>Next →</button>
        </div>
      </div>

      <div style={{ marginBottom: 16 }}>
        {dispatchData.map((d) => (
          <div key={d.crew} className="crew-status-card">
            <div>
              <strong>{d.crew}</strong>
              <span style={{ color: 'var(--text3)', marginLeft: 12 }}>{d.client} — {d.loc}</span>
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <span style={{ fontSize: 11, color: 'var(--text3)' }}>{d.equip.join(', ')}</span>
              <Badge status={d.crewStatus} />
            </div>
          </div>
        ))}
      </div>

      <div className="dispatch-grid">
        <div className="dispatch-header">Crew</div>
        {weekDates.map((d, i) => (
          <div key={i} className="dispatch-header">
            {DAYS[i]}<br />{fmtShort(d)}
          </div>
        ))}

        {CREWS.map((crew) => {
          const assignment = dispatchData.find((d) => d.crew === crew);
          return (
            <div key={crew} style={{ display: 'contents' }}>
              <div className="dispatch-crew">{crew}</div>
              {weekDates.map((date, di) => {
                const dateStr = fmtDateISO(date);
                const hasJob = assignment && dateStr >= assignment.start && dateStr <= assignment.end;
                return (
                  <div key={di} className="dispatch-cell">
                    {hasJob && assignment && (
                      <div className="dispatch-job">
                        <div style={{ fontWeight: 700 }}>{assignment.client.split(' / ')[0]}</div>
                        <div>{assignment.loc.split(' / ')[0]}</div>
                        <div style={{ color: 'var(--text3)' }}>{assignment.equip.join(', ')}</div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
}

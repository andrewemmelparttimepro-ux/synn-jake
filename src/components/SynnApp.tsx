'use client';

import { useState, useCallback } from 'react';
import { AppMode } from '@/lib/types';
import { TopNav } from './TopNav';
import { SubNav } from './SubNav';
import { SynnDashboard } from './synn/SynnDashboard';
import { RigerDashboard } from './riger/RigerDashboard';
import { EquipmentView } from './riger/EquipmentView';
import { RentalsView } from './riger/RentalsView';
import { TicketsView } from './riger/TicketsView';
import { DispatchView } from './riger/DispatchView';
import { InvoicesView } from './riger/InvoicesView';
import { RigerReports } from './riger/RigerReports';
import { TessaDashboard } from './tessa/TessaDashboard';
import { TessaAssetsView } from './tessa/TessaAssetsView';
import { InspectionsView } from './tessa/InspectionsView';
import { CertificationsView } from './tessa/CertificationsView';
import { WorkflowsView } from './tessa/WorkflowsView';
import { TessaReports } from './tessa/TessaReports';
import { KpaDashboard } from './kpa/KpaDashboard';
import { IncidentsView } from './kpa/IncidentsView';
import { JSAView } from './kpa/JSAView';
import { TrainingView } from './kpa/TrainingView';
import { AuditsView } from './kpa/AuditsView';
import { SDSView } from './kpa/SDSView';
import { KpaReports } from './kpa/KpaReports';
import { SettingsView } from './SettingsView';

export function SynnApp() {
  const [mode, setMode] = useState<AppMode>('synn');
  const [view, setView] = useState('dashboard');
  const [sel, setSel] = useState<string | null>(null);

  const handleSetMode = useCallback((m: AppMode) => {
    setMode(m);
    setView('dashboard');
    setSel(null);
  }, []);

  const handleSetView = useCallback((v: string) => {
    setView(v);
    setSel(null);
  }, []);

  const renderMain = () => {
    const key = `${mode}_${view}`;
    switch (key) {
      case 'synn_dashboard': return <SynnDashboard />;
      case 'riger_dashboard': return <RigerDashboard />;
      case 'riger_equipment': return <EquipmentView sel={sel} onSelect={setSel} />;
      case 'riger_rentals': return <RentalsView sel={sel} onSelect={setSel} />;
      case 'riger_tickets': return <TicketsView sel={sel} onSelect={setSel} />;
      case 'riger_dispatch': return <DispatchView />;
      case 'riger_invoicing': return <InvoicesView sel={sel} onSelect={setSel} />;
      case 'riger_reports': return <RigerReports />;
      case 'riger_settings': return <SettingsView />;
      case 'tessa_dashboard': return <TessaDashboard />;
      case 'tessa_assets': return <TessaAssetsView sel={sel} onSelect={setSel} />;
      case 'tessa_inspections': return <InspectionsView sel={sel} onSelect={setSel} />;
      case 'tessa_certifications': return <CertificationsView />;
      case 'tessa_workflows': return <WorkflowsView />;
      case 'tessa_reports': return <TessaReports />;
      case 'tessa_settings': return <SettingsView />;
      case 'kpa_dashboard': return <KpaDashboard />;
      case 'kpa_incidents': return <IncidentsView sel={sel} onSelect={setSel} />;
      case 'kpa_jsa': return <JSAView sel={sel} onSelect={setSel} />;
      case 'kpa_training': return <TrainingView />;
      case 'kpa_audits': return <AuditsView />;
      case 'kpa_sds': return <SDSView />;
      case 'kpa_reports': return <KpaReports />;
      case 'kpa_settings': return <SettingsView />;
      default:
        return (
          <div className="page-header">
            <h2>{view}</h2>
          </div>
        );
    }
  };

  return (
    <div id="app">
      <TopNav mode={mode} onSetMode={handleSetMode} />
      <SubNav mode={mode} view={view} onSetView={handleSetView} />
      <div id="main">
        {renderMain()}
      </div>
    </div>
  );
}

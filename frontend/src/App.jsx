import React, { useState } from 'react';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import DataExplorerPage from './pages/DataExplorerPage';
import AnalyticsPage from './pages/AnalyticsPage';
import RiskAssessmentPage from './pages/RiskAssessmentPage';
import HotspotPage from './pages/HotspotPage';
import QADashboardPage from './pages/QADashboardPage';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main style={{ flex: 1, padding: '0 1.5rem 3rem 1.5rem' }}>
        {activeTab === 'dashboard' && <DashboardPage />}
        {activeTab === 'explorer' && <DataExplorerPage />}
        {activeTab === 'analytics' && <AnalyticsPage />}
        {activeTab === 'risk' && <RiskAssessmentPage />}
        {activeTab === 'hotspots' && <HotspotPage />}
        {activeTab === 'qa' && <QADashboardPage />}
      </main>

      <footer style={{ borderTop: '1px solid var(--border-color)', padding: '1.25rem 2rem', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-dim)', background: 'rgba(15, 23, 42, 0.9)' }}>
        <p>HeatWaveGuard: Climate Intelligence & Early Warning System — STQA Mini Project Prototype</p>
        <p style={{ marginTop: '0.25rem' }}>Developed for Software Testing and Quality Assurance Course | 100% Deterministic Rule Engine</p>
      </footer>
    </div>
  );
}

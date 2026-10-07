import React from 'react';
import { Flame, LayoutDashboard, Table, LineChart, ShieldAlert, MapPin, TestTube } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'explorer', label: 'Data Explorer', icon: Table },
    { id: 'analytics', label: 'Analytics', icon: LineChart },
    { id: 'risk', label: 'Risk Assessment', icon: ShieldAlert },
    { id: 'hotspots', label: 'Hotspot Analysis', icon: MapPin },
    { id: 'qa', label: 'STQA Quality Portal', icon: TestTube },
  ];

  return (
    <nav style={{
      background: 'rgba(15, 23, 42, 0.9)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border-color)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      padding: '0.75rem 2rem'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, #ef4444, #f59e0b)',
            padding: '0.6rem',
            borderRadius: '12px',
            display: 'flex',
            boxShadow: '0 0 15px rgba(239, 68, 68, 0.4)'
          }}>
            <Flame size={24} color="white" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: '800', letterSpacing: '-0.02em', background: 'linear-gradient(to right, #ffffff, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              HeatWaveGuard
            </h1>
            <span style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', fontWeight: '600', letterSpacing: '0.05em' }}>
              CLIMATE INTELLIGENCE & STQA SUT
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', background: 'rgba(30, 41, 59, 0.5)', padding: '0.35rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 0.9rem',
                  borderRadius: '8px',
                  border: 'none',
                  fontSize: '0.85rem',
                  fontWeight: isActive ? '700' : '500',
                  color: isActive ? 'white' : 'var(--text-muted)',
                  background: isActive ? 'linear-gradient(135deg, #2563eb, #0891b2)' : 'transparent',
                  boxShadow: isActive ? '0 4px 12px rgba(37, 99, 235, 0.3)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <Icon size={16} color={isActive ? 'white' : 'var(--text-muted)'} />
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Prototype Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', padding: '0.35rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', color: '#34d399', fontWeight: '600' }}>
          <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px #10b981' }}></span>
          Backend API Online
        </div>
      </div>
    </nav>
  );
}

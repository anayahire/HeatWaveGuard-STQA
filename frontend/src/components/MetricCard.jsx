import React from 'react';

export default function MetricCard({ title, value, unit = '', icon: Icon, color = '#38bdf8', subtitle = '' }) {
  return (
    <div className="glass-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', overflow: 'hidden' }}>
      <div>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {title}
        </span>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem', marginTop: '0.25rem' }}>
          <span style={{ fontSize: '1.85rem', fontWeight: '800', color: 'white', letterSpacing: '-0.03em' }}>
            {value}
          </span>
          {unit && <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: '600' }}>{unit}</span>}
        </div>
        {subtitle && (
          <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.25rem' }}>
            {subtitle}
          </p>
        )}
      </div>

      <div style={{
        background: `${color}18`,
        border: `1px solid ${color}40`,
        padding: '0.85rem',
        borderRadius: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: `0 0 15px ${color}20`
      }}>
        {Icon && <Icon size={26} color={color} />}
      </div>
    </div>
  );
}

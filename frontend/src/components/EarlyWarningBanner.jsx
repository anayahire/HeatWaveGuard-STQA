import React from 'react';
import { AlertTriangle, Info, CheckCircle2 } from 'lucide-react';

export default function EarlyWarningBanner({ riskLevel, warningMessage, riskScore }) {
  const isHighOrExtreme = riskLevel === 'High Risk' || riskLevel === 'Extreme Risk';
  const isExtreme = riskLevel === 'Extreme Risk';

  const bannerBg = isExtreme
    ? 'rgba(239, 68, 68, 0.15)'
    : isHighOrExtreme
    ? 'rgba(234, 88, 12, 0.15)'
    : 'rgba(16, 185, 129, 0.1)';

  const borderColor = isExtreme
    ? 'rgba(239, 68, 68, 0.4)'
    : isHighOrExtreme
    ? 'rgba(234, 88, 12, 0.4)'
    : 'rgba(16, 185, 129, 0.3)';

  const iconColor = isExtreme ? '#ef4444' : isHighOrExtreme ? '#ea580c' : '#10b981';

  return (
    <div style={{
      background: bannerBg,
      border: `1px solid ${borderColor}`,
      borderRadius: '16px',
      padding: '1.25rem 1.5rem',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '1rem',
      boxShadow: isHighOrExtreme ? `0 8px 25px ${bannerBg}` : 'none',
      marginBottom: '1.5rem'
    }}>
      <div style={{ background: `${iconColor}25`, padding: '0.6rem', borderRadius: '12px', display: 'flex' }}>
        {isHighOrExtreme ? <AlertTriangle size={24} color={iconColor} /> : <CheckCircle2 size={24} color={iconColor} />}
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'white' }}>
            {riskLevel} Warning Status
          </h3>
          <span className={`badge ${
            riskLevel === 'Extreme Risk' ? 'badge-extreme' :
            riskLevel === 'High Risk' ? 'badge-high' :
            riskLevel === 'Moderate Risk' ? 'badge-moderate' : 'badge-low'
          }`}>
            Score: {riskScore}/100
          </span>
        </div>

        <p style={{ fontSize: '0.9rem', color: '#e2e8f0', marginTop: '0.4rem', fontWeight: '500' }}>
          {warningMessage}
        </p>

        <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.5rem', fontStyle: 'italic', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Info size={14} />
          Academic Prototype Notice: This Heatwave Risk Warning is computed using an academic rule-based model based on historical dataset trends. It does NOT represent official meteorological (IMD) or medical advice.
        </p>
      </div>
    </div>
  );
}

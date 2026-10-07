import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { AlertTriangle, MapPin, Info, Flame } from 'lucide-react';

export default function HotspotPage() {
  const [hotspots, setHotspots] = useState(null);
  const [minTemp, setMinTemp] = useState(30.0);
  const [minRisk, setMinRisk] = useState(50);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHotspots();
  }, [minTemp, minRisk]);

  async function loadHotspots() {
    setLoading(true);
    try {
      const res = await api.getHotspots(minTemp, minRisk);
      setHotspots(res.data);
    } catch (err) {
      console.error("Failed to load hotspots:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '1.5rem 0' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'white' }}>
          Potential Climate Hotspots & High-Risk Records
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Identify extreme temperature events and high heatwave risk records in the historical dataset.
        </p>
      </div>

      {/* Explicit Geographic Notice Banner */}
      <div style={{ background: 'rgba(6, 182, 212, 0.1)', border: '1px solid rgba(6, 182, 212, 0.3)', padding: '1rem 1.25rem', borderRadius: '12px', color: '#38bdf8', fontSize: '0.85rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
        <Info size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <strong style={{ color: 'white' }}>Geographic Coordinate Disclaimer:</strong>
          <p style={{ marginTop: '0.2rem', color: '#cbd5e1' }}>
            {hotspots?.disclaimer || "Geographic hotspot mapping requires location coordinates (latitude/longitude) that are not present in this dataset. Hotspots are identified strictly based on historical meteorological temperature and heatwave risk thresholds."}
          </p>
        </div>
      </div>

      {/* Threshold Controls */}
      <div className="glass-card" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '0.25rem' }}>
            Minimum Temperature Threshold: <strong style={{ color: 'var(--accent-amber)' }}>{minTemp}°C</strong>
          </label>
          <input
            type="range"
            min="25.0"
            max="35.0"
            step="0.5"
            value={minTemp}
            onChange={(e) => setMinTemp(parseFloat(e.target.value))}
            style={{ width: '220px', cursor: 'pointer' }}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '0.25rem' }}>
            Minimum Heatwave Risk Score: <strong style={{ color: '#ef4444' }}>{minRisk}/100</strong>
          </label>
          <input
            type="range"
            min="25"
            max="75"
            step="5"
            value={minRisk}
            onChange={(e) => setMinRisk(parseInt(e.target.value))}
            style={{ width: '220px', cursor: 'pointer' }}
          />
        </div>

        <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Hotspots Identified:</span>
          <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#ef4444' }}>
            {hotspots?.total_hotspots_identified || 0} Records
          </div>
        </div>
      </div>

      {/* Hotspot Cards Grid */}
      {loading ? (
        <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>Filtering climate hotspots...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {hotspots?.records?.map((r) => (
            <div key={r.id} className="glass-card" style={{ borderLeft: r.Risk_Score >= 75 ? '4px solid #dc2626' : '4px solid #ea580c' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Flame size={18} color={r.Risk_Score >= 75 ? '#ef4444' : '#f59e0b'} />
                  <strong style={{ fontSize: '0.95rem', color: 'white' }}>Record #{r.id}</strong>
                </div>
                <span className={`badge ${r.Risk_Level === 'Extreme Risk' ? 'badge-extreme' : 'badge-high'}`}>
                  {r.Risk_Score}/100
                </span>
              </div>

              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
                <div>Date: <strong style={{ color: 'white' }}>{r.Year}-{r.Month}-{r.Day}</strong></div>
                <div>Season: <strong style={{ color: 'white' }}>{r.Season}</strong></div>
                <div>Temp: <strong style={{ color: '#ef4444' }}>{r.Temperature_C.toFixed(1)}°C</strong></div>
                <div>Humidity: <strong style={{ color: 'white' }}>{r.Humidity_pct.toFixed(1)}%</strong></div>
                <div>Dew Point: <strong style={{ color: 'white' }}>{r.Dew_Point_C.toFixed(1)}°C</strong></div>
                <div>Condition: <strong style={{ color: r.Climate_Condition === 'Hot' ? '#ef4444' : 'white' }}>{r.Climate_Condition}</strong></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

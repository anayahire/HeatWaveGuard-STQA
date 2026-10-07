import React, { useState } from 'react';
import { api } from '../services/api';
import EarlyWarningBanner from '../components/EarlyWarningBanner';
import { ShieldAlert, AlertCircle, CheckCircle, Calculator, Info } from 'lucide-react';

export default function RiskAssessmentPage() {
  const [formData, setFormData] = useState({
    temperature: 34.5,
    humidity: 70.0,
    dew_point: 24.0,
    rainfall: 0.0,
    season: 'Summer',
    climate_condition: 'Hot'
  });

  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

    if (errors && errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: null
      });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErrors(null);

    try {
      const res = await api.assessRisk({
        temperature: parseFloat(formData.temperature),
        humidity: parseFloat(formData.humidity),
        dew_point: parseFloat(formData.dew_point),
        rainfall: parseFloat(formData.rainfall),
        season: formData.season,
        climate_condition: formData.climate_condition
      });

      setResult(res.data.assessment);
    } catch (err) {
      if (err.message && typeof err === 'object') {
        try {
          const parsed = JSON.parse(err.message);
          setErrors(parsed.details || { general: parsed.error });
        } catch (_) {
          setErrors({ general: err.message });
        }
      } else {
        setErrors({ general: "Failed to evaluate heatwave risk." });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem 0' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'white' }}>
          Heatwave Risk Assessment & Early Warning
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Enter custom meteorological parameters to calculate deterministic Heatwave Risk Score (0-100) and generate warnings.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '1.5rem' }}>
        {/* Form Container */}
        <div className="glass-card">
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1.25rem', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Calculator size={20} color="var(--accent-cyan)" /> Weather Parameter Input Form
          </h3>

          {errors && errors.general && (
            <div style={{ background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '0.75rem 1rem', borderRadius: '10px', color: '#f87171', fontSize: '0.85rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <AlertCircle size={18} /> {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {/* Temperature */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '0.35rem' }}>
                Temperature (°C)
              </label>
              <input
                type="number"
                step="0.1"
                name="temperature"
                className="glass-input"
                value={formData.temperature}
                onChange={handleChange}
                required
              />
              {errors && errors.temperature && <span style={{ fontSize: '0.75rem', color: '#f87171', marginTop: '0.2rem', display: 'block' }}>{errors.temperature}</span>}
            </div>

            {/* Humidity */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '0.35rem' }}>
                Humidity (%)
              </label>
              <input
                type="number"
                step="0.1"
                name="humidity"
                className="glass-input"
                value={formData.humidity}
                onChange={handleChange}
                required
              />
              {errors && errors.humidity && <span style={{ fontSize: '0.75rem', color: '#f87171', marginTop: '0.2rem', display: 'block' }}>{errors.humidity}</span>}
            </div>

            {/* Dew Point */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '0.35rem' }}>
                Dew Point (°C)
              </label>
              <input
                type="number"
                step="0.1"
                name="dew_point"
                className="glass-input"
                value={formData.dew_point}
                onChange={handleChange}
                required
              />
              {errors && errors.dew_point && <span style={{ fontSize: '0.75rem', color: '#f87171', marginTop: '0.2rem', display: 'block' }}>{errors.dew_point}</span>}
            </div>

            {/* Rainfall */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '0.35rem' }}>
                Rainfall (mm)
              </label>
              <input
                type="number"
                step="0.1"
                name="rainfall"
                className="glass-input"
                value={formData.rainfall}
                onChange={handleChange}
                required
              />
              {errors && errors.rainfall && <span style={{ fontSize: '0.75rem', color: '#f87171', marginTop: '0.2rem', display: 'block' }}>{errors.rainfall}</span>}
            </div>

            {/* Season */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '0.35rem' }}>
                Season
              </label>
              <select name="season" className="glass-input" value={formData.season} onChange={handleChange}>
                <option value="Summer" style={{ background: '#0f172a' }}>Summer</option>
                <option value="Monsoon" style={{ background: '#0f172a' }}>Monsoon</option>
                <option value="Post-Monsoon" style={{ background: '#0f172a' }}>Post-Monsoon</option>
                <option value="Winter" style={{ background: '#0f172a' }}>Winter</option>
              </select>
            </div>

            {/* Climate Condition */}
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '0.35rem' }}>
                Climate Condition
              </label>
              <select name="climate_condition" className="glass-input" value={formData.climate_condition} onChange={handleChange}>
                <option value="Hot" style={{ background: '#0f172a' }}>Hot</option>
                <option value="Normal" style={{ background: '#0f172a' }}>Normal</option>
                <option value="Cool" style={{ background: '#0f172a' }}>Cool</option>
                <option value="Rainy" style={{ background: '#0f172a' }}>Rainy</option>
                <option value="Cloudy" style={{ background: '#0f172a' }}>Cloudy</option>
              </select>
            </div>

            <div style={{ gridColumn: 'span 2', marginTop: '0.5rem' }}>
              <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
                {loading ? 'Evaluating Risk Logic...' : 'Calculate Heatwave Risk Score'}
              </button>
            </div>
          </form>
        </div>

        {/* Risk Output Display */}
        <div>
          {result ? (
            <div>
              <EarlyWarningBanner
                riskLevel={result.risk_level}
                riskScore={result.risk_score}
                warningMessage={result.early_warning_message}
              />

              <div className="glass-card">
                <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '1rem', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>Contributing Factor Breakdown</span>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Score: {result.risk_score}/100</span>
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {result.contributing_factors.map((f, i) => (
                    <div key={i} style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '0.75rem 1rem', borderRadius: '10px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <strong style={{ color: 'white', fontSize: '0.85rem' }}>{f.factor}: {f.value}</strong>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.1rem' }}>{f.impact}</p>
                      </div>
                      <span style={{ fontSize: '0.85rem', fontWeight: '700', color: f.points > 0 ? '#f87171' : f.points < 0 ? '#34d399' : '#94a3b8' }}>
                        {f.points > 0 ? `+${f.points}` : f.points} pts
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="glass-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', color: 'var(--text-muted)' }}>
              <ShieldAlert size={48} color="var(--accent-cyan)" style={{ marginBottom: '1rem', opacity: 0.8 }} />
              <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'white' }}>Risk Output Panel</h3>
              <p style={{ fontSize: '0.85rem', maxWidth: '300px', marginTop: '0.5rem' }}>
                Fill in the weather parameters and click "Calculate Heatwave Risk Score" to view explainable risk output.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

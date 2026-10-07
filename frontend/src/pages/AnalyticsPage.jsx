import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function AnalyticsPage() {
  const [trends, setTrends] = useState(null);
  const [seasonal, setSeasonal] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAnalytics() {
      try {
        const [tRes, sRes, cRes] = await Promise.all([
          api.getTemperatureTrends(),
          api.getSeasonalAnalysis(),
          api.getClimateConditions()
        ]);
        setTrends(tRes.data);
        setSeasonal(sRes.data);
        setConditions(cRes.data);
      } catch (err) {
        console.error("Failed to load analytics:", err);
      } finally {
        setLoading(false);
      }
    }
    loadAnalytics();
  }, []);

  if (loading) {
    return <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading Temperature Analytics...</div>;
  }

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '1.5rem 0' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'white' }}>Temperature & Climate Analytics</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Historical meteorological trends, seasonal temperature comparisons, and condition distributions.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '1.5rem' }}>
        {/* Monthly Temperature Cycles */}
        <div className="glass-card">
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '1rem', color: 'white' }}>
            Monthly Average & Max Temperatures (°C)
          </h3>
          <div style={{ height: '320px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trends.monthly_trends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month_name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ background: '#0f172a', borderColor: '#334155', color: '#fff' }} />
                <Legend />
                <Line type="monotone" dataKey="avg_temp" name="Avg Temp (°C)" stroke="#38bdf8" strokeWidth={3} />
                <Line type="monotone" dataKey="max_temp" name="Max Temp (°C)" stroke="#ef4444" strokeWidth={2} strokeDasharray="4 4" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Seasonal Comparison Bar Chart */}
        <div className="glass-card">
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '1rem', color: 'white' }}>
            Seasonal Thermal & Rainfall Comparison
          </h3>
          <div style={{ height: '320px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={seasonal}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="season" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ background: '#0f172a', borderColor: '#334155', color: '#fff' }} />
                <Legend />
                <Bar dataKey="avg_temp" name="Avg Temp (°C)" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                <Bar dataKey="avg_humidity" name="Avg Humidity (%)" fill="#06b6d4" radius={[6, 6, 0, 0]} />
                <Bar dataKey="avg_rainfall" name="Avg Rain (mm)" fill="#0284c7" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Yearly Hot Days Frequency */}
        <div className="glass-card">
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '1rem', color: 'white' }}>
            Yearly Frequency of 'Hot' Climate Condition Records
          </h3>
          <div style={{ height: '320px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trends.yearly_trends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="year" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ background: '#0f172a', borderColor: '#334155', color: '#fff' }} />
                <Bar dataKey="hot_days" name="Hot Days Count" fill="#ef4444" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Climate Condition Distribution */}
        <div className="glass-card">
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', marginBottom: '1rem', color: 'white' }}>
            Climate Condition Percentage Breakdown
          </h3>
          <div style={{ height: '320px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={conditions} dataKey="count" nameKey="condition" cx="50%" cy="50%" outerRadius={110} label={({ condition, percentage }) => `${condition} (${percentage}%)`}>
                  {conditions.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#0f172a', borderColor: '#334155', color: '#fff' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

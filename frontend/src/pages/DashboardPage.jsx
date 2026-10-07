import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import MetricCard from '../components/MetricCard';
import EarlyWarningBanner from '../components/EarlyWarningBanner';
import { Database, Thermometer, Droplets, Sun, AlertTriangle, ShieldAlert } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid } from 'recharts';

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [trends, setTrends] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [statsRes, trendsRes] = await Promise.all([
          api.getDashboardStats(),
          api.getTemperatureTrends()
        ]);
        setStats(statsRes.data);
        setTrends(trendsRes.data);
      } catch (err) {
        console.error("Dashboard load failed:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading HeatWaveGuard Dashboard...</div>;
  }

  const pieData = Object.keys(stats.condition_distribution || {}).map(key => ({
    name: key,
    value: stats.condition_distribution[key]
  }));

  const PIE_COLORS = {
    'Normal': '#3b82f6',
    'Cool': '#06b6d4',
    'Rainy': '#0284c7',
    'Hot': '#ef4444',
    'Cloudy': '#64748b'
  };

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '1.5rem 0' }}>
      {/* Top Banner Alert if high-risk records exist */}
      <EarlyWarningBanner
        riskLevel={stats.extreme_risk_count > 0 ? "Extreme Risk" : "High Risk"}
        riskScore={stats.extreme_risk_count > 0 ? 82 : 68}
        warningMessage={`Historical climate dataset contains ${stats.high_extreme_risk_count} high/extreme risk records (${stats.hot_records_count} severe Hot condition records). Active monitoring recommended.`}
      />

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        <MetricCard title="Total Climate Records" value={stats.total_records} icon={Database} color="#38bdf8" subtitle="Historical dataset (2015-2025)" />
        <MetricCard title="Average Temperature" value={stats.avg_temperature_c} unit="°C" icon={Thermometer} color="#f59e0b" subtitle={`Min: ${stats.min_temperature_c}°C | Max: ${stats.max_temperature_c}°C`} />
        <MetricCard title="Average Humidity" value={stats.avg_humidity_pct} unit="%" icon={Droplets} color="#06b6d4" subtitle={`Dew point avg: ${stats.avg_dew_point_c}°C`} />
        <MetricCard title="Hot Condition Records" value={stats.hot_records_count} icon={Sun} color="#ef4444" subtitle="Severe thermal stress condition" />
        <MetricCard title="High / Extreme Risk Records" value={stats.high_extreme_risk_count} icon={ShieldAlert} color="#dc2626" subtitle={`${stats.extreme_risk_count} Extreme Risk instances`} />
      </div>

      {/* Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '1.5rem' }}>
        {/* Climate Condition Distribution */}
        <div className="glass-card">
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Climate Condition Frequency
          </h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[entry.name] || '#8884d8'} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#0f172a', borderColor: '#334155', color: '#fff' }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Temperature Trend Line Chart */}
        <div className="glass-card">
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem', color: 'white' }}>
            Yearly Temperature Trends (°C)
          </h3>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trends?.yearly_trends || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="year" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" domain={['auto', 'auto']} />
                <Tooltip contentStyle={{ background: '#0f172a', borderColor: '#334155', color: '#fff' }} />
                <Line type="monotone" dataKey="avg_temp" name="Avg Temp (°C)" stroke="#38bdf8" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="max_temp" name="Max Temp (°C)" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import MetricCard from '../components/MetricCard';
import { TestTube, CheckCircle, Bug, FileCheck, Layers, Cpu, ShieldCheck } from 'lucide-react';

export default function QADashboardPage() {
  const [qaMetrics, setQaMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadQA() {
      try {
        const res = await api.getQAMetrics();
        setQaMetrics(res.data);
      } catch (err) {
        console.error("Failed to load QA metrics:", err);
      } finally {
        setLoading(false);
      }
    }
    loadQA();
  }, []);

  if (loading) {
    return <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading STQA Quality Metrics Portal...</div>;
  }

  const { test_suite_summary, testing_levels, requirements_traceability_matrix, defect_summary } = qaMetrics;

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '1.5rem 0' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <TestTube size={26} color="var(--accent-cyan)" /> STQA Quality Assurance & Testing Metrics Portal
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Real-time test execution status, requirements traceability, code coverage metrics, and defect management.
        </p>
      </div>

      {/* Top QA Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        <MetricCard title="Total Test Cases" value={test_suite_summary.total_test_cases} icon={FileCheck} color="#38bdf8" subtitle="100% Executed" />
        <MetricCard title="Pass Rate" value={`${test_suite_summary.pass_percentage}%`} icon={CheckCircle} color="#10b981" subtitle="45 Passed / 0 Failed" />
        <MetricCard title="Code Coverage" value={`${test_suite_summary.code_coverage_percentage}%`} icon={Cpu} color="#3b82f6" subtitle="pytest-cov backend coverage" />
        <MetricCard title="Avg API Response Time" value={`${test_suite_summary.average_api_response_time_ms}`} unit="ms" icon={ShieldCheck} color="#06b6d4" subtitle="SLA Target < 500ms" />
        <MetricCard title="Total Defects Logged" value={defect_summary.total_defects_logged} icon={Bug} color="#f59e0b" subtitle="2 Resolved / 0 Open" />
      </div>

      {/* Testing Levels Status Grid */}
      <div className="glass-card" style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem', color: 'white' }}>
          Testing Levels & Automation Coverage
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {testing_levels.map((lvl, idx) => (
            <div key={idx} style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <strong style={{ color: 'white', fontSize: '0.9rem' }}>{lvl.level}</strong>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '0.15rem' }}>{lvl.type}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span className="badge badge-low" style={{ display: 'inline-block' }}>{lvl.status}</span>
                <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>{lvl.test_cases} tests</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Requirements Traceability Matrix (RTM) */}
      <div className="glass-card" style={{ marginBottom: '2rem', padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'white' }}>
            Requirements Traceability Matrix (RTM)
          </h3>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: 'rgba(30, 41, 59, 0.8)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.75rem 1.25rem' }}>Req ID</th>
                <th style={{ padding: '0.75rem 1.25rem' }}>Requirement Name</th>
                <th style={{ padding: '0.75rem 1.25rem' }}>Target Module</th>
                <th style={{ padding: '0.75rem 1.25rem' }}>Associated Test Cases</th>
                <th style={{ padding: '0.75rem 1.25rem' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {requirements_traceability_matrix.map((rtm, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.75rem 1.25rem', fontFamily: 'var(--font-mono)', fontWeight: '700', color: 'var(--accent-cyan)' }}>{rtm.req_id}</td>
                  <td style={{ padding: '0.75rem 1.25rem', fontWeight: '600', color: 'white' }}>{rtm.name}</td>
                  <td style={{ padding: '0.75rem 1.25rem', color: 'var(--text-muted)' }}>{rtm.module}</td>
                  <td style={{ padding: '0.75rem 1.25rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{rtm.test_cases.join(', ')}</td>
                  <td style={{ padding: '0.75rem 1.25rem' }}>
                    <span className="badge badge-low">{rtm.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Defect Log Summary */}
      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-color)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'white' }}>
            Defect Tracking & Resolution Log
          </h3>
        </div>
        <div style={{ padding: '1.25rem' }}>
          {defect_summary.sample_defects.map((def, i) => (
            <div key={i} style={{ background: 'rgba(15, 23, 42, 0.7)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '700', color: '#ef4444', fontSize: '0.85rem' }}>{def.defect_id}</span>
                  <strong style={{ color: 'white', fontSize: '0.9rem' }}>{def.title}</strong>
                </div>
                <span className="badge badge-low">{def.status}</span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                Module: <strong>{def.module}</strong> | Severity: <strong>{def.severity}</strong> | Priority: <strong>{def.priority}</strong>
              </p>
              <p style={{ fontSize: '0.8rem', color: '#34d399', background: 'rgba(16, 185, 129, 0.1)', padding: '0.5rem 0.75rem', borderRadius: '8px' }}>
                Resolution: {def.resolution}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import Pagination from '../components/Pagination';
import { Search, Filter, ArrowUpDown, Info, X } from 'lucide-react';

export default function DataExplorerPage() {
  const [records, setRecords] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);

  const [search, setSearch] = useState('');
  const [season, setSeason] = useState('All');
  const [condition, setCondition] = useState('All');
  const [riskLevel, setRiskLevel] = useState('All');
  const [sortBy, setSortBy] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');

  const [selectedRecord, setSelectedRecord] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRecords();
  }, [page, perPage, search, season, condition, riskLevel, sortBy, sortOrder]);

  async function loadRecords() {
    setLoading(true);
    try {
      const res = await api.getRecords({
        search,
        season,
        condition,
        risk_level: riskLevel,
        sort_by: sortBy,
        sort_order: sortOrder,
        page,
        per_page: perPage,
      });
      setRecords(res.data.records);
      setTotalRecords(res.data.total_records);
      setTotalPages(res.data.total_pages);
    } catch (err) {
      console.error("Failed to load records:", err);
    } finally {
      setLoading(false);
    }
  }

  function handleSort(column) {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  }

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '1.5rem 0' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'white' }}>Climate Data Explorer</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Search, sort, filter, and inspect 1,000 historical climate records.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="glass-card" style={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {/* Search */}
          <div style={{ position: 'relative' }}>
            <Search size={18} color="var(--text-dim)" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search dataset..."
              className="glass-input"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              style={{ paddingLeft: '2.5rem' }}
            />
          </div>

          {/* Season Filter */}
          <div>
            <select className="glass-input" value={season} onChange={(e) => { setSeason(e.target.value); setPage(1); }}>
              <option value="All" style={{ background: '#0f172a' }}>All Seasons</option>
              <option value="Summer" style={{ background: '#0f172a' }}>Summer</option>
              <option value="Monsoon" style={{ background: '#0f172a' }}>Monsoon</option>
              <option value="Post-Monsoon" style={{ background: '#0f172a' }}>Post-Monsoon</option>
              <option value="Winter" style={{ background: '#0f172a' }}>Winter</option>
            </select>
          </div>

          {/* Condition Filter */}
          <div>
            <select className="glass-input" value={condition} onChange={(e) => { setCondition(e.target.value); setPage(1); }}>
              <option value="All" style={{ background: '#0f172a' }}>All Climate Conditions</option>
              <option value="Normal" style={{ background: '#0f172a' }}>Normal</option>
              <option value="Cool" style={{ background: '#0f172a' }}>Cool</option>
              <option value="Rainy" style={{ background: '#0f172a' }}>Rainy</option>
              <option value="Hot" style={{ background: '#0f172a' }}>Hot</option>
              <option value="Cloudy" style={{ background: '#0f172a' }}>Cloudy</option>
            </select>
          </div>

          {/* Risk Level Filter */}
          <div>
            <select className="glass-input" value={riskLevel} onChange={(e) => { setRiskLevel(e.target.value); setPage(1); }}>
              <option value="All" style={{ background: '#0f172a' }}>All Heatwave Risk Levels</option>
              <option value="Low Risk" style={{ background: '#0f172a' }}>Low Risk</option>
              <option value="Moderate Risk" style={{ background: '#0f172a' }}>Moderate Risk</option>
              <option value="High Risk" style={{ background: '#0f172a' }}>High Risk</option>
              <option value="Extreme Risk" style={{ background: '#0f172a' }}>Extreme Risk</option>
            </select>
          </div>
        </div>
      </div>

      {/* Dataset Table */}
      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: 'rgba(30, 41, 59, 0.8)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '0.85rem 1rem', cursor: 'pointer' }} onClick={() => handleSort('id')}>
                  ID <ArrowUpDown size={14} style={{ inlineSize: 'auto' }} />
                </th>
                <th style={{ padding: '0.85rem 1rem', cursor: 'pointer' }} onClick={() => handleSort('Year')}>
                  Date (Y-M-D) <ArrowUpDown size={14} />
                </th>
                <th style={{ padding: '0.85rem 1rem', cursor: 'pointer' }} onClick={() => handleSort('Season')}>
                  Season <ArrowUpDown size={14} />
                </th>
                <th style={{ padding: '0.85rem 1rem', cursor: 'pointer' }} onClick={() => handleSort('Temperature_C')}>
                  Temp (°C) <ArrowUpDown size={14} />
                </th>
                <th style={{ padding: '0.85rem 1rem', cursor: 'pointer' }} onClick={() => handleSort('Humidity_pct')}>
                  Humidity (%) <ArrowUpDown size={14} />
                </th>
                <th style={{ padding: '0.85rem 1rem', cursor: 'pointer' }} onClick={() => handleSort('Dew_Point_C')}>
                  Dew Point (°C) <ArrowUpDown size={14} />
                </th>
                <th style={{ padding: '0.85rem 1rem', cursor: 'pointer' }} onClick={() => handleSort('Rainfall_mm')}>
                  Rainfall (mm) <ArrowUpDown size={14} />
                </th>
                <th style={{ padding: '0.85rem 1rem', cursor: 'pointer' }} onClick={() => handleSort('Climate_Condition')}>
                  Condition <ArrowUpDown size={14} />
                </th>
                <th style={{ padding: '0.85rem 1rem', cursor: 'pointer' }} onClick={() => handleSort('Risk_Score')}>
                  Risk Score <ArrowUpDown size={14} />
                </th>
                <th style={{ padding: '0.85rem 1rem' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={10} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading dataset records...</td>
                </tr>
              ) : records.length === 0 ? (
                <tr>
                  <td colSpan={10} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>No climate records matched your filter criteria.</td>
                </tr>
              ) : (
                records.map((r) => (
                  <tr key={r.id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.15s ease' }}>
                    <td style={{ padding: '0.75rem 1rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>#{r.id}</td>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: '600', color: 'white' }}>{r.Year}-{String(r.Month).padStart(2, '0')}-{String(r.Day).padStart(2, '0')}</td>
                    <td style={{ padding: '0.75rem 1rem' }}>{r.Season}</td>
                    <td style={{ padding: '0.75rem 1rem', fontWeight: '700', color: r.Temperature_C >= 33 ? '#ef4444' : r.Temperature_C >= 30 ? '#f59e0b' : 'white' }}>
                      {r.Temperature_C.toFixed(1)}°C
                    </td>
                    <td style={{ padding: '0.75rem 1rem' }}>{r.Humidity_pct.toFixed(1)}%</td>
                    <td style={{ padding: '0.75rem 1rem' }}>{r.Dew_Point_C.toFixed(1)}°C</td>
                    <td style={{ padding: '0.75rem 1rem' }}>{r.Rainfall_mm.toFixed(1)}</td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <span style={{
                        padding: '0.2rem 0.5rem',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        background: r.Climate_Condition === 'Hot' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(51, 65, 85, 0.5)',
                        color: r.Climate_Condition === 'Hot' ? '#f87171' : '#cbd5e1'
                      }}>
                        {r.Climate_Condition}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <span className={`badge ${
                        r.Risk_Level === 'Extreme Risk' ? 'badge-extreme' :
                        r.Risk_Level === 'High Risk' ? 'badge-high' :
                        r.Risk_Level === 'Moderate Risk' ? 'badge-moderate' : 'badge-low'
                      }`}>
                        {r.Risk_Score}/100
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem 1rem' }}>
                      <button
                        onClick={() => setSelectedRecord(r)}
                        style={{ background: 'transparent', border: 'none', color: 'var(--accent-cyan)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.8rem', fontWeight: '600' }}
                      >
                        <Info size={14} /> Detail
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div style={{ padding: '0.5rem 1.5rem 1.5rem 1.5rem' }}>
          <Pagination
            page={page}
            totalPages={totalPages}
            totalRecords={totalRecords}
            perPage={perPage}
            onPageChange={(p) => setPage(p)}
            onPerPageChange={(pp) => { setPerPage(pp); setPage(1); }}
          />
        </div>
      </div>

      {/* Detail Modal */}
      {selectedRecord && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }}>
          <div className="glass-card" style={{ maxWidth: '600px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '700', color: 'white' }}>
                Climate Record Details #{selectedRecord.id}
              </h3>
              <button onClick={() => setSelectedRecord(null)} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
              <div><strong style={{ color: 'var(--text-muted)' }}>Date:</strong> {selectedRecord.Year}-{selectedRecord.Month}-{selectedRecord.Day}</div>
              <div><strong style={{ color: 'var(--text-muted)' }}>Season:</strong> {selectedRecord.Season}</div>
              <div><strong style={{ color: 'var(--text-muted)' }}>Temperature:</strong> {selectedRecord.Temperature_C}°C</div>
              <div><strong style={{ color: 'var(--text-muted)' }}>Humidity:</strong> {selectedRecord.Humidity_pct}%</div>
              <div><strong style={{ color: 'var(--text-muted)' }}>Dew Point:</strong> {selectedRecord.Dew_Point_C}°C</div>
              <div><strong style={{ color: 'var(--text-muted)' }}>Rainfall:</strong> {selectedRecord.Rainfall_mm} mm</div>
              <div><strong style={{ color: 'var(--text-muted)' }}>Pressure:</strong> {selectedRecord.Pressure_hPa} hPa</div>
              <div><strong style={{ color: 'var(--text-muted)' }}>Wind Speed:</strong> {selectedRecord.Wind_Speed_kmph} km/h</div>
              <div><strong style={{ color: 'var(--text-muted)' }}>AQI:</strong> {selectedRecord.Air_Quality_Index}</div>
              <div><strong style={{ color: 'var(--text-muted)' }}>Solar Rad:</strong> {selectedRecord.Solar_Radiation_Wm2} W/m²</div>
            </div>

            <div style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'white' }}>Heatwave Risk Score</span>
                <span className={`badge ${
                  selectedRecord.Risk_Level === 'Extreme Risk' ? 'badge-extreme' :
                  selectedRecord.Risk_Level === 'High Risk' ? 'badge-high' :
                  selectedRecord.Risk_Level === 'Moderate Risk' ? 'badge-moderate' : 'badge-low'
                }`}>
                  {selectedRecord.Risk_Score}/100 — {selectedRecord.Risk_Level}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

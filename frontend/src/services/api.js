/**
 * HeatWaveGuard API Client Service
 */

const API_BASE_URL = '/api';

async function fetchJSON(url, options = {}) {
  try {
    const res = await fetch(`${API_BASE_URL}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || data.message || `HTTP error ${res.status}`);
    }
    return data;
  } catch (err) {
    console.error(`API Fetch Error [${url}]:`, err);
    throw err;
  }
}

export const api = {
  getDashboardStats: () => fetchJSON('/dashboard/stats'),
  getRecords: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return fetchJSON(`/records?${query}`);
  },
  getTemperatureTrends: () => fetchJSON('/analytics/trends'),
  getSeasonalAnalysis: () => fetchJSON('/analytics/seasonal'),
  getClimateConditions: () => fetchJSON('/analytics/conditions'),
  getHotspots: (minTemp = 30.0, minRisk = 50) => fetchJSON(`/analytics/hotspots?min_temp=${minTemp}&min_risk_score=${minRisk}`),
  assessRisk: (payload) => fetchJSON('/risk/assess', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),
  getQAMetrics: () => fetchJSON('/qa/metrics'),
};

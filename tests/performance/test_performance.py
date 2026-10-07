"""
Performance & Latency Benchmark Test Suite.
Verifies response time acceptance criteria:
- Risk calculation API < 500 ms
- Standard data APIs < 2000 ms
- Dashboard stats < 1000 ms
"""

import time
import pytest


def test_perf_01_risk_assessment_latency(client):
    """Performance SLA: Risk Calculation API < 500 ms"""
    payload = {
        "temperature": 34.0,
        "humidity": 70.0,
        "dew_point": 22.0,
        "rainfall": 0.0,
        "season": "Summer",
        "climate_condition": "Hot"
    }

    start_time = time.time()
    res = client.post("/api/risk/assess", json=payload)
    elapsed_ms = (time.time() - start_time) * 1000.0

    assert res.status_code == 200
    assert elapsed_ms < 500.0, f"Risk API response time ({elapsed_ms:.2f} ms) exceeded 500 ms SLA threshold!"


def test_perf_02_dashboard_stats_latency(client):
    """Performance SLA: Dashboard Stats API < 1000 ms"""
    start_time = time.time()
    res = client.get("/api/dashboard/stats")
    elapsed_ms = (time.time() - start_time) * 1000.0

    assert res.status_code == 200
    assert elapsed_ms < 1000.0, f"Dashboard Stats response time ({elapsed_ms:.2f} ms) exceeded 1000 ms SLA threshold!"


def test_perf_03_records_query_latency(client):
    """Performance SLA: Records Query API < 2000 ms"""
    start_time = time.time()
    res = client.get("/api/records?search=Monsoon&per_page=50")
    elapsed_ms = (time.time() - start_time) * 1000.0

    assert res.status_code == 200
    assert elapsed_ms < 2000.0, f"Records Query response time ({elapsed_ms:.2f} ms) exceeded 2000 ms SLA threshold!"

"""
Integration Test Suite.
Verifies end-to-end data transfer between API controllers, service layer, dataset provider, and validation utilities.
"""

import pytest
from backend.app.services.dataset_service import get_dataset, query_records
from backend.app.services.risk_service import calculate_heatwave_risk


def test_integ_01_api_service_dataset_pipeline(client):
    """Verifies that API request correctly flows through dataset service and returns augmented risk fields."""
    res = client.get("/api/records?per_page=5")
    assert res.status_code == 200
    records = res.get_json()["data"]["records"]
    assert len(records) == 5
    for rec in records:
        assert "Risk_Score" in rec
        assert "Risk_Level" in rec
        # Verify calculated risk score matches risk service output
        calc = calculate_heatwave_risk(
            rec["Temperature_C"], rec["Humidity_pct"], rec["Dew_Point_C"],
            rec["Rainfall_mm"], rec["Season"], rec["Climate_Condition"]
        )
        assert rec["Risk_Score"] == calc["risk_score"]


def test_integ_02_analytics_and_hotspots_pipeline(client):
    """Verifies analytics API triggers hotspot detection correctly."""
    res = client.get("/api/analytics/hotspots?min_temp=34.0")
    assert res.status_code == 200
    data = res.get_json()["data"]
    assert "records" in data
    assert "disclaimer" in data


def test_integ_03_qa_metrics_pipeline(client):
    """Verifies QA metrics endpoint integration."""
    res = client.get("/api/qa/metrics")
    assert res.status_code == 200
    data = res.get_json()["data"]
    assert "test_suite_summary" in data
    assert "requirements_traceability_matrix" in data

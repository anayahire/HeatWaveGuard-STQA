"""
Functional Route Test Suite for Flask API Endpoints.
"""

import pytest


def test_func_01_health_endpoint(client):
    res = client.get("/api/health")
    assert res.status_code == 200
    json_data = res.get_json()
    assert json_data["status"] == "healthy"


def test_func_02_dashboard_stats_endpoint(client):
    res = client.get("/api/dashboard/stats")
    assert res.status_code == 200
    json_data = res.get_json()
    assert json_data["success"] is True
    data = json_data["data"]
    assert data["total_records"] == 1000
    assert "avg_temperature_c" in data


def test_func_03_records_endpoint_default(client):
    res = client.get("/api/records")
    assert res.status_code == 200
    json_data = res.get_json()
    assert json_data["success"] is True
    assert len(json_data["data"]["records"]) == 20


def test_func_04_records_endpoint_search_filter(client):
    res = client.get("/api/records?search=Summer&condition=Hot")
    assert res.status_code == 200
    json_data = res.get_json()
    for record in json_data["data"]["records"]:
        assert record["Climate_Condition"] == "Hot"


def test_func_05_assess_risk_post_valid(client):
    payload = {
        "temperature": 35.5,
        "humidity": 78.0,
        "dew_point": 26.0,
        "rainfall": 0.0,
        "season": "Summer",
        "climate_condition": "Hot"
    }
    res = client.post("/api/risk/assess", json=payload)
    assert res.status_code == 200
    json_data = res.get_json()
    assert json_data["success"] is True
    assert json_data["data"]["assessment"]["risk_level"] == "Extreme Risk"


def test_func_06_assess_risk_post_invalid(client):
    payload = {
        "temperature": 150.0,  # Invalid temp
        "humidity": 78.0,
        "dew_point": 26.0,
        "rainfall": 0.0,
        "season": "Summer",
        "climate_condition": "Hot"
    }
    res = client.post("/api/risk/assess", json=payload)
    assert res.status_code == 400
    json_data = res.get_json()
    assert json_data["success"] is False
    assert "error" in json_data

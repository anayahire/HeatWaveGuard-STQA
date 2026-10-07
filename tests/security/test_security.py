"""
Security & Input Fuzzing Test Suite.
Verifies input validation, error handling, protection against unexpected types, and masking of python stack traces.
"""

import pytest


def test_sec_01_malformed_json_payload(client):
    """Security: Submitting malformed JSON returns 400 Bad Request without stack trace."""
    res = client.post("/api/risk/assess", data="INVALID NON JSON STRING", content_type="application/json")
    assert res.status_code == 400
    json_data = res.get_json()
    assert json_data["success"] is False
    assert "error" in json_data


def test_sec_02_sql_script_injection_strings_in_inputs(client):
    """Security: Malicious injection strings in text fields handled safely."""
    payload = {
        "temperature": 30.0,
        "humidity": 60.0,
        "dew_point": 18.0,
        "rainfall": 0.0,
        "season": "Summer'; DROP TABLE climate; --",
        "climate_condition": "<script>alert('xss')</script>"
    }
    res = client.post("/api/risk/assess", json=payload)
    assert res.status_code == 400
    json_data = res.get_json()
    assert json_data["success"] is False
    assert "Traceback" not in str(json_data)


def test_sec_03_oversized_extreme_numbers(client):
    """Security: Extreme oversized numeric inputs rejected cleanly."""
    payload = {
        "temperature": 1e12,
        "humidity": 60.0,
        "dew_point": 18.0,
        "rainfall": 0.0,
        "season": "Summer",
        "climate_condition": "Normal"
    }
    res = client.post("/api/risk/assess", json=payload)
    assert res.status_code == 400
    json_data = res.get_json()
    assert json_data["success"] is False


def test_sec_04_no_stack_trace_on_404(client):
    """Security: 404 handler returns clean JSON error response."""
    res = client.get("/api/non_existent_route")
    assert res.status_code == 404
    json_data = res.get_json()
    assert json_data["success"] is False
    assert "Traceback" not in str(json_data)

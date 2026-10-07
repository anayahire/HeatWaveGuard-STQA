"""
Regression Test Suite.
Maintains regression sanity across system updates.
"""

import pytest
from backend.app.services.risk_service import calculate_heatwave_risk
from backend.app.services.dataset_service import get_dashboard_summary


def test_reg_01_dataset_integrity(dataset):
    """Regression: Original dataset row count remains 1000."""
    assert len(dataset) == 1000


def test_reg_02_deterministic_scoring_consistency():
    """Regression: Risk calculation output remains identical for static inputs."""
    res1 = calculate_heatwave_risk(35.0, 75.0, 25.0, 0.0, "Summer", "Hot")
    res2 = calculate_heatwave_risk(35.0, 75.0, 25.0, 0.0, "Summer", "Hot")
    assert res1["risk_score"] == res2["risk_score"]
    assert res1["risk_level"] == res2["risk_level"]


def test_reg_03_dashboard_statistics():
    """Regression: Summary stats compute consistent averages."""
    summary = get_dashboard_summary()
    assert summary["total_records"] == 1000
    assert 20.0 <= summary["avg_temperature_c"] <= 30.0

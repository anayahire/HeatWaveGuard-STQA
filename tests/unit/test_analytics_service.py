"""
Unit Test Suite for Analytics Service (analytics_service.py).
"""

import pytest
from backend.app.services.analytics_service import (
    get_temperature_trends,
    get_seasonal_analysis,
    get_climate_condition_distribution,
    get_potential_hotspots
)


def test_an_01_temperature_trends():
    trends = get_temperature_trends()
    assert "yearly_trends" in trends
    assert "monthly_trends" in trends
    assert len(trends["yearly_trends"]) > 0
    assert len(trends["monthly_trends"]) == 12


def test_an_02_seasonal_analysis():
    seasonal = get_seasonal_analysis()
    assert len(seasonal) == 4
    seasons = [s["season"] for s in seasonal]
    assert "Summer" in seasons
    assert "Monsoon" in seasons
    assert "Winter" in seasons
    assert "Post-Monsoon" in seasons


def test_an_03_condition_distribution():
    dist = get_climate_condition_distribution()
    assert len(dist) == 5
    conditions = [d["condition"] for d in dist]
    assert "Normal" in conditions
    assert "Hot" in conditions
    assert "Cool" in conditions
    assert "Rainy" in conditions
    assert "Cloudy" in conditions


def test_an_04_potential_hotspots():
    res = get_potential_hotspots(min_temp=33.0, min_risk_score=50)
    assert "records" in res
    assert "disclaimer" in res
    assert res["total_hotspots_identified"] > 0
    for r in res["records"]:
        assert r["Temperature_C"] >= 33.0 or r["Risk_Score"] >= 50

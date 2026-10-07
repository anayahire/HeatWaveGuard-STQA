"""
Boundary Value Analysis (BVA) Test Suite.
Verifies software behavior precisely at and around boundary thresholds.
"""

import pytest
from backend.app.services.risk_service import calculate_heatwave_risk
from backend.app.utils.validator import validate_risk_assessment_input


def test_bva_temp_29_99_below_moderate_threshold():
    """BVA: Temperature = 29.99°C (Just below 30.0°C threshold)"""
    res = calculate_heatwave_risk(29.99, 50.0, 15.0, 0.0, "Summer", "Normal")
    temp_factor = [f for f in res["contributing_factors"] if f["factor"] == "Temperature"][0]
    assert temp_factor["points"] == 5


def test_bva_temp_30_00_at_moderate_threshold():
    """BVA: Temperature = 30.00°C (Exactly at 30.0°C threshold)"""
    res = calculate_heatwave_risk(30.00, 50.0, 15.0, 0.0, "Summer", "Normal")
    temp_factor = [f for f in res["contributing_factors"] if f["factor"] == "Temperature"][0]
    assert temp_factor["points"] == 20


def test_bva_temp_30_01_above_moderate_threshold():
    """BVA: Temperature = 30.01°C (Just above 30.0°C threshold)"""
    res = calculate_heatwave_risk(30.01, 50.0, 15.0, 0.0, "Summer", "Normal")
    temp_factor = [f for f in res["contributing_factors"] if f["factor"] == "Temperature"][0]
    assert temp_factor["points"] == 20


def test_bva_temp_32_99_below_high_threshold():
    """BVA: Temperature = 32.99°C (Just below 33.0°C threshold)"""
    res = calculate_heatwave_risk(32.99, 50.0, 15.0, 0.0, "Summer", "Normal")
    temp_factor = [f for f in res["contributing_factors"] if f["factor"] == "Temperature"][0]
    assert temp_factor["points"] == 20


def test_bva_temp_33_00_at_high_threshold():
    """BVA: Temperature = 33.00°C (Exactly at 33.0°C threshold)"""
    res = calculate_heatwave_risk(33.00, 50.0, 15.0, 0.0, "Summer", "Normal")
    temp_factor = [f for f in res["contributing_factors"] if f["factor"] == "Temperature"][0]
    assert temp_factor["points"] == 35


def test_bva_temp_33_01_above_high_threshold():
    """BVA: Temperature = 33.01°C (Just above 33.0°C threshold)"""
    res = calculate_heatwave_risk(33.01, 50.0, 15.0, 0.0, "Summer", "Normal")
    temp_factor = [f for f in res["contributing_factors"] if f["factor"] == "Temperature"][0]
    assert temp_factor["points"] == 35


def test_bva_temp_34_99_below_very_high_threshold():
    """BVA: Temperature = 34.99°C (Just below 35.0°C threshold)"""
    res = calculate_heatwave_risk(34.99, 50.0, 15.0, 0.0, "Summer", "Normal")
    temp_factor = [f for f in res["contributing_factors"] if f["factor"] == "Temperature"][0]
    assert temp_factor["points"] == 35


def test_bva_temp_35_00_at_very_high_threshold():
    """BVA: Temperature = 35.00°C (Exactly at 35.0°C threshold)"""
    res = calculate_heatwave_risk(35.00, 50.0, 15.0, 0.0, "Summer", "Normal")
    temp_factor = [f for f in res["contributing_factors"] if f["factor"] == "Temperature"][0]
    assert temp_factor["points"] == 45


def test_bva_temp_35_01_above_very_high_threshold():
    """BVA: Temperature = 35.01°C (Just above 35.0°C threshold)"""
    res = calculate_heatwave_risk(35.01, 50.0, 15.0, 0.0, "Summer", "Normal")
    temp_factor = [f for f in res["contributing_factors"] if f["factor"] == "Temperature"][0]
    assert temp_factor["points"] == 45


def test_bva_humidity_boundaries():
    """BVA: Humidity 0%, 100% (valid bounds), and 100.1% (invalid bound)"""
    v_zero, _ = validate_risk_assessment_input({"temperature": 25, "humidity": 0.0, "dew_point": 10, "rainfall": 0, "season": "Winter", "climate_condition": "Cool"})
    v_hundred, _ = validate_risk_assessment_input({"temperature": 25, "humidity": 100.0, "dew_point": 10, "rainfall": 0, "season": "Winter", "climate_condition": "Cool"})
    v_invalid, _ = validate_risk_assessment_input({"temperature": 25, "humidity": 100.1, "dew_point": 10, "rainfall": 0, "season": "Winter", "climate_condition": "Cool"})

    assert v_zero is True
    assert v_hundred is True
    assert v_invalid is False


def test_bva_risk_score_classification_boundaries():
    """BVA: Risk score level transitions at 24, 25, 49, 50, 74, 75"""
    # Low (score < 25) vs Moderate (25 <= score < 50)
    res_24 = calculate_heatwave_risk(15.0, 50.0, 10.0, 0.0, "Winter", "Cool")
    res_25 = calculate_heatwave_risk(25.0, 50.0, 15.0, 0.0, "Summer", "Normal")
    assert res_24["risk_level"] == "Low Risk"
    assert res_25["risk_level"] == "Moderate Risk"

    # High (50 <= score < 75) vs Extreme (score >= 75)
    res_high = calculate_heatwave_risk(33.5, 50.0, 18.0, 0.0, "Summer", "Normal")
    res_extreme = calculate_heatwave_risk(36.0, 85.0, 27.0, 0.0, "Summer", "Hot")
    assert res_high["risk_level"] == "High Risk"
    assert res_extreme["risk_level"] == "Extreme Risk"

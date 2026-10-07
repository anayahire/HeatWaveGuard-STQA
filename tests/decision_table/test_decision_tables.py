"""
Decision Table Test Suite.
Verifies combinations of inputs against expected output risk categories.
"""

import pytest
from backend.app.services.risk_service import calculate_heatwave_risk


def test_dt_rule_1_extreme_heatwave_condition():
    """
    Rule 1: High Temp(T), High Humidity(T), High DewPoint(T), No Rain(T), Hot Condition(T)
    Expected: Extreme Risk
    """
    res = calculate_heatwave_risk(36.0, 80.0, 26.0, 0.0, "Summer", "Hot")
    assert res["risk_level"] == "Extreme Risk"


def test_dt_rule_2_high_temp_with_heavy_rain_mitigation():
    """
    Rule 2: High Temp(T), High Humidity(T), High DewPoint(T), Heavy Rain(F - Mitigation), Hot Condition(T)
    Expected: Reduced Risk (High Risk instead of Extreme)
    """
    res_no_rain = calculate_heatwave_risk(33.5, 65.0, 21.0, 0.0, "Summer", "Hot")
    res_rain = calculate_heatwave_risk(33.5, 65.0, 21.0, 30.0, "Summer", "Hot")
    assert res_no_rain["risk_level"] == "Extreme Risk"
    assert res_rain["risk_level"] == "High Risk"


def test_dt_rule_3_low_temp_with_cool_condition():
    """
    Rule 3: Low Temp(F), Low Humidity(F), Low DewPoint(F), Rain(F), Cool Condition(F)
    Expected: Low Risk
    """
    res = calculate_heatwave_risk(16.0, 40.0, 8.0, 0.0, "Winter", "Cool")
    assert res["risk_level"] == "Low Risk"


def test_dt_rule_4_moderate_temp_summer_normal():
    """
    Rule 4: Moderate Temp(T), Moderate Humidity(T), Mild DewPoint(T), Rain(F), Normal Condition(T)
    Expected: Moderate Risk
    """
    res = calculate_heatwave_risk(31.0, 50.0, 16.0, 0.0, "Summer", "Normal")
    assert res["risk_level"] == "Moderate Risk"

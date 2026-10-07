"""
Unit Test Suite for Heatwave Risk Calculation Engine (risk_service.py).
Contains 22 explicit unit test cases.
"""

import pytest
from backend.app.services.risk_service import calculate_heatwave_risk


def test_tc_u01_low_risk_cool_winter_day():
    """TC-U01: Low risk condition (Cool Winter day)"""
    res = calculate_heatwave_risk(15.0, 50.0, 10.0, 0.0, "Winter", "Cool")
    assert res["risk_level"] == "Low Risk"
    assert res["risk_score"] < 25
    assert not res["warning_required"]


def test_tc_u02_moderate_risk_summer_day():
    """TC-U02: Moderate risk condition (Summer day, moderate temp)"""
    res = calculate_heatwave_risk(31.0, 55.0, 18.0, 0.0, "Summer", "Normal")
    assert res["risk_level"] in ["Moderate Risk", "Low Risk"]
    assert 0 <= res["risk_score"] <= 100


def test_tc_u03_high_risk_hot_summer_day():
    """TC-U03: High risk condition (Hot Summer day, 34°C, high humidity)"""
    res = calculate_heatwave_risk(34.0, 70.0, 22.0, 0.0, "Summer", "Hot")
    assert res["risk_level"] in ["High Risk", "Extreme Risk"]
    assert res["risk_score"] >= 50
    assert res["warning_required"]


def test_tc_u04_extreme_risk_severe_heatwave():
    """TC-U04: Extreme risk condition (Severe heatwave, > 35°C, high humidity, hot)"""
    res = calculate_heatwave_risk(36.5, 80.0, 26.0, 0.0, "Summer", "Hot")
    assert res["risk_level"] == "Extreme Risk"
    assert res["risk_score"] >= 75
    assert res["warning_required"]
    assert "[ACADEMIC PROTOTYPE WARNING]" in res["early_warning_message"]


def test_tc_u05_rainfall_cooling_reduction():
    """TC-U05: Heavy rainfall reduces overall risk score"""
    no_rain = calculate_heatwave_risk(33.0, 70.0, 22.0, 0.0, "Monsoon", "Hot")
    heavy_rain = calculate_heatwave_risk(33.0, 70.0, 22.0, 25.0, "Monsoon", "Hot")
    assert heavy_rain["risk_score"] < no_rain["risk_score"]


def test_tc_u06_cool_condition_suppression():
    """TC-U06: Cool climate condition suppresses risk score"""
    normal_cond = calculate_heatwave_risk(28.0, 60.0, 18.0, 0.0, "Summer", "Normal")
    cool_cond = calculate_heatwave_risk(28.0, 60.0, 18.0, 0.0, "Summer", "Cool")
    assert cool_cond["risk_score"] < normal_cond["risk_score"]


def test_tc_u07_rainy_condition_suppression():
    """TC-U07: Rainy climate condition suppresses risk score"""
    normal_cond = calculate_heatwave_risk(29.0, 70.0, 20.0, 5.0, "Monsoon", "Normal")
    rainy_cond = calculate_heatwave_risk(29.0, 70.0, 20.0, 5.0, "Monsoon", "Rainy")
    assert rainy_cond["risk_score"] < normal_cond["risk_score"]


def test_tc_u08_score_clamping_upper_bound():
    """TC-U08: Score clamping at maximum 100"""
    res = calculate_heatwave_risk(45.0, 95.0, 35.0, 0.0, "Summer", "Hot")
    assert res["risk_score"] == 100
    assert res["raw_score"] >= 100


def test_tc_u09_score_clamping_lower_bound():
    """TC-U09: Score clamping at minimum 0"""
    res = calculate_heatwave_risk(10.0, 30.0, 5.0, 50.0, "Winter", "Cool")
    assert res["risk_score"] == 0


def test_tc_u10_contributing_factors_presence():
    """TC-U10: Contributing factors breakdown is returned with 6 elements"""
    res = calculate_heatwave_risk(32.0, 65.0, 21.0, 0.0, "Summer", "Hot")
    factors = res["contributing_factors"]
    assert len(factors) == 6
    factor_names = [f["factor"] for f in factors]
    assert "Temperature" in factor_names
    assert "Humidity" in factor_names
    assert "Dew Point" in factor_names
    assert "Rainfall" in factor_names
    assert "Season" in factor_names
    assert "Climate Condition" in factor_names


def test_tc_u11_early_warning_trigger_high_risk():
    """TC-U11: Warning required boolean true for High Risk"""
    res = calculate_heatwave_risk(34.5, 75.0, 23.0, 0.0, "Summer", "Hot")
    assert res["warning_required"] is True


def test_tc_u12_early_warning_trigger_extreme_risk():
    """TC-U12: Warning required boolean true for Extreme Risk"""
    res = calculate_heatwave_risk(35.5, 82.0, 26.0, 0.0, "Summer", "Hot")
    assert res["warning_required"] is True


def test_tc_u13_early_warning_disabled_low_risk():
    """TC-U13: Warning required boolean false for Low Risk"""
    res = calculate_heatwave_risk(20.0, 50.0, 12.0, 0.0, "Winter", "Cool")
    assert res["warning_required"] is False


def test_tc_u14_disclaimer_included():
    """TC-U14: Academic prototype disclaimer present in result"""
    res = calculate_heatwave_risk(30.0, 50.0, 18.0, 0.0, "Summer", "Normal")
    assert "Academic Prototype" in res["disclaimer"]


def test_tc_u15_dew_point_high_contribution():
    """TC-U15: High dew point increases points"""
    low_dew = calculate_heatwave_risk(32.0, 70.0, 12.0, 0.0, "Summer", "Normal")
    high_dew = calculate_heatwave_risk(32.0, 70.0, 26.0, 0.0, "Summer", "Normal")
    assert high_dew["risk_score"] > low_dew["risk_score"]


def test_tc_u16_season_summer_vs_winter():
    """TC-U16: Summer season adds higher base points than Winter"""
    summer = calculate_heatwave_risk(30.0, 60.0, 18.0, 0.0, "Summer", "Normal")
    winter = calculate_heatwave_risk(30.0, 60.0, 18.0, 0.0, "Winter", "Normal")
    assert summer["risk_score"] > winter["risk_score"]


def test_tc_u17_temp_30_tier_jump():
    """TC-U17: Temperature at 30.0°C increases tier score"""
    sub_30 = calculate_heatwave_risk(29.9, 50.0, 15.0, 0.0, "Summer", "Normal")
    at_30 = calculate_heatwave_risk(30.0, 50.0, 15.0, 0.0, "Summer", "Normal")
    assert at_30["risk_score"] > sub_30["risk_score"]


def test_tc_u18_temp_33_tier_jump():
    """TC-U18: Temperature at 33.0°C increases tier score"""
    sub_33 = calculate_heatwave_risk(32.9, 50.0, 15.0, 0.0, "Summer", "Normal")
    at_33 = calculate_heatwave_risk(33.0, 50.0, 15.0, 0.0, "Summer", "Normal")
    assert at_33["risk_score"] > sub_33["risk_score"]


def test_tc_u19_temp_35_tier_jump():
    """TC-U19: Temperature at 35.0°C increases tier score"""
    sub_35 = calculate_heatwave_risk(34.9, 50.0, 15.0, 0.0, "Summer", "Normal")
    at_35 = calculate_heatwave_risk(35.0, 50.0, 15.0, 0.0, "Summer", "Normal")
    assert at_35["risk_score"] > sub_35["risk_score"]


def test_tc_u20_humidity_75_tier_jump():
    """TC-U20: Humidity at 75.0% increases tier score"""
    sub_75 = calculate_heatwave_risk(30.0, 74.9, 15.0, 0.0, "Summer", "Normal")
    at_75 = calculate_heatwave_risk(30.0, 75.0, 15.0, 0.0, "Summer", "Normal")
    assert at_75["risk_score"] > sub_75["risk_score"]


def test_tc_u21_badge_color_mapping():
    """TC-U21: Badge color mapping verification"""
    ext = calculate_heatwave_risk(36.0, 85.0, 27.0, 0.0, "Summer", "Hot")
    low = calculate_heatwave_risk(15.0, 40.0, 8.0, 10.0, "Winter", "Cool")
    assert ext["badge_color"] == "#dc2626"
    assert low["badge_color"] == "#16a34a"


def test_tc_u22_cloudy_condition_neutral():
    """TC-U22: Cloudy condition has neutral effect (0 pts)"""
    cloudy = calculate_heatwave_risk(28.0, 60.0, 18.0, 0.0, "Summer", "Cloudy")
    res_factor = [f for f in cloudy["contributing_factors"] if f["factor"] == "Climate Condition"][0]
    assert res_factor["points"] == 0

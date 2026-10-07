"""
Unit Test Suite for Input Validation Engine (validator.py).
"""

import pytest
from backend.app.utils.validator import validate_risk_assessment_input


def test_val_01_valid_payload():
    valid, res = validate_risk_assessment_input({
        "temperature": 32.5,
        "humidity": 65.0,
        "dew_point": 21.0,
        "rainfall": 0.0,
        "season": "Summer",
        "climate_condition": "Hot"
    })
    assert valid is True
    assert res["temperature"] == 32.5


def test_val_02_missing_required_fields():
    valid, res = validate_risk_assessment_input({
        "temperature": 32.5,
        "humidity": 65.0
    })
    assert valid is False
    assert "missing required fields" in res["error"]


def test_val_03_invalid_temperature_out_of_range():
    valid, res = validate_risk_assessment_input({
        "temperature": 85.0,  # Out of range
        "humidity": 65.0,
        "dew_point": 21.0,
        "rainfall": 0.0,
        "season": "Summer",
        "climate_condition": "Hot"
    })
    assert valid is False
    assert "temperature" in res["details"]


def test_val_04_humidity_greater_than_100():
    valid, res = validate_risk_assessment_input({
        "temperature": 32.5,
        "humidity": 120.0,  # Invalid
        "dew_point": 21.0,
        "rainfall": 0.0,
        "season": "Summer",
        "climate_condition": "Hot"
    })
    assert valid is False
    assert "humidity" in res["details"]


def test_val_05_negative_rainfall():
    valid, res = validate_risk_assessment_input({
        "temperature": 32.5,
        "humidity": 65.0,
        "dew_point": 21.0,
        "rainfall": -15.0,  # Invalid
        "season": "Summer",
        "climate_condition": "Hot"
    })
    assert valid is False
    assert "rainfall" in res["details"]


def test_val_06_dew_point_exceeds_temperature():
    valid, res = validate_risk_assessment_input({
        "temperature": 25.0,
        "humidity": 65.0,
        "dew_point": 35.0,  # Physically invalid dew point > temp
        "rainfall": 0.0,
        "season": "Summer",
        "climate_condition": "Normal"
    })
    assert valid is False
    assert "dew_point" in res["details"]


def test_val_07_invalid_season():
    valid, res = validate_risk_assessment_input({
        "temperature": 30.0,
        "humidity": 60.0,
        "dew_point": 18.0,
        "rainfall": 0.0,
        "season": "Autumn",  # Not in allowed list
        "climate_condition": "Normal"
    })
    assert valid is False
    assert "season" in res["details"]


def test_val_08_invalid_climate_condition():
    valid, res = validate_risk_assessment_input({
        "temperature": 30.0,
        "humidity": 60.0,
        "dew_point": 18.0,
        "rainfall": 0.0,
        "season": "Summer",
        "climate_condition": "Freezing"  # Not in allowed list
    })
    assert valid is False
    assert "climate_condition" in res["details"]


def test_val_09_string_type_number_coercion():
    valid, res = validate_risk_assessment_input({
        "temperature": "32.5",  # Valid string float
        "humidity": "65.0",
        "dew_point": "21.0",
        "rainfall": "0.0",
        "season": "Summer",
        "climate_condition": "Hot"
    })
    assert valid is True
    assert res["temperature"] == 32.5


def test_val_10_non_dict_payload():
    valid, res = validate_risk_assessment_input("invalid string payload")
    assert valid is False
    assert "Invalid payload format" in res["error"]

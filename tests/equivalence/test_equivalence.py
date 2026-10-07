"""
Equivalence Partitioning Test Suite.
Divides input domain into valid and invalid partitions.
"""

import pytest
from backend.app.utils.validator import validate_risk_assessment_input


def test_eq_valid_temperature_partition():
    """Valid Partition: -10 <= Temperature <= 60"""
    valid, _ = validate_risk_assessment_input({"temperature": 25.0, "humidity": 50, "dew_point": 15, "rainfall": 0, "season": "Summer", "climate_condition": "Normal"})
    assert valid is True


def test_eq_invalid_temperature_partition_low():
    """Invalid Partition: Temperature < -10"""
    valid, res = validate_risk_assessment_input({"temperature": -25.0, "humidity": 50, "dew_point": -30, "rainfall": 0, "season": "Summer", "climate_condition": "Normal"})
    assert valid is False
    assert "temperature" in res["details"]


def test_eq_invalid_temperature_partition_high():
    """Invalid Partition: Temperature > 60"""
    valid, res = validate_risk_assessment_input({"temperature": 75.0, "humidity": 50, "dew_point": 15, "rainfall": 0, "season": "Summer", "climate_condition": "Normal"})
    assert valid is False
    assert "temperature" in res["details"]


def test_eq_valid_humidity_partition():
    """Valid Partition: 0 <= Humidity <= 100"""
    valid, _ = validate_risk_assessment_input({"temperature": 25.0, "humidity": 50.0, "dew_point": 15, "rainfall": 0, "season": "Summer", "climate_condition": "Normal"})
    assert valid is True


def test_eq_invalid_humidity_partition_high():
    """Invalid Partition: Humidity > 100"""
    valid, res = validate_risk_assessment_input({"temperature": 25.0, "humidity": 150.0, "dew_point": 15, "rainfall": 0, "season": "Summer", "climate_condition": "Normal"})
    assert valid is False
    assert "humidity" in res["details"]

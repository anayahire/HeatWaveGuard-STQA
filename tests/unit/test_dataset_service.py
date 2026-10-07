"""
Unit Test Suite for Dataset Service (dataset_service.py).
"""

import pytest
from backend.app.services.dataset_service import get_dataset, query_records, get_dashboard_summary


def test_ds_01_dataset_loaded_successfully(dataset):
    assert dataset is not None
    assert len(dataset) == 1000
    assert "Risk_Score" in dataset.columns
    assert "Risk_Level" in dataset.columns


def test_ds_02_query_records_pagination(dataset):
    res = query_records(page=1, per_page=10)
    assert res["total_records"] == 1000
    assert len(res["records"]) == 10
    assert res["total_pages"] == 100


def test_ds_03_query_records_season_filter(dataset):
    res = query_records(season="Summer", per_page=100)
    assert len(res["records"]) > 0
    for r in res["records"]:
        assert r["Season"] == "Summer"


def test_ds_04_query_records_condition_filter(dataset):
    res = query_records(condition="Hot", per_page=100)
    assert len(res["records"]) == 23
    for r in res["records"]:
        assert r["Climate_Condition"] == "Hot"


def test_ds_05_query_records_risk_level_filter(dataset):
    res = query_records(risk_level="High Risk", per_page=100)
    assert len(res["records"]) > 0
    for r in res["records"]:
        assert r["Risk_Level"] == "High Risk"


def test_ds_06_query_records_sorting_descending(dataset):
    res = query_records(sort_by="Temperature_C", sort_order="desc", page=1, per_page=5)
    temps = [r["Temperature_C"] for r in res["records"]]
    assert temps == sorted(temps, reverse=True)


def test_ds_07_dashboard_summary_metrics(dataset):
    summary = get_dashboard_summary()
    assert summary["total_records"] == 1000
    assert summary["max_temperature_c"] > 30.0
    assert summary["hot_records_count"] == 23
    assert summary["high_extreme_risk_count"] > 0

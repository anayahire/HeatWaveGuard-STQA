"""
Dataset Service for HeatWaveGuard.
Handles CSV loading, DataFrame caching, filtering, search, pagination, and metric aggregations.
"""

import os
import pandas as pd
from backend.app.services.risk_service import calculate_heatwave_risk

DATASET_PATH = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..", "data", "climate_dataset.csv")
)

_cached_df = None


def get_dataset():
    """
    Loads and caches the climate dataset, augmenting each record with computed Heatwave Risk Score & Risk Level.
    Original CSV file remains 100% untouched.
    """
    global _cached_df
    if _cached_df is not None:
        return _cached_df.copy()

    if not os.path.exists(DATASET_PATH):
        raise FileNotFoundError(f"Dataset CSV file not found at: {DATASET_PATH}")

    df = pd.read_csv(DATASET_PATH)

    # Calculate dynamic risk score and risk level for every record
    risk_scores = []
    risk_levels = []

    for _, row in df.iterrows():
        res = calculate_heatwave_risk(
            temperature=float(row["Temperature_C"]),
            humidity=float(row["Humidity_pct"]),
            dew_point=float(row["Dew_Point_C"]),
            rainfall=float(row["Rainfall_mm"]),
            season=str(row["Season"]),
            climate_condition=str(row["Climate_Condition"])
        )
        risk_scores.append(res["risk_score"])
        risk_levels.append(res["risk_level"])

    df["Risk_Score"] = risk_scores
    df["Risk_Level"] = risk_levels
    df["id"] = range(1, len(df) + 1)

    _cached_df = df
    return _cached_df.copy()


def query_records(search="", year=None, month=None, season=None, condition=None, risk_level=None,
                  sort_by="id", sort_order="asc", page=1, per_page=20):
    """
    Applies multi-parameter search, filtering, sorting, and pagination to the dataset.
    """
    df = get_dataset()

    # Search filter (matches text across Season, Climate_Condition, Year, Month)
    if search:
        search_str = str(search).strip().lower()
        mask = (
            df["Season"].astype(str).str.lower().str.contains(search_str) |
            df["Climate_Condition"].astype(str).str.lower().str.contains(search_str) |
            df["Year"].astype(str).str.contains(search_str) |
            df["Risk_Level"].astype(str).str.lower().str.contains(search_str)
        )
        df = df[mask]

    # Explicit filters
    if year is not None and str(year).strip() != "":
        df = df[df["Year"] == int(year)]

    if month is not None and str(month).strip() != "":
        df = df[df["Month"] == int(month)]

    if season is not None and str(season).strip() != "" and str(season).strip() != "All":
        df = df[df["Season"].astype(str).str.lower() == str(season).strip().lower()]

    if condition is not None and str(condition).strip() != "" and str(condition).strip() != "All":
        df = df[df["Climate_Condition"].astype(str).str.lower() == str(condition).strip().lower()]

    if risk_level is not None and str(risk_level).strip() != "" and str(risk_level).strip() != "All":
        df = df[df["Risk_Level"].astype(str).str.lower() == str(risk_level).strip().lower()]

    total_records = len(df)

    # Sorting
    ascending = (sort_order.lower() == "asc")
    if sort_by in df.columns:
        df = df.sort_values(by=sort_by, ascending=ascending)

    # Pagination
    page = max(1, int(page))
    per_page = max(1, min(100, int(per_page)))
    start_idx = (page - 1) * per_page
    end_idx = start_idx + per_page

    paginated_df = df.iloc[start_idx:end_idx]

    records = paginated_df.to_dict(orient="records")

    total_pages = (total_records + per_page - 1) // per_page

    return {
        "total_records": total_records,
        "page": page,
        "per_page": per_page,
        "total_pages": total_pages,
        "records": records
    }


def get_dashboard_summary():
    """
    Computes summary metrics for Module 1 (Dashboard).
    """
    df = get_dataset()

    total_records = len(df)
    avg_temp = round(float(df["Temperature_C"].mean()), 2)
    max_temp = round(float(df["Temperature_C"].max()), 2)
    min_temp = round(float(df["Temperature_C"].min()), 2)
    avg_humidity = round(float(df["Humidity_pct"].mean()), 2)
    avg_dew_point = round(float(df["Dew_Point_C"].mean()), 2)
    avg_rainfall = round(float(df["Rainfall_mm"].mean()), 2)

    hot_count = int((df["Climate_Condition"] == "Hot").sum())
    high_risk_count = int((df["Risk_Level"].isin(["High Risk", "Extreme Risk"])).sum())
    extreme_risk_count = int((df["Risk_Level"] == "Extreme Risk").sum())

    season_counts = df["Season"].value_counts().to_dict()
    condition_counts = df["Climate_Condition"].value_counts().to_dict()
    risk_level_counts = df["Risk_Level"].value_counts().to_dict()

    return {
        "total_records": total_records,
        "avg_temperature_c": avg_temp,
        "max_temperature_c": max_temp,
        "min_temperature_c": min_temp,
        "avg_humidity_pct": avg_humidity,
        "avg_dew_point_c": avg_dew_point,
        "avg_rainfall_mm": avg_rainfall,
        "hot_records_count": hot_count,
        "high_extreme_risk_count": high_risk_count,
        "extreme_risk_count": extreme_risk_count,
        "season_distribution": season_counts,
        "condition_distribution": condition_counts,
        "risk_level_distribution": risk_level_counts
    }

"""
Analytics Service for HeatWaveGuard.
Generates statistical trends, distributions, seasonal comparisons, and potential climate hotspots.
"""

import pandas as pd
from backend.app.services.dataset_service import get_dataset


def get_temperature_trends():
    """
    Computes yearly and monthly temperature trends.
    """
    df = get_dataset()

    # Yearly stats
    yearly = df.groupby("Year").agg(
        avg_temp=("Temperature_C", "mean"),
        max_temp=("Temperature_C", "max"),
        min_temp=("Temperature_C", "min"),
        avg_humidity=("Humidity_pct", "mean"),
        hot_days=("Climate_Condition", lambda s: (s == "Hot").sum())
    ).reset_index()

    yearly_data = []
    for _, r in yearly.iterrows():
        yearly_data.append({
            "year": int(r["Year"]),
            "avg_temp": round(float(r["avg_temp"]), 2),
            "max_temp": round(float(r["max_temp"]), 2),
            "min_temp": round(float(r["min_temp"]), 2),
            "avg_humidity": round(float(r["avg_humidity"]), 2),
            "hot_days": int(r["hot_days"])
        })

    # Monthly stats
    month_names = {
        1: "Jan", 2: "Feb", 3: "Mar", 4: "Apr", 5: "May", 6: "Jun",
        7: "Jul", 8: "Aug", 9: "Sep", 10: "Oct", 11: "Nov", 12: "Dec"
    }

    monthly = df.groupby("Month").agg(
        avg_temp=("Temperature_C", "mean"),
        max_temp=("Temperature_C", "max"),
        avg_rainfall=("Rainfall_mm", "mean")
    ).reset_index()

    monthly_data = []
    for _, r in monthly.iterrows():
        m_num = int(r["Month"])
        monthly_data.append({
            "month": m_num,
            "month_name": month_names.get(m_num, str(m_num)),
            "avg_temp": round(float(r["avg_temp"]), 2),
            "max_temp": round(float(r["max_temp"]), 2),
            "avg_rainfall": round(float(r["avg_rainfall"]), 2)
        })

    return {
        "yearly_trends": yearly_data,
        "monthly_trends": monthly_data
    }


def get_seasonal_analysis():
    """
    Computes seasonal temperature, humidity, rainfall, and climate condition distributions.
    """
    df = get_dataset()

    seasonal = df.groupby("Season").agg(
        record_count=("id", "count"),
        avg_temp=("Temperature_C", "mean"),
        max_temp=("Temperature_C", "max"),
        min_temp=("Temperature_C", "min"),
        avg_humidity=("Humidity_pct", "mean"),
        avg_rainfall=("Rainfall_mm", "mean"),
        avg_dew_point=("Dew_Point_C", "mean"),
        hot_count=("Climate_Condition", lambda s: (s == "Hot").sum())
    ).reset_index()

    seasonal_data = []
    for _, r in seasonal.iterrows():
        seasonal_data.append({
            "season": str(r["Season"]),
            "record_count": int(r["record_count"]),
            "avg_temp": round(float(r["avg_temp"]), 2),
            "max_temp": round(float(r["max_temp"]), 2),
            "min_temp": round(float(r["min_temp"]), 2),
            "avg_humidity": round(float(r["avg_humidity"]), 2),
            "avg_rainfall": round(float(r["avg_rainfall"]), 2),
            "avg_dew_point": round(float(r["avg_dew_point"]), 2),
            "hot_count": int(r["hot_count"])
        })

    return seasonal_data


def get_climate_condition_distribution():
    """
    Computes breakdown of records by Climate_Condition.
    """
    df = get_dataset()
    total = len(df)

    counts = df["Climate_Condition"].value_counts().to_dict()
    distribution = []

    colors = {
        "Normal": "#3b82f6",
        "Cool": "#06b6d4",
        "Rainy": "#0284c7",
        "Hot": "#ef4444",
        "Cloudy": "#64748b"
    }

    for condition, count in counts.items():
        distribution.append({
            "condition": condition,
            "count": int(count),
            "percentage": round((count / total) * 100, 2),
            "color": colors.get(condition, "#8884d8")
        })

    return distribution


def get_potential_hotspots(min_temp=30.0, min_risk_score=50):
    """
    Identifies high-risk climate records / hotspots.
    Disclaimer: Geographic hotspot mapping requires location coordinates not present in dataset.
    """
    df = get_dataset()

    filtered = df[(df["Temperature_C"] >= float(min_temp)) | (df["Risk_Score"] >= int(min_risk_score))]
    sorted_df = filtered.sort_values(by="Risk_Score", ascending=False)

    hotspot_records = sorted_df.to_dict(orient="records")

    return {
        "total_hotspots_identified": len(hotspot_records),
        "disclaimer": "Notice: Geographic hotspot mapping requires location coordinates (latitude/longitude) that are not present in this dataset. Hotspots are identified based on historical meteorological temperature and heatwave risk thresholds.",
        "records": hotspot_records
    }

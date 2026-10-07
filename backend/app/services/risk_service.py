"""
Deterministic Heatwave Risk Assessment Engine.
Provides explainable rule-based scoring, contributing factors breakdown, and early warning messages.
"""

def calculate_heatwave_risk(temperature, humidity, dew_point, rainfall, season, climate_condition):
    """
    Calculates deterministic Heatwave Risk Score (0-100) and risk level.

    Scoring System:
    - Temperature contribution:
      - < 30°C: +5
      - 30 to < 33°C: +20
      - 33 to < 35°C: +35
      - >= 35°C: +45
    - Humidity contribution:
      - < 45%: +0
      - 45 to < 60%: +8
      - 60 to < 75%: +15
      - >= 75%: +20
    - Dew point contribution:
      - < 15°C: +0
      - 15 to < 20°C: +5
      - 20 to < 25°C: +10
      - >= 25°C: +15
    - Rainfall contribution:
      - > 20 mm: -20
      - > 0 mm: -10
      - 0 mm: 0
    - Season contribution:
      - Summer: +10
      - Monsoon: +5
      - Post-Monsoon / Winter: +0
    - Climate Condition contribution:
      - Hot: +20
      - Normal: +5
      - Cloudy: 0
      - Cool: -10
      - Rainy: -15
    """
    raw_score = 0
    contributing_factors = []

    # 1. Temperature Contribution
    if temperature >= 35.0:
        pts = 45
        desc = "Very High (>= 35.0°C)"
        impact = "Extreme thermal stress"
    elif temperature >= 33.0:
        pts = 35
        desc = "High (33.0°C - 34.9°C)"
        impact = "Significant heat load"
    elif temperature >= 30.0:
        pts = 20
        desc = "Moderate (30.0°C - 32.9°C)"
        impact = "Moderate thermal condition"
    else:
        pts = 5
        desc = "Low (< 30.0°C)"
        impact = "Minimal thermal stress"

    raw_score += pts
    contributing_factors.append({
        "factor": "Temperature",
        "value": f"{temperature:.1f} °C",
        "contribution": desc,
        "points": pts,
        "impact": impact
    })

    # 2. Humidity Contribution
    if humidity >= 75.0:
        pts = 20
        desc = "Very High (>= 75%)"
        impact = "Severely hinders evaporative sweat cooling"
    elif humidity >= 60.0:
        pts = 15
        desc = "High (60% - 74.9%)"
        impact = "Increased apparent heat stress"
    elif humidity >= 45.0:
        pts = 8
        desc = "Moderate (45% - 59.9%)"
        impact = "Moderate humidity contribution"
    else:
        pts = 0
        desc = "Low (< 45%)"
        impact = "Low humidity contribution"

    raw_score += pts
    contributing_factors.append({
        "factor": "Humidity",
        "value": f"{humidity:.1f} %",
        "contribution": desc,
        "points": pts,
        "impact": impact
    })

    # 3. Dew Point Contribution
    if dew_point >= 25.0:
        pts = 15
        desc = "Very High (>= 25.0°C)"
        impact = "Extreme atmospheric moisture accumulation"
    elif dew_point >= 20.0:
        pts = 10
        desc = "High (20.0°C - 24.9°C)"
        impact = "High heat-index multiplier"
    elif dew_point >= 15.0:
        pts = 5
        desc = "Moderate (15.0°C - 19.9°C)"
        impact = "Mild heat-index impact"
    else:
        pts = 0
        desc = "Low (< 15.0°C)"
        impact = "Negligible heat-index contribution"

    raw_score += pts
    contributing_factors.append({
        "factor": "Dew Point",
        "value": f"{dew_point:.1f} °C",
        "contribution": desc,
        "points": pts,
        "impact": impact
    })

    # 4. Rainfall Contribution
    if rainfall > 20.0:
        pts = -20
        desc = "Heavy Rain (> 20.0 mm)"
        impact = "Strong evaporative cooling effect"
    elif rainfall > 0.0:
        pts = -10
        desc = "Light/Moderate Rain (> 0 mm)"
        impact = "Mild surface cooling effect"
    else:
        pts = 0
        desc = "Dry / No Rainfall (0 mm)"
        impact = "No cooling effect"

    raw_score += pts
    contributing_factors.append({
        "factor": "Rainfall",
        "value": f"{rainfall:.1f} mm",
        "contribution": desc,
        "points": pts,
        "impact": impact
    })

    # 5. Season Contribution
    if season == "Summer":
        pts = 10
        desc = "Summer Season"
        impact = "Base seasonal heat amplification"
    elif season == "Monsoon":
        pts = 5
        desc = "Monsoon Season"
        impact = "Humidity/heat interplay"
    else:
        pts = 0
        desc = f"{season} Season"
        impact = "Low seasonal thermal contribution"

    raw_score += pts
    contributing_factors.append({
        "factor": "Season",
        "value": season,
        "contribution": desc,
        "points": pts,
        "impact": impact
    })

    # 6. Climate Condition Contribution
    if climate_condition == "Hot":
        pts = 20
        desc = "Hot Condition"
        impact = "Primary heatwave indicator"
    elif climate_condition == "Normal":
        pts = 5
        desc = "Normal Condition"
        impact = "Standard climate baseline"
    elif climate_condition == "Cloudy":
        pts = 0
        desc = "Cloudy Condition"
        impact = "Solar shading effect"
    elif climate_condition == "Cool":
        pts = -10
        desc = "Cool Condition"
        impact = "Temperature reduction factor"
    elif climate_condition == "Rainy":
        pts = -15
        desc = "Rainy Condition"
        impact = "Precipitation cooling factor"
    else:
        pts = 0
        desc = climate_condition
        impact = "Unrated condition"

    raw_score += pts
    contributing_factors.append({
        "factor": "Climate Condition",
        "value": climate_condition,
        "contribution": desc,
        "points": pts,
        "impact": impact
    })

    # Final clamping between 0 and 100
    risk_score = max(0, min(100, raw_score))

    # Risk level classification
    if risk_score >= 75:
        risk_level = "Extreme Risk"
        badge_color = "#dc2626"  # Red
        warning_required = True
        early_warning_message = "[ACADEMIC PROTOTYPE WARNING] Extreme heatwave risk detected! Severe thermal danger. Precautionary heat safety measures and continuous monitoring are strongly recommended."
    elif risk_score >= 50:
        risk_level = "High Risk"
        badge_color = "#ea580c"  # Orange
        warning_required = True
        early_warning_message = "[ACADEMIC PROTOTYPE WARNING] High heatwave risk detected. Increased monitoring and precautionary measures are recommended."
    elif risk_score >= 25:
        risk_level = "Moderate Risk"
        badge_color = "#d97706"  # Amber
        warning_required = False
        early_warning_message = "[ACADEMIC PROTOTYPE NOTICE] Moderate climate thermal conditions observed. Stay hydrated and monitor regional updates."
    else:
        risk_level = "Low Risk"
        badge_color = "#16a34a"  # Green
        warning_required = False
        early_warning_message = "[ACADEMIC PROTOTYPE NOTICE] Low heatwave risk. Climate conditions are within comfortable baseline parameters."

    return {
        "risk_score": risk_score,
        "raw_score": raw_score,
        "risk_level": risk_level,
        "badge_color": badge_color,
        "warning_required": warning_required,
        "early_warning_message": early_warning_message,
        "contributing_factors": contributing_factors,
        "disclaimer": "Academic Prototype Notice: This Heatwave Risk Score is computed using an academic rule-based model and does NOT represent official meteorological or medical advice."
    }

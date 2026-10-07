"""
Input Validation and Boundary Checking Utility for HeatWaveGuard.
Ensures clean error responses and prevents invalid user inputs from crashing the application.
"""

VALID_SEASONS = {"Summer", "Monsoon", "Post-Monsoon", "Winter"}
VALID_CLIMATE_CONDITIONS = {"Normal", "Cool", "Rainy", "Hot", "Cloudy"}

NUMERIC_BOUNDS = {
    "Temperature_C": {"min": -10.0, "max": 60.0, "label": "Temperature (°C)"},
    "Humidity_pct": {"min": 0.0, "max": 100.0, "label": "Humidity (%)"},
    "Dew_Point_C": {"min": -20.0, "max": 45.0, "label": "Dew Point (°C)"},
    "Rainfall_mm": {"min": 0.0, "max": 500.0, "label": "Rainfall (mm)"},
    "Pressure_hPa": {"min": 900.0, "max": 1100.0, "label": "Pressure (hPa)"},
    "Wind_Speed_kmph": {"min": 0.0, "max": 150.0, "label": "Wind Speed (km/h)"},
    "Cloud_Cover_pct": {"min": 0.0, "max": 100.0, "label": "Cloud Cover (%)"},
    "Visibility_km": {"min": 0.0, "max": 50.0, "label": "Visibility (km)"},
    "Solar_Radiation_Wm2": {"min": 0.0, "max": 1200.0, "label": "Solar Radiation (W/m²)"},
    "Air_Quality_Index": {"min": 0.0, "max": 500.0, "label": "Air Quality Index"},
    "Year": {"min": 2000, "max": 2100, "label": "Year"},
    "Month": {"min": 1, "max": 12, "label": "Month"},
    "Day": {"min": 1, "max": 31, "label": "Day"}
}


def validate_risk_assessment_input(data):
    """
    Validates input payload for risk assessment.
    Returns (is_valid, sanitized_data_or_error_dict)
    """
    if not isinstance(data, dict):
        return False, {"error": "Invalid payload format. Expected JSON object."}

    required_fields = ["temperature", "humidity", "dew_point", "rainfall", "season", "climate_condition"]
    errors = {}

    # Check required fields
    for field in required_fields:
        if field not in data or data[field] is None or data[field] == "":
            errors[field] = f"Field '{field}' is required."

    if errors:
        return False, {"error": "Validation failed due to missing required fields.", "details": errors}

    # Extract values
    try:
        temp = float(data["temperature"])
    except (ValueError, TypeError):
        errors["temperature"] = "Temperature must be a valid number."
        temp = None

    try:
        hum = float(data["humidity"])
    except (ValueError, TypeError):
        errors["humidity"] = "Humidity must be a valid number."
        hum = None

    try:
        dew = float(data["dew_point"])
    except (ValueError, TypeError):
        errors["dew_point"] = "Dew point must be a valid number."
        dew = None

    try:
        rain = float(data["rainfall"])
    except (ValueError, TypeError):
        errors["rainfall"] = "Rainfall must be a valid number."
        rain = None

    season = str(data["season"]).strip()
    climate_condition = str(data["climate_condition"]).strip()

    # Range checks
    if temp is not None:
        if temp < NUMERIC_BOUNDS["Temperature_C"]["min"] or temp > NUMERIC_BOUNDS["Temperature_C"]["max"]:
            errors["temperature"] = f"Temperature must be between {NUMERIC_BOUNDS['Temperature_C']['min']}°C and {NUMERIC_BOUNDS['Temperature_C']['max']}°C."

    if hum is not None:
        if hum < NUMERIC_BOUNDS["Humidity_pct"]["min"] or hum > NUMERIC_BOUNDS["Humidity_pct"]["max"]:
            errors["humidity"] = f"Humidity must be between {NUMERIC_BOUNDS['Humidity_pct']['min']}% and {NUMERIC_BOUNDS['Humidity_pct']['max']}%."

    if dew is not None:
        if dew < NUMERIC_BOUNDS["Dew_Point_C"]["min"] or dew > NUMERIC_BOUNDS["Dew_Point_C"]["max"]:
            errors["dew_point"] = f"Dew point must be between {NUMERIC_BOUNDS['Dew_Point_C']['min']}°C and {NUMERIC_BOUNDS['Dew_Point_C']['max']}°C."
        elif temp is not None and dew > temp + 2.0:
            errors["dew_point"] = f"Dew point ({dew}°C) cannot physically exceed ambient temperature ({temp}°C) by more than 2°C."

    if rain is not None:
        if rain < NUMERIC_BOUNDS["Rainfall_mm"]["min"] or rain > NUMERIC_BOUNDS["Rainfall_mm"]["max"]:
            errors["rainfall"] = f"Rainfall must be between {NUMERIC_BOUNDS['Rainfall_mm']['min']} mm and {NUMERIC_BOUNDS['Rainfall_mm']['max']} mm."

    # Categorical checks
    if season not in VALID_SEASONS:
        errors["season"] = f"Invalid season '{season}'. Must be one of: {', '.join(sorted(VALID_SEASONS))}."

    if climate_condition not in VALID_CLIMATE_CONDITIONS:
        errors["climate_condition"] = f"Invalid climate condition '{climate_condition}'. Must be one of: {', '.join(sorted(VALID_CLIMATE_CONDITIONS))}."

    if errors:
        return False, {"error": "Validation failed.", "details": errors}

    sanitized = {
        "temperature": temp,
        "humidity": hum,
        "dew_point": dew,
        "rainfall": rain,
        "season": season,
        "climate_condition": climate_condition
    }
    return True, sanitized

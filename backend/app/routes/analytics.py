"""
Analytics API Route Blueprint.
"""

from flask import Blueprint, request, jsonify
from backend.app.services.analytics_service import (
    get_temperature_trends,
    get_seasonal_analysis,
    get_climate_condition_distribution,
    get_potential_hotspots
)

analytics_bp = Blueprint("analytics", __name__)


@analytics_bp.route("/api/analytics/trends", methods=["GET"])
def temperature_trends():
    """
    Get temperature trend data (yearly and monthly).
    """
    try:
        trends = get_temperature_trends()
        return jsonify({"success": True, "data": trends}), 200
    except Exception as e:
        return jsonify({"success": False, "error": "Failed to compute temperature trends.", "message": str(e)}), 500


@analytics_bp.route("/api/analytics/seasonal", methods=["GET"])
def seasonal_analysis():
    """
    Get seasonal breakdown statistics.
    """
    try:
        seasonal = get_seasonal_analysis()
        return jsonify({"success": True, "data": seasonal}), 200
    except Exception as e:
        return jsonify({"success": False, "error": "Failed to compute seasonal analysis.", "message": str(e)}), 500


@analytics_bp.route("/api/analytics/conditions", methods=["GET"])
def climate_conditions():
    """
    Get Climate_Condition distribution breakdown.
    """
    try:
        conditions = get_climate_condition_distribution()
        return jsonify({"success": True, "data": conditions}), 200
    except Exception as e:
        return jsonify({"success": False, "error": "Failed to compute condition distribution.", "message": str(e)}), 500


@analytics_bp.route("/api/analytics/hotspots", methods=["GET"])
def climate_hotspots():
    """
    Get potential high-risk climate records (hotspots).
    Query parameters:
    - min_temp: minimum temperature threshold (default 30.0)
    - min_risk_score: minimum risk score threshold (default 50)
    """
    try:
        min_temp = request.args.get("min_temp", 30.0, type=float)
        min_risk_score = request.args.get("min_risk_score", 50, type=int)

        hotspots = get_potential_hotspots(min_temp=min_temp, min_risk_score=min_risk_score)
        return jsonify({"success": True, "data": hotspots}), 200
    except Exception as e:
        return jsonify({"success": False, "error": "Failed to compute hotspot analysis.", "message": str(e)}), 500

"""
Heatwave Risk Assessment API Route Blueprint.
"""

from flask import Blueprint, request, jsonify
from backend.app.utils.validator import validate_risk_assessment_input
from backend.app.services.risk_service import calculate_heatwave_risk

risk_bp = Blueprint("risk", __name__)


@risk_bp.route("/api/risk/assess", methods=["POST"])
def assess_risk():
    """
    Evaluates weather parameters and calculates deterministic Heatwave Risk Score & level.
    """
    payload = request.get_json(silent=True)

    if payload is None:
        return jsonify({
            "success": False,
            "error": "Invalid request. Missing or malformed JSON payload."
        }), 400

    is_valid, validation_result = validate_risk_assessment_input(payload)

    if not is_valid:
        return jsonify({
            "success": False,
            "error": validation_result.get("error", "Validation failed."),
            "details": validation_result.get("details", {})
        }), 400

    try:
        sanitized = validation_result
        risk_result = calculate_heatwave_risk(
            temperature=sanitized["temperature"],
            humidity=sanitized["humidity"],
            dew_point=sanitized["dew_point"],
            rainfall=sanitized["rainfall"],
            season=sanitized["season"],
            climate_condition=sanitized["climate_condition"]
        )

        response_data = {
            "input_parameters": sanitized,
            "assessment": risk_result
        }

        return jsonify({
            "success": True,
            "data": response_data
        }), 200

    except Exception as e:
        return jsonify({
            "success": False,
            "error": "Unable to process heatwave risk assessment.",
            "message": str(e)
        }), 500

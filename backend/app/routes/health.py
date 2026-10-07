"""
Health Check Route Blueprint.
"""

from flask import Blueprint, jsonify

health_bp = Blueprint("health", __name__)

@health_bp.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({
        "status": "healthy",
        "service": "HeatWaveGuard API Service",
        "version": "1.0.0",
        "environment": "Academic Prototype"
    }), 200

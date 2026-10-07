"""
Dataset API Route Blueprint.
"""

from flask import Blueprint, request, jsonify
from backend.app.services.dataset_service import query_records, get_dashboard_summary

dataset_bp = Blueprint("dataset", __name__)

@dataset_bp.route("/api/dashboard/stats", methods=["GET"])
def dashboard_stats():
    """
    Get aggregated dashboard summary statistics.
    """
    try:
        summary = get_dashboard_summary()
        return jsonify({"success": True, "data": summary}), 200
    except Exception as e:
        return jsonify({"success": False, "error": "Failed to load dashboard statistics.", "message": str(e)}), 500


@dataset_bp.route("/api/records", methods=["GET"])
def get_records():
    """
    Get paginated, searchable, and filtered climate records.
    Query parameters:
    - search: search keyword
    - year: filter by year
    - month: filter by month
    - season: filter by season
    - condition: filter by Climate_Condition
    - risk_level: filter by Risk_Level
    - sort_by: column name
    - sort_order: 'asc' or 'desc'
    - page: page number
    - per_page: records per page
    """
    try:
        search = request.args.get("search", "")
        year = request.args.get("year", None)
        month = request.args.get("month", None)
        season = request.args.get("season", None)
        condition = request.args.get("condition", None)
        risk_level = request.args.get("risk_level", None)
        sort_by = request.args.get("sort_by", "id")
        sort_order = request.args.get("sort_order", "asc")
        page = request.args.get("page", 1, type=int)
        per_page = request.args.get("per_page", 20, type=int)

        result = query_records(
            search=search,
            year=year,
            month=month,
            season=season,
            condition=condition,
            risk_level=risk_level,
            sort_by=sort_by,
            sort_order=sort_order,
            page=page,
            per_page=per_page
        )

        return jsonify({"success": True, "data": result}), 200
    except Exception as e:
        return jsonify({"success": False, "error": "Failed to query climate records.", "message": str(e)}), 500

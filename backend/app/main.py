"""
HeatWaveGuard Backend API Entry Point & Flask Factory.
"""

import os
import sys
from flask import Flask, jsonify
from flask_cors import CORS

# Add root project directory to sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))

from backend.app.routes.health import health_bp
from backend.app.routes.dataset import dataset_bp
from backend.app.routes.analytics import analytics_bp
from backend.app.routes.risk import risk_bp
from backend.app.routes.qa import qa_bp


def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # Register blueprints
    app.register_blueprint(health_bp)
    app.register_blueprint(dataset_bp)
    app.register_blueprint(analytics_bp)
    app.register_blueprint(risk_bp)
    app.register_blueprint(qa_bp)

    # Global Error Handlers (Ensures no raw stack traces are exposed to users)
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({"success": False, "error": "Requested API endpoint not found."}), 404

    @app.errorhandler(405)
    def method_not_allowed(error):
        return jsonify({"success": False, "error": "HTTP method not allowed for this endpoint."}), 405

    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({
            "success": False,
            "error": "An unexpected internal server error occurred.",
            "message": "The system handled the error gracefully without exposing sensitive internal state."
        }), 500

    return app


app = create_app()

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    print(f"Starting HeatWaveGuard Backend API on port {port}...")
    app.run(host="0.0.0.0", port=port, debug=True)

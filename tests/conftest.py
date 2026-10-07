"""
Pytest Fixtures for HeatWaveGuard Test Suite.
"""

import sys
import os
import pytest

# Ensure root directory is in sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from backend.app.main import create_app
from backend.app.services.dataset_service import get_dataset


@pytest.fixture(scope="module")
def app():
    """
    Creates Flask application instance for testing.
    """
    flask_app = create_app()
    flask_app.config.update({
        "TESTING": True,
        "DEBUG": False
    })
    yield flask_app


@pytest.fixture(scope="module")
def client(app):
    """
    Creates Flask test client.
    """
    return app.test_client()


@pytest.fixture(scope="module")
def dataset():
    """
    Returns loaded dataset DataFrame.
    """
    return get_dataset()

import pytest
from fastapi.testclient import TestClient
from apps.api.main import create_app

@pytest.fixture
def client():
    app = create_app(testing=True)
    return TestClient(app)
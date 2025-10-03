
def test_create_task_returns_201_and_body(client):
    payload = {"content": "first memo"}
    res = client.post("/tasks", json=payload)
    assert res.status_code == 201
    
    body = res.json()
    assert body["content"] == "first memo"
    assert "id" in body and "createdAt" in body and "updatedAt" in body
    
def test_create_task_requires_content(client):
    res = client.post("/tasks", json={})
    assert res.status_code == 422
    

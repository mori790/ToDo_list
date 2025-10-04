
def test_update_task_returns_200_and_updated_body(client):
    # Create a task first
    create_res = client.post("/tasks", json={"content": "original content"})
    task_id = create_res.json()["id"]

    # Update the task
    update_payload = {"content": "updated content"}
    res = client.patch(f"/tasks/{task_id}", json=update_payload)

    assert res.status_code == 200
    body = res.json()
    assert body["content"] == "updated content"
    assert body["id"] == task_id
    assert "updatedAt" in body

def test_update_task_returns_404_for_nonexistent_task(client):
    res = client.patch("/tasks/nonexistent-id", json={"content": "new content"})
    assert res.status_code == 404
    assert "not found" in res.json()["detail"].lower()

def test_update_task_requires_content(client):
    # Create a task first
    create_res = client.post("/tasks", json={"content": "original"})
    task_id = create_res.json()["id"]

    # Try to update without content
    res = client.patch(f"/tasks/{task_id}", json={})
    assert res.status_code == 422

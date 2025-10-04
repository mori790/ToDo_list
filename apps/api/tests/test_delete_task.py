
def test_delete_task_returns_204(client):
    # Create a task first
    create_res = client.post("/tasks", json={"content": "to be deleted"})
    task_id = create_res.json()["id"]

    # Delete the task
    res = client.delete(f"/tasks/{task_id}")
    assert res.status_code == 204

    # Verify it's gone by trying to get it
    get_res = client.get("/tasks")
    tasks = get_res.json()
    assert all(t["id"] != task_id for t in tasks)

def test_delete_task_returns_404_for_nonexistent_task(client):
    res = client.delete("/tasks/nonexistent-id")
    assert res.status_code == 404
    assert "not found" in res.json()["detail"].lower()

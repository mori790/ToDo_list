
def test_list_tasks_returns_latest_first(client):
    client.post("/tasks", json={"content": "A"})
    client.post("/tasks", json={"content": "B"})
    res = client.get("/tasks")
    # データは取ってこれるか？
    assert res.status_code == 200
    data = res.json()
    # Bの方が新しく、新しいデータから取ってこれるか？
    assert [t["content"] for t in data] == ["B", "A"]
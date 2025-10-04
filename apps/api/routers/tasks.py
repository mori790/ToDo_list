from fastapi import APIRouter, Depends, HTTPException, status
from typing import Callable, List
from apps.api.schemas.task import TaskCreate, TaskOut
from apps.api.domain.models import Task
from apps.api.domain.repositories import TaskRepository

def to_out(t: Task) -> TaskOut:
    return TaskOut(
        id=t.id, content=t.content,
        createdAt=t.created_at, updatedAt=t.updated_at
    )
    
def make_tasks_router(repo_dep: Callable[[], TaskRepository]) -> APIRouter:
    r = APIRouter()
    
    @r.post("/tasks", response_model=TaskOut, status_code=status.HTTP_201_CREATED)
    def create_task(payload: TaskCreate, repo: TaskRepository=Depends(repo_dep)):
        task = Task.new(payload.content)
        return to_out(repo.add(task))
    
    @r.get("/tasks", response_model=List[TaskOut])
    def list_tasks(repo: TaskRepository = Depends(repo_dep)):
        return [to_out(t) for t in repo.list_latest()]

    @r.patch("/tasks/{task_id}", response_model=TaskOut)
    def update_task(task_id: str, payload: TaskCreate, repo: TaskRepository = Depends(repo_dep)):
        task = repo.get(task_id)
        if not task:
            raise HTTPException(status_code=404, detail="Task not found")
        task.update_content(payload.content)
        return to_out(repo.update(task))

    @r.delete("/tasks/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
    def delete_task(task_id: str, repo: TaskRepository = Depends(repo_dep)):
        task = repo.get(task_id)
        if not task:
            raise HTTPException(status_code=404, detail="Task not found")
        repo.delete(task_id)
        return None

    return r


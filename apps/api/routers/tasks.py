from fastapi import APIRouter, Depends, status
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
    
    return r
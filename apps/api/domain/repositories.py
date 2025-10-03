from typing import Protocol, List, Optional
from .models import Task

class TaskRepository(Protocol):
    def add(self, task: Task) -> Task: ...
    def list_latest(self) -> List[Task]: ...
    def get(self, task_id: str) -> Optional[Task]: ...
    def update(self, task: Task) -> Task: ...
    def delete(self, task_id: str) -> None: ...
    
class InMemoryTaskRepo(TaskRepository):
    def __init__(self):
        self._store = {}
    
    def add(self, task: Task) -> Task:
        self._store[task.id] = task 
        return task 

    def list_latest(self) -> List[Task]:
        return sorted(self._store.values(), key=lambda t: t.created_at, reverse=True)
    
    def get(self, task_id: str) -> Optional[Task]:
        return self._store.get(task_id)
    
    def update(self, task: Task) -> Task:
        self._store[task.id] = task
        return task
    
    def delete(self, task_id: str) -> None:
        self._store.pop(task_id, None)
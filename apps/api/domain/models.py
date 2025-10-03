from dataclasses import dataclass
from datetime import datetime, timezone
from uuid import uuid4

@dataclass
class Task:
    id: str
    content: str
    created_at: datetime
    updated_at: datetime
    
    # JSONの中身を作ってる。
    @staticmethod
    def new(content: str) -> "Task":
        now = datetime.now(timezone.utc)
        return Task(id=str(uuid4()), content=content, created_at=now, updated_at=now)
    
    def update_content(self, content: str) -> None:
        self.content = content
        self.updated_at = datetime.now(timezone.utc)
from pydantic import BaseModel, Field
from datetime import datetime

class TaskCreate(BaseModel):
    content: str = Field(min_length=1)
    
class TaskOut(BaseModel):
    id: str
    content: str
    createdAt: datetime
    updatedAt: datetime
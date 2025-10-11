from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from apps.api.routers.tasks import make_tasks_router
from apps.api.domain.repositories import InMemoryTaskRepo

def create_app(testing: bool = False) -> FastAPI:
    app = FastAPI(title="Memo API")
    
    # ★ ここを追加：フロントのオリジンを列挙（credentialsを使う予定がなくてもOK）
    origins = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ]
    # allowed = ["https://<your-project>.vercel.app"]
    # app.add_middleware(
    #     CORSMiddleware,
    #     allow_origins=origins,        # credentials=True の場合、ワイルドカードは不可
    #     allow_credentials=True,       # Cookie/認証を使わないなら False でも可
    #     allow_methods=["*"],          # 必要に応じて ["GET","POST","PATCH","DELETE","OPTIONS"]
    #     allow_headers=["*"],          # "Content-Type","Authorization" など
    # )
    
    # 常にインメモリ。DB実装まで
    repo = InMemoryTaskRepo()
    
    def repo_dep():
        return repo
    
    # できたルータを登録
    app.include_router(make_tasks_router(repo_dep))
    return app
# 📋 Memo App - ToDo List Application

モダンなフルスタックToDoリストアプリケーション。TDD/DDD設計に基づき、FastAPI（Python）とNext.js（React）で構築されています。

## 🚀 機能

- ✅ タスクの作成・表示・編集・削除（CRUD操作）
- 🎨 リッチでモダンなUI/UX
- 🌓 ダークモード対応
- 📱 レスポンシブデザイン
- ⚡ リアルタイム更新
- 🧪 包括的なテストカバレッジ

## 🏗️ アーキテクチャ

### バックエンド (FastAPI)
- **フレームワーク**: FastAPI
- **設計**: Domain-Driven Design (DDD)
- **開発手法**: Test-Driven Development (TDD)
- **ストレージ**: In-Memory Repository（後にDB移行可能）

#### ディレクトリ構成
```
apps/api/
├── domain/
│   ├── models.py          # ドメインモデル (Task)
│   └── repositories.py    # リポジトリインターフェース & 実装
├── routers/
│   └── tasks.py           # APIエンドポイント
├── schemas/
│   └── task.py            # Pydanticスキーマ (DTO)
├── tests/
│   ├── conftest.py
│   ├── test_create_task.py
│   ├── test_list_tasks.py
│   ├── test_update_task.py
│   └── test_delete_task.py
└── main.py                # FastAPIアプリケーション
```

### フロントエンド (Next.js)
- **フレームワーク**: Next.js 15 (App Router)
- **UI**: React 19
- **スタイリング**: CSS Modules + CSS Variables
- **型安全性**: TypeScript

#### ディレクトリ構成
```
apps/web/src/app/
├── components/
│   ├── TaskForm.tsx       # タスク作成フォーム
│   ├── TaskForm.module.css
│   ├── TaskList.tsx       # タスク一覧
│   └── TaskList.module.css
├── lib/
│   └── api.ts             # API通信ロジック
├── page.tsx               # メインページ
├── page.module.css
├── layout.tsx
└── globals.css            # グローバルスタイル
```

## 📡 API仕様

| メソッド | エンドポイント | 説明 |
|---------|---------------|------|
| POST | `/tasks` | タスク作成 |
| GET | `/tasks` | タスク一覧取得（最新順） |
| PATCH | `/tasks/{id}` | タスク更新 |
| DELETE | `/tasks/{id}` | タスク削除 |

### レスポンス例
```json
{
  "id": "uuid",
  "content": "タスク内容",
  "createdAt": "2025-10-04T12:00:00Z",
  "updatedAt": "2025-10-04T12:00:00Z"
}
```

## 🛠️ セットアップ

### 前提条件
- Python 3.13+
- Node.js 20+
- npm/yarn/pnpm

### バックエンドのセットアップ

1. 仮想環境の作成と有効化
```bash
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
```

2. 依存関係のインストール
```bash
pip install fastapi uvicorn pydantic pytest
```

3. テストの実行
```bash
pytest apps/api/tests/ -v
```

4. サーバーの起動
```bash
uvicorn apps.api.main:app --reload
# または
python -m uvicorn apps.api.main:app --reload
```

APIは `http://localhost:8000` で起動します。
ドキュメントは `http://localhost:8000/docs` で確認できます。

### フロントエンドのセットアップ

1. ディレクトリ移動
```bash
cd apps/web
```

2. 依存関係のインストール
```bash
npm install
# または
yarn install
# または
pnpm install
```

3. 開発サーバーの起動
```bash
npm run dev
# または
yarn dev
# または
pnpm dev
```

アプリケーションは `http://localhost:3000` で起動します。

## 🧪 テスト

### バックエンドテスト
```bash
# 全テスト実行
pytest apps/api/tests/ -v

# カバレッジ付き
pytest apps/api/tests/ --cov=apps.api
```

### テストカバレッジ
- タスク作成（バリデーション含む）
- タスク一覧取得（ソート確認）
- タスク更新（404エラーハンドリング）
- タスク削除（404エラーハンドリング）

## 🎨 UI機能

- **カード型デザイン**: シャドウ・角丸を用いたモダンなカード
- **アニメーション**: ホバー時の上昇効果、ローディングスピナー
- **状態管理**: 個別タスクのローディング状態
- **日時表示**: 日本語フォーマットのタイムスタンプ
- **レスポンシブ**: モバイル・タブレット対応

## 📚 設計ドキュメント

プロジェクトには以下のドキュメントが含まれています：

```
docs/
├── 30-uml/
│   ├── usecase/          # ユースケース図
│   ├── class/            # クラス図
│   └── sequence/         # シーケンス図
├── 40-db/
│   └── er/               # ER図
└── 60-ui-ux/
    ├── flows/            # ユーザーフロー
    └── screens/          # ワイヤーフレーム
```

## 🔧 技術スタック

### バックエンド
- FastAPI - 高速なWeb APIフレームワーク
- Pydantic - データバリデーション
- pytest - テストフレームワーク
- Uvicorn - ASGIサーバー

### フロントエンド
- Next.js 15 - Reactフレームワーク
- React 19 - UIライブラリ
- TypeScript - 型安全性
- CSS Modules - スコープ付きCSS
- Tailwind CSS - ユーティリティCSS

## 🚧 今後の拡張予定

- [ ] データベース統合（PostgreSQL/MySQL）
- [ ] ユーザー認証・認可
- [ ] タスクのカテゴリ・タグ機能
- [ ] 優先度・期限設定
- [ ] 検索・フィルタリング機能
- [ ] データエクスポート機能

## 📝 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 👥 貢献

プルリクエストを歓迎します！大きな変更の場合は、まずissueを開いて変更内容を議論してください。

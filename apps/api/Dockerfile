FROM python:3.13-slim

# sensible defaults
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONPATH=/app

WORKDIR /app

# install deps
COPY apps/api/requirements-dev.txt /app/requirements.txt
RUN pip install --no-cache-dir -r /app/requirements.txt

# app code
COPY apps/api /app/apps/api

# Cloud Run passes $PORT (fallback to 8080 locally)
ENV PORT=8080
EXPOSE 8080

# Use the app factory
# (shell-form so ${PORT:-8080} expands; Cloud Run will set $PORT)
CMD uvicorn apps.api.main:create_app --factory --host 0.0.0.0 --port ${PORT:-8080}

"""LaunchPath API — entry point. Wires up all routers and middleware."""
import asyncio
import os
import stripe as stripe_lib
import sentry_sdk
from sentry_sdk.integrations.fastapi import FastApiIntegration
from sentry_sdk.integrations.starlette import StarletteIntegration

sentry_sdk.init(
    dsn=os.environ.get("SENTRY_DSN"),
    environment=os.environ.get("ENVIRONMENT", "production"),
    traces_sample_rate=0.1,
    integrations=[
        StarletteIntegration(transaction_style="endpoint"),
        FastApiIntegration(transaction_style="endpoint"),
    ],
    send_default_pii=False,
)

from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from core import client, STRIPE_API_KEY, db
from workers import followup_email_worker

from routes.public import router as public_router
from routes.auth import router as auth_router
from routes.tools import router as tools_router
from routes.portal import router as portal_router
from routes.admin import router as admin_router
from routes.payments import router as payments_router
from routes.products import router as products_router
from routes.audit_readiness import router as audit_readiness_router
from routes.sequences import router as sequences_router

stripe_lib.api_key = STRIPE_API_KEY

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)

# All routers share the /api prefix
for router in (public_router, auth_router, tools_router, portal_router, admin_router, payments_router, products_router, audit_readiness_router, sequences_router):
    app.include_router(router, prefix="/api")


@app.get("/api/health")
async def health_check():
    return {"status": "ok"}


@app.on_event("startup")
async def startup_event():
    asyncio.create_task(followup_email_worker())


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import predict, sentiment, explain, advisor
from app.utils import iq_calculator
import uvicorn
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="FinCopilot AI Microservice")

# Static check for CORS origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(predict.router, prefix="/ai", tags=["Prediction"])
app.include_router(sentiment.router, prefix="/ai", tags=["Sentiment"])
app.include_router(explain.router, prefix="/ai", tags=["Explanation"])
app.include_router(advisor.router, prefix="/ai", tags=["Advisor"])
app.include_router(iq_calculator.router, prefix="/ai", tags=["Utility"])

@app.get("/")
async def root():
    return {"message": "FinCopilot AI Microservice is running"}

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import uvicorn
import random

app = FastAPI(title="FinCopilot AI Server")

class PredictionRequest(BaseModel):
    stock: str
    confidence: float

class ChatRequest(BaseModel):
    message: str
    user_context: dict

@app.get("/")
async def root():
    return {"message": "FinCopilot AI Server is online"}

@app.post("/predict")
async def predict_stock(request: PredictionRequest):
    # Mock AI prediction logic
    trend = random.choice(["UP", "DOWN"])
    reasoning = f"Based on technical momentum and current volume trends, {request.stock} shows a strong {trend} signal."
    return {
        "prediction": trend,
        "confidence": 82.5,
        "reasoning": reasoning
    }

@app.get("/sentiment")
async def get_sentiment(stock: str):
    # Mock sentiment analysis
    score = random.randint(30, 90)
    sentiment = "Positive" if score > 60 else "Negative" if score < 40 else "Neutral"
    return {
        "stock": stock,
        "sentiment": sentiment,
        "score": score
    }

@app.post("/advisor/chat")
async def advisor_chat(request: ChatRequest):
    # Mock AI advisor logic
    response = f"Analysing your query: '{request.message}'. Given your {request.user_context.get('riskAppetite', 'Moderate')} risk profile, I recommend..."
    return {"response": response}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

from fastapi import APIRouter
from app.models.schemas import SentimentRequest, SentimentResponse
from transformers import pipeline
import torch

router = APIRouter()

# Initialize sentiment pipeline lazily or on startup
sentiment_pipeline = None

def get_sentiment_pipeline():
    global sentiment_pipeline
    if sentiment_pipeline is None:
        model_name = "ProsusAI/finbert"
        sentiment_pipeline = pipeline(
            "sentiment-analysis", 
            model=model_name, 
            device=0 if torch.cuda.is_available() else -1
        )
    return sentiment_pipeline

@router.post("/sentiment", response_model=SentimentResponse)
async def analyze_sentiment(request: SentimentRequest):
    pipe = get_sentiment_pipeline()
    
    results = []
    total_score = 0
    
    for article in request.articles:
        text = f"{article.headline}. {article.description or ''}"
        # Truncate text to avoid model limits
        text = text[:512]
        
        prediction = pipe(text)[0]
        label = prediction['label']
        score = prediction['score']
        
        results.append({
            "headline": article.headline,
            "sentiment": label.capitalize(),
            "score": float(score)
        })
        
        # Simple weighted score for overall sentiment
        weight = 1 if label == 'positive' else (-1 if label == 'negative' else 0)
        total_score += weight * score

    avg_score = total_score / len(results) if results else 0
    overall_sentiment = "Bullish" if avg_score > 0.1 else ("Bearish" if avg_score < -0.1 else "Neutral")

    return SentimentResponse(
        results=results,
        overallSentiment=overall_sentiment,
        overallScore=float(abs(avg_score))
    )

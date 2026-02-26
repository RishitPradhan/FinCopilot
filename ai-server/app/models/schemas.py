from pydantic import BaseModel
from typing import List, Optional, Dict, Any

# Prediction Schemas
class PredictRequest(BaseModel):
    stock: str
    historicalPrices: Optional[List[float]] = None

class PredictionSignals(BaseModel):
    ma_cross: str
    rsi: float
    macd: str

class PredictResponse(BaseModel):
    prediction: str
    confidence: float
    signals: PredictionSignals

# Explain Schemas
class ExplainRequest(BaseModel):
    stock: str
    userPrediction: str
    actualResult: str
    priceChange: float
    newsSentiment: str
    signals: Optional[Dict[str, Any]] = None

class ExplainResponse(BaseModel):
    explanation: str

# Sentiment Schemas
class NewsArticle(BaseModel):
    headline: str
    description: Optional[str] = None

class SentimentRequest(BaseModel):
    articles: List[NewsArticle]

class SentimentResult(BaseModel):
    headline: str
    sentiment: str
    score: float

class SentimentResponse(BaseModel):
    results: List[SentimentResult]
    overallSentiment: str
    overallScore: float

# Advisor Schemas
class ChatMessage(BaseModel):
    role: str
    content: str

class AdvisorContext(BaseModel):
    portfolio: List[str]
    recentSentiment: Dict[str, str]
    predictionAccuracy: float
    riskAppetite: str
    iqScore: int
    chatHistory: List[ChatMessage]

class AdvisorRequest(BaseModel):
    message: str
    context: AdvisorContext

class AdvisorResponse(BaseModel):
    response: str

# IQ Score Schema
class IQScoreRequest(BaseModel):
    quizScores: List[float]
    predictionHistory: List[bool]
    modulesCompleted: int

class IQScoreResponse(BaseModel):
    iqScore: float

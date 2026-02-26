from fastapi import APIRouter
from app.models.schemas import PredictRequest, PredictResponse
from app.services.market_data import market_service
from app.services.ml_model import ml_service

router = APIRouter()

@router.post("/predict", response_model=PredictResponse)
async def predict(request: PredictRequest):
    ticker = request.stock
    # If historical prices not provided, fetch them
    hist_prices = request.historicalPrices
    if not hist_prices:
        hist_data = market_service.get_historical_prices(ticker)
        hist_prices = hist_data.tolist()
    
    import pandas as pd
    prices_series = pd.Series(hist_prices)
    prediction_data = ml_service.predict_direction(ticker, prices_series)
    
    return PredictResponse(**prediction_data)

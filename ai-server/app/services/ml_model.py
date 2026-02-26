import pandas as pd
import numpy as np

class MLModelService:
    @staticmethod
    def compute_rsi(prices: pd.Series, period: int = 14) -> float:
        if len(prices) < period:
            return 50.0
        delta = prices.diff()
        gain = (delta.where(delta > 0, 0)).rolling(window=period).mean()
        loss = (-delta.where(delta < 0, 0)).rolling(window=period).mean()
        
        rs = gain / loss
        rsi = 100 - (100 / (1 + rs))
        return float(rsi.iloc[-1]) if not np.isnan(rsi.iloc[-1]) else 50.0

    @staticmethod
    def compute_macd(prices: pd.Series) -> dict:
        if len(prices) < 26:
            return {"macd": 0.0, "signal": 0.0, "histogram": 0.0, "status": "Neutral"}
        
        exp1 = prices.ewm(span=12, adjust=False).mean()
        exp2 = prices.ewm(span=26, adjust=False).mean()
        macd = exp1 - exp2
        signal = macd.ewm(span=9, adjust=False).mean()
        hist = macd - signal
        
        status = "Bullish" if macd.iloc[-1] > signal.iloc[-1] else "Bearish"
        return {
            "macd": float(macd.iloc[-1]),
            "signal": float(signal.iloc[-1]),
            "histogram": float(hist.iloc[-1]),
            "status": status
        }

    @staticmethod
    def compute_moving_averages(prices: pd.Series) -> dict:
        ma7 = prices.rolling(window=7).mean().iloc[-1]
        ma21 = prices.rolling(window=21).mean().iloc[-1]
        
        status = "Bullish" if ma7 > ma21 else "Bearish"
        return {
            "ma7": float(ma7) if not np.isnan(ma7) else 0.0,
            "ma21": float(ma21) if not np.isnan(ma21) else 0.0,
            "status": status
        }

    @staticmethod
    def predict_direction(ticker: str, historical_prices: pd.Series) -> dict:
        if historical_prices.empty or len(historical_prices) < 21:
            return {"prediction": "Neutral", "confidence": 50.0, "signals": {"ma_cross": "Neutral", "rsi": 50.0, "macd": "Neutral"}}
        
        rsi = MLModelService.compute_rsi(historical_prices)
        macd = MLModelService.compute_macd(historical_prices)
        ma = MLModelService.compute_moving_averages(historical_prices)
        
        # Rule-based weighted consensus
        bull_signals = 0
        if rsi < 35: bull_signals += 1 # Oversold
        if macd['status'] == "Bullish": bull_signals += 1
        if ma['status'] == "Bullish": bull_signals += 1
        
        bear_signals = 0
        if rsi > 65: bear_signals += 1 # Overbought
        if macd['status'] == "Bearish": bear_signals += 1
        if ma['status'] == "Bearish": bear_signals += 1
        
        if bull_signals > bear_signals:
            prediction = "UP"
            confidence = 60 + (bull_signals * 10)
        elif bear_signals > bull_signals:
            prediction = "DOWN"
            confidence = 60 + (bear_signals * 10)
        else:
            prediction = "Neutral"
            confidence = 50.0
            
        return {
            "prediction": prediction,
            "confidence": min(confidence, 95.0),
            "signals": {
                "ma_cross": ma['status'],
                "rsi": rsi,
                "macd": macd['status']
            }
        }

ml_service = MLModelService()

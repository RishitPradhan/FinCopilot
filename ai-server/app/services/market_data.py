import yfinance as yf
import pandas as pd
from datetime import datetime, timedelta

class MarketDataService:
    @staticmethod
    def get_historical_prices(ticker: str, period: str = "30d") -> pd.Series:
        try:
            stock = yf.Ticker(ticker)
            hist = stock.history(period=period)
            if hist.empty:
                return pd.Series()
            return hist['Close']
        except Exception as e:
            print(f"Error fetching historical prices for {ticker}: {e}")
            return pd.Series()

    @staticmethod
    def get_current_price(ticker: str) -> float:
        try:
            stock = yf.Ticker(ticker)
            # Use fast_info if available or tail of history
            price = stock.fast_info.get('last_price')
            if price is None:
                hist = stock.history(period="1d")
                if not hist.empty:
                    price = hist['Close'].iloc[-1]
            return float(price) if price else 0.0
        except Exception:
            return 0.0

    @staticmethod
    def get_sector(ticker: str) -> str:
        try:
            stock = yf.Ticker(ticker)
            return stock.info.get('sector', 'Unknown')
        except Exception:
            return 'Unknown'

    @staticmethod
    def get_price_on_date(ticker: str, target_date: str) -> float:
        try:
            # target_date format "YYYY-MM-DD"
            date_obj = datetime.strptime(target_date, "%Y-%m-%d")
            start = date_obj.strftime("%Y-%m-%d")
            end = (date_obj + timedelta(days=2)).strftime("%Y-%m-%d")
            
            stock = yf.Ticker(ticker)
            hist = stock.history(start=start, end=end)
            if not hist.empty:
                return float(hist['Close'].iloc[0])
            return 0.0
        except Exception:
            return 0.0

market_service = MarketDataService()

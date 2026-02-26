from fastapi import APIRouter
from app.models.schemas import IQScoreRequest, IQScoreResponse

router = APIRouter()

@router.post("/iq-score", response_model=IQScoreResponse)
async def calculate_iq_score(request: IQScoreRequest):
    # Logic: Score = (quizAvgScore * 0.4) + (predictionAccuracy * 0.4) + (modulesCompleted/5 * 0.2) * 100
    
    quiz_avg = sum(request.quizScores) / len(request.quizScores) if request.quizScores else 0
    
    accuracy = (sum(1 for x in request.predictionHistory if x) / len(request.predictionHistory)) * 100 if request.predictionHistory else 0
    
    module_prog = (request.modulesCompleted / 5) * 100
    
    iq_score = (quiz_avg * 0.004) + (accuracy * 0.004) + (module_prog * 0.002)
    # Scaled to a max of 100 or higher
    # Actually the user prompt said: (quizAvgScore * 0.4) + (predictionAccuracy * 0.4) + (modulesCompleted/5 * 0.2) * 100
    # Let's follow that:
    
    # If quizScore is 0-100, accuracy is 0-1, modulesCompleted is 0-5
    # Let's assume input is: quizScores 0-100, predictionHistory [True, False], modulesCompleted 0-5
    
    acc_ratio = sum(1 for x in request.predictionHistory if x) / len(request.predictionHistory) if request.predictionHistory else 0
    mod_ratio = request.modulesCompleted / 5
    
    # Score = (quizAvg * 0.4) + (acc_ratio * 40) + (mod_ratio * 20)
    # This gives a max of 100.
    
    final_score = (quiz_avg * 0.4) + (acc_ratio * 40) + (mod_ratio * 20)
    
    return IQScoreResponse(iqScore=round(final_score, 2))

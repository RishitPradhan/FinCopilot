from fastapi import APIRouter
from app.models.schemas import ExplainRequest, ExplainResponse
from app.services.llm_service import llm_service
from app.utils.helpers import prompt_helper

router = APIRouter()

@router.post("/explain", response_model=ExplainResponse)
async def explain(request: ExplainRequest):
    data = request.dict()
    prompt = prompt_helper.get_explain_prompt(data)
    
    explanation = await llm_service.call_llm(
        system_prompt="You are a financial analyst explaining market moves clearly.",
        user_message=prompt
    )
    
    return ExplainResponse(explanation=explanation)

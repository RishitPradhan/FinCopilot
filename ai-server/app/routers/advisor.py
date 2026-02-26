from fastapi import APIRouter
from app.models.schemas import AdvisorRequest, AdvisorResponse
from app.services.llm_service import llm_service
from app.utils.helpers import prompt_helper

router = APIRouter()

@router.post("/advisor", response_model=AdvisorResponse)
async def advisor_chat(request: AdvisorRequest):
    context_data = request.context.dict()
    system_prompt = prompt_helper.get_advisor_system_prompt(context_data)
    
    # Format history for Claude
    # Claude expects a list of messages with role and content
    history = [
        {"role": msg.role, "content": msg.content} 
        for msg in request.context.chatHistory
    ]
    
    response = await llm_service.call_llm(
        system_prompt=system_prompt,
        user_message=request.message,
        history=history
    )
    
    return AdvisorResponse(response=response)

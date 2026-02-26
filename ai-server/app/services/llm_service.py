import os
from anthropic import Anthropic
from dotenv import load_dotenv

load_dotenv()

class LLMService:
    def __init__(self):
        self.api_key = os.getenv("ANTHROPIC_API_KEY")
        self.client = Anthropic(api_key=self.api_key) if self.api_key else None
        self.model = "claude-3-sonnet-20240229" # Using a stable sonnet model

    async def call_llm(self, system_prompt: str, user_message: str, history: list = []) -> str:
        if not self.client:
            return "AI service is currently in mock mode. Please provide an ANTHROPIC_API_KEY."

        try:
            messages = history + [{"role": "user", "content": user_message}]
            response = self.client.messages.create(
                model=self.model,
                max_tokens=500,
                system=system_prompt,
                messages=messages
            )
            return response.content[0].text
        except Exception as e:
            print(f"LLM Error: {e}")
            return "I apologize, but I encountered an error while processing your request."

llm_service = LLMService()

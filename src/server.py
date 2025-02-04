from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline

# Initialize FastAPI app
app = FastAPI()

# Load the DeepSeek-R1 model
pipe = pipeline("text-generation", model="deepseek-ai/DeepSeek-R1", trust_remote_code=True)

# Define request body model
class ChatRequest(BaseModel):
    messages: list  # List of chat messages (user & assistant history)

@app.post("/chat")
async def chat(request: ChatRequest):
    # Format messages into a single prompt
    chat_history = "\n".join([f"{msg['role'].capitalize()}: {msg['content']}" for msg in request.messages])

    # Generate response
    response = pipe(chat_history, max_length=250)

    # Extract AI response text
    ai_response = response[0]['generated_text']

    return {"response": ai_response}

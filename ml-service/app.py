from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np
from joblib import load
from gpt4all import GPT4All

app = FastAPI()

########################################
# ---- Load ML Model for /predict ---- #
########################################

data = load("model.pkl")
model = data["model"]
career_titles = data["titles"]
skill_index = data["skill_index"]

class SkillRequest(BaseModel):
    skills: list[str]


def vectorize_user(skills):
    user_skills = [s.lower() for s in skills]

    vector = [
        1 if skill in user_skills else 0
        for skill in skill_index
    ]

    return np.array([vector])


@app.post("/predict")
def predict(req: SkillRequest):
    user_vector = vectorize_user(req.skills)
    distances, indices = model.kneighbors(user_vector)

    recommendations = []

    for idx, dist in zip(indices[0], distances[0]):
        recommendations.append({
            "career": career_titles[idx],
            "confidence": float(round((1 - dist) * 100, 2))
        })

    return {"results": recommendations}



##########################################
# ---- Load LLM Model for /chat ---- #
##########################################

SYSTEM_PROMPT = """
You are TrailBlaze AI — a personal career mentor.
You respond clearly, step-by-step, and guide the user based on real tech roadmap knowledge.
Keep replies short, friendly and helpful.
"""

MODEL_FILE = "Phi-3-mini-4k-instruct.Q4_0.gguf"
MODEL_PATH = "./llm"

print("🧠 Loading LLM model... please wait...")
llm = GPT4All(model_name=MODEL_FILE, model_path=MODEL_PATH, allow_download=False)
print("✅ Model Loaded!")

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
def chat(req: ChatRequest):
    try:
        prompt = req.message.strip()

        # Working generate call (no stop param)
        response = llm.generate(
            prompt,
            max_tokens=200,
            temp=0.7,
            top_k=40,
            top_p=0.9,
            repeat_penalty=1.2
        )

        # Cleanup — removes repeated prefixes from local models
        cleaned = (
            response.replace("User:", "")
                    .replace("Assistant:", "")
                    .strip()
        )

        return {"reply": cleaned}

    except Exception as e:
        print("❌ Chat error:", e)
        return {"error": str(e)}


##########################################
# ---- Root Health Check ---- #
##########################################

@app.get("/")
def root():
    return {"status": "ML Service Running", "endpoints": ["/predict", "/chat"]}

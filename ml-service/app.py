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
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# allow frontend/backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load ONCE globally
llm = None

@app.on_event("startup")
def load_model():
    global llm
    print("🧠 Loading AI model...")
    llm = GPT4All(
    model_name=MODEL_FILE,
    model_path=MODEL_PATH,
    allow_download=False,
    device="cpu"  # ⬅ Force CPU, no GPU attempt
)

    print("✅ Loaded.")

print("✅ Model Loaded!")

class ChatRequest(BaseModel):
    message: str

@app.post("/chat")
def chat(req: ChatRequest):
    global llm
    try:
        if llm is None:
            return {"error": "Model not loaded"}

        response = llm.generate(
            req.message,
            max_tokens=200,
            temp=0.7,
            top_k=40,
            top_p=0.9,
            repeat_penalty=1.2
        )

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

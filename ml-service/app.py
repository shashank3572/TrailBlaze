from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np
from joblib import load

app = FastAPI()

# Load model
data = load("model.pkl")
model = data["model"]
career_titles = data["titles"]
skill_index = data["skill_index"]


class SkillRequest(BaseModel):
    skills: list[str]


def vectorize_user(skills):
    vector = []
    user_skills = [s.lower() for s in skills]

    for skill in skill_index:
        vector.append(1 if skill in user_skills else 0)

    return np.array([vector])


@app.post("/predict")
def predict(req: SkillRequest):
    user_vector = vectorize_user(req.skills)
    distances, indices = model.kneighbors(user_vector)

    recommendations = []

    for idx, dist in zip(indices[0], distances[0]):
        recommendations.append({
            "career": career_titles[idx],
            "confidence": float(round((1 - dist) * 100, 2))  # convert similarity to %
        })

    return {"results": recommendations}

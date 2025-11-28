import json
import numpy as np
from sklearn.neighbors import NearestNeighbors
from joblib import dump

# Load dataset
with open("careers.json", "r", encoding="utf-8") as f:
    careers = json.load(f)

career_titles = [c["title"] for c in careers]

# ------------------------
# Build global skill set
# ------------------------
all_skills = set()

for career in careers:
    for skill in career["requiredSkills"]:
        all_skills.add(skill["name"].lower())

all_skills = sorted(list(all_skills))  # stable ordering
print(f"📌 Total unique skills: {len(all_skills)}")

# ------------------------
# Convert careers into equal-length vectors
# ------------------------
def vectorize(career):
    vector = []
    career_skill_map = {s["name"].lower(): s["weight"] for s in career["requiredSkills"]}

    for skill in all_skills:
        vector.append(career_skill_map.get(skill, 0))  # 0 if skill not required
    
    return vector

X = np.array([vectorize(c) for c in careers])

# ------------------------
# Train KNN Model
# ------------------------
model = NearestNeighbors(n_neighbors=5, metric="cosine")
model.fit(X)

# ------------------------
# Save model
# ------------------------
dump({
    "model": model,
    "titles": career_titles,
    "skill_index": all_skills,
    "vectors": X
}, "model.pkl")

print("✅ Model trained successfully and saved as model.pkl")

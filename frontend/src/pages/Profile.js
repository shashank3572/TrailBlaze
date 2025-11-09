import React, { useEffect, useState } from "react";
import api from "../api/client";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [newSkill, setNewSkill] = useState("");

  // Fetch profile
  useEffect(() => {
    api.get("/user/profile")
      .then((res) => setUser(res.data))
      .catch(() => setUser(null));
  }, []);

  const addSkill = async () => {
    if (!newSkill.trim()) return;
    const res = await api.post("/user/profile/add-skill", { skill: newSkill });
    setUser({ ...user, skills: res.data.skills });
    setNewSkill("");
  };

  const removeSkill = async (skill) => {
    const res = await api.post("/user/profile/remove-skill", { skill });
    setUser({ ...user, skills: res.data.skills });
  };

  if (!user)
    return (
      <div className="min-h-screen bg-neutral-950 text-gray-200 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-neutral-950 text-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-neutral-900 p-6 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-4">Profile</h1>

        <p className="text-lg"><strong>Name:</strong> {user.name}</p>
        <p className="text-lg mb-4"><strong>Email:</strong> {user.email}</p>

        <hr className="border-neutral-700 my-4" />

        <h2 className="text-xl font-semibold mb-2">Your Skills</h2>

        <div className="flex gap-3 mb-4">
          <input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add a skill"
            className="p-2 rounded bg-neutral-800 border border-neutral-700 text-gray-200"
          />
          <button
            onClick={addSkill}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          {user.skills.length === 0 && (
            <p className="text-gray-400">No skills added yet.</p>
          )}

          {user.skills.map((skill) => (
            <div
              key={skill}
              className="bg-neutral-800 px-3 py-1 rounded flex items-center gap-3"
            >
              <span>{skill}</span>
              <button
                onClick={() => removeSkill(skill)}
                className="text-red-400 hover:text-red-300"
              >
                ✖
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

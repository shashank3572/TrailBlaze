import client from "./client";

export const sendMessageToAI = (message) =>
  client.post("/ai/chat", { message });

export const getCareerRecommendation = () => client.get("/user/recommend");

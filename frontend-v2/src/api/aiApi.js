import client from "./client";

export const getCareerRecommendation = () => client.get("/user/recommend");

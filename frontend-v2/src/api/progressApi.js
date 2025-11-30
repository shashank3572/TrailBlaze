import client from "./client";

export const getProgress = (careerTitle) =>
  client.get(`/careers/${encodeURIComponent(careerTitle)}/progress`);

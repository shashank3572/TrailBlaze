import client from "./client";

export const fetchWeeklyTasks = () => client.get("/api/weekly-tasks");

export const generateWeeklyTasks = () => client.post("/api/weekly-tasks");

export const updateTaskStatus = (taskId, completed) =>
  client.patch(`/api/weekly-tasks/${taskId}`, { completed });

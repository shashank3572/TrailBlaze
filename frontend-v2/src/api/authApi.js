import api from "./axiosClient";

export const loginApi = (data) => api.post("/auth/login", data);
export const registerApi = (data) => api.post("/auth/register", data);
export const fetchUserApi = () => api.get("/user/me");

export const API_URL = "http://localhost:5000/api/users";

export const getUsers = async () => {
  const res = await fetch(API_URL);
  return res.json();
};

export const createUser = async (user) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  return res.json();
};

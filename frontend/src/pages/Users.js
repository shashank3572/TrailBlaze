import React, { useEffect, useState } from "react";
import { getUsers, createUser } from "../api";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleAddUser = async () => {
    if (!name || !email) return;
    await createUser({ name, email, skills: [] });
    setName("");
    setEmail("");
    fetchUsers();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Users</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleAddUser}>Add User</button>

      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} — {user.email} — Skills: {user.skills.join(", ")}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;

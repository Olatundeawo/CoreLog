import React from "react";
import { useState, useEffect } from "react";

function AdminCreate() {
  const [admin, setAdmin] = useState({
    username: "",
    email: "",
    password: "",
    code: "",
  });
  const [messages, setMessages] = useState(" ");

  const handleChanges = (e) => {
    setAdmin({
      ...admin,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/admins/create/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: admin.username,
          email: admin.email,
          password: admin.password,
          code: admin.code,
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        console.error("❌ Server returned error:", data);
        setAdmin({
          username: "",
          email: "",
          password: "",
          code: "",
        });
        setMessages(data.error || "Unexpected error");
        return;
      }

      setMessages(data.message);
      setAdmin({
        username: "",
        email: "",
        password: "",
        code: "",
      });
    } catch (err) {
      console.error("❌ Network/JS error:", err);
      alert("Server unreachable, check backend logs");
    }
  };
  return (
    <div>
      <h1>Welcome to Admin page</h1>
      <p>{messages}</p>
      <form onSubmit={handleCreate}>
        <label className="block text-gray-700 font-bold mb-2">UserName</label>
        <input
          type="text"
          name="username"
          value={admin.username}
          onChange={handleChanges}
          required
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label className="block text-gray-700 font-bold mb-2">Email</label>
        <input
          type="email"
          name="email"
          value={admin.email}
          onChange={handleChanges}
          required
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label className="block text-gray-700 font-bold mb-2">Password</label>
        <input
          type="password"
          name="password"
          value={admin.password}
          onChange={handleChanges}
          required
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label className="block text-gray-700 font-bold mb-2">
          Enter License Code
        </label>
        <input
          type="text"
          name="code"
          value={admin.code}
          onChange={handleChanges}
          required
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          className="lex items-center justify-center px-4 py-2 text-white rounded bg-blue-500 hover:bg-blue-600"
          type="submit"
        >
          Create an admin
        </button>
      </form>
    </div>
  );
}

export default AdminCreate;

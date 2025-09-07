import React, { useState } from "react";
import FaceEmbedder from "./faceEmbedder";

function EmployeeCreate() {
  const [employee, setEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    embedding: null,
    profilePic: null,
  });
  const [error, setError] = useState(null);
  const [message, setMessage] = useState();

  const handleChanges = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = ({ embedding, profilePic }) => {
    setEmployee({
      ...employee,
      embedding,
      profilePic,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("firstName", employee.firstName);
    data.append("lastName", employee.lastName);
    data.append("email", employee.email);

    if (employee.embedding) {
      data.append("embedding", JSON.stringify(employee.embedding));
    }

    if (employee.profilePic) {
      const blob = await fetch(employee.profilePic).then((res) => res.blob());
      data.append("profilePic", blob);
    }

    try {
      const result = await fetch("http://localhost:3000/employees/create", {
        method: "POST",
        body: data,
      });
      console.log("This is the result:", result);
      const res = await result.json();
      console.log("Realy result", res);
      if (!res.ok) {
        setError(result.error);
        setEmployee({
          firstName: "",
          lastName: "",
          email: "",
          embedding: "",
          profilePic: "",
        });
        return;
      }
      setMessage(result.message);
      setEmployee({
        firstName: "",
        lastName: "",
        email: "",
        embedding: "",
        profilePic: "",
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h1>This the employee registration table.</h1>
      <p>{message}</p>
      <p>{error}</p>
      <form onSubmit={handleSubmit}>
        <label>Firstname</label>
        <input
          type="text"
          name="firstName"
          value={employee.firstName}
          onChange={handleChanges}
          required
        />
        <label>Lastname</label>
        <input
          type="text"
          name="lastName"
          value={employee.lastName}
          onChange={handleChanges}
          required
        />
        <label>email</label>
        <input
          type="email"
          name="email"
          value={employee.email}
          onChange={handleChanges}
        />
        <FaceEmbedder onSave={handleImage} />

        <button type="submit">Register Employee</button>
      </form>
    </div>
  );
}

export default EmployeeCreate;

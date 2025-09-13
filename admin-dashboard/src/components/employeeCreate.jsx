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
      data.append("profilePic", blob, employee.firstName);
      console.log(blob);
    } else {
      console.log("Not profile pic detected");
    }

    try {
      const result = await fetch("http://localhost:3000/employees/create", {
        method: "POST",
        body: data,
      });
      console.log("This is the data:", data);
      const res = await result.json();
      console.log("Realy result", res);
      if (!res.ok) {
        setError(result.error);
        setEmployee({
          firstName: "",
          lastName: "",
          email: "",
          embedding: null,
          profilePic: null,
        });
        return;
      }
      setMessage(result.message);
      setEmployee({
        firstName: "",
        lastName: "",
        email: "",
        embedding: null,
        profilePic: null,
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
        <FaceEmbedder onEmbed={handleImage} />

        <button type="submit">Register Employee</button>
      </form>
    </div>
  );
}

export default EmployeeCreate;

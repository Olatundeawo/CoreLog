import { useState } from "react";
import AdminCreate from "./components/adminCreate";
import EmployeeCreate from "./components/employeeCreate";
import FaceEmbedder from "./components/faceEmbedder";

function App() {
  return (
    <div>
      <AdminCreate />
      {/* <EmployeeCreate /> */}
      <FaceEmbedder />
    </div>
  );
}

export default App;

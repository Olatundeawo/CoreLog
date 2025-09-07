import { useState } from "react";
import AdminCreate from "./components/adminCreate";
import EmployeeCreate from "./components/employeeCreate";

function App() {
  return (
    <div>
      <AdminCreate />
      <EmployeeCreate />
    </div>
  );
}

export default App;

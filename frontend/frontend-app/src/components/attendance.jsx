import { useState, useEffect } from "react";

export default function EmployeeAttendance() {
  const [employeeId, setEmployeeId] = useState("");
  const [status, setStatus] = useState("");
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  // Check if employee has an active attendance
  const checkStatus = async () => {
    if (!employeeId) return;
    try {
      const res = await fetch(`http://localhost:3000/employees/${employeeId}`);
      const data = await res.json();

      // Check if last attendance has no checkout
      const lastAttendance = data.attendances?.[data.attendances.length - 1];
      if (lastAttendance && !lastAttendance.checkOut) {
        setIsCheckedIn(true);
        setStatus("You are currently checked in.");
      } else {
        setIsCheckedIn(false);
        setStatus("You are not checked in.");
      }
    } catch (err) {
      console.error(err);
      setStatus("Error fetching status.");
    }
  };

  useEffect(() => {
    checkStatus();
  }, [employeeId]);

  // Handle Check-in
  const handleCheckin = async () => {
    try {
      const res = await fetch("http://localhost:3000/attendance/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employeeId }),
      });
      const data = await res.json();
      if (data.error) setStatus(data.error);
      else {
        setStatus(data.message);
        setIsCheckedIn(true);
      }
    } catch (err) {
      console.error(err);
      setStatus("Error during check-in.");
    }
  };

  // Handle Check-out
  const handleCheckout = async () => {
    try {
      const res = await fetch("http://localhost:3000/attendance/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employeeId }),
      });
      const data = await res.json();
      if (data.error) setStatus(data.error);
      else {
        setStatus(data.message);
        setIsCheckedIn(false);
      }
    } catch (err) {
      console.error(err);
      setStatus("Error during check-out.");
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h2>Employee Attendance</h2>
      <input
        type="text"
        placeholder="Enter Employee ID"
        value={employeeId}
        onChange={(e) => setEmployeeId(e.target.value)}
        style={{ padding: "0.5rem", marginBottom: "1rem" }}
      />
      <div>
        {!isCheckedIn ? (
          <button onClick={handleCheckin} style={{ padding: "0.5rem 1rem" }}>
            Check In
          </button>
        ) : (
          <button onClick={handleCheckout} style={{ padding: "0.5rem 1rem" }}>
            Check Out
          </button>
        )}
      </div>
      <p style={{ marginTop: "1rem", color: "green" }}>{status}</p>
    </div>
  );
}

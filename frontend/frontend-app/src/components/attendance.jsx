import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

export default function EmployeeAttendance() {
  const [employeeId, setEmployeeId] = useState("");
  const [status, setStatus] = useState("");
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [verified, setVerified] = useState(false);
  const [employeeDetails, setEmployeeDetails] = useState("");
  const [time, setTime] = useState("");

  // Check if employee has an active attendance
  const checkStatus = async () => {
    if (!employeeId) return;
    try {
      const res = await fetch(`http://localhost:3000/employees/${employeeId}`);
      const data = await res.json();

      if (!res.ok) {
        setStatus(data.message);
        return;
      }

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

  useEffect(() => {
    let interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const verifyId = async () => {
    try {
      const res = await fetch(`http://localhost:3000/employees/${employeeId}`);
      const data = await res.json();
      if (res.status === 404) {
        setStatus(data.message);
      } else {
        setVerified(true);
        setEmployeeDetails(data);
      }
    } catch (err) {
      console.error(err);
      setStatus("Error verifying employee ID.");
    }
  };

  // Handle Check-in
  const handleCheckin = async () => {
    try {
      const res = await fetch("http://localhost:3000/attendances/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employeeId: Number(employeeId) }),
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
      const res = await fetch("http://localhost:3000/attendances/checkout", {
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
      <Clock className="w-8 h-8 text-blue-600 mr-2" />
      <h1 className="text-2xl font-bold text-gray-800">Attendance Tracker</h1>
      <p className="text-gray-600">
        {time.toLocaleString(undefined, {
          weekday: "long",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          hour12: true,
        })}
      </p>
      {!verified && (
        <div>
          <input
            type="text"
            placeholder="Enter Employee ID"
            value={employeeId}
            onChange={(e) => setEmployeeId(Number(e.target.value))}
            autoFocus
            style={{ padding: "0.5rem", marginBottom: "1rem" }}
            disabled={verified}
          />
          <button onClick={verifyId}>Verify ID</button>
        </div>
      )}
      {verified && <p>Good day {employeeDetails.firstName}</p>}
      <p style={{ marginTop: "1rem", color: "green" }}>{status}</p>
      {isCheckedIn && <p>You seethis because you are check in</p>}
    </div>
  );
}

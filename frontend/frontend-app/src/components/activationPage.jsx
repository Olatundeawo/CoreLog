import { useState } from "react";

function ActivationPage() {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  const handleActivate = async () => {
    try {
      const res = await fetch("http://localhost:3000/license/activate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, machineId: "MY_DEVICE_ID" }), // 👈 add real device ID later
      });

      const data = await res.json();

      if (data.success) {
        setMessage(data.message + " ✅");
      } else {
        setMessage(data.error || "Invalid or used code ❌");
      }
    } catch (err) {
      setMessage("Server error ❌");
    }
  };

  async function generateCode() {
    try {
      const response = await fetch("http://localhost:3000/license/generate", {
        method: "POST",
      });
      const data = await response.json();
      if (data.success) {
        alert("New License Code: " + data.code);
      } else {
        alert("Error: " + data.error);
      }
    } catch {
      alert("Server error");
    }
  }

  return (
    <div>
      <h2>Enter Activation Code</h2>
      <input
        type="text"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button onClick={handleActivate}>Activate</button>
      <p>{message}</p>

      <button onClick={generateCode}>Generate</button>
    </div>
  );
}

export default ActivationPage;

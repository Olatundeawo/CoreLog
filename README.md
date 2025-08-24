# CoreLog – Employee Attendance System

CoreLog is a lightweight **employee attendance tracking system** that allows organizations to manage staff check-ins and check-outs using a dedicated laptop or desktop.  
The system prevents “buddy punching” (false attendance marking) by supporting **ID input** and **optional face recognition**.

Admins can easily view logs, generate reports, and export attendance data for payroll or compliance.

---

## ✨ Features

- **Employee Check-In & Check-Out**

  - ID input (fallback in case face capture fails).
  - Optional face recognition (via face-api.js).
  - Timestamp and device ID automatically recorded.

- **Admin Dashboard**

  - View attendance logs (employee, date, time).
  - Filters for late arrivals & early exits.
  - Export attendance to CSV/Excel.
  - Responsive design for desktop & mobile.

- **Backend APIs**

  - Authentication (admin login).
  - Attendance check-in/out.
  - Data export endpoints.

- **Offline Support**
  - Local **SQLite** storage on check-in device.
  - Syncs with central **PostgreSQL** database.

---

## 🏗️ Project Architecture

corelog/
│── backend/ # Node.js + Express.js (REST APIs + DB)
│── checkin-app/ # Electron + React app (employee check-in)
│── admin-dashboard/ # React + Tailwind dashboard (admin panel)

- **Frontend (Employee App):** Electron.js + React + TailwindCSS
- **Backend (API):** Node.js + Express.js, PostgreSQL, SQLite (offline)
- **Admin Dashboard:** React.js + TailwindCSS, Recharts (analytics)
- **Exports:** CSV, Excel (via Papaparse/ExcelJS)

---

## 📦 Tech Stack

- **Frontend:** React, TailwindCSS, Electron.js
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL (central), SQLite (local/offline)
- **Authentication:** JWT (JSON Web Token)
- **Charts & Exports:** Recharts, Chart.js, Papaparse, ExcelJS
- **Optional:** face-api.js (face recognition), SendGrid/Mailgun (email alerts)

---

## ⚙️ Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/your-username/corelog.git
cd corelog
```

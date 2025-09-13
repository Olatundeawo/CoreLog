import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import fetch from "node-fetch"; // make sure to install: npm install node-fetch

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let configPath = path.join(app.getPath("userData"), "myappconfig.json");

function isActivated() {
  if (!fs.existsSync(configPath)) return false;
  const data = JSON.parse(fs.readFileSync(configPath));
  return data.activated === true;
}

function saveActivation() {
  fs.writeFileSync(configPath, JSON.stringify({ activated: true }));
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (isActivated()) {
    win.loadURL("http://localhost:5174/");
  } else {
    win.loadURL("http://localhost:5174/");
  }
}

// Handle activation
ipcMain.handle("activate-license", async (event, code) => {
  try {
    const res = await fetch("http://localhost:3000/license/activate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code })
    });

    const data = await res.json();

    if (data.success) {
      saveActivation();
      return { success: true };
    } else {
      return { success: false, message: data.message };
    }
  } catch (err) {
    console.error("Activation error:", err);
    return { success: false, message: "Could not reach server" };
  }
});

ipcMain.handle("check-activation", async () => {
  return isActivated();
});

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
